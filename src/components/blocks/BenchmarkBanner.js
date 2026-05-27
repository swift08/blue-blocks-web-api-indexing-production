import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

export default function BenchmarkBanner({
  bg = "#233B77",
  title = "THE GLOBAL BENCHMARK FOR 2050",
  text = "",
  cta = { label: "Read More", href: "/about" },

  logos = [],
  logoAltFallback = "Partner logo",

  // keep prop (Container owns width)
  maxWidth = "max-w-6xl",

  // NEW
  sectionBg = "",

  // OLD behavior: section background was white
  bgClass = "bg-white",
}) {
  const resolved = resolveBg(sectionBg || bgClass);

  return (
    <section className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")} style={resolved.style}>
      <Container className={["bb-section__inner", maxWidth].filter(Boolean).join(" ")}>
        {/* Blue banner */}
        {text ? (<div
          className="rounded-xl px-6 sm:px-8 py-6 sm:py-7 text-white has-darkBg"
          style={{ backgroundColor: bg }}
        >
          <h3 className="bb-section-title text-center">{title}</h3>

          {text ? (
            <p className="mt-3 leading-relaxed text-white/85 text-center">
              {text}
            </p>
          ) : null}

          {cta?.href ? (
            <div className="mt-4 flex justify-end">
              <a
                href={cta.href}
                className="inline-flex items-center gap-2 font-medium text-white/90 hover:text-white"
              >
                {cta.label || "Read More"}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ) : null}
        </div>) : null}

        {/* Logo strip */}
        {logos?.length ? (
          <div className="mt-8">
            {/* Desktop: wrap/center */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-10 opacity-60">
              {logos.map((l, idx) => (
                <Logo key={`${l.src || "logo"}-${idx}`} {...l} altFallback={logoAltFallback} />
              ))}
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="sm:hidden -mx-4 px-4 overflow-x-auto">
              <div className="flex items-center gap-10 min-w-max opacity-60">
                {logos.map((l, idx) => (
                  <Logo key={`${l.src || "logo"}-${idx}`} {...l} altFallback={logoAltFallback} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function Logo({ src, alt, width = 160, height = 100, href, altFallback }) {
  const logoWidth = Math.max(1, Number(width) || 160);
  const logoHeight = Math.max(1, Number(height) || 100);

  const img = (
    <Image
      src={src}
      alt={alt || altFallback}
      width={logoWidth}
      height={logoHeight}
      className="h-full w-full object-contain grayscale contrast-125 opacity-70 transition hover:opacity-100"
      sizes={`${logoWidth}px`}
    />
  );

  if (href) {
    return (
      <a
        href={href}
        className="block shrink-0"
        style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
        aria-label={alt || altFallback}
      >
        {img}
      </a>
    );
  }

  return (
    <div className="block shrink-0" style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}>
      {img}
    </div>
  );
}
