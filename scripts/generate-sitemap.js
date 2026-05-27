const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const siteData = require("../src/data/site.json");

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.blueblocks.in").replace(/\/$/, "");

function absoluteUrl(route = "/") {
  return `${SITE_URL}${route.startsWith("/") ? route : `/${route}`}`;
}

function getRoutes({ researchOutputs = [] }) {
  const staticRoutes = [
    "/",
    "/about-us",
    "/about-us/founders/pavan-goyal",
    "/about-us/founders/munira-hussain",
    "/programs",
    "/admissions",
    "/contact-us",
    "/careers",
    "/research-institute",
    "/papers",
    "/parents",
    "/innovation",
    "/montessori-system",
    "/ami-training",
    "/governance/ethics",
    "/governance/our-standards",
    "/campus",
    "/videos",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/adolescent-social-newborn-paper",
    "/the-architecture-of-the-universe",
    "/neuropsychiatry-of-toddler-plane",
    "/the-conscious-construction-of-intelligence",
    "/drone",
    "/llms.txt",
    "/llms-full.txt",
  ];

  const publicationRoutes = researchOutputs.flatMap((item) => [
    `/publications/${item.slug}`,
    `/publications/${item.slug}/${item.slug}.md`,
  ]);

  const programDetails = Object.keys(siteData?.pages?.programDetails || {})
    .filter((key) => !["breadcrumbs", "schema", "toddlerDetail"].includes(key))
    .map((slug) => `/programs/${slug}`);

  const innovationDetails = Object.keys(siteData?.pages?.innovationDetail || {})
    .filter((key) => !["breadcrumbs", "schema"].includes(key))
    .map((slug) => `/innovation/${slug}`);

  const primaryDetails = Object.keys(siteData?.pages?.primaryDetail || {})
    .filter((key) => key !== "breadcrumbs")
    .map((slug) => `/primary/${slug}`);

  return [
    ...new Set([
      ...staticRoutes,
      ...publicationRoutes,
      ...programDetails,
      ...innovationDetails,
      ...primaryDetails,
    ]),
  ];
}

function buildXml(routes) {
  const now = new Date().toISOString();

  const urls = routes
    .map((route) => {
      const priority = route === "/" ? "1.0" : "0.8";
      const changefreq = route === "/" ? "weekly" : "monthly";

      return `
  <url>
    <loc>${absoluteUrl(route)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

async function main() {
  const publishingPath = path.join(process.cwd(), "src", "data", "publishing.js");
  const publishingModule = await import(pathToFileURL(publishingPath).href);
  const researchOutputs = Array.isArray(publishingModule.RESEARCH_OUTPUTS)
    ? publishingModule.RESEARCH_OUTPUTS
    : [];

  const routes = getRoutes({ researchOutputs });
  const xml = buildXml(routes);

  const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf8");

  console.log(`sitemap.xml generated at ${outputPath}`);
  console.log(`Base URL: ${SITE_URL}`);
}

main().catch((err) => {
  console.error("Failed to generate sitemap.xml");
  console.error(err);
  process.exit(1);
});
