export const PAPER_AUTHOR_BYLINE =
  "By Pavan Goyal, Principal Investigator, Blue Blocks Micro Research Institute";

export const PAPER_SERIES = [
  {
    id: "paper-2",
    slug: "neuropsychiatry-of-toddler-plane",
    legacySlug: "toddler-developmental-architecture",
    pageKey: "toddlerDevelopmentalArchitecture",
    title: "Neuropsychiatry of the Toddler Plane",
    shortTitle: "Neuropsychiatry of the Toddler Plane",
    publishedDate: "To be updated",
    summary:
      "Developmental architecture for the toddler community, grounding movement, language, and early executive function.",
  },
  {
    id: "paper-4",
    slug: "the-conscious-construction-of-intelligence",
    pageKey: "theConsciousConstructionOfIntelligence",
    title: "The Conscious Construction of Intelligence",
    shortTitle: "The Conscious Construction of Intelligence",
    publishedDate: "To be updated",
    summary:
      "Developmental architecture of the Children's House and the transition from unconscious to conscious absorption.",
  },
  {
    id: "paper-6",
    slug: "the-architecture-of-the-universe",
    pageKey: "theArchitectureOfTheUniverse",
    title: "The Architecture of the Universe",
    shortTitle: "The Architecture of the Universe",
    publishedDate: "February 24, 2026",
    summary:
      "Elementary developmental framework linking Cosmic Education, moral reasoning, and innovation readiness.",
  },
  {
    id: "paper-8",
    slug: "adolescent-social-newborn-paper",
    pageKey: "adolescentSocialNewbornPaper",
    title: "The Social Newborn",
    shortTitle: "The Social Newborn",
    publishedDate: "February 24, 2026",
    summary:
      "Third-plane developmental foundations for the adolescent community and social valorization.",
  },
];

export const BLOG_POSTS = [
  {
    slug: "helicopter-parenting-and-the-independence-gap",
    title: "Helicopter Parenting and the Independence Gap",
    excerpt:
      "Why over-assistance can delay executive function and what constructive independence looks like at home.",
    category: "Parenting",
    publishedDate: "To be updated",
  },
  {
    slug: "the-huge-gap-between-marks-and-learning",
    title: "The Huge Gap Between Marks and Learning",
    excerpt:
      "A practical guide to separating assessment scores from durable understanding and capability.",
    category: "Learning Science",
    publishedDate: "To be updated",
  },
  {
    slug: "why-octagonal-classrooms-support-focus",
    title: "Why Octagonal Classrooms Support Focus",
    excerpt:
      "How geometry, acoustics, and movement pathways can reduce cognitive overhead in early learning spaces.",
    category: "Campus Design",
    publishedDate: "To be updated",
  },
  {
    slug: "cubsat-mission-how-students-build-real-systems",
    title: "CubeSat Mission: How Students Build Real Systems",
    excerpt:
      "From prepared environments to applied systems engineering in adolescent innovation programs.",
    category: "Innovation",
    publishedDate: "To be updated",
  },
];

export const RESEARCH_PUBLICATIONS = [
  {
    slug: "inspace-authorization-cubesat-mission",
    title: "IN-SPACe Authorization: Student CubeSat Mission",
    meta: "Authorization Dossier • 2025",
    summary:
      "Formal authorization and mission-governance documentation for Blue Blocks student CubeSat participation.",
    pageUrl: "/publications/inspace-authorization-cubesat-mission/",
    downloadUrl: "#",
    image: "/research/pub1a.webp",
    kind: "publication",
  },
  {
    slug: "longitudinal-innovation-development-0-18",
    title: "A Longitudinal Study of Innovation Development (0–18)",
    meta: "Flagship Publication • In Development",
    summary:
      "A developmental continuum study tracking innovation capacities from birth through adolescence.",
    pageUrl: "/publications/longitudinal-innovation-development-0-18/",
    downloadUrl: "#",
    image: "/research/pub1.webp",
    kind: "publication",
  },
  {
    slug: "research-briefs-series",
    title: "Research Briefs Series",
    meta: "Practitioner Notes",
    summary:
      "Short publications addressing specific developmental and pedagogical research questions.",
    pageUrl: "/publications/research-briefs-series/",
    downloadUrl: "#",
    image: "/research/pub2.webp",
    kind: "publication",
  },
  {
    slug: "methodological-contributions-observation-protocols",
    title: "Methodological Contributions: Observation Protocols",
    meta: "Methods and Instrumentation",
    summary:
      "Observation coding systems, reliability protocol notes, and analytical framework documentation.",
    pageUrl: "/publications/methodological-contributions-observation-protocols/",
    downloadUrl: "#",
    image: "/research/pub3.webp",
    kind: "publication",
  },
];

export const RESEARCH_PATENTS = [
  {
    slug: "drone-patent-series-2019",
    title: "Drone Patent Series (Student Filings, 2019)",
    meta: "Patent Dossier",
    summary:
      "Consolidated overview of student drone patent applications and design intent documentation.",
    pageUrl: "/publications/drone-patent-series-2019/",
    downloadUrl: "#",
    image: "/research/patent.webp",
    kind: "patent",
  },
];

export const RESEARCH_OUTPUTS = [...RESEARCH_PUBLICATIONS, ...RESEARCH_PATENTS];

export function getPaperBySlug(slug = "") {
  return PAPER_SERIES.find((item) => item.slug === slug) || null;
}

