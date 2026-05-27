"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import { useMemo, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

// ✅ IMPORTANT: make sure these CSS imports exist somewhere globally OR here (only once)
// import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";

/* ------------------------- helpers ------------------------- */

function toColsClass(n) {
  switch (n) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    default:
      return "grid-cols-3";
  }
}

function buildGridClass(cols, fallback) {
  if (!cols) return fallback;
  if (typeof cols === "number") return `${toColsClass(cols)} gap-3 sm:gap-4`;
  const base = toColsClass(cols.base || 1);
  const sm = cols.sm ? `sm:${toColsClass(cols.sm)}` : "";
  const lg = cols.lg ? `lg:${toColsClass(cols.lg)}` : "";
  return [base, sm, lg, "gap-3 sm:gap-4"].join(" ");
}

function isYouTubeUrl(url = "") {
  const s = String(url || "").trim();
  return /youtube\.com|youtu\.be/.test(s);
}

function getYouTubeId(url = "") {
  const s = String(url || "").trim();

  // already embed
  const embedMatch = s.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embedMatch?.[1]) return embedMatch[1];

  // youtu.be/<id>
  const shortMatch = s.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (shortMatch?.[1]) return shortMatch[1];

  // watch?v=<id>
  const vMatch = s.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (vMatch?.[1]) return vMatch[1];

  return "";
}

function buildYouTubeEmbedUrl(src, opts = {}) {
  const id = getYouTubeId(src);
  if (!id) return src; // fallback to whatever was passed

  const {
    autoplay = false,
    muted = false,
    controls = true,
    loop = false,
  } = opts;

  // YouTube params
  const params = new URLSearchParams();
  params.set("autoplay", autoplay ? "1" : "0");
  params.set("mute", muted ? "1" : "0");
  params.set("controls", controls ? "1" : "0");
  params.set("playsinline", "1");
  params.set("rel", "0");

  if (loop) {
    params.set("loop", "1");
    params.set("playlist", id); // required by YouTube for looping
  }

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

/* ------------------------- component ------------------------- */

export default function InnovationGallery({
  eyebrow,
  title,

  // legacy support
  images = [],
  items,

  cols,
  galleryClass = "grid-cols-3 gap-3 sm:gap-4",

  tileMinHeight,
  tileMaxHeight,

  enableLightbox = true,
  showThumbnails = true,

  // video settings (optional)
  videoAutoplay = false,
  videoMuted = false,
  videoControls = true,
  videoLoop = false,
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const normalizedItems = useMemo(() => {
    const srcs = items?.length ? items : images;

    return (srcs || []).map((it) => {
      // string => image
      if (typeof it === "string") return { type: "image", src: it };

      const type = it?.type || "image";
      return { ...it, type };
    });
  }, [items, images]);

  const slides = useMemo(() => {
    return normalizedItems.map((it) => {
      // ✅ video: handle YouTube as iframe, mp4 as video
      if (it.type === "video" || it.type === "youtube") {
        const src = it.src || "";
        if (isYouTubeUrl(src)) {
          return {
            type: "iframe",
            src: buildYouTubeEmbedUrl(src, {
              autoplay: videoAutoplay,
              muted: videoMuted,
              controls: videoControls,
              loop: videoLoop,
            }),
            poster: it.poster,
            title: it.title || it.alt || "",
          };
        }

        // HTML5 video
        return {
          type: "video",
          poster: it.poster,
          sources: [{ src: src, type: it.mime || "video/mp4" }],
        };
      }

      // image
      return { src: it.src, alt: it.alt || "" };
    });
  }, [normalizedItems, videoAutoplay, videoMuted, videoControls, videoLoop]);

  const gridClass = useMemo(
    () => buildGridClass(cols, galleryClass),
    [cols, galleryClass]
  );

  const tileStyle =
    tileMinHeight || tileMaxHeight
      ? {
          minHeight: tileMinHeight ? `${tileMinHeight}px` : undefined,
          maxHeight: tileMaxHeight ? `${tileMaxHeight}px` : undefined,
        }
      : undefined;

  // ✅ Keep Video plugin for mp4; iframe doesn’t need a plugin
  const plugins = useMemo(() => {
    const p = [Video];
    if (showThumbnails) p.push(Thumbnails);
    return p;
  }, [showThumbnails]);

  // ✅ Custom render:
  // - iframe for YouTube
  // - keep your badge for videos
  const render = useMemo(() => {
    return {
      slide: ({ slide }) => {
        if (slide?.type === "iframe") {
          return (
            <div className="relative w-full h-full">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/55 px-3 py-2">
                <span className="text-white text-sm">▶</span>
                <span className="text-white text-xs font-semibold tracking-wide uppercase">
                  Video
                </span>
              </div>

              <div className="w-full h-full flex items-center justify-center bg-black">
                <div className="w-full h-full">
                  <iframe
                    className="w-full h-full"
                    src={slide.src}
                    title={slide.title || "YouTube video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          );
        }

        // Let lightbox render images & html5 videos normally
        return undefined;
      },
    };
  }, []);

  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        {eyebrow ? (
          <div className="flex justify-center">
            <span className="rounded-full bg-[#e8ecff] px-6 py-2 text-[10px] font-semibold tracking-[0.18em] text-[#1f3b82]">
              {eyebrow}
            </span>
          </div>
        ) : null}

        {title ? (
          <h2 className="mt-4 text-center text-4xl sm:text-5xl font-semibold text-slate-900 main-title">
            {title}
          </h2>
        ) : null}

        <div className={`mt-10 grid ${gridClass}`}>
          {normalizedItems.map((it, idx) => {
            const isVid = it.type === "video" || it.type === "youtube";
            const thumbSrc = isVid ? it.poster || "" : it.src;

            return (
              <button
                key={idx}
                type="button"
                className={[
                  "relative overflow-hidden bg-slate-100 w-full",
                  tileStyle ? "" : "aspect-square",
                ].join(" ")}
                style={tileStyle}
                onClick={() => {
                  if (!enableLightbox) return;
                  setIndex(idx);
                  setOpen(true);
                }}
              >
                {thumbSrc ? (
                  <Image
                    src={thumbSrc}
                    alt={it.alt || ""}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-sm text-slate-500">
                    No poster
                  </div>
                )}

                {/* Grid play overlay */}
                {isVid ? (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-black/55">
                      <span className="ml-[2px] text-white">▶</span>
                    </div>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        {enableLightbox && slides.length ? (
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
            plugins={plugins}
            render={render}
            on={{ view: ({ index }) => setIndex(index) }}
          />
        ) : null}
      </Container>
    </section>
  );
}