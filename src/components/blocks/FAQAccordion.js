import Container from "@/components/layout/Container";
import Accordion from "@/components/ui/Accordion";
import { resolveBg } from "@/lib/ui";
import Link from "next/link";
import { stripPlaygroupFromFaqItems } from "@/data/faq";
import RichTextContent from "@/components/ui/RichTextContent";

export default function FAQAccordion({
  // content
  title,
  subtitle,
  items = [],
  cta = [],

  // ✅ background: keep old + add new
  bg = "#F3E3CF", // legacy
  sectionBg = "", // preferred

  defaultOpenIndex = 0,
  allowToggleAllClosed = true,

  // layout controls (kept, but defaults now follow bb-section rhythm)
  panelMaxWidth = "",
  containerClassName = "",

  // accordion style controls (optional)
  rowGapClassName = "space-y-3",
  openItemClassName = "bg-white shadow-sm",
  closedItemClassName = "bg-transparent",
  itemClassName = "",
  buttonClassName = "",
  panelClassName = "",
}) {
  const resolved = resolveBg(sectionBg || bg);
  const safeItems = stripPlaygroupFromFaqItems(items);

  return (
    <section className={["bb-ui", resolved.className].filter(Boolean).join(" ")} style={resolved.style}>
      <div className="bb-section">
        <div className="bb-section__inner">
          <Container className={containerClassName}>
            <div className="mx-auto text-center">
              {title ? <RichTextContent as="h2" value={title} className="bb-section-title" /> : null}
              {subtitle ? <RichTextContent as="p" value={subtitle} className="bb-subtitle" /> : null}
            </div>

            <div className={["mx-auto mt-8", panelMaxWidth, rowGapClassName].filter(Boolean).join(" ")}>
              <Accordion
                items={safeItems}
                defaultOpenIndex={defaultOpenIndex}
                allowToggleAllClosed={allowToggleAllClosed}
                openItemClassName={openItemClassName}
                closedItemClassName={closedItemClassName}
                itemClassName={itemClassName}
                buttonClassName={buttonClassName}
                panelClassName={panelClassName}
              />
            </div>

            {cta?.href ? (
              <Link
              href={cta?.href}
              className={["bb-btn m-auto bb-btn--primary py-3 px-6 mt-6"]}>
              {cta?.label}
              </Link>
            ): null}
          </Container>
        </div>
      </div>
    </section>
  );
}
