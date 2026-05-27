import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  alternates: { canonical: "https://www.blueblocks.in/contact-us/" },
};

export default function ContactPage() {
  const page = siteData?.pages?.contact || {};
  const baseSections = Array.isArray(page?.sections)
    ? page.sections.filter((section) => section?.type !== "positionsOpen")
    : [];

  const hasCareersCta = baseSections.some(
    (section) => section?.type === "ctaBanner" && section?.props?.cta?.href === "/careers/"
  );

  const careersCtaSection = {
    type: "ctaBanner",
    props: {
      title: "Looking to Join Blue Blocks?",
      text:
        "Open roles and role descriptions are now available on the dedicated Careers page.",
      cta: {
        label: "View Careers",
        href: "/careers/",
      },
      image: "/careers/building.webp",
      imageAlt: "Blue Blocks Careers",
      imageWidth: "566",
      imageHeight: "506",
      customTopSpacing: "sm:pt-70",
      align: "left",
      theme: "dark",
    },
  };

  const sections = hasCareersCta ? baseSections : [...baseSections, careersCtaSection];

  return (
    <>
      <PageJsonLd baseId="contact" schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

