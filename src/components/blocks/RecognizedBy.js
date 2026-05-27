import Container from "@/components/layout/Container";
import Image from "next/image";
import { resolveBg } from "@/lib/ui";

export default function RecognizedBy({
  title,
  items = [],

  // NEW (preferred)
  sectionBg = "",

  // OLD (kept)
  bg = "#ffffff",
}) {
  const resolved = resolveBg(sectionBg || bg);

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className="bb-section__inner">
        {title ? <h2 className="bb-section-title text-center">{title}</h2> : null}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-10 text-slate-700">
          {items.map((item) => {
            const logoWidth = Math.max(1, Number(item.width) || 160);
            const logoHeight = Math.max(1, Number(item.height) || 80);

            return (
              <div
                key={item.title}
                className="relative shrink-0 opacity-80"
                style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-full w-full object-contain"
                  sizes={`${logoWidth}px`}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
