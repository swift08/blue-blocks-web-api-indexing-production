import Container from "@/components/layout/Container";
import Image from "next/image";

export default function FounderVisionSplit({
  topSpacing = "pt-[140px]",

  bg = "#FFFFFF",
  py = "py-14 sm:py-16",

  leftArcs = {},
  founder = {},
  content = {},
}) {
  const arcsEnabled = Boolean(leftArcs?.enabled);
  const arcs = Array.isArray(leftArcs?.arcs) ? leftArcs.arcs : [];

  return (
    <section style={{ backgroundColor: bg }} className={`${topSpacing}`}>
      <Container className={py}>
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background arcs (left) */}
          {arcsEnabled ? (
            <div className="absolute inset-y-0 left-0 w-[52%] pointer-events-none select-none">
              {arcs.slice(0, 3).map((a, i) => {
                const w = typeof a?.width === "number" ? a.width : 220;
                const ox = typeof a?.offsetX === "number" ? a.offsetX : 0;
                const c = a?.color || "#95D6ED";

                return (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0"
                    style={{
                      left: `${ox}px`,
                      width: `${w}px`,
                      backgroundColor: c,
                      borderTopRightRadius: "999px",
                      borderBottomRightRadius: "999px",
                    }}
                  />
                );
              })}
            </div>
          ) : null}

          <div className="relative grid gap-10 lg:grid-cols-12 items-center bg-white">
            {/* LEFT: Founder profile */}
            <div className="lg:col-span-5 relative">
              <div className="relative px-8 pt-8 pb-10">
                {/* photo */}
                {founder?.image ? (
                  <div className="relative w-[220px] max-w-full">
                    <Image
                      src={founder.image}
                      alt={founder.imageAlt || founder.name || ""}
                      width={260}
                      height={260}
                      className="object-contain"
                    />
                  </div>
                ) : null}

                {/* role tag */}
                {founder?.roleTag ? (
                  <div className="mt-3 inline-flex rounded-md px-3 py-2 text-[0.78rem] text-white"
                    style={{ backgroundColor: "#E28C7A" }}
                  >
                    {founder.roleTag}
                  </div>
                ) : null}

                {/* name */}
                {founder?.name ? (
                  <div
                    className="mt-3 text-[1.05rem] font-semibold"
                    style={{ color: founder?.nameColor || "#2B66F6" }}
                  >
                    {founder.name}
                  </div>
                ) : null}

                {/* bio */}
                {founder?.bio ? (
                  <p className="mt-2 text-[0.82rem] leading-6 text-slate-700 max-w-[18rem] whitespace-pre-line">
                    {founder.bio}
                  </p>
                ) : null}
              </div>
            </div>

            {/* RIGHT: story */}
            <div className="lg:col-span-7 px-8 pb-10 lg:pb-0 lg:pr-12">
              {content?.eyebrow ? (
                <div className="inline-flex rounded-full bg-[#E7E8FF] px-4 py-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase text-[#2C2F8F]">
                  {content.eyebrow}
                </div>
              ) : null}

              {content?.title ? (
                <h2 className="mt-5 text-[2.25rem] sm:text-[3rem] leading-[1.06] font-medium text-[#131313] whitespace-pre-line">
                  {content.title}
                </h2>
              ) : null}

              {content?.text ? (
                <p className="mt-5 max-w-[34rem] text-[0.9rem] leading-7 text-slate-500 whitespace-pre-line">
                  {content.text}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
