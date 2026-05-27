import PageJsonLd from "@/components/seo/PageJsonLd";
import GovernanceFrameworkPage from "@/components/research/GovernanceFrameworkPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Governance Ethics | Blue Blocks Research",
  description:
    "Ethics framework sections for BEOP, MREF, and CDCS with DOI placeholder links.",
  alternates: {
    canonical: "/governance/ethics/",
  },
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Governance Ethics",
    url: "#/governance/ethics/",
    description:
      "Ethics framework sections for BEOP, MREF, and CDCS with DOI placeholder links.",
    isPartOf: { "@id": "##website" },
  },
];

const sections = [
  {
    id: "BEOP",
    title: "BEOP",
    summary:
      "TODO: Insert approved BEOP ethics framework content and policy summary.",
    zenodoLabel: "BEOP Zenodo DOI (TODO)",
    zenodoHref: "#",
  },
  {
    id: "MREF",
    title: "MREF",
    summary:
      "TODO: Insert approved MREF ethics framework content and policy summary.",
    zenodoLabel: "MREF Zenodo DOI (TODO)",
    zenodoHref: "#",
  },
  {
    id: "CDCS",
    title: "CDCS",
    summary:
      "TODO: Insert approved CDCS ethics framework content and policy summary.",
    zenodoLabel: "CDCS Zenodo DOI (TODO)",
    zenodoHref: "#",
  },
];

export default function GovernanceEthicsPage() {
  return (
    <>
      <PageJsonLd baseId="governance-ethics" schema={schema} />
      <GovernanceFrameworkPage
        title="Governance Ethics"
        breadcrumbLabel="Ethics"
        intro="This page is scaffolded for the ethics framework rollout. Replace TODO text with approved final content and DOI links."
        sections={sections}
      />
    </>
  );
}

