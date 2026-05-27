import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { withPaperAuthorMeta } from "@/lib/papers";

export const dynamic = "force-static";

export const metadata = {
  title:
    siteData?.pages?.toddlerDevelopmentalArchitecture?.seo?.title ||
    "Developmental Architecture | Blue Blocks",
  description:
    siteData?.pages?.toddlerDevelopmentalArchitecture?.seo?.description ||
    "Developmental architecture of the toddler community.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/neuropsychiatry-of-toddler-plane/",
  },
};

export default function ToddlerDevelopmentalArchitecture() {
  const page = siteData?.pages?.toddlerDevelopmentalArchitecture || {};
  const sections = withPaperAuthorMeta(
    Array.isArray(page?.sections) ? page.sections : [],
    "toddlerDevelopmentalArchitecture"
  );

  return (
    <>
      <PageJsonLd
        baseId="toddler-developmental-architecture"
        schema={page?.schema}
      />
      <SectionRenderer sections={sections} />
    </>
  );
}

