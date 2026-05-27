import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { RESEARCH_PUBLICATIONS } from "@/data/publishing";

function PlayOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* The circle */}
      <div className="h-10 w-10 rounded-full bg-white/70 backdrop-blur flex items-center justify-center shadow-sm">
        {/* Triangle */}
        <div className="ml-[2px] h-0 w-0 border-y-[6px] border-y-transparent border-l-[9px] border-l-slate-700/80" />
      </div>
    </div>
  );
}

function DownloadButton({ href, label }) {
  // If no download href, we render a non-clickable button (still looks same)
  const inner = (
    <div className="w-full rounded-lg bg-[#EAF2FF] px-4 py-3 text-[11px] font-medium text-[#1F3B82] flex items-center justify-center gap-2 hover:bg-[#DFECFF] transition">
      <span className="text-[13px] leading-none">↓</span>
      <span>{label}</span>
    </div>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="block" aria-label={label}>
      {inner}
    </Link>
  );
}

export default function PublicationsGrid({ title, subtitle, items = [] }) {
  const fallbackItems = RESEARCH_PUBLICATIONS.map((item) => ({
    image: item.image,
    title: item.title,
    meta: item.meta,
    href: item.pageUrl,
    downloadHref: item.downloadUrl,
    downloadLabel: "Download from Zenodo",
    desc: item.summary,
  }));

  const incomingItems = Array.isArray(items) ? items : [];
  const incomingLooksPlaceholder =
    incomingItems.length === 0 ||
    incomingItems.every((it) => !it?.href || it.href === "#");

  const mergedItems = incomingLooksPlaceholder
    ? fallbackItems
    : [
        ...incomingItems,
        ...fallbackItems.filter(
          (fb) =>
            !incomingItems.some(
              (it) =>
                String(it?.title || "").trim().toLowerCase() ===
                String(fb.title || "").trim().toLowerCase()
            )
        ),
      ];

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-4 max-w-4xl mx-auto text-[0.95rem] sm:text-[1.05rem] leading-relaxed text-slate-600">
              {subtitle}{" "}
              <span className="uppercase font-medium tracking-wide text-[#1F3B82] underline underline-offset-4 cursor-pointer">
                Read more
              </span>
            </p>
          ) : null}
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mergedItems.map((it, idx) => {
           const cardKey = `${it.href || "no-href"}-${it.title || "no-title"}-${idx}`;

            return (
              <div
                key={cardKey}
                className="rounded-[18px] bg-white overflow-hidden h-full"
                >
                <div className="flex h-full flex-col">
                    <div className="pb-4">
                    <Link
                        href={it.href || "#"}
                        className="relative block overflow-hidden rounded-[14px] aspect-[16/10] bg-slate-100"
                        aria-label={`Open ${it.title}`}
                    >
                        <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        sizes="(min-width:1024px) 360px, 100vw"
                        className="object-cover"
                        />
                        <PlayOverlay />
                    </Link>
                    </div>

                    {/* Content */}
                    <div className="px-0 pb-5 flex h-full flex-col">
                    {it.meta ? (
                        <div className="text-[11px] text-slate-500">{it.meta}</div>
                    ) : null}

                    <div className="mt-2 text-[13px] font-medium text-[#131313] leading-snug">
                        {it.title}
                    </div>

                    {it.desc ? (
                        <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                        {it.desc}
                        </p>
                    ) : null}

                    {/* ✅ Button pinned to bottom */}
                    <div className="mt-auto pt-5">
                        <DownloadButton
                        href={it.downloadHref || it.href}
                        label={it.downloadLabel || "Download from Zenodo"}
                        />
                    </div>
                    </div>
                </div>
                </div>

            );
          })}
        </div>
      </Container>
    </section>
  );
}
