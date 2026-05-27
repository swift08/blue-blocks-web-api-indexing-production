import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  alternates: { canonical: "https://www.blueblocks.in/innovation/" },
};

export default function InnovationIndexPage() {
  const page = siteData?.pages?.innovation || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="innovation" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

