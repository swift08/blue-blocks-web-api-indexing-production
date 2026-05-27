import Image from "next/image";
import Container from "@/components/layout/Container";

export default function ProgramIntroSplit({
  eyebrow,
  title,
  subTitle,
  text = [],
  metaRows = [], // [{ label, value }]
  media = {}, // { main:{src,alt,showPlay}, left:{src,alt}, right:{src,alt} }
}) {
  const main = media?.main;
  const left = media?.left;
  const right = media?.right;

  const showPlay = main?.showPlay !== false; // default TRUE (keeps old behavior)

  return (
    <section className="bg-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-15 lg:grid-cols-12 lg:items-start">
          {/* LEFT: collage */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Top main image spans both columns */}
              <div className="col-span-2">
                <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-100 aspect-[16/9]">
                  {main?.src ? (
                    <>
                      <Image
                        src={main.src}
                        alt={main.alt || title || ""}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 44vw, 100vw"
                      />

                      {/* play button overlay (kept as default ON for backward compatibility) */}
                      {showPlay ? (
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="grid h-12 w-12 place-items-center rounded-full bg-[#1E3A8A]/85 shadow-sm">
                            <span className="ml-[2px] text-white text-[1rem]">▶</span>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>

              {/* bottom left */}
              <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-100 aspect-[16/10]">
                {left?.src ? (
                  <Image
                    src={left.src}
                    alt={left.alt || title || ""}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 22vw, 50vw"
                  />
                ) : null}
              </div>

              {/* bottom right */}
              <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-100 aspect-[16/10]">
                {right?.src ? (
                  <Image
                    src={right.src}
                    alt={right.alt || title || ""}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 22vw, 50vw"
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* RIGHT: content */}
          <div className="lg:col-span-6 lg:pt-2">
            {eyebrow ? (
              <div className="inline-flex rounded-full bg-[#E7E8FF] px-4 py-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase text-[#2C2F8F]">
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h2 className="mt-5 text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313] whitespace-pre-line">
                {title}
              </h2>
            ) : null}

            {subTitle ? (
              <p className="mt-3 text-[0.875rem] font-medium text-slate-500">
                {subTitle}
              </p>
            ) : null}

            {Array.isArray(text) && text.length ? (
              <div>
                {text.map((p, idx) =>
                  typeof p === "string" ? (
                    <p
                      className="mt-2 text-regular text-slate-500 leading-relaxed"
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ) : null
                )}
              </div>
            ) : typeof text === "string" ? (
            <p
              className="mt-2 text-regular text-slate-500 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: text }}
            />) : null}

            {/* NEW: meta rows (optional, bg from JSON) */}
            {Array.isArray(metaRows) && metaRows.length ? (
              <div className="mt-6 max-w-[36rem]">
                <div className="grid gap-3">
                  {metaRows.map((row, idx) => {
                    const label = row?.label || "";
                    const value = row?.value || "";
                    if (!label && !value) return null;

                    const labelBg = row?.bg?.label || "#F3D8CF";
                    const valueBg = row?.bg?.value || "#F7E2DA";

                    return (
                      <div key={`${label}-${idx}`} className="grid grid-cols-2 gap-3">
                        {/* label pill */}
                        <div
                          className="rounded-xl px-5 py-4"
                          style={{ backgroundColor: labelBg }}
                        >
                          <div className="text-[0.95rem] font-semibold text-[#2A2A2A]">
                            {label}
                          </div>
                        </div>

                        {/* value pill */}
                        <div
                          className="rounded-xl px-5 py-4"
                          style={{ backgroundColor: valueBg }}
                        >
                          <div className="text-[0.95rem] leading-6 text-[#3F3F3F] whitespace-pre-line">
                            {value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}