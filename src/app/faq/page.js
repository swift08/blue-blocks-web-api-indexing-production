import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";
import {
  SCHOOL_FAQ_TABS,
  flattenFaqItemsFromTabs,
  stripPlaygroupFromTabs,
} from "@/data/faq";

export const dynamic = "force-static";

export default function FaqPage() {
  const page = siteData?.pages?.faq || {};
  const baseSections = Array.isArray(page?.sections) ? page.sections : [];
  const sanitizedTabs = stripPlaygroupFromTabs(SCHOOL_FAQ_TABS);

  const sections = baseSections.map((section) => {
    if (section?.type !== "tabbedFaq") return section;
    return {
      ...section,
      props: {
        ...(section?.props || {}),
        tabs: sanitizedTabs,
      },
    };
  });

  const faqSchemaEntities = flattenFaqItemsFromTabs(sanitizedTabs);
  const baseSchema = Array.isArray(page?.schema) ? page.schema : [];
  const schemaWithoutFaq = baseSchema.filter((item) => item?.["@type"] !== "FAQPage");
  const schema = faqSchemaEntities.length
    ? [
        ...schemaWithoutFaq,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSchemaEntities,
        },
      ]
    : schemaWithoutFaq;

  return (
    <>
      <PageJsonLd baseId="faq" schema={schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

