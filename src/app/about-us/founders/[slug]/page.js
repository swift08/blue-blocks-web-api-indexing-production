import { notFound } from "next/navigation";
import siteData from "@/data/site";
import FounderProfilePage from "@/components/blocks/FounderProfilePage";

export const dynamic = "force-static";
export const dynamicParams = false;

function getFounders() {
  const section = (siteData?.pages?.aboutUs?.sections || []).find(
    (item) => item?.type === "foundersGuides"
  );
  return Array.isArray(section?.props?.items) ? section.props.items.slice(0, 2) : [];
}

function founderSlug(founder) {
  const raw = String(founder?.readMoreHref || founder?.name || "")
    .trim()
    .toLowerCase();

  if (raw.includes("pavan-goyal")) return "pavan-goyal";
  if (raw.includes("munira-hussain")) return "munira-hussain";

  return raw
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .pop()
    ?.replace(/[^a-z0-9-]/g, "-") || "";
}

function getFounderBySlug(slug = "") {
  return getFounders().find((founder) => founderSlug(founder) === slug) || null;
}

export function generateStaticParams() {
  return getFounders()
    .map((founder) => founderSlug(founder))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const founder = getFounderBySlug(slug);
  if (!founder) return {};

  return {
    title: `${founder.name} | Founder | Blue Blocks`,
    description:
      founder.bio ||
      `Founder profile for ${founder.name} at Blue Blocks.`,
    alternates: {
      canonical: `/about-us/founders/${slug}/`,
    },
  };
}

export default async function FounderRoutePage({ params }) {
  const { slug } = await params;
  const founder = getFounderBySlug(slug);
  if (!founder) notFound();

  return <FounderProfilePage founder={founder} />;
}

