import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "About Blue Blocks | AMI Montessori Since 2009 | Our Story & Mission",
  description:
    "Since 2009, Blue Blocks has stood as a sanctuary of authentic Montessori practice in Hyderabad. Founded by Pavan Goyal (all four AMI Diplomas) and Munira Hussain, offering a continuous developmental journey from infancy through adolescence.",
  keywords: [
    "Blue Blocks founders",
    "Pavan Goyal Montessori",
    "Munira Hussain",
    "AMI diploma 0-18",
    "Montessori school history Hyderabad",
    "authentic Montessori India",
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.blueblocks.in/about",
    languages: {
      "en-in": "https://www.blueblocks.in/about",
      "x-default": "https://www.blueblocks.in/about",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.blueblocks.in/about",
    title: "About Blue Blocks | AMI Montessori Since 2009 | Our Story & Mission",
    description:
      "Since 2009, Blue Blocks has stood as a sanctuary of authentic Montessori practice in Hyderabad. Founded by Pavan Goyal (all four AMI Diplomas) and Munira Hussain, offering a continuous developmental journey from infancy through adolescence.",
    images: [
      {
        url: "https://www.blueblocks.in/images/og-about.jpg",
        alt: "Blue Blocks founders Pavan Goyal and Munira Hussain",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const dynamic = "force-static";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.blueblocks.in/about/#webpage",
      url: "https://www.blueblocks.in/about",
      name: "About Blue Blocks | Our Story, Founders & Mission",
      description:
        "Since 2009, Blue Blocks has stood as a sanctuary of authentic Montessori practice in Hyderabad, offering a continuous developmental journey from infancy through adolescence.",
      isPartOf: { "@id": "https://www.blueblocks.in/#website" },
      publisher: { "@id": "https://www.blueblocks.in/#organization" },
      mainEntity: { "@id": "https://www.blueblocks.in/#organization" },
    },
    {
      "@type": "Person",
      "@id": "https://www.blueblocks.in/#pavan",
      name: "Pavan Goyal",
      jobTitle: "Founder & Principal",
      description:
        "Pavan holds the rare distinction of all four AMI Diplomas (0-3, 3-6, 6-12, 12-18), making him one of the few people globally certified across the complete Montessori continuum. He serves as the Principal Investigator for the Blue Blocks Micro Research Institute and leads the Innovation Programme.",
      worksFor: { "@id": "https://www.blueblocks.in/#organization" },
      alumniOf: {
        "@type": "Organization",
        name: "Association Montessori Internationale",
        sameAs: "https://montessori-ami.org/",
      },
      knowsAbout: [
        "Montessori education",
        "Adolescent development",
        "CubeSat engineering education",
        "Educational research methodology",
        "Innovation pedagogy",
      ],
      sameAs: "https://www.linkedin.com/in/pavangoel/",
    },
    {
      "@type": "Person",
      "@id": "https://www.blueblocks.in/#munira",
      name: "Munira Hussain",
      jobTitle: "Co-Founder & Director of Pedagogy",
      description:
        "Munira ensures that every classroom remains a psychological sanctuary for the child. She leads the Parent Education Programme and Guide Training, having conducted workshops for over 40,000 parents across 18 years.",
      worksFor: { "@id": "https://www.blueblocks.in/#organization" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.blueblocks.in/about/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is Montessori rigorous enough for academic success?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Montessori is more rigorous than traditional schooling because it demands active engagement. A child cannot zone out; they must actively construct their knowledge. This builds the executive function and deep concentration required for Cambridge IGCSE, university, and life.",
          },
        },
        {
          "@type": "Question",
          name: "How does Blue Blocks handle examinations?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "We introduce the Cambridge IGCSE framework in Grade 7. By this age, the Montessori child has developed deep concentration and self-regulation. We treat exams as another practical life challenge to be mastered, not feared.",
          },
        },
        {
          "@type": "Question",
          name: "Can I enrol my child at any age?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Primary admissions open at ages 15 months, 2.5, and 6. Joining later is possible but requires a discussion to ensure the child can adapt to the freedom of a Montessori environment.",
          },
        },
        {
          "@type": "Question",
          name: "Is the research component intrusive to children?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Never. Our observation methodology is passive and invisible. We prioritise the child's privacy and comfort above all else. To the child, we are simply their teachers and guides.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.blueblocks.in/about/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.blueblocks.in/" },
        { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.blueblocks.in/about" },
      ],
    },
  ],
};

export default function AboutUsPage() {
  const page = siteData?.pages?.aboutUs || {};
  const sections = Array.isArray(page?.sections) ? page.sections : [];

  return (
    <>
      <JsonLd id="about-jsonld-graph" data={structuredData} />
      <SectionRenderer sections={sections} />
    </>
  );
}
