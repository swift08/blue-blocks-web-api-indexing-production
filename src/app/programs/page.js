import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  alternates: { canonical: "https://www.blueblocks.in/programs/" },
};

export default function ProgramPage() {
  const page = siteData?.pages?.programs || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="programs" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

