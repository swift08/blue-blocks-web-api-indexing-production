import Container from "@/components/layout/Container";
import Image from "next/image";

export default function ImpactCollageSplit({
  bg = "#FBF7F1",
  py = "py-16 sm:py-20",

  left = {},
  right = {},
  decor = {},
}) {
  const eyebrow = left?.eyebrow;
  const eyebrowBg = left?.eyebrowBg || "#E7E8FF";
  const eyebrowText = left?.eyebrowText || "#2C2F8F";
  const title = left?.title;
  const text = left?.text;

  const collage = right?.collage || {};
  const main = collage?.main;
  const cLeft = collage?.left;
  const cRight = collage?.right;

  const below = right?.below || {};
  const belowTitle = below?.title;
  const belowTitleColor = below?.titleColor || "#2B66F6";
  const belowText = below?.text;

  const showDecor = Boolean(decor?.enabled && decor?.image);

  // Decorative image positioning (only bottom-left needed now)
  const decorPos =
    decor?.position === "bottom-left"
      ? "absolute -left-20 -bottom-100"
      : "absolute left-0 bottom-0";

  return (
    <section style={{ backgroundColor: bg }}>
      <Container className={py}>
        <div className="relative grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* LEFT */}
          <div className="lg:col-span-5 relative">
            {eyebrow ? (
              <div
                className="inline-flex rounded-full px-4 py-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase"
                style={{ backgroundColor: eyebrowBg, color: eyebrowText }}
              >
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h2 className="mt-5 text-[2.4rem] sm:text-[3.2rem] leading-[1.05] font-medium text-[#131313] whitespace-pre-line">
                {title}
              </h2>
            ) : null}

            {text ? (
              <p className="mt-5 max-w-[26rem] text-[0.95rem] leading-7 text-slate-600">
                {text}
              </p>
            ) : null}

            {/* Decorative drone */}
            {showDecor ? (
              <div
                className={`${decorPos} pointer-events-none select-none hidden md:block`}
                style={{ opacity: typeof decor?.opacity === "number" ? decor.opacity : 1 }}
              >
                <Image
                  src={decor.image}
                  alt={decor.alt || ""}
                  width={Number(decor.width) || 560}
                  height={Number(decor.height) || 320}
                  className="object-contain"
                />
              </div>
            ) : null}
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            {/* Collage block */}
            <div className="grid grid-cols-2 gap-4">
              {/* Main */}
              <div className="col-span-2">
                <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[16/9]">
                  {main?.src ? (
                    <>
                      <Image
                        src={main.src}
                        alt={main.alt || ""}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 52vw, 100vw"
                      />
                      {main?.showPlay ? (
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

              {/* Bottom left */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10]">
                {cLeft?.src ? (
                  <Image
                    src={cLeft.src}
                    alt={cLeft.alt || ""}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 26vw, 50vw"
                  />
                ) : null}
              </div>

              {/* Bottom right */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10]">
                {cRight?.src ? (
                  <Image
                    src={cRight.src}
                    alt={cRight.alt || ""}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 26vw, 50vw"
                  />
                ) : null}
              </div>
            </div>

            {/* Tribute */}
            {(belowTitle || belowText) ? (
              <div className="mt-8">
                {belowTitle ? (
                  <h3
                    className="text-[1.35rem] sm:text-[1.6rem] font-medium"
                    style={{ color: belowTitleColor }}
                  >
                    {belowTitle}
                  </h3>
                ) : null}

                {belowText ? (
                  <p className="mt-3 max-w-[38rem] text-[0.95rem] leading-7 text-slate-700">
                    {belowText}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}