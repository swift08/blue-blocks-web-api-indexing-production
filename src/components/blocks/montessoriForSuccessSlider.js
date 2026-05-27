"use client";

import Container from "@/components/layout/Container";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";

export default function MontessoriForSuccessSlider({
  bg = "#ffffff",
  title = "MONTESSORI FOR\nSUCCESS",
  items = [],
  maxWidthClassName = "max-w-6xl",

  // card look
  cardBg = "#F3F5F9",
  cardBorder = "rgba(15, 23, 42, 0.10)",
  cardRadius = 18,

  // arrow look
  arrowBg = "rgba(255,255,255,0.85)",
  arrowBorder = "rgba(15, 23, 42, 0.12)",
}) {
  return (
    <section style={{ backgroundColor: bg }}>
      <Container className="py-16 sm:py-20">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 main-title">
            {title}
          </h2>
        </div>

        {/* Slider */}
        <div className={`relative mx-auto mt-10 sm:mt-14 ${maxWidthClassName}`}>
          <CarouselTrack
            total={items.length}
            perView={1} // ✅ IMPORTANT: single card only
            gap={0}
            paddingX={0}
            arrows={{ show: true }} // we will render our own arrows
          >
            {({ active, maxIndex, goPrev, goNext }) => (
              <>

                {/* CARD */}
                {items.map((it, i) => (
                  <div
                    key={it.name + i}
                    className="shrink-0 w-full"
                    style={{ width: "100%" }}
                  >
                    <div
                      className="relative mx-auto"
                      style={{
                        background: cardBg,
                        border: `1px solid ${cardBorder}`,
                        borderRadius: cardRadius,
                        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.10)",
                        overflow: "hidden",
                      }}
                    >
                      {/* subtle stacked background like figma */}
                      <div
                        aria-hidden="true"
                        className="absolute -left-3 top-3 h-[92%] w-[92%] rounded-[18px]"
                        style={{
                          background: "rgba(15, 23, 42, 0.03)",
                        }}
                      />

                      <div className="relative p-7 sm:p-10">
                        {/* top row */}
                        <div className="flex items-start justify-between gap-6">
                          <div className="text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] text-slate-800 uppercase">
                            {it.name}
                          </div>

                          {it.role ? (
                            <div className="text-[12px] sm:text-[13px] text-slate-600">
                              {it.role}
                            </div>
                          ) : null}
                        </div>

                        {/* quote */}
                        {it.quote ? (
                          <p className="mt-5 sm:mt-6 text-[14px] sm:text-[16px] leading-relaxed text-slate-700 max-w-3xl">
                            {it.quote}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </CarouselTrack>
        </div>
      </Container>
    </section>
  );
}
