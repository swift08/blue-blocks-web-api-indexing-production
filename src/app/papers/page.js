import Link from "next/link";
import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";
import { PAPER_SERIES, PAPER_AUTHOR_BYLINE } from "@/data/publishing";

export const dynamic = "force-static";

export const metadata = {
  title: "Papers | Blue Blocks",
  description:
    "Developmental paper series across toddler, Children's House, elementary, and adolescent planes.",
  alternates: {
    canonical: "/papers/",
  },
};

const papersSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Papers",
    url: "#/papers/",
    description:
      "Blue Blocks developmental paper series across the first three Planes of Development.",
    isPartOf: { "@id": "##website" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "#/" },
      { "@type": "ListItem", position: 2, name: "Papers", item: "#/papers/" },
    ],
  },
];

export default function PapersHubPage() {
  return (
    <>
      <PageJsonLd baseId="papers" schema={papersSchema} />

      <PageHero
        title="Papers"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Papers" },
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
              <div className="grid gap-6 md:grid-cols-2">
                {PAPER_SERIES.map((paper) => (
                  <article
                    key={paper.slug}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500">
                      {paper.id}
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                      {paper.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {paper.summary}
                    </p>
                    <div className="mt-4 text-sm text-slate-600">
                      {PAPER_AUTHOR_BYLINE}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      Dated: {paper.publishedDate}
                    </div>
                    <Link
                      href={`/${paper.slug}/`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
                    >
                      Read Paper
                    </Link>
                  </article>
                ))}
              </div>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}

