import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import Link from "next/link";

function stripTypographySizing(className = "") {
  // remove common Tailwind typography sizing that breaks global consistency
  return className
    .split(/\s+/)
    .filter(
      (c) =>
        !/^text-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?text-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?font-/.test(c) &&
        !/^(sm:|md:|lg:|xl:|2xl:)?leading-/.test(c)
    )
    .join(" ");
}

export default function InnovationLogoStrip({
  // ✅ Standard prop (token | class | hex)
  sectionBg = "bg-[#F8E5C7]",
  anchorHref,

  // kept (non-breaking)
  sectionClass = "",
  sectionTitleClass = "",
  logoWrapClass = "flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-10",

  text,
  logos = [],
}) {
  const resolvedSection = resolveBg(sectionBg);

  // allow color/alignment/padding from legacy prop, but strip typography sizing
  const safeTitleExtras = stripTypographySizing(sectionTitleClass);

  return (
    <section
      className={["bb-ui", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <div className="bb-section">
        <div className="bb-section__inner">
          <Container>
            <div className={["flex flex-col", sectionClass].filter(Boolean).join(" ")}>
              {text ? (
                <h2 className={["bb-section-title text-center", safeTitleExtras].filter(Boolean).join(" ")}>
                  {text}
                </h2>
              ) : null}

              {Array.isArray(logos) && logos.length ? (
                <div className={logoWrapClass}>
                  {logos.map((logo, idx) => {
                    const href = logo?.anchorHref;
                    const Wrapper = href ? Link : "div";
                    const logoWidth = Math.max(1, Number(logo.width) || 200);
                    const logoHeight = Math.max(1, Number(logo.height) || 60);

                    return (
                      <Wrapper
                        key={idx}
                        {...(href ? { href } : {})}
                        className="relative block shrink-0"
                        style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
                        aria-label={logo?.alt || "Logo"}
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt || ""}
                          width={logoWidth}
                          height={logoHeight}
                          className="h-full w-full object-contain"
                          sizes={`${logoWidth}px`}
                        />
                      </Wrapper>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
