"use client";

import Image from "next/image";
import Container from "@/components/layout/Container";

export default function CareersSection({
  bg = "#FFFFFF",
  maxWidth = "max-w-6xl",
  topCard,
  eligibilityCard,
}) {
  const top = topCard || {};
  const eligibility = eligibilityCard || {};

  return (
    <section style={{ backgroundColor: bg }} className="py-12 sm:py-16">
      <Container className={maxWidth}>
        {/* Top card */}
        <div
          className={`${top.radius || "rounded-[18px]"} ${
            top.padding || "p-8 sm:p-10"
          }`}
          style={{ backgroundColor: top.bg || "#F3E3CF" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left content */}
            <div>
              {top.title ? (
                <h2 className="text-3xl sm:text-4xl font-medium text-[#131313]">
                  {top.title}
                </h2>
              ) : null}

              <div className="mt-6 space-y-6 text-sm sm:text-[15px] leading-7 text-slate-700">
                {(top.text || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="w-full">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/40 border border-black/10">
                {top.image?.src ? (
                  <Image
                    src={top.image.src}
                    alt={top.image.alt || "Careers"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 520px, 100vw"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility card */}
        <div
          className={`mt-10 ${eligibility.radius || "rounded-[18px]"} ${
            eligibility.padding || "p-8 sm:p-10"
          }`}
          style={{ backgroundColor: eligibility.bg || "#EAF4FF" }}
        >
          {eligibility.title ? (
            <h3 className="text-2xl sm:text-3xl font-medium text-[#131313]">
              {eligibility.title}
            </h3>
          ) : null}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
            {(eligibility.items || []).map((it, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="h-10 w-10 grid place-items-center text-[#0F52BA]">
                  {/* <Icon name={it.icon} /> */}
                  <Image src={it.iconImage} height={48} width={48} alt={it.icon}/>
                </div>
                <div className="text-sm text-slate-700">{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
