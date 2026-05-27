import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";

function FrameworkCard({ id, title, summary, zenodoLabel, zenodoHref }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
        {id}
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-700">{summary}</p>
      <a
        href={zenodoHref || "#"}
        className="mt-5 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
      >
        {zenodoLabel || "Zenodo DOI (TODO)"}
      </a>
    </article>
  );
}

export default function GovernanceFrameworkPage({
  title,
  breadcrumbLabel,
  intro,
  sections = [],
}) {
  return (
    <>
      <PageHero
        title={title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Governance", href: "/governance/ethics/" },
          { label: breadcrumbLabel || title },
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
              <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-700">
                {intro}
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {sections.map((section) => (
                  <FrameworkCard key={section.id} {...section} />
                ))}
              </div>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}

