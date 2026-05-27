"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { resolveBg } from "@/lib/ui";
import { normalizeSiteHref } from "@/lib/links";

export default function Hero({
  title,
  subtitle,
  note,
  primaryCta,
  secondaryCta,
  bgImageUrl,

  // new standardized background support (optional)
  sectionBg = "",

  align = "left", // "left" | "center"
  height = "default", // "default" | "innovation"
  overlay = "default", // "default" | "dark"
  showArcs = false,
  topSpacing = "default", // "default" | "home"
  className = "",
  slides = [],
  autoRotate = false,
  autoRotateMs = 8000,
}) {
  const hasSlides = Array.isArray(slides) && slides.length > 0;

  if (hasSlides) {
    return (
      <HeroCarousel
        slides={slides}
        title={title}
        subtitle={subtitle}
        note={note}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        bgImageUrl={bgImageUrl}
        sectionBg={sectionBg}
        align={align}
        height={height}
        overlay={overlay}
        showArcs={showArcs}
        topSpacing={topSpacing}
        className={className}
        autoRotate={autoRotate}
        autoRotateMs={autoRotateMs}
      />
    );
  }

  return (
    <HeroPane
      title={title}
      subtitle={subtitle}
      note={note}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      bgImageUrl={bgImageUrl}
      sectionBg={sectionBg}
      align={align}
      height={height}
      overlay={overlay}
      showArcs={showArcs}
      topSpacing={topSpacing}
      className={className}
    />
  );
}

function HeroCarousel({
  slides,
  title,
  subtitle,
  note,
  primaryCta,
  secondaryCta,
  bgImageUrl,
  sectionBg,
  align,
  height,
  overlay,
  showArcs,
  topSpacing,
  className,
  autoRotate,
  autoRotateMs,
}) {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const normalizedSlides = useMemo(
    () =>
      slides.map((slide) => ({
        ...slide,
        title: slide?.title || title,
        subtitle: slide?.subtitle || subtitle,
        note: slide?.note || note,
        primaryCta: slide?.primaryCta || primaryCta,
        secondaryCta: slide?.secondaryCta || secondaryCta,
        bgImageUrl: slide?.bgImageUrl || bgImageUrl,
        sectionBg: slide?.sectionBg || sectionBg,
        align: slide?.align || align,
        height: slide?.height || height,
        overlay: slide?.overlay || overlay,
        showArcs: Boolean(slide?.showArcs ?? showArcs),
        topSpacing: slide?.topSpacing || topSpacing,
      })),
    [
      slides,
      title,
      subtitle,
      note,
      primaryCta,
      secondaryCta,
      bgImageUrl,
      sectionBg,
      align,
      height,
      overlay,
      showArcs,
      topSpacing,
    ]
  );

  const total = normalizedSlides.length;

  const scrollToIndex = useCallback((index) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const safeIndex = ((index % total) + total) % total;
    const left = safeIndex * scroller.clientWidth;
    scroller.scrollTo({ left, behavior: "smooth" });
    setActiveIndex(safeIndex);
  }, [total]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const onScroll = () => {
      const width = scroller.clientWidth || 1;
      const next = Math.round(scroller.scrollLeft / width);
      if (next !== activeIndex && next >= 0 && next < total) {
        setActiveIndex(next);
      }
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [activeIndex, total]);

  useEffect(() => {
    if (!autoRotate || total <= 1) return undefined;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % total;
        const scroller = scrollerRef.current;
        if (scroller) {
          scroller.scrollTo({ left: next * scroller.clientWidth, behavior: "smooth" });
        }
        return next;
      });
    }, Math.max(5000, autoRotateMs));

    return () => window.clearInterval(timer);
  }, [autoRotate, autoRotateMs, total]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <section
      className={["bb-ui", "relative", className].filter(Boolean).join(" ")}
      aria-label="Homepage hero carousel"
      onKeyDown={onKeyDown}
    >
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {normalizedSlides.map((slide, idx) => (
          <HeroPane
            key={slide?.id || slide?.title || idx}
            title={slide.title}
            subtitle={slide.subtitle}
            note={slide.note}
            tag={slide?.tag}
            primaryCta={slide.primaryCta}
            secondaryCta={slide.secondaryCta}
            bgImageUrl={slide.bgImageUrl}
            sectionBg={slide.sectionBg}
            align={slide.align}
            height={slide.height}
            overlay={slide.overlay}
            showArcs={slide.showArcs}
            topSpacing={slide.topSpacing}
            headingLevel={idx === 0 ? "h1" : "h2"}
            snapStart
          />
        ))}
      </div>

      {total > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20">
          <Container className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white transition hover:bg-black/50"
              aria-label="Previous slide"
            >
              <span aria-hidden="true">&larr;</span>
            </button>

            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-2">
              {normalizedSlides.map((slide, idx) => (
                <button
                  key={`dot-${slide?.id || idx}`}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={activeIndex === idx ? "true" : undefined}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    activeIndex === idx ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80",
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white transition hover:bg-black/50"
              aria-label="Next slide"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </Container>
        </div>
      ) : null}
    </section>
  );
}

