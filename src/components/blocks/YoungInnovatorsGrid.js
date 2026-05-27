import Container from "@/components/layout/Container";
import Image from "next/image";

function colsToClass(cols = {}) {
  const base = (cols?.base === 2 ? "grid-cols-2" : "grid-cols-1");
  const md = (cols?.md === 2 ? "md:grid-cols-2" : "");
  const lg = (cols?.lg === 2 ? "lg:grid-cols-2" : "");
  return [base, md, lg].filter(Boolean).join(" ");
}

function spanToClass(span = {}) {
  // Tailwind-safe fixed set
  const md = span?.md === 2 ? "md:col-span-2" : (span?.md === 1 ? "md:col-span-1" : "");
  const lg = span?.lg === 2 ? "lg:col-span-2" : (span?.lg === 1 ? "lg:col-span-1" : "");
  return [md, lg].filter(Boolean).join(" ");
}

export default function YoungInnovatorsGrid({
  bg = "#FBF7F1",
  title,
  subtitle,
  maxWidth = "max-w-6xl",
  cols = { base: 1, md: 2 },
  gap = "gap-8",

  cardBg = "#FFFFFF",
  cardRadius = "rounded-2xl",
  cardPadding = "p-5",
  imageRadius = "rounded-xl",
  imageAspect = "aspect-[4/3]",

  items = [],
  py = "py-16 sm:py-20",
}) {
  const gridCols = colsToClass(cols);

  return (
    <section style={{ backgroundColor: bg }}>
      <Container className={py}>
        {(title || subtitle) ? (
          <div className="text-center">
            {title ? (
              <h2 className="text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-3 text-[0.95rem] leading-6 text-slate-600">
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className={`mx-auto mt-10 ${maxWidth}`}>
          <div className={`grid ${gridCols} ${gap}`}>
            {items.map((it, idx) => {
              const layout = it?.layout || "card"; // "card" | "split" | "textOnly"
              const colSpanClass = spanToClass(it?.span);

              // Shared wrapper
              const wrapClass = [
                cardRadius,
                cardPadding,
                "shadow-sm",
                colSpanClass,
              ].filter(Boolean).join(" ");

              // Text
              const text = it?.text;
              const textParts = Array.isArray(it?.textParts) ? it.textParts : [];

              // Split layout: inside wrapper we use 2 columns at md+ (image + text)
              const isSplit = layout === "split";

              return (
                <div
                  key={`${it?.image || it?.text || "item"}-${idx}`}
                  className={wrapClass}
                  style={{ backgroundColor: cardBg }}
                >
                  {layout === "textOnly" ? (
                    <div className="space-y-4 text-[0.85rem] leading-6 text-slate-700 whitespace-pre-line">
                      {textParts.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  ) : isSplit ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {it?.image ? (
                        <div className={`relative overflow-hidden ${imageRadius} ${imageAspect}`}>
                          <Image
                            src={it.image}
                            alt={it.alt || ""}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 40vw, 100vw"
                          />
                        </div>
                      ) : null}

                      {text ? (
                        <p className="text-[0.82rem] leading-6 text-slate-600 whitespace-pre-line">
                          {text}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <>
                      {it?.image ? (
                        <div className={`relative overflow-hidden ${imageRadius} ${imageAspect}`}>
                          <Image
                            src={it.image}
                            alt={it.alt || ""}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 40vw, 100vw"
                          />
                        </div>
                      ) : null}

                      {text ? (
                        <p className="mt-4 text-[0.82rem] leading-6 text-slate-600 whitespace-pre-line">
                          {text}
                        </p>
                      ) : null}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}