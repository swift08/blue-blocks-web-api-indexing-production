import Container from "@/components/layout/Container";
import Image from "next/image";
import { resolveBg } from "@/lib/ui";

export default function OutcomesPills({
  // ✅ NEW standard
  sectionBg = "bg-white",

  // ✅ OLD support (keep for now so nothing breaks)
  bg = "",

  title = "",
  titleAlign = "center", // "center" | "left"

  // keep existing knobs
  maxWidth = "",
  gap = "gap-4",
  items = [],

  // keep prop for backward compatibility but default to no extra padding
  py = "",
}) {
  const alignClass = titleAlign === "left" ? "text-left" : "text-center";

  // Prefer standardized prop, fallback to old
  const resolvedSection = resolveBg(sectionBg || bg);

  return (
    <section
      className={["bb-ui", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <div className="bb-section">
        <div className="bb-section__inner">
          {/* Keep Container but avoid double padding; allow legacy py if passed */}
          <Container className={py ? py : "py-0"}>
            {title ? (
              <h2 className={`${alignClass} bb-section-title`}>
                {title}
              </h2>
            ) : null}

            <div className={`mx-auto mt-8 ${maxWidth} grid ${gap}`}>
              {items.map((it, idx) => (
                <div
                  key={`${it?.text || "pill"}-${idx}`}
                  className="flex items-center gap-4 rounded-2xl px-6 py-4"
                  style={{ backgroundColor: it?.pillBg || "#F9E48F" }}
                >
                  {it?.icon ? (
                    <div className="shrink-0">
                      <Image
                        src={it.icon}
                        alt=""
                        width={62}
                        height={62}
                        className="object-contain"
                      />
                    </div>
                  ) : null}

                  {it?.text ? (
                    <div className="bb-text mt-0">
                      <p>
                        {it.text}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}