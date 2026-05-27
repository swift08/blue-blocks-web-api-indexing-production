import siteData from "@/data/site";
import { notFound } from "next/navigation";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

function getInnovationMap() {
  return siteData?.pages?.innovationDetail || {};
}

export function generateStaticParams() {
  const map = getInnovationMap();
  return Object.keys(map).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    alternates: {
      canonical: `https://www.blueblocks.in/innovation/${slug}/`,
    },
  };
}

export default async function InnovationDetailPage({ params }) {
  const { slug } = await params;
  const map = getInnovationMap();

  const page = map?.[slug];
  if (!page) notFound();

  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <PageJsonLd baseId={`innovation-${slug}`} schema={page?.schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

