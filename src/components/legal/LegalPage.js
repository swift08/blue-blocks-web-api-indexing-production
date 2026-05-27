"use client";

import React, { useMemo } from "react";

/**
 * Minimal allowlist sanitizer for inline HTML coming from JSON.
 * Allowed tags: b, strong, br, em, i, u
 * Everything else is stripped.
 *
 * This avoids pulling in new libs and keeps it client-safe for static export.
 */
function sanitizeInlineHtml(input) {
  if (typeof input !== "string") return "";

  // Remove script/style blocks completely
  let s = input.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "");

  // Strip all tags that are NOT in the allowlist
  // Keep: b, strong, br, em, i, u
  s = s.replace(
    /<\/?(?!b\b|strong\b|br\b|em\b|i\b|u\b)[a-z0-9]+[^>]*>/gi,
    ""
  );

  // Remove attributes from allowed tags (keep only the tag)
  s = s.replace(/<(b|strong|em|i|u)\s+[^>]*>/gi, "<$1>");
  s = s.replace(/<br\s*\/?\s*>/gi, "<br/>");

  return s;
}

function RichLine({ html }) {
  const safe = useMemo(() => sanitizeInlineHtml(html), [html]);
  if (!safe) return null;

  return (
    <p
      className="text-slate-700 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

function Section({ section }) {
  if (!section) return null;

  const title = section.title ? (
    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
      {section.title}
    </h2>
  ) : null;

  switch (section.type) {
    case "richText":
      return (
        <div className="space-y-3">
          {title}
          {Array.isArray(section.content)
            ? section.content.map((line, idx) => <RichLine key={idx} html={line} />)
            : null}
        </div>
      );

    case "list":
      return (
        <div className="space-y-3">
          {title}
          {section.intro ? <RichLine html={section.intro} /> : null}

          {Array.isArray(section.items) && section.items.length ? (
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              {section.items.map((it, idx) => (
                <li key={idx} className="leading-relaxed">
                  <RichLine html={it} />
                </li>
              ))}
            </ul>
          ) : null}

          {section.noteTitle ? (
            <div className="pt-2">
              <div className="font-medium text-slate-900">{section.noteTitle}</div>
              {Array.isArray(section.noteItems) && section.noteItems.length ? (
                <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-700">
                  {section.noteItems.map((it, idx) => (
                    <li key={idx}>
                      <RichLine html={it} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {section.note ? <div className="text-sm text-slate-600">{section.note}</div> : null}
        </div>
      );

    case "groupedList":
      return (
        <div className="space-y-4">
          {title}
          {Array.isArray(section.groups)
            ? section.groups.map((g, idx) => (
                <div key={idx} className="rounded-2xl border bg-white p-4 sm:p-5 space-y-3">
                  {g.heading ? (
                    <div className="font-semibold text-slate-900">{g.heading}</div>
                  ) : null}

                  {Array.isArray(g.items) && g.items.length ? (
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                      {g.items.map((it, j) => (
                        <li key={j}>
                          <RichLine html={it} />
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {g.footnote ? (
                    <div className="text-sm text-slate-600">{g.footnote}</div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      );

    case "contactCard":
      return (
        <div className="space-y-3">
          {title}
          <div className="rounded-2xl border bg-white p-4 sm:p-5 space-y-2">
            {section.name ? <div className="font-semibold text-slate-900">{section.name}</div> : null}
            {section.email ? <div className="text-slate-700">Email: {section.email}</div> : null}
            {section.phone ? <div className="text-slate-700">Phone: {section.phone}</div> : null}
            {section.address ? (
              <div className="text-slate-700 whitespace-pre-line">{section.address}</div>
            ) : null}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function LegalPage({ page }) {
  if (!page) return null;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
            {page?.hero?.title || "Legal"}
          </h1>
          {page?.hero?.meta ? (
            <div className="text-sm text-slate-600">{page.hero.meta}</div>
          ) : null}
        </header>

        <div className="mt-8 space-y-10">
          {Array.isArray(page.sections)
            ? page.sections.map((sec) => <Section key={sec.id} section={sec} />)
            : null}
        </div>
      </div>
    </main>
  );
}