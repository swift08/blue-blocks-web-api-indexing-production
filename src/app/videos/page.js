import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function VideosPage() {
  const page = siteData?.pages?.videos || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="videos" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

