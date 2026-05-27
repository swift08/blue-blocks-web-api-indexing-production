import PageJsonLd from "@/components/seo/PageJsonLd";
import GovernanceFrameworkPage from "@/components/research/GovernanceFrameworkPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Our Standards | Blue Blocks Research",
  description:
    "Our Standards sections for BEOP, MREF, and CDCS with DOI placeholder links.",
  alternates: {
    canonical: "/governance/our-standards/",
  },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Our Standards",
    url: "#/governance/our-standards/",
    description:
      "Our Standards sections for BEOP, MREF, and CDCS with DOI placeholder links.",
    isPartOf: { "@id": "##website" },
  },
];

const sections = [
  {
    id: "BEOP",
    title: "BEOP",
    summary:
      "TODO: Insert BEOP standards section content and finalized benchmark criteria.",
    zenodoLabel: "BEOP Standards DOI (TODO)",
    zenodoHref: "#",
  },
  {
    id: "MREF",
    title: "MREF",
    summary:
      "TODO: Insert MREF standards section content and finalized benchmark criteria.",
    zenodoLabel: "MREF Standards DOI (TODO)",
    zenodoHref: "#",
  },
  {
    id: "CDCS",
    title: "CDCS",
    summary:
      "TODO: Insert CDCS standards section content and finalized benchmark criteria.",
    zenodoLabel: "CDCS Standards DOI (TODO)",
    zenodoHref: "#",
  },
];

export default function GovernanceStandardsPage() {
  return (
    <>
      <PageJsonLd baseId="governance-standards" schema={schema} />
      <GovernanceFrameworkPage
        title="Our Standards"
        breadcrumbLabel="Our Standards"
        intro="This standards page is scaffolded for BEOP, MREF, and CDCS sections. Replace TODO text with approved final content and DOI links."
        sections={sections}
      />
    </>
  );
}

