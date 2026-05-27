import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { withPaperAuthorMeta } from "@/lib/papers";

export const dynamic = "force-static";

export const metadata = {
  title:
    siteData?.pages?.theConsciousConstructionOfIntelligence?.seo?.title ||
    "The Conscious Construction of Intelligence | Blue Blocks",
  description:
    siteData?.pages?.theConsciousConstructionOfIntelligence?.seo?.description ||
    "Developmental Architecture of the Children's House.",
  alternates: {
    canonical: "/the-conscious-construction-of-intelligence/",
  },
};

export default function TheConsciousConstructionOfIntelligence() {
  const page = siteData?.pages?.theConsciousConstructionOfIntelligence || {};
  const sections = withPaperAuthorMeta(
    Array.isArray(page?.sections) ? page.sections : [],
    "theConsciousConstructionOfIntelligence"
  );

  return (
    <>
      <PageJsonLd
        baseId="the-conscious-construction-of-intelligence"
        schema={page?.schema}
      />
      <SectionRenderer sections={sections} />
    </>
  );
}

