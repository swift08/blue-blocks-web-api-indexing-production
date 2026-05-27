import { PAPER_AUTHOR_BYLINE, PAPER_SERIES } from "@/data/publishing";

function copySection(section) {
  return { ...section, props: { ...(section?.props || {}) } };
}

export function getPaperByPageKey(pageKey = "") {
  return PAPER_SERIES.find((item) => item.pageKey === pageKey) || null;
}

export function withPaperAuthorMeta(sections = [], pageKey = "") {
  const paper = getPaperByPageKey(pageKey);
  if (!paper) return sections;

  return (Array.isArray(sections) ? sections : []).map((section) => {
    if (section?.type !== "legalDocument") return section;

    const next = copySection(section);
    next.props.authorByline = PAPER_AUTHOR_BYLINE;
    next.props.publishedDate = paper.publishedDate;
    return next;
  });
}

