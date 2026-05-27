import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { withPaperAuthorMeta } from "@/lib/papers";

export const dynamic = "force-static";

export const metadata = {
  title:
    siteData?.pages?.adolescentSocialNewbornPaper?.seo?.title ||
    "Paper 8: The Social Newborn | Blue Blocks",
  description:
    siteData?.pages?.adolescentSocialNewbornPaper?.seo?.description ||
    "Developmental foundations of the adolescent community.",
  alternates: {
    canonical: "/adolescent-social-newborn-paper/",
  },
};

export default function AdolescentSocialNewbornPaper() {
  const page = siteData?.pages?.adolescentSocialNewbornPaper || {};
  const sections = withPaperAuthorMeta(
    Array.isArray(page?.sections) ? page.sections : [],
    "adolescentSocialNewbornPaper"
  );

  return (
    <>
      <PageJsonLd
        baseId="adolescent-social-newborn-paper"
        schema={page?.schema}
      />
      <SectionRenderer sections={sections} />
    </>
  );
}

