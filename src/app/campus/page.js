import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";

export const metadata = {
  alternates: { canonical: "https://www.blueblocks.in/campus/" },
};

export default function CampusPage() {
  const page = siteData?.pages?.campus || {};
  const baseSections = Array.isArray(page?.sections) ? page.sections : [];

  const gachibowliSection = {
    type: "imageText",
    props: {
      sectionBg: "bg-[#EEF7FD]",
      title: "Gachibowli Campus Support Content",
      text: [
        "This section is scaffolded for Gachibowli GBP-support updates.",
        "TODO: Insert approved campus-specific FAQ, innovation highlights, CubeSat references, and Micro Research Institute context for Gachibowli."
      ],
      imageUrl: "/campus/campus1-min.webp",
      variant: "card",
      cardBg: "#EEF7FD",
      cardRadius: "rounded-2xl",
      cardPadding: "p-8 sm:p-10",
    },
  };

  const gachibowliFaq = {
    type: "faq",
    props: {
      bg: "#FFFFFF",
      title: "Gachibowli FAQ (GBP Support)",
      subtitle: "Scaffolded placeholder entries until finalized copy is provided.",
      defaultOpenIndex: 0,
      items: [
        {
          q: "What ages are primarily served at Gachibowli?",
          a: "TODO: Add approved age-band messaging for Gachibowli campus."
        },
        {
          q: "How does Gachibowli connect to innovation pathways?",
          a: "TODO: Add approved bridge narrative from foundational work to innovation environments."
        },
        {
          q: "How does the Micro Research Institute support this campus?",
          a: "TODO: Add campus-specific research integration details."
        },
      ],
    },
  };

  const tellapurSection = {
    type: "imageText",
    props: {
      sectionBg: "bg-[#F3E3CF]",
      title: "Tellapur Campus Support Content",
      text: [
        "This section is scaffolded for Tellapur GBP-support updates.",
        "TODO: Insert approved Tellapur-specific FAQ, innovation highlights, CubeSat mission references, and Micro Research Institute context."
      ],
      imageUrl: "/campus/campus4-min.webp",
      variant: "card",
      cardBg: "#F3E3CF",
      cardRadius: "rounded-2xl",
      cardPadding: "p-8 sm:p-10",
    },
  };

  const tellapurFaq = {
    type: "faq",
    props: {
      bg: "#FFFFFF",
      title: "Tellapur FAQ (GBP Support)",
      subtitle: "Scaffolded placeholder entries until finalized copy is provided.",
      defaultOpenIndex: 0,
      items: [
        {
          q: "Which programs and stages run at Tellapur?",
          a: "TODO: Add approved Tellapur program continuity summary."
        },
        {
          q: "How is CubeSat mission work represented at Tellapur?",
          a: "TODO: Add approved CubeSat mission content for campus-level communication."
        },
        {
          q: "How does Tellapur align with research-backed practice?",
          a: "TODO: Add approved Micro Research Institute alignment summary."
        },
      ],
    },
  };

  const hasCampusSupport = baseSections.some(
    (section) => section?.props?.title === "Gachibowli Campus Support Content"
  );

  const sections = hasCampusSupport
    ? baseSections
    : [...baseSections, gachibowliSection, gachibowliFaq, tellapurSection, tellapurFaq];

  const infraSection = baseSections.find((section) => section?.type === "hexaInfrastructure");
  const infraItems = Array.isArray(infraSection?.props?.items) ? infraSection.props.items : [];

  const infraFaqEntities = infraItems
    .filter((item) => item?.modal?.title && Array.isArray(item?.modal?.paragraphs))
    .slice(0, 6)
    .map((item) => ({
      "@type": "Question",
      name: item.modal.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.modal.paragraphs.join(" "),
      },
    }));

  const schema = [
    ...(Array.isArray(page?.schema) ? page.schema : []),
    ...(infraFaqEntities.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: infraFaqEntities,
          },
        ]
      : []),
  ];

  return (
    <>
      <PageJsonLd baseId="campus" schema={schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

