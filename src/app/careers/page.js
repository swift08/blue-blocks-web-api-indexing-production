import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Careers at Blue Blocks Montessori | Open Roles in Hyderabad",
  description:
    "Join Blue Blocks Montessori in Hyderabad. View open roles for AMI-certified guides, educators, innovation lab leads, and operations staff across our Gachibowli and Tellapur campuses.",
  alternates: { canonical: "https://www.blueblocks.in/careers/" },
  robots: { index: true, follow: true },
};

export default function CareersPage() {
  const page = siteData?.pages?.careers || {};
  const baseSections = Array.isArray(page?.sections) ? page.sections : [];
  const contactJobsSection = (siteData?.pages?.contact?.sections || []).find(
    (section) => section?.type === "positionsOpen"
  );

  const normalizedJobsSection = contactJobsSection
    ? {
        ...contactJobsSection,
        props: {
          ...contactJobsSection.props,
          sectionId: "open-roles",
          jobs: Array.isArray(contactJobsSection?.props?.jobs)
            ? contactJobsSection.props.jobs.map((job) => ({
                ...job,
                apply: job?.apply
                  ? { ...job.apply, href: "/careers/#open-roles" }
                  : job.apply,
              }))
            : [],
        },
      }
    : null;

  const hasPositions = baseSections.some((section) => section?.type === "positionsOpen");
  const sections = hasPositions
    ? baseSections
    : normalizedJobsSection
      ? [...baseSections, normalizedJobsSection]
      : baseSections;

  return (
    <>
      <PageJsonLd baseId="careers" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

