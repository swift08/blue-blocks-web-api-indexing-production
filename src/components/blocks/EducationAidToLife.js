import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function PyramidTier({ tone, age, label, sublabel, className }) {
  // tone: "top" | "mid" | "bottom"
  const base = "mx-auto flex flex-col items-center justify-center text-center text-white";

  const toneStyles = {
    top: {
      bg: "bg-[#253B74]",
      w: "w-[10.5rem] sm:w-[12.5rem]",
      h: "h-[6.5rem] sm:h-[7.5rem]",
      clip: "[clip-path:polygon(50%_0%,94%_100%,6%_100%)]",
      age: "text-[1.55rem] sm:text-[1.8rem]",
      label: "text-[0.65rem] sm:text-[0.7rem] text-white/85",
      sub: "text-[0.6rem] sm:text-[0.65rem] text-white/75",
    },
    mid: {
      bg: "bg-[#8FC4A6]",
      w: "w-[14rem] sm:w-[16rem]",
      h: "h-[7.5rem] sm:h-[8.5rem]",
      clip: "[clip-path:polygon(50%_0%,96%_100%,4%_100%)]",
      age: "text-[1.55rem] sm:text-[1.8rem]",
      label: "text-[0.65rem] sm:text-[0.7rem] text-white/85",
      sub: "text-[0.6rem] sm:text-[0.65rem] text-white/75",
    },
    bottom: {
      bg: "bg-[#F2B66D]",
      w: "w-[17rem] sm:w-[19rem]",
      h: "h-[8.5rem] sm:h-[9.5rem]",
      clip: "[clip-path:polygon(50%_0%,98%_100%,2%_100%)]",
      age: "text-[1.55rem] sm:text-[1.8rem]",
      label: "text-[0.65rem] sm:text-[0.7rem] text-white/85",
      sub: "text-[0.6rem] sm:text-[0.65rem] text-white/75",
    },
  };

  const t = toneStyles[tone] ?? toneStyles.mid;

  return (
    <div className={cx(base, t.bg, t.w, t.h, t.clip, className)}>
      <div className={cx("font-semibold leading-none", t.age)}>{age}</div>
      {label ? <div className={cx("mt-1 leading-snug", t.label)}>{label}</div> : null}
      {sublabel ? <div className={cx("leading-snug", t.sub)}>{sublabel}</div> : null}
    </div>
  );
}

export default function EducationAidToLife({
  bg = "#F3E3CF",
  sectionBg = "",

  eyebrow = "PHILOSOPHY",
  title = "EDUCATION AS AN AID\nTO LIFE",
  paragraphs = [],
  pyramidImage,
  pyramid = {
    top: { age: "0-6", label: "The Absorbent\nMind", sublabel: "(Construction\nof the Self)" },
    middle: { age: "6-12", label: "The Reasoning Mind", sublabel: "(Construction of the\nIntellect)" },
    bottom: { age: "12-18", label: "The Social Self", sublabel: "(Construction of Society)" },
  },
}) {
  const resolved = resolveBg(sectionBg || bg);

  return (
    <section className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")} style={resolved.style}>
      <div className="bb-section__inner">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* LEFT: Text */}
            <div className="lg:col-span-6">
              {eyebrow ? (
                <span
                  className="bb-pill"
                  style={{
                    "--bb-pill-bg": "#E7E8FF",
                    "--bb-pill-border": "transparent",
                    "--bb-pill-text": "#2C2F8F",
                  }}
                >
                  <span className="bb-pill__text">{eyebrow}</span>
                </span>
              ) : null}

              {title ? <h2 className="bb-section-title mt-5 whitespace-pre-line">{title}</h2> : null}

              {paragraphs?.length ? (
                <div className="mt-6 space-y-5 bb-text leading-7 text-slate-600 max-w-[34rem]">
                  {paragraphs.map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>
                  ))}
                </div>
              ) : null}
            </div>

            {/* RIGHT: Pyramid */}
            <div className="lg:col-span-6">
              <div className="mx-auto w-full max-w-[32rem] sm:max-w-[34rem]">
                {pyramidImage ? (
                  <Image
                    src={pyramidImage}
                    alt={title || "Academics"}
                    width={670}
                    height={593}
                    className="object-cover"
                  />
                ) : (
                  <div className="py-8">
                    <div className="space-y-4">
                      <PyramidTier tone="top" {...pyramid.top} />
                      <PyramidTier tone="mid" {...pyramid.middle} />
                      <PyramidTier tone="bottom" {...pyramid.bottom} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}