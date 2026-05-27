import Image from "next/image";
import Container from "@/components/layout/Container";

function ImageCard({ image, caption, priority = false, fillHeight = false }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-white h-full">
      <div
        className={
          fillHeight
            ? "relative h-full min-h-[280px]"
            : "relative aspect-[16/8] sm:aspect-[16/7.5]"
        }
      >
        <Image
          src={image}
          alt={caption || ""}
          fill
          priority={priority}
          sizes="(min-width:1024px) 640px, 100vw"
          className="object-cover"
        />

        {/* Gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        />

        {/* Caption */}
        {caption ? (
          <div className="absolute bottom-5 left-6 text-white text-base sm:text-lg font-medium">
            {caption}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CheckBullet({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[3px] inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#2F6FED]/10 text-[#2F6FED] text-[0.75rem] font-bold">
        ✓
      </span>
      <span className="text-[0.9rem] leading-relaxed text-slate-700">
        {children}
      </span>
    </li>
  );
}

export default function OutcomesPatents({ title, leftCard, rightStack = [] }) {
  const rightImage = rightStack.find((x) => x?.image);
  const outcomes = rightStack.find((x) => !x?.image);

  return (
    <section className="bg-[#F3E3CF]">
      <Container className="py-16 sm:py-20">
        <h2 className="text-center text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]">
          {title}
        </h2>

        {/* ✅ GRID THAT MATCHES FIGMA */}
        <div className="mt-10 sm:mt-12 grid gap-6 lg:grid-cols-2 items-stretch">
          {/* Row 1: spans 2 columns */}
          {leftCard?.image ? (
            <div className="lg:col-span-2">
              <ImageCard
                image={leftCard.image}
                caption={leftCard.caption}
                priority
              />
            </div>
          ) : null}

        {/* Row 2 left: image fills height of Outcomes card */}
        {rightImage?.image ? (
        <div className="lg:col-span-1 h-full">
            <ImageCard
            image={rightImage.image}
            caption={rightImage.caption}
            fillHeight
            />
        </div>
        ) : null}


          {/* Row 2 right: outcomes */}
          {outcomes ? (
            <div className="lg:col-span-1 rounded-[18px] bg-white px-7 py-8 sm:px-9 sm:py-10">
              {outcomes.title ? (
                <h3 className="text-xl sm:text-2xl font-medium text-[#131313]">
                  {outcomes.title}
                </h3>
              ) : null}

              <div className="mt-3 h-px w-full bg-slate-200" />

              <p className="mt-3 text-[0.85rem] text-slate-500">
                Research insights have informed practical innovations including:
              </p>

              {outcomes.bullets?.length ? (
                <ul className="mt-5 space-y-4">
                  {outcomes.bullets.map((x, i) => (
                    <CheckBullet key={i}>{x}</CheckBullet>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
