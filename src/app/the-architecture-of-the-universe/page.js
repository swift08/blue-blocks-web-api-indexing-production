import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { withPaperAuthorMeta } from "@/lib/papers";

export const dynamic = "force-static";

export const metadata = {
  title:
    siteData?.pages?.theArchitectureOfTheUniverse?.seo?.title ||
    "The Architecture of the Universe | Blue Blocks",
  description:
    siteData?.pages?.theArchitectureOfTheUniverse?.seo?.description ||
    "Elementary developmental architecture and Cosmic Education.",
  alternates: {
    canonical: "/the-architecture-of-the-universe/",
  },
};

export default function TheArchitectureOfTheUniverse() {
  const page = siteData?.pages?.theArchitectureOfTheUniverse || {};
  const sections = withPaperAuthorMeta(
    Array.isArray(page?.sections) ? page.sections : [],
    "theArchitectureOfTheUniverse"
  );

  return (
    <>
      <PageJsonLd baseId="the-architecture-of-the-universe" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

