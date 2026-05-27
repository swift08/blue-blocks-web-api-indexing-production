import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "AMI Training | Blue Blocks",
  description:
    "AMI Training at Blue Blocks. Curriculum, pathway, and intake details will be published soon.",
  alternates: {
    canonical: "/ami-training/",
  },
};

const amiSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AMI Training",
    url: "#/ami-training/",
    description:
      "AMI Training at Blue Blocks. Curriculum, pathway, and intake details will be published soon.",
    isPartOf: { "@id": "##website" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "#/" },
      { "@type": "ListItem", position: 2, name: "AMI Training", item: "#/ami-training/" },
    ],
  },
];

export default function AmiTrainingPage() {
  return (
    <>
      <PageJsonLd baseId="ami-training" schema={amiSchema} />

      <PageHero
        title="AMI Training"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "AMI Training" },
        ]}
        bg={{
          base: "#F3E3CF",
          leftArc: "/ui/arc-left.webp",
          rightArc: "/ui/arc-right.webp",
        }}
      />

      <section className="bb-ui bg-white">
        <div className="bb-section">
          <div className="bb-section__inner">
            <Container>
              <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 p-6 sm:p-8">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Page Scaffold Ready
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  TODO: Add official AMI Training program content, eligibility criteria, intake schedule,
                  and application details.
                </p>
              </div>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}

