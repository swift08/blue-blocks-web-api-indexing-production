import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function MontessoriToMars({
  image,
  eyebrow,
  title,
  text,
  cta,
  smallImages = [], // Three smaller images
  cards = [],
}) {
  return (
    <section className="bg-[#0f2d5c] text-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Section: Large Image with Play Button */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl bg-white/10 sm:aspect-[16/11] h-[410px] w-full">
              <Image
                src={image}
                alt={title || "From Montessori to Mars"}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button className="flex justify-center align-items-center w-[64] h-[64] rounded-full text-white bg-[#273C75] hover:bg-white/80" aria-label="Play Video">
                  <span className="text-3xl">▶</span>
                </button>
              </div>
            </div>
            <div className="mt-4 lg:grid lg:grid-cols-2 lg:gap-4">
              {smallImages?.map((src, idx) => (
                <div key={idx} className="relative h-[285px]">
                  <Image
                    src={src}
                    alt={`Smaller Image ${idx + 1}`}
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {eyebrow ? (
              <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/80 ring-1 ring-white/15">
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h2 className="mt-4 text-4xl sm:text-5xl font-semibold main-title">
                {title}
              </h2>
            ) : null}

            {text ? (
              <p className="mt-3 text-white/80 leading-relaxed">
                {text}
              </p>
            ) : null}

            {cta?.href ? (
              <Link
                href={cta.href}
                className="mt-auto inline-flex items-center justify-center rounded-full bg-white px-12 py-3 text-xs sm:text-[1.25rem] text-[#0f2d5c] hover:bg-white/90"
              >
                {cta.label}
              </Link>
            ) : null}
          </div>
        </div>

        {/* Cards Section: Display cards if available */}
        {cards?.length ? (
          <div className="mt-15 grid gap-8 sm:grid-cols-2">
            {cards.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/8 ring-1 ring-white/12 p-6"
              >
                {c.icon ? (
                  <div className="mb-4 text-white/80">
                    <Image
                      src={c.icon}
                      alt=""
                      width={140}
                      height={140}
                      className="opacity-90"
                    />
                  </div>
                ) : null}
                <div className="text-3xl">{c.title}</div>

                {Array.isArray(c?.text) && c?.text.length ? (
                  <div>
                    {c?.text.map((p, idx) =>
                      typeof p === "string" ? (
                        <p
                          className="mt-2 text-regular text-white/75 leading-relaxed"
                          key={idx}
                          dangerouslySetInnerHTML={{ __html: p }}
                        />
                      ) : null
                    )}
                  </div>
                ) : typeof c?.text === "string" ? (
                <p
                  className="mt-2 text-regular text-white/75 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: it.text }}
                />) : null}

              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
