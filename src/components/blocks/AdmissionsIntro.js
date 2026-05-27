import Container from "@/components/layout/Container";
import Image from "next/image";
import { resolveBg } from "@/lib/ui";

export default function AdmissionsIntro({
  eyebrow,
  title,
  text = [],
  sideHeadline,
  image,
  bgShape,

  // NEW (preferred)
  sectionBg = "bg-white",
}) {
  const resolved = resolveBg(sectionBg);

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className="bb-section__inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          {/* Left text */}
          <div>
            {eyebrow ? (
              <div
                className="bb-pill"
                // keep your original colors, but typography controlled globally
                style={{
                  "--bb-pill-bg": "#E7E8FF",
                  "--bb-pill-border": "transparent",
                  "--bb-pill-text": "#2C2F8F",
                }}
              >
                <span className="bb-pill__text">{eyebrow}</span>
              </div>
            ) : null}

            {title ? <h2 className="bb-section-title mt-4 whitespace-pre-line">{title}</h2> : null}

            {Array.isArray(text) && text.length ? (
              <div className="bb-text mt-5">
                {text.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right visual */}
          <div className="relative">
            {bgShape ? (
              <div className="absolute hidden sm:flex sm:-right-6 sm:-top-6 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] pointer-events-none">
                <Image src={bgShape} alt="" fill className="object-contain opacity-90" priority={false} />
              </div>
            ) : null}

            {sideHeadline ? (
              <div className="bb-sideheadline absolute right-6 -top-4 sm:top-0 text-right">
                {sideHeadline.line1 ? (
                  <div className="bb-sideheadline__line bb-sideheadline__line--gold">
                    {sideHeadline.line1}
                  </div>
                ) : null}
                {sideHeadline.line2 ? (
                  <div className="bb-sideheadline__line bb-sideheadline__line--blue">
                    {sideHeadline.line2}
                  </div>
                ) : null}
                {sideHeadline.line3 ? (
                  <div className="bb-sideheadline__line bb-sideheadline__line--slate">
                    {sideHeadline.line3}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="relative mt-14 lg:mt-0 w-full h-[340px] sm:h-[420px] lg:h-[460px]">
              {image ? <Image src={image} alt="" fill className="object-contain" priority={false} /> : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}