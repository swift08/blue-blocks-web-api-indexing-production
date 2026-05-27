"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";

export default function CouncilCarousel({ 
  bg="bg-[#F3E3CF]",
  eyebrow, 
  eyebrowBg = "#E7E8FF",  
  eyebrowText = "#2C2F8F", 
  title, 
  description, 
  descriptionClassName = "text-center mt-4 leading-6 text-slate-500",
  subdescription,
  items = [] 
}) {
  const total = items?.length || 0;

  return (
    <section className={`${bg}`}>
      <Container className="py-16 sm:py-20">
        {eyebrow ? (
          <div className="text-center ">
            <div
              className="inline-flex align-center rounded-full px-4 py-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ backgroundColor: eyebrowBg, color: eyebrowText }}
            >
              {eyebrow}
            </div>
          </div>
        ) : null}

        {title ? (<h2 className="text-center text-4xl sm:text-5xl font-semibold text-[#131313] main-title">
          {title}
        </h2>) : null}

        {description ? (
          <p className={`${descriptionClassName}`}>
            {description}
          </p>
        ) : null}

        {subdescription ? (
          <p className={`${descriptionClassName}`}>
            {subdescription}
          </p>
        ) : null}

        <div className="mt-10">
          <CarouselTrack
            total={total}
            initialIndex={0}
            swipeThreshold={60}
            rubberBand={true}
            perView={{ base: 1, md: 2, lg: 4 }}
            gap={6}
            paddingX={0}
            dots={{
              show: true,
              count: total,
              className: "mt-6 flex items-center justify-center gap-2",
              dotClassName: "h-2 w-2",
              activeClassName: "bg-[#2F6FED]",
              inactiveClassName: "bg-slate-300",
              focusRingClassName: "focus:ring-[#2F6FED]/40",
            }}
            arrows={{
              show: false,
            }}
          >
            {({ cardW }) =>
              items.map((p, i) => (
                <div
                  key={`${p?.name || "person"}-${i}`}
                  style={{ width: cardW }}
                  className="shrink-0"
                >
                  <div className="rounded-[22px] bg-white border border-[#E1E9EE] hover:border-[#C97B4E] focus-within:border-[#C97B4E] transition"
                  >
                    <div className="p-5">
                      <div className="relative h-[335px] w-full overflow-hidden rounded-[18px] bg-[#EAF6FF]">
                        {p?.image ? (
                          <Image
                            src={p.image}
                            alt={p?.name || ""}
                            fill
                            sizes="335px"
                            className="object-cover"
                          />
                        ) : null}

                        {p?.tag ? (
                          <div className="absolute right-3 top-3 rounded-[6px] bg-[#D67A52] px-3 py-1 text-[10px] font-medium text-white">
                            {p.tag}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <div className="text-[0.95rem] font-medium text-[#131313]">
                          {p?.name}
                        </div>

                        {p?.role ? (
                          <div className="mt-2 text-[11px] text-slate-500">
                            {p.role}
                          </div>
                        ) : null}

                        {p?.position ? (
                          <div className="mt-1 text-[11px] text-slate-500">
                            {p.position}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </CarouselTrack>
        </div>
      </Container>
    </section>
  );
}