"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";

function padNumber(n, pad = 2) {
  const s = String(n);
  if (s.length >= pad) return s;
  return "0".repeat(pad - s.length) + s;
}

function PlayIcon({ color = "#111827" }) {
  return (
    <svg width="66" height="66" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 8.5v7l7-3.5-7-3.5Z"
        fill={color}
      />
    </svg>
  );
}

export default function SystemOverview({
  bg = "#FFFFFF",
  maxWidth = "max-w-6xl",
  paddingY = "py-14 sm:py-16",

  header = {
    eyebrow: "",
    title: "",
    align: "center"
  },

  layout = {
    gap: "gap-10",
    leftWidth: "lg:col-span-7",
    rightWidth: "lg:col-span-5"
  },

  media = {
    type: "image", // image | video (future)
    src: "",
    alt: "",
    radius: "rounded-3xl",
    showPlay: true,
    playButton: { size: 66, bgImage: "/icon/play-transparent.png", bg: "rgba(255,255,255,0.9)", iconColor: "#111827" }
  },

  steps = {
    cardBg: "#EAF4FF",
    cardRadius: "rounded-2xl",
    cardPadding: "p-6",
    cardGap: "gap-4",
    numberColor: "rgba(15,23,42,0.55)",
    titleColor: "#0F172A",
    textColor: "rgba(15,23,42,0.65)",
    startAt: 1,
    pad: 2
  },

  items = [],
}) {
  const alignClass =
    header?.align === "left"
      ? "text-left"
      : header?.align === "right"
      ? "text-right"
      : "text-center";

  return (
    <section style={{ backgroundColor: bg }}>
      <Container className={`${maxWidth} ${paddingY}`}>
        {/* Header */}
        <div className={alignClass}>
          {header?.eyebrow ? (
            <div className="text-[11px] sm:text-xs tracking-[0.18em] uppercase text-slate-400">
              {header.eyebrow}
            </div>
          ) : null}

          {header?.title ? (
            <h2 className="mt-2 text-3xl sm:text-5xl font-medium text-[#0B1220]">
              {header.title}
            </h2>
          ) : null}
        </div>

        {/* Content */}
        <div className={`mt-10 grid grid-cols-1 lg:grid-cols-12 items-start ${layout?.gap || "gap-10"}`}>
          {/* Left media */}
          <div className={`${layout?.leftWidth || "lg:col-span-7"}`}>
            <div className={`relative overflow-hidden ${media?.radius || "rounded-3xl"} bg-slate-100`}>
              {media?.src ? (
                <div className="relative w-full aspect-[4/3] sm:aspect-[5/4]">
                  <Image
                    src={media.src}
                    alt={media.alt || "Media"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 620px, 100vw"
                    priority={false}
                  />
                </div>
              ) : null}

              {/* Play overlay (visual only) */}
              {media?.showPlay ? (
                <div className="absolute inset-0 grid place-items-center">
                    {media?.playButton?.bgImage ? (<div
                        className="grid place-items-center rounded-full shadow-sm border border-black/5"
                        style={{
                            width: Number(66),
                            height: Number(66),
                        }}
                        aria-hidden="true"
                    >
                        <Image
                            src={media?.playButton?.bgImage}
                            alt={"Media"}
                            width={66}
                            height={66}
                            className="object-cover"
                        />
                    </div>
                    ) : 
                        <div
                            className="grid place-items-center rounded-full shadow-sm border border-black/5"
                            style={{
                            width: Number(media?.playButton?.size || 66),
                            height: Number(media?.playButton?.size || 66),
                            background: media?.playButton?.bg || "rgba(255,255,255,0.9)"
                            }}
                            aria-hidden="true"
                        >
                            <PlayIcon color={media?.playButton?.iconColor || "#111827"} />
                        </div>
                    }
                </div>
              ) : null}
            </div>
          </div>

          {/* Right steps */}
          <div className={`${layout?.rightWidth || "lg:col-span-5"}`}>
            <div className="space-y-4">
              {items.map((it, idx) => {
                const num = (steps?.startAt ?? 1) + idx;
                const numberText = padNumber(num, steps?.pad ?? 2);

                return (
                  <div
                    key={`${it.title || "step"}-${idx}`}
                    className={`${steps?.cardRadius || "rounded-2xl"} ${steps?.cardPadding || "p-6"} flex items-start`}
                    style={{ backgroundColor: steps?.cardBg || "#EAF4FF" }}
                  >
                    <div className={`flex-shrink-0 pr-5`}>
                      <div
                        className="text-4xl sm:text-5xl font-semibold leading-none"
                        style={{ color: steps?.numberColor || "rgba(15,23,42,0.55)" }}
                      >
                        {numberText}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div
                        className="text-sm sm:text-base font-semibold"
                        style={{ color: steps?.titleColor || "#0F172A" }}
                      >
                        {it.title}
                      </div>

                      {it.text ? (
                        <p
                          className="mt-1 text-xs sm:text-sm leading-5"
                          style={{ color: steps?.textColor || "rgba(15,23,42,0.65)" }}
                        >
                          {it.text}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}