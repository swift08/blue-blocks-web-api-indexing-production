// src/components/blocks/FoundersGuides.js
"use client";

import { useMemo } from "react";
import Link from "next/link";
import EmblaCarousel from "../ui/carousel/EmblaCarousel";
import AppModal from "../ui/modal/AppModal";
import { normalizeSiteHref } from "@/lib/links";
import RichTextContent from "@/components/ui/RichTextContent";

const BLANK_USER_SVG = (
  <svg viewBox="0 0 96 96" role="img" aria-label="Profile photo">
    <rect width="96" height="96" rx="18" fill="#F1F5E9" />
    <circle cx="48" cy="38" r="16" fill="#CBD5E1" />
    <path d="M20 78c4-14 18-22 28-22s24 8 28 22" fill="#CBD5E1" />
  </svg>
);

export default function FoundersGuides({
  pill,
  title,
  description,
  items = [],
  bg = "bg-[#F3E3CF]",
  layout = {
    type: "grid",
    gap: 32,
    cardWidth: 520,
    carousel: {
      loop: false,
      align: "start",
      sizingMode: "perView",
      perView: { desktop: 2, tablet: 2, mobile: 1 },
      showDots: true,
      navPosition: "bottom",
      showArrows: true,
    },
  },
}) {
  const isCarousel = layout?.type === "carousel";
  const gapPx = Number.isFinite(layout?.gap) ? layout.gap : 32;

  return (
    <section className={bg}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-3xl">
          {pill ? (
            <RichTextContent
              as="div"
              value={pill}
              className="inline-flex rounded-full bg-[#D9D2F1] px-5 py-2 text-[11px] font-semibold tracking-wide text-[#2C2C6B]"
            />
          ) : null}

          <RichTextContent
            as="h2"
            value={title}
            className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900"
          />

          {description ? (
            <RichTextContent
              as="p"
              value={description}
              className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700"
            />
          ) : null}
        </div>

        <div className="mt-10">
          {isCarousel ? (
            <EmblaCarousel
              items={items}
              gapPx={gapPx}
              cardWidth={layout?.cardWidth}
              carousel={layout?.carousel}
              renderItem={(person, idx) => (
                <FounderCard
                  key={person?.slug || person?.name || idx}
                  {...person}
                />
              )}
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {items.map((person, idx) => (
                <FounderCard
                  key={person?.slug || person?.name || idx}
                  {...person}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FounderCard({
  name,
  roleLabel,
  roleColor = "#E08B64",
  roleTextColor = "#ffffff",
  image,
  imageAlt,
  bio,
  tagline,
  readMoreHref = "/",
  modal,
}) {
  const normalizedReadMoreHref = normalizeSiteHref(readMoreHref);
  const hasModal = Boolean(modal);
  const hasDedicatedPage = normalizedReadMoreHref.startsWith("/about-us/founders/");
  const shouldOpenModal = hasModal && !hasDedicatedPage;

  return (
    <div className="h-full rounded-[26px] border-2 border-slate-900 bg-white p-6 sm:p-7 flex flex-col">
      <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white">
        {image ? (
          <img
            src={image}
            alt={imageAlt || name || "Profile photo"}
            className="h-[280px] w-full object-cover sm:h-[320px]"
            style={{ backgroundColor: "#fff" }}
          />
        ) : (
          <div className="flex h-[280px] w-full items-center justify-center p-6 sm:h-[320px]">
            <div className="h-28 w-28">{BLANK_USER_SVG}</div>
          </div>
        )}

        {roleLabel ? (
          <div className="absolute bottom-5 left-5 right-5 flex justify-center">
            <RichTextContent
              as="span"
              value={roleLabel}
              className="inline-flex w-full max-w-[280px] justify-center rounded-lg px-4 py-2 text-xs sm:text-sm font-medium shadow-sm"
              style={{ backgroundColor: roleColor, color: roleTextColor }}
            />
          </div>
        ) : null}
      </div>

      {name ? (
        <RichTextContent as="h3" value={name} className="mt-6 text-xl sm:text-2xl font-medium text-blue-600" />
      ) : null}

      {tagline ? (
        <RichTextContent as="p" value={tagline} className="mt-1 text-sm sm:text-base font-medium text-slate-900" />
      ) : null}

      {bio ? (
        <RichTextContent as="p" value={bio} className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700" />
      ) : null}

      <div className="mt-auto pt-5 flex justify-end">
        {shouldOpenModal ? (
          <FounderDetailsModalTrigger
            person={{ name, roleLabel, image, imageAlt, bio, tagline }}
            modal={modal}
          />
        ) : (
          <Link
            href={normalizedReadMoreHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Read More <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}

function FounderDetailsModalTrigger({ person, modal }) {
  const title = modal?.title || person?.name || "Details";
  const subtitle = person?.roleLabel || "";
  const content = Array.isArray(modal?.content) ? modal.content : [];
  const social = Array.isArray(modal?.social) ? modal.social : [];

  const safeLinks = useMemo(() => {
    return social
      .filter((l) => l?.href)
      .map((l) => ({
        label: l.label || l.href,
        href: l.href,
        external: /^https?:\/\//.test(l.href),
      }));
  }, [social]);

  return (
    <AppModal
      title={title}
      subtitle={subtitle}
      trigger={
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          Read More <span aria-hidden="true">→</span>
        </button>
      }
      maxWidthClass="max-w-6xl"
    >
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          {person?.image ? (
            <div className="overflow-hidden rounded-2xl bg-slate-50 border">
              <img
                src={person.image}
                alt={person.imageAlt || person.name || ""}
                className="h-[320px] w-full object-cover"
                style={{ backgroundColor: "#fff" }}
              />
            </div>
          ) : (
            <div className="flex h-[320px] w-full items-center justify-center p-6">
              <div className="h-28 w-28">{BLANK_USER_SVG}</div>
            </div>
          )}

          {safeLinks.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {safeLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noreferrer" : undefined}
                  className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <RichTextContent as="span" value={l.label} allowHtml={false} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="md:col-span-7">
          {person?.name ? (
            <RichTextContent as="div" value={person.name} className="text-xl sm:text-2xl font-semibold text-blue-600" />
          ) : null}

          {person?.tagline ? (
            <RichTextContent as="div" value={person.tagline} className="mt-1 text-sm sm:text-base font-medium text-slate-900" />
          ) : null}

          {person?.bio ? (
            <RichTextContent as="p" value={person.bio} className="mt-2 text-sm sm:text-base leading-relaxed text-slate-700" />
          ) : null}

          {content.length ? (
            <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              {content.map((item, i) => {
                if (item && typeof item === "object" && (item.label || item.text)) {
                  return (
                    <p key={i}>
                      {item.label ? <strong>{item.label}:</strong> : null}{" "}
                      <RichTextContent as="span" value={item.text || ""} />
                    </p>
                  );
                }

                if (typeof item === "string") {
                  return <RichTextContent key={i} as="p" value={item} />;
                }

                return null;
              })}
            </div>
          ) : null}
        </div>
      </div>
    </AppModal>
  );
}
