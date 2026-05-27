import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function ResearchHero({
  image,
  eyebrow = "Micro Research Institute",
  imageBg = "bg-slate-100",
  contentBg = "",
  contentSpacing = "",
  title,
  subtitle,
  description,
  link,
  points = [],
}) {
  return (
    <section className="relative bg-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/ui/dots.webp')] bg-right-top bg-no-repeat opacity-30"
      />

      <Container className="relative pt-28 sm:pt-50 pb-14 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: image */}
          <div className="lg:col-span-6">
            <div className={`relative w-full overflow-hidden rounded-3xl aspect-[16/12] sm:aspect-[16/11] lg:aspect-[16/12] ${imageBg}`}>
              <Image
                src={image}
                alt={title || "Micro Research Institute"}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* RIGHT: content */}
          <div className="lg:col-span-6">
            <div className={`max-w-xl ${contentBg} ${contentSpacing}`}>
              {eyebrow ? (<p className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-slate-500">
                {eyebrow}
              </p>) : null}

              <h1 className="mt-3 text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem] font-medium text-[#131313] leading-[1.1]">
                {title}
              </h1>

              {subtitle ? (
                <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                  {subtitle}
                </p>
              ) : null}

              {description ? (
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {description}{" "}
                  {link?.href ? (
                    <Link
                      href={link.href}
                      className="text-[#2F6FED] font-regular hover:underline underline-offset-4"
                    >
                      {link.label || "Read more"}
                    </Link>
                  ) : null}
                </p>
              ) : null}

              {/* checklist */}
              {points?.length ? (
                <ul className="mt-7 space-y-3">
                  {points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-[2px] inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#2F6FED] text-[1rem] font-bold">
                        ✓
                      </span>
                      <span className="text-sm sm:text-[0.95rem] text-slate-700 leading-snug">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
