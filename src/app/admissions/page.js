import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  alternates: { canonical: "https://www.blueblocks.in/admissions/" },
};

export default function AdmissionsPage() {
  const page = siteData?.pages?.admissions || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="admissions" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

