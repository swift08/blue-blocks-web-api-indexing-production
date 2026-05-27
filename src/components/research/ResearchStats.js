"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/layout/Container";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);

    setReduced(media.matches);
    media.addEventListener?.("change", onChange);

    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function parseStatValue(raw) {
  const str = String(raw ?? "").trim();
  const match = str.match(/^(\d+(?:\.\d+)?)(.*)$/); // number + suffix
  if (!match) return { target: 0, suffix: str };
  return { target: Number(match[1]), suffix: match[2] || "" };
}

function animateNumber({ from, to, duration, onUpdate }) {
  const start = performance.now();
  const diff = to - from;

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    // smooth easeOut
    const eased = 1 - Math.pow(1 - t, 3);
    const value = from + diff * eased;
    onUpdate(value);

    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function StatValue({ value, shouldAnimate }) {
  const reducedMotion = usePrefersReducedMotion();
  const { target, suffix } = useMemo(() => parseStatValue(value), [value]);

  const [display, setDisplay] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    // If we shouldn't animate OR reduced motion, just show final value.
    if (!shouldAnimate || reducedMotion) {
      setDisplay(target);
      return;
    }

    // Animate once to target
    setDisplay(0);
    animateNumber({
      from: 0,
      to: target,
      duration: 900,
      onUpdate: (v) => setDisplay(v),
    });
  }, [shouldAnimate, reducedMotion, target]);

  const rounded = Math.round(display);

  return (
    <span>
      {rounded}
      {suffix}
    </span>
  );
}

export default function ResearchStats({ title, subtitle, stats = [] }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          setHasAnimated(true); // lock once
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldAnimate = inView && !hasAnimated ? true : hasAnimated;

  return (
    <section ref={sectionRef} className="bg-white">
      <Container className="py-16 sm:py-20">
        {/* Title + description */}
        <div className="max-w-4xl">
          <h2 className="text-[2.25rem] sm:text-[2.75rem] leading-[1.08] font-medium text-[#131313]">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-4 text-[0.95rem] sm:text-[1.05rem] leading-relaxed text-slate-600">
              {subtitle}{" "}
              <span className="uppercase font-medium tracking-wide text-[#1F3B82] cursor-pointer">
                Read more
              </span>
            </p>
          ) : null}
        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl bg-[#F4F5F7] px-7 py-8 sm:px-8 sm:py-9"
            >
              <div className="text-[2.25rem] sm:text-[2.75rem] leading-none font-medium text-[#131313]">
                <StatValue value={s.value} shouldAnimate={shouldAnimate} />
              </div>

              <div className="mt-2 text-[0.8rem] sm:text-[0.85rem] text-slate-600">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}