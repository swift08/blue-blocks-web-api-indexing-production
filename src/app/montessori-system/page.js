import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function MontessoriSystemPage() {
  const page = siteData?.pages?.montessoriSystem || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="montessori-system" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

