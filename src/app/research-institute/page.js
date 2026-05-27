import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function ResearchInstitutePage() {
  const page = siteData?.pages?.researchInstitute || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="research-institute" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

