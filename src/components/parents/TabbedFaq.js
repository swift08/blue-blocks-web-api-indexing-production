"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import Accordion from "@/components/ui/Accordion";
import { stripPlaygroupFromTabs } from "@/data/faq";
import RichTextContent from "@/components/ui/RichTextContent";

/**
 * Supports both formats:
 *
 * OLD:
 * tabs: [{ label: "Tab", items: [{ q, a }, ...] }]
 *
 * NEW (with headings inside a tab):
 * tabs: [{
 *   label: "Tab",
 *   sections: [
 *     { heading: "Admission Process", items: [{ q, a }, ...] },
 *     { heading: "About Us", items: [{ q, a }, ...] }
 *   ]
 * }]
 */
export default function TabbedFaq({
  bg = "#F3E3CF",
  title,
  subtitle,
  tabs = [],

  // optional styling controls
  tabActiveBg = "bg-[#4281E9] text-white",
  accordionOpenBg = "bg-white",
  containerClassName = "py-14 sm:py-16",
  tabsWrapClassName = "mt-10 flex flex-wrap items-center justify-center gap-3",

  // section heading style controls
  sectionHeadingClassName = "text-lg sm:text-xl font-medium text-slate-900",
  sectionWrapClassName = "mt-10",
  sectionDividerClassName = "mt-10 border-t border-slate-900/10 pt-10",
}) {
  const [active, setActive] = useState(0);
  const safeTabs = useMemo(() => stripPlaygroupFromTabs(tabs), [tabs]);
  const current = useMemo(() => safeTabs[active] || {}, [safeTabs, active]);

  useEffect(() => {
    if (active < safeTabs.length) return;
    setActive(0);
  }, [active, safeTabs.length]);

  const onTabChange = (i) => setActive(i);

  const sections = useMemo(() => {
    if (Array.isArray(current.sections) && current.sections.length) {
      return current.sections
        .filter(Boolean)
        .map((s) => ({
          heading: s.heading || "",
          items: Array.isArray(s.items) ? s.items.filter(Boolean) : [],
        }))
        .filter((s) => s.heading || (s.items && s.items.length));
    }

    const fallbackItems = Array.isArray(current.items)
      ? current.items.filter(Boolean)
      : [];

    if (fallbackItems.length) {
      return [{ heading: "", items: fallbackItems }];
    }

    return [];
  }, [current.sections, current.items]);

  return (
    <section style={{ backgroundColor: bg }}>
      <Container className={containerClassName}>
        {/* Title */}
        <div className="text-center">
          {title ? (
            <RichTextContent
              as="h2"
              value={title}
              className="text-4xl sm:text-5xl font-semibold text-slate-900 main-title"
            />
          ) : null}

          {subtitle ? (
            <RichTextContent
              as="p"
              value={subtitle}
              className="mt-3 text-slate-700/80 max-w-2xl mx-auto"
            />
          ) : null}
        </div>

        {/* Tabs */}
        {safeTabs?.length ? (
          <div className={tabsWrapClassName}>
            {safeTabs.map((t, i) => (
              <button
                key={t.label || i}
                type="button"
                onClick={() => onTabChange(i)}
                className={`h-9 px-4 rounded-sm font-medium transition min-w-[220px] ${
                  i === active
                    ? `${tabActiveBg}` 
                    : "bg-white/60 text-slate-700 hover:bg-white"
                }`}
              >
                <RichTextContent as="span" value={t.label} />
              </button>
            ))}
          </div>
        ) : null}

        {/* Sections + Accordions */}
        <div className="mt-8">
          {sections.length ? (
            sections.map((sec, idx) => {
              const wrapClass =
                idx === 0 ? sectionWrapClassName : sectionDividerClassName;

              return (
                <div key={`${sec.heading || "section"}-${idx}`} className={wrapClass}>
                  {sec.heading ? (
                    <RichTextContent as="h3" value={sec.heading} className={sectionHeadingClassName} />
                  ) : null}

                  <div className={sec.heading ? "mt-4" : ""}>
                    <Accordion
                      items={sec.items || []}
                      defaultOpenIndex={0}
                      allowToggleAllClosed={true}
                      openItemClassName={`${accordionOpenBg} shadow-sm`} 
                      closedItemClassName="bg-transparent"
                      itemClassName=""
                      buttonClassName=""
                      contentClassName=""
                      iconClassName=""
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-slate-700/70 text-center py-10">
              No FAQs available for this tab.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
