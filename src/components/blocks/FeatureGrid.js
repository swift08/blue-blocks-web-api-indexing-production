import Container from "@/components/layout/Container";
import Image from "next/image";
import { resolveBg } from "@/lib/ui";
import RichTextContent from "@/components/ui/RichTextContent";

export default function FeatureGrid({
  headline,
  subText,
  items = [],

  // NEW (preferred)
  sectionBg = "",

  // OLD (kept)
  bg = "#ffffff",
}) {
  const resolved = resolveBg(sectionBg || bg);

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className="bb-section__inner">
        {headline ? (
          <RichTextContent as="h2" value={headline} className="bb-section-title text-center whitespace-pre-line" />
        ) : null}
        {subText ? <RichTextContent as="p" value={subText} className="bb-subtitle text-center mt-3" /> : null}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl bg-[#273C75]/5 border border-black/5 p-6"
            >
              <div className="flex justify-end gap-3 pb-1">
                {it.tag ? (
                  <span
                    className="bb-pill"
                    style={{
                      "--bb-pill-bg": "rgba(255,255,255,0.6)",
                      "--bb-pill-border": "transparent",
                      "--bb-pill-text": "inherit",
                    }}
                  >
                    <span className="bb-pill__text">{it.tag}</span>
                  </span>
                ) : null}
                {it.pill ? (
                  <span
                    className="bb-pill"
                    style={{
                      "--bb-pill-bg": "rgba(255,255,255,0.6)",
                      "--bb-pill-border": "transparent",
                      "--bb-pill-text": "inherit",
                    }}
                  >
                    <span className="bb-pill__text">{it.pill}</span>
                  </span>
                ) : null}
              </div>

              {it.icon ? (
                <Image
                  src={it.icon}
                  alt={it.title || ""}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ) : null}

              <RichTextContent as="div" value={it.title} className="bb-text font-semibold mt-4" />
              <RichTextContent as="p" value={it.text} className="bb-text mt-2" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
