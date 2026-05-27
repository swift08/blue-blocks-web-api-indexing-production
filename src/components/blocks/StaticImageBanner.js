"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";

export default function SimpleImageSection({
  bg = "transparent",
  sectionClassName = "",
  containerClassName = "",

  // image
  image = { src: "", alt: "" },
  height = 720, // px
  objectFit = "cover", // "cover" | "contain"

  // if true: image is full-bleed (edge-to-edge) without causing horizontal scroll
  fullBleed = false,

  // text (optional)
  title,
  subtitle,

  // overlay (optional)
  overlayText = false,
  overlay = { show: false, color: "#000000", opacity: 0.25 },
  textAlign = "center", // "left" | "center" | "right"
}) {
  const align =
    textAlign === "left"
      ? "items-start text-left"
      : textAlign === "right"
      ? "items-end text-right"
      : "items-center text-center";

  const ImageBlock = (
    <div
      className="relative overflow-hidden"
      style={{ height: `${height}px` }}
    >
      {image?.src ? (
        <Image
          src={image.src}
          alt={image.alt || ""}
          fill
          className={objectFit === "contain" ? "object-contain" : "object-cover"}
          priority={false}
        />
      ) : null}

      {overlay?.show ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlay.color || "#000",
            opacity: typeof overlay.opacity === "number" ? overlay.opacity : 0.25,
          }}
        />
      ) : null}

      {overlayText && (title || subtitle) ? (
        <div className={`absolute inset-0 flex ${align} justify-center p-6`}>
          <div className="max-w-3xl">
            {title ? (
              <h2 className="text-2xl sm:text-4xl font-medium text-white">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-3 text-sm sm:text-base text-white/85">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <section className={sectionClassName} style={{ backgroundColor: bg }}>
      {fullBleed ? (
        // ✅ full-bleed without 100vw hacks (no horizontal scroll)
        <div className="relative">
          <div className="absolute inset-x-0">
            {ImageBlock}
          </div>

          {/* Spacer so next content doesn’t overlap */}
          <div style={{ height: `${height}px` }} />

          {/* Optional below text when not overlay */}
          {!overlayText && (title || subtitle) ? (
            <Container className={containerClassName}>
              <div className={`max-w-3xl mx-auto ${align}`}>
                {title ? (
                  <h2 className="text-2xl sm:text-4xl font-medium text-[#131313]">
                    {title}
                  </h2>
                ) : null}
                {subtitle ? (
                  <p className="mt-3 text-sm sm:text-base text-slate-600">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </Container>
          ) : null}
        </div>
      ) : (
        <>
          <Container className={containerClassName}>
            {ImageBlock}

            {/* Optional below text when not overlay */}
            {!overlayText && (title || subtitle) ? (
              <div className={`mt-8 max-w-3xl mx-auto ${align}`}>
                {title ? (
                  <h2 className="text-2xl sm:text-4xl font-medium text-[#131313]">
                    {title}
                  </h2>
                ) : null}
                {subtitle ? (
                  <p className="mt-3 text-sm sm:text-base text-slate-600">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            ) : null}
          </Container>
        </>
      )}
    </section>
  );
}
