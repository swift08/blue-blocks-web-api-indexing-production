import JsonLd from "@/components/seo/JsonLd";
import normalizeJsonLd from "@/lib/seo/normalizeJsonLd";

export default function PageJsonLd({ schema, baseId = "page" }) {
  const list = Array.isArray(schema) ? schema : schema ? [schema] : [];
  if (!list.length) return null;

  return (
    <>
      {list.map((node, idx) => {
        const normalized = normalizeJsonLd(node);
        const type =
          typeof normalized?.["@type"] === "string"
            ? normalized["@type"]
            : Array.isArray(normalized?.["@type"])
              ? normalized["@type"].join("-")
              : "schema";

        return (
          <JsonLd
            key={`${baseId}-${idx}`}
            id={`${baseId}-jsonld-${type}-${idx}`}
            data={normalized}
          />
        );
      })}
    </>
  );
}