function HeroPane({
  title,
  subtitle,
  note,
  tag,
  primaryCta,
  secondaryCta,
  bgImageUrl,
  sectionBg,
  align,
  height,
  overlay,
  showArcs,
  topSpacing,
  className = "",
  snapStart = false,
  headingLevel = "h1",
}) {
  const HeadingTag = headingLevel === "h2" ? "h2" : "h1";
  const resolvedBg = resolveBg(sectionBg);
  const bgStyle = bgImageUrl ? { backgroundImage: `url(${bgImageUrl})` } : undefined;

  const minH =
    height === "innovation"
      ? "min-h-[22rem] sm:min-h-[24rem] lg:min-h-[30rem]"
      : "min-h-[24rem] sm:min-h-[26rem] lg:min-h-[34rem]";
  const overlayClass = overlay === "dark" ? "before:bg-black/45" : "before:bg-black/55";
  const contentAlign =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";
  const wrapWidth = align === "center" ? "max-w-[60rem]" : "max-w-3xl";
  const paddingTop =
    topSpacing === "home" ? "pt-[8.75rem] sm:pt-[9.5rem]" : "pt-44 sm:pt-48";

  return (
    <div
      style={{ ...(resolvedBg.style || {}), ...(bgStyle || {}) }}
      className={[
        "relative bg-cover bg-center text-white",
        resolvedBg.className,
        minH,
        "z-[1]",
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
        overlayClass,
        paddingTop,
        snapStart ? "min-w-full snap-start" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showArcs ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 bottom-0 h-[72%] w-[46%] rounded-tl-[999px] bg-sky-300/60" />
          <div className="absolute right-0 bottom-0 h-[64%] w-[40%] rounded-tl-[999px] bg-rose-300/55" />
          <div className="absolute right-0 bottom-0 h-[56%] w-[34%] rounded-tl-[999px] bg-amber-200/55" />
        </div>
      ) : null}

      <Container
        className={[
          "relative",
          minH,
          "flex items-center pb-20 sm:pb-24",
          align === "center" ? "justify-center" : "",
        ].join(" ")}
      >
        <div className={[wrapWidth, "flex flex-col", contentAlign].join(" ")}>
          {tag ? (
            <span className="inline-flex rounded-full border border-white/35 bg-white/15 px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-white/95">
              {tag}
            </span>
          ) : null}

          <HeadingTag className={[
            align === "center" ? "bb-hero-title bb-hero-title--center" : "bb-hero-title",
            tag ? "mt-5" : "",
          ].join(" ")}>
            {renderMultiline(title)}
          </HeadingTag>

          {subtitle ? (
            <p className={align === "center" ? "bb-hero-subtitle bb-hero-subtitle--center" : "bb-hero-subtitle"}>
              {subtitle}
            </p>
          ) : null}

          {note ? <p className="bb-hero-note">{note}</p> : null}

          <div
            className={[
              "mt-7 flex gap-3",
              align === "center" ? "flex-col sm:flex-row justify-center" : "flex-col sm:flex-row",
            ].join(" ")}
          >
            {primaryCta?.href ? (
              <Link href={normalizeSiteHref(primaryCta.href)} className="bb-hero-cta bb-hero-cta--primary">
                {primaryCta.label}
              </Link>
            ) : null}

            {secondaryCta?.href ? (
              <Link href={normalizeSiteHref(secondaryCta.href)} className="bb-hero-cta bb-hero-cta--secondary">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}

function renderMultiline(text) {
  if (!text) return null;
  return String(text)
    .split("\n")
    .map((line, idx) => (
      <span key={idx} className="block">
        {line}
      </span>
    ));
}
