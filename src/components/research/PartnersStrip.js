import Image from "next/image";
import Container from "@/components/layout/Container";

export default function PartnersStrip({ title, logos = [] }) {
  return (
    <section className="bg-white">
      <Container className="py-10 sm:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[220px_1fr]">
          {/* Left title block */}
          <div className="flex items-center gap-6">
            <div className="text-[1.4rem] sm:text-[1.65rem] leading-[1.15] font-medium text-[#131313]">
              {title}
            </div>

            {/* Vertical divider */}
            <div
              aria-hidden
              className="hidden lg:block h-16 w-px bg-slate-200"
            />
          </div>

          {/* Logo rail (clipped, no wrap) */}
          <div className="relative overflow-hidden">
            {/* Soft fade edges */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent"
            />

            <div className="flex items-center gap-14 whitespace-nowrap">
              {logos.map((l, idx) => {
                const logoWidth = Math.max(1, Number(l.width) || 180);
                const logoHeight = Math.max(1, Number(l.height) || 90);

                return (
                  <div
                    key={`${l.alt}-${idx}`}
                    className="flex shrink-0 items-center justify-center opacity-70 grayscale"
                    style={{
                      width: `${logoWidth}px`,
                      height: `${logoHeight}px`,
                    }}
                  >
                    <Image
                      src={l.src}
                      alt={l.alt}
                      width={logoWidth}
                      height={logoHeight}
                      className="h-full w-full object-contain"
                      sizes={`${logoWidth}px`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
