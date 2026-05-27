import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  const page = siteData?.pages?.privacyPolicy || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId="privacy-policy" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

