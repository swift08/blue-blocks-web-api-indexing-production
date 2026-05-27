import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { withPaperAuthorMeta } from "@/lib/papers";

export const dynamic = "force-static";

export const metadata = {
  title: "Neuropsychiatry of the Toddler Plane | Blue Blocks",
  description:
    "Developmental architecture of the toddler community, including movement, language, and early executive function foundations.",
  alternates: {
    canonical: "/neuropsychiatry-of-toddler-plane/",
  },
};

export default function NeuropsychiatryOfToddlerPlanePage() {
  const page = siteData?.pages?.toddlerDevelopmentalArchitecture || {};
  const sections = withPaperAuthorMeta(
    Array.isArray(page?.sections) ? page.sections : [],
    "toddlerDevelopmentalArchitecture"
  );

  return (
    <>
      <PageJsonLd
        baseId="neuropsychiatry-of-toddler-plane"
        schema={page?.schema}
      />
      <SectionRenderer sections={sections} />
    </>
  );
}


