import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import RichTextContent from "@/components/ui/RichTextContent";

export default function CenteredTextBlock({
  // OLD (keep backward compatible)
  bg = "#EEF7FD",

  // NEW preferred prop
  sectionBg = "",

  title,
  subtitle,
  text,
  textParts = [],
  maxWidth = "56rem",
  align = "center",
}) {
  const resolvedSection = resolveBg(sectionBg || bg);

  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <section
      className={["bb-ui", "bb-section", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <Container className="bb-section__inner">
        <div className={`mx-auto ${alignClass}`} style={{ maxWidth }}>
          {title ? <RichTextContent as="h2" value={title} className="bb-section-title" /> : null}
          {subtitle ? <RichTextContent as="h3" value={subtitle} className="bb-subtitle" /> : null}

          {Array.isArray(textParts) && textParts.length ? (
            <div className="bb-text">
              {textParts.map((p, idx) =>
                typeof p === "string" ? (
                  <RichTextContent key={idx} as="p" value={p} />
                ) : p && typeof p === "object" && p.bold ? (
                  <RichTextContent key={idx} as="p" value={`<b>${p.bold}</b>`} />
                ) : null
              )}
            </div>
          ) : text ? (
            <div className="bb-text">
              <RichTextContent as="p" value={text} />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
