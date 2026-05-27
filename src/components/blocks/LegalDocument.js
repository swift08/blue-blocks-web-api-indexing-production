import Container from "@/components/layout/Container";
import RichTextContent from "@/components/ui/RichTextContent";

export default function LegalDocument({
  effectiveDate,
  authorByline = "",
  publishedDate = "",
  intro = [],
  sections = [],
  maxWidth = "56rem",
}) {
  const hasAuthorBlock = Boolean(authorByline || publishedDate);
  const datedValue = publishedDate || effectiveDate || "To be announced";

  const getParagraphGroups = (section) =>
    Object.keys(section || {})
      .filter((key) => /^paragraphs\d*$/.test(key))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((key) => section[key])
      .filter((arr) => Array.isArray(arr) && arr.length);

  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-14">
        <div className="mx-auto" style={{ maxWidth }}>
          {hasAuthorBlock ? (
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:px-5 sm:py-4">
              {authorByline ? (
                <RichTextContent as="div" value={authorByline} className="text-sm text-slate-700" />
              ) : null}
              <div className="mt-1 text-sm text-slate-700">Dated: {datedValue}</div>
            </div>
          ) : effectiveDate ? (
            <div className="text-sm text-slate-500 mb-6">Effective Date: {effectiveDate}</div>
          ) : null}

          {Array.isArray(intro) && intro.length ? (
            <div className="space-y-3">
              {intro.map((paragraph, index) => (
                <RichTextContent
                  key={index}
                  as="p"
                  value={paragraph}
                  className="text-[0.98rem] leading-7 text-slate-700"
                />
              ))}
            </div>
          ) : null}

          {Array.isArray(sections) && sections.length ? (
            <div className="mt-10 space-y-10">
              {sections.map((section, index) => (
                <div key={section?.id || index} className="space-y-3">
                  {section?.title ? (
                    <RichTextContent
                      as="h2"
                      value={section.title}
                      className="text-xl sm:text-2xl font-semibold text-slate-900"
                    />
                  ) : null}

                  {getParagraphGroups(section).map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-3">
                      {group.map((paragraph, paragraphIndex) => (
                        <RichTextContent
                          key={`${groupIndex}-${paragraphIndex}`}
                          as="p"
                          value={paragraph}
                          className="text-[0.98rem] leading-7 text-slate-700"
                        />
                      ))}
                    </div>
                  ))}

                  {Array.isArray(section?.bullets) && section.bullets.length ? (
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      {section.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="leading-7">
                          <RichTextContent as="span" value={bullet} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
