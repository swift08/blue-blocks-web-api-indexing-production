import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function TermsPage() {
  const page = siteData?.pages?.terms || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="terms" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

