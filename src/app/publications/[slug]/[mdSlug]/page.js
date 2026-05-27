import { notFound } from "next/navigation";
import { RESEARCH_OUTPUTS } from "@/data/publishing";

export const dynamic = "force-static";
export const dynamicParams = false;

function getOutput(slug = "") {
  return RESEARCH_OUTPUTS.find((item) => item.slug === slug) || null;
}

export function generateStaticParams() {
  return RESEARCH_OUTPUTS.map((item) => ({
    slug: item.slug,
    mdSlug: `${item.slug}.md`,
  }));
}

export async function generateMetadata({ params }) {
  const { slug, mdSlug } = await params;
  const item = getOutput(slug);
  if (!item || mdSlug !== `${item.slug}.md`) return {};

  return {
    title: `${item.title} (Markdown View) | Blue Blocks`,
    description: `AI-crawler-friendly markdown-style view for ${item.title}.`,
    alternates: {
      canonical: `/publications/${item.slug}/${item.slug}.md/`,
    },
  };
}

export default async function PublicationMarkdownPage({ params }) {
  const { slug, mdSlug } = await params;
  const item = getOutput(slug);
  if (!item) notFound();
  if (mdSlug !== `${item.slug}.md`) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <article className="prose prose-slate max-w-none">
        <h1>{item.title}</h1>
        <p>
          <strong>Type:</strong> {item.kind}
        </p>
        <p>{item.summary}</p>
        <h2>Source URL</h2>
        <p>
          <a href={`/publications/${item.slug}/`}>{`/publications/${item.slug}/`}</a>
        </p>
        <h2>Download / DOI</h2>
        <p>{item.downloadUrl || "TODO: Add DOI / archive URL"}</p>
        <h2>Body</h2>
        <p>TODO: Add markdown-rendered long-form content for this entry.</p>
      </article>
    </main>
  );
}
