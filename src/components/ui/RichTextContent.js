import { hasHtmlTags, normalizeMojibake, sanitizeTrustedHtml } from "@/lib/content/text";

export default function RichTextContent({
  as = "span",
  value = "",
  className = "",
  allowHtml = true,
  ...rest
}) {
  const Tag = as;
  const normalized = normalizeMojibake(typeof value === "string" ? value : String(value || ""));

  if (!allowHtml || !hasHtmlTags(normalized)) {
    return (
      <Tag className={className} {...rest}>
        {normalized}
      </Tag>
    );
  }

  const safe = sanitizeTrustedHtml(normalized);
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: safe }} {...rest} />;
}
