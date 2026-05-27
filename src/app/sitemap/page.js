import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import PageHero from "@/components/blocks/PageHero";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  title: "Sitemap",
  description:
    "Browse all important Blue Blocks pages, programmes, innovation pages, and resources from one place.",
  alternates: {
    canonical: "/sitemap",
  },
};

const sitemapGroups = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Programs", href: "/programs" },
      { label: "Innovation", href: "/innovation" },
      { label: "Blog", href: "/blog" },
      { label: "Papers", href: "/papers" },
      { label: "Campus", href: "/campus" },
      { label: "Admissions", href: "/admissions" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "FAQs", href: "/faq" },
      { label: "Videos", href: "/videos" },
      { label: "Careers", href: "/careers" },
      { label: "AMI Training", href: "/ami-training" },
      { label: "Parents", href: "/parents" },
      { label: "The Micro Research Institute", href: "https://mri2.vercel.app/" },
      { label: "Montessori System", href: "/montessori-system" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
  {
    title: "Program Pages",
    links: [
      { label: "Playgroup", href: "/programs/playgroup" },
      { label: "Nursery, PP1, PP2", href: "/programs/nursery-school" },
      { label: "Primary School – Class 1 to 6", href: "/programs/primary-school-elementary" },
      { label: "Secondary School – Class 7 to 12", href: "/programs/secondary-school" },
    //   { label: "Toddler Program", href: "/programs/toddler" },
    //   { label: "Gentle Settlement", href: "/programs/toddler/gentle-settlement" },
    //   { label: "Prepared Environment", href: "/programs/toddler/prepared-environment" },
    //   { label: "Practical Life", href: "/programs/toddler/practical-life" },
    //   { label: "Language & Communication", href: "/programs/toddler/language" },
    ],
  },
  {
    title: "Innovation Pages",
    links: [
      { label: "Innovation Lab", href: "/innovation/innovation-lab" },
      { label: "Biomimicry Hive", href: "/innovation/biomimicry-hive" },
      { label: "Drone Lab", href: "/innovation/drone-lab" },
      { label: "Space Program Lab", href: "/innovation/space-lab" },
    ],
  },
  {
    title: "Papers & Resources",
    links: [
      { label: "Neuropsychiatry of the Toddler Plane", href: "/neuropsychiatry-of-toddler-plane" },
      { label: "The Conscious Construction of Intelligence", href: "/the-conscious-construction-of-intelligence" },
      { label: "The Architecture of the Universe", href: "/the-architecture-of-the-universe" },
      { label: "Adolescent Social Newborn Paper", href: "/adolescent-social-newborn-paper" },
    ],
  },
  {
    title: "Publications & AI Endpoints",
    links: [
      { label: "IN-SPACe Authorization Publication", href: "/publications/inspace-authorization-cubesat-mission" },
      { label: "Longitudinal Innovation Publication", href: "/publications/longitudinal-innovation-development-0-18" },
      { label: "Drone Patent Series", href: "/publications/drone-patent-series-2019" },
      { label: "IN-SPACe Markdown Endpoint", href: "/publications/inspace-authorization-cubesat-mission/inspace-authorization-cubesat-mission.md" },
      { label: "Drone Patent Markdown Endpoint", href: "/publications/drone-patent-series-2019/drone-patent-series-2019.md" },
      { label: "llms.txt", href: "/llms.txt" },
      { label: "llms-full.txt", href: "/llms-full.txt" },
    ],
  },
];

const sitemapSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sitemap",
    url: "#/sitemap",
    description:
      "Browse all important Blue Blocks pages, programmes, innovation pages, and resources from one place.",
    isPartOf: {
      "@id": "##website",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "#/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sitemap",
        item: "#/sitemap",
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageJsonLd baseId="sitemap" schema={sitemapSchema} />

      <PageHero
        title="Sitemap"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Sitemap" },
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
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <h2 className="bb-section-title">Find every important page in one place</h2>
                  <div className="bb-text max-w-2xl">
                    <p>
                      This sitemap page helps parents, visitors, and search engines quickly access
                      the main Blue Blocks pages, programme pages, innovation sections, and key
                      resources.
                    </p>
                    <p>
                      It follows a simple, standard website sitemap layout while keeping the same
                      visual language already used across your site.
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[24px]">
                  <Image
                    src="/about-us/hero.webp"
                    alt="Blue Blocks campus banner"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
      </section>

      <section className="bb-ui bg-[#EEF7FD]">
        <div className="bb-section">
          <div className="bb-section__inner">
            <Container>
              <div className="grid gap-6 md:grid-cols-2">
                {sitemapGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-[1.35rem] font-semibold text-slate-900">
                      {group.title}
                    </h3>

                    <ul className="mt-5 space-y-3">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="inline-flex text-[15px] leading-7 text-slate-700 transition hover:text-slate-950"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}
