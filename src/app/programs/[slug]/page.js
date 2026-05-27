import siteData from "@/data/site";
import { notFound } from "next/navigation";
import SectionRenderer from "@/lib/sectionRenderer";
import PageJsonLd from "@/components/seo/PageJsonLd";

export const dynamic = "force-static";
export const dynamicParams = false;

function getProgramsMap() {
  return siteData?.pages?.programDetails || {};
}

export function generateStaticParams() {
  const map = getProgramsMap();
  return Object.keys(map).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = PROGRAM_META[slug] || {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://www.blueblocks.in/programs/${slug}/`,
    },
  };
}

const PROGRAM_META = {
  "playgroup": {
    title: "Playgroup (Ages 1-3) | Toddler Community | Blue Blocks Montessori",
    description:
      "AMI Toddler Community for ages 15 months to 3 years. Gentle settlement, language immersion, practical life - the foundations of independence.",
  },
  "nursery-school": {
    title: "Nursery, PP1, PP2 (Ages 3-6) | Children's House | Blue Blocks Montessori",
    description:
      "AMI Children's House for ages 3-6. Sensorial materials, language explosion, mathematical mind, and the absorbent mind at work.",
  },
  "primary-school-elementary": {
    title: "Primary School - Class 1 to 6 | Elementary | Blue Blocks Montessori",
    description:
      "AMI Elementary (ages 6-12) integrated with Cambridge curriculum. Cosmic education, the reasoning mind, and project-based learning.",
  },
  "secondary-school": {
    title: "Secondary School - Class 7 to 10 | Adolescent Community | Blue Blocks Montessori",
    description:
      "AMI Adolescent Programme (ages 12-18) with Cambridge IGCSE. Micro-Economy, Innovation Labs, CubeSat engineering, and education for peace.",
  },
};

const PROGRAM_SCHEMA_DETAILS = {
  "playgroup": {
    crumbName: "Playgroup",
    courseName: "Toddler Community Programme",
    alternateName: "Ages 1-3 (Playgroup)",
    courseDescription:
      "AMI Toddler Community for ages 15 months to 3 years. Practical life, language, movement, and gentle settlement in a Montessori prepared environment.",
    educationalLevel: "Pre-Primary",
    teaches: [
      "Practical life and self-care",
      "Language acquisition through immersion",
      "Coordination and refinement of movement",
      "Independence and concentration",
    ],
    audience: "Children aged 15 months to 3 years",
  },
  "nursery-school": {
    crumbName: "Children's House (Nursery, PP1, PP2)",
    courseName: "Children's House Programme",
    alternateName: "Ages 3-6 (Nursery, PP1, PP2)",
    courseDescription:
      "AMI Primary Montessori (Children's House) for ages 3 to 6. Sensorial education, language, mathematics, geography, and culture.",
    educationalLevel: "Pre-Primary",
    teaches: [
      "Sensorial materials and discrimination",
      "Phonetic reading and writing",
      "Mathematical mind via concrete materials",
      "Geography and cultural studies",
      "Grace and courtesy",
    ],
    audience: "Children aged 3 to 6 years",
  },
  "primary-school-elementary": {
    crumbName: "Primary (Elementary)",
    courseName: "Elementary Programme",
    alternateName: "Class 1 to 6 (Ages 6-12)",
    courseDescription:
      "AMI Montessori Elementary integrated with Cambridge primary curriculum. Cosmic Education, Great Lessons, project-based learning.",
    educationalLevel: "Primary",
    educationalCredentialAwarded: "Cambridge Primary",
    teaches: [
      "The Five Great Lessons / Cosmic Education",
      "Mathematics and geometry",
      "Language arts and grammar",
      "Biology, history, geography",
      "Going-out projects and research",
    ],
    audience: "Children aged 6 to 12 years",
  },
  "secondary-school": {
    crumbName: "Adolescent",
    courseName: "Adolescent Programme",
    alternateName: "Grades 7-10",
    courseDescription:
      "Montessori Adolescent for ages 12-18. Micro-Economy, Innovation Labs, Cambridge/IGCSE. Development of deep conscience, social consciousness, cosmic responsibility.",
    educationalLevel: "Secondary",
    educationalCredentialAwarded: "Cambridge IGCSE",
    teaches: [
      "Deep conscience and moral development",
      "Economic and ecological literacy through Micro-Economy",
      "Social consciousness and community responsibility",
      "Innovation with cosmic responsibility",
      "Education for Peace",
    ],
    audience: "Adolescents aged 12 to 18 years",
  },
};

function buildProgramSchema(slug) {
  const detail = PROGRAM_SCHEMA_DETAILS[slug];
  if (!detail) return [];
  const url = `https://www.blueblocks.in/programs/${slug}/`;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: detail.courseName,
    alternateName: detail.alternateName,
    description: detail.courseDescription,
    provider: {
      "@type": "EducationalOrganization",
      name: "Blue Blocks Montessori",
      sameAs: "https://www.blueblocks.in/",
    },
    url,
    educationalLevel: detail.educationalLevel,
    teaches: detail.teaches,
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: detail.audience,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: {
        "@type": "Place",
        name: "Blue Blocks Montessori, Hyderabad",
      },
      courseWorkload: "PT35H",
    },
  };

  if (detail.educationalCredentialAwarded) {
    courseSchema.educationalCredentialAwarded = detail.educationalCredentialAwarded;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.blueblocks.in/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Programs",
        item: "https://www.blueblocks.in/programs/",
      },
      { "@type": "ListItem", position: 3, name: detail.crumbName, item: url },
    ],
  };

  return [breadcrumbSchema, courseSchema];
}

export default async function ProgramPage({ params }) {
  const { slug } = await params;
  const map = getProgramsMap();

  const page = map?.[slug];
  if (!page) notFound();

  const sections = Array.isArray(page?.sections) ? page.sections : [];

  const ownSchema = Array.isArray(page?.schema) ? page.schema : page?.schema ? [page.schema] : [];
  const generated = buildProgramSchema(slug);
  const schema = [...ownSchema, ...generated];

  return (
    <>
      <PageJsonLd baseId={`programs-${slug}`} schema={schema} />
      <SectionRenderer sections={sections} />
    </>
  );
}

