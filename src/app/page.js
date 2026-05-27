import siteData from "@/data/site";
import SectionRenderer from "@/lib/sectionRenderer";
import JsonLd from "@/components/seo/JsonLd";

export const dynamic = "force-static";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),

  // <title>...</title>
  title: "Blue Blocks Montessori School | AMI-Certified Education (Ages 1-18) | Hyderabad homepage",

  // <meta name="description" ... />
  description:
    "Blue Blocks is an AMI-certified Montessori school and micro-research institute in Hyderabad offering continuous developmental education from 15 months to 18 years. Innovation labs, student patents, CubeSat engineering, and Cambridge IGCSE integration.",

  // <meta name="keywords" ... />
  keywords: [
    "Montessori school Hyderabad",
    "AMI certified Montessori",
    "best preschool Gachibowli",
    "Montessori education India",
    "innovation education children",
    "Blue Blocks school",
    "BlueBlocks",
    "STEM school Hyderabad",
    "Cambridge IGCSE Montessori",
    "Blue Blocks Complete School",
    "Blue Blocks Micro Research Institute",
  ],

  // <meta name="robots" ... />
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },

  // <link rel="canonical" href="https://www.blueblocks.in/" />
  alternates: {
    canonical: "https://www.blueblocks.in/",
    languages: {
      "en-in": "https://www.blueblocks.in/",
      "x-default": "https://www.blueblocks.in/",
    },
  },

  // Open Graph tags
  openGraph: {
    type: "website",
    url: "https://www.blueblocks.in/",
    locale: "en_IN",
    siteName: "Blue Blocks Montessori School",
    title: "Blue Blocks Montessori School | AMI-Certified Education (Ages 1-18) | Hyderabad",
    description:
      "Blue Blocks is an AMI-certified Montessori school and micro-research institute in Hyderabad offering continuous developmental education from 15 months to 18 years. Innovation labs, student patents, CubeSat engineering, and Cambridge IGCSE integration.",
    images: [
      {
        url: "https://www.blueblocks.in/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Blocks Montessori School campus in Hyderabad",
      },
    ],
  },

  // Twitter tags
  twitter: {
    card: "summary_large_image",
    site: "@BlueblocksEdu",
    title: "Blue Blocks | AMI Montessori School, Hyderabad (Ages 1-18)",
    description:
      "AMI-certified Montessori from toddler to adolescence. Innovation labs, CubeSat engineering, student patents, Cambridge IGCSE.",
    images: ["https://www.blueblocks.in/images/og-homepage.jpg"],
  },

  // Geo meta tags (go under "other")
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad",
    "geo.position": "17.4506;78.3562",
    ICBM: "17.4506, 78.3562",
  },

  // Favicon (keep these in layout.js ideally, but safe here too)
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const structuredData = {
"@context": "https://schema.org",
"@graph": [
  {
    "@type": "WebSite",
    "@id": "https://www.blueblocks.in/#website",
    "url": "https://www.blueblocks.in/",
    "name": "Blue Blocks Montessori School",
    "description": "AMI-certified Montessori education from 15 months to 18 years. Innovation labs, student patents, CubeSat engineering, and Cambridge IGCSE integration.",
    "publisher": {
      "@id": "https://www.blueblocks.in/#organization"
    },
    "inLanguage": "en-IN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.blueblocks.in/searchq={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  },


  {
    "@type": ["EducationalOrganization", "ResearchOrganization"],
    "@id": "https://www.blueblocks.in/#organization",


    "name": "Blue Blocks Montessori School",
    "legalName": "Blue Blocks Montessori Educational Society",
    "alternateName": [
      "Blue Blocks",
      "BlueBlocks",
      "Blue Blocks Complete School",
      "Blue Blocks Montessori Educational Society"
    ],
    "disambiguatingDescription": "AMI-certified Montessori school and micro-research institute in Hyderabad, India, offering continuous developmental education from 15 months to 18 years with innovation labs in space technology, drone engineering, and biomimicry.",


    "url": "https://www.blueblocks.in/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.blueblocks.in/images/logo.svg",
      "width": 300,
      "height": 100
    },
    "image": "https://www.blueblocks.in/images/campus-aerial.jpg",
    "description": "An AMI-certified Montessori school and micro-research institute in Hyderabad offering continuous developmental education from 15 months to 18 years. The only school in India with a student-built ISRO-manifested CubeSat payload, 5 filed drone patents, and innovation labs in biomimicry, drone technology, and space engineering.",
    "foundingDate": "2009",
    "numberOfStudents": {
      "@type": "QuantitativeValue",
      "value": 847,
      "unitText": "cumulative students since founding"
    },
    "founder": [
      {
        "@type": "Person",
        "@id": "https://www.blueblocks.in/#pavan",
        "name": "Pavan Goyal",
        "jobTitle": "Founder & Principal",
        "description": "Holds all four AMI Diplomas (0-3, 3-6, 6-12, 12-18) - the complete Montessori continuum. Principal Investigator at Blue Blocks Micro Research Institute.",
        "sameAs": "https://www.linkedin.com/in/pavangoel/"
      },
      {
        "@type": "Person",
        "@id": "https://www.blueblocks.in/#munira",
        "name": "Munira Hussain",
        "jobTitle": "Co-Founder & Director of Pedagogy",
        "description": "Leads parent education programmes and guide training. Ensures every classroom remains a psychological sanctuary for the child."
      }
    ],
    "telephone": ["+919000955050", "+919000955053"],
    "email": "info@blueblocks.in",
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Gachibowli Campus (Preschool & Primary)",
        "streetAddress": "MIG 3, Lane opposite to DLF, APHB Colony, Gachibowli",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500032",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "name": "Tellapur Campus (Complete School)",
        "streetAddress": "Osman Nagar Road, Tellapur",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "502032",
        "addressCountry": "IN"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4506609,
      "longitude": 78.3562301
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "16:30"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "Hyderabad",
      "sameAs": "https://en.wikipedia.org/wiki/Hyderabad"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "AMI Montessori Certification (All Four Planes)",
        "credentialCategory": "Accreditation",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Association Montessori Internationale",
          "sameAs": [
            "https://en.wikipedia.org/wiki/Association_Montessori_Internationale",
            "https://montessori-ami.org/"
          ]
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Cambridge International School",
        "credentialCategory": "Accreditation",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Cambridge Assessment International Education",
          "sameAs": "https://en.wikipedia.org/wiki/Cambridge_Assessment_International_Education"
        }
      }
    ],
    "knowsAbout": [
      {"@type": "Thing", "name": "Montessori education", "sameAs": "https://en.wikipedia.org/wiki/Montessori_education"},
      {"@type": "Thing", "name": "Biomimetics", "sameAs": "https://en.wikipedia.org/wiki/Biomimetics"},
      {"@type": "Thing", "name": "CubeSat", "sameAs": "https://en.wikipedia.org/wiki/CubeSat"},
      {"@type": "Thing", "name": "STEM education", "sameAs": "https://en.wikipedia.org/wiki/Science,_technology,_engineering,_and_mathematics"},
      {"@type": "Thing", "name": "Unmanned aerial vehicle", "sameAs": "https://en.wikipedia.org/wiki/Unmanned_aerial_vehicle"},
      {"@type": "Thing", "name": "Design thinking", "sameAs": "https://en.wikipedia.org/wiki/Design_thinking"},
      {"@type": "Thing", "name": "Executive functions", "sameAs": "https://en.wikipedia.org/wiki/Executive_functions"},
      {"@type": "Thing", "name": "Peace education", "sameAs": "https://en.wikipedia.org/wiki/Peace_education"},
      {"@type": "Thing", "name": "Cosmic Education", "sameAs": "https://en.wikipedia.org/wiki/Cosmic_Education"}
    ],
    "additionalType": [
      "https://www.wikidata.org/entity/Q638507",
      "https://www.wikidata.org/entity/Q31855"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Association Montessori Internationale (AMI)",
        "sameAs": "https://montessori-ami.org/"
      },
      {
        "@type": "Organization",
        "name": "Cambridge Assessment International Education (CAIE)",
        "sameAs": "https://www.cambridgeinternational.org/"
      }
    ],
    "affiliation": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Indian Institute of Technology Hyderabad",
        "sameAs": "https://en.wikipedia.org/wiki/Indian_Institute_of_Technology_Hyderabad"
      }
    ],
    "award": [
      "Best Pre-School in Hyderabad - Times of India (3 Consecutive Years)",
      "ISRO IN-SPACe Authorization for Student CubeSat Mission (2025)",
      "Invited Presentation - Nobel Peace Centre, Oslo (2024)"
    ],


    "department": [
      {
        "@type": "ResearchOrganization",
        "@id": "https://www.blueblocks.in/#microresearch",
        "name": "Blue Blocks Micro Research Institute",
        "description": "The research arm of Blue Blocks Montessori School. Conducts longitudinal observational research on child development across a 15-year dataset of 847 children within authentic Montessori environments.",
        "parentOrganization": {
          "@id": "https://www.blueblocks.in/#organization"
        },
        "knowsAbout": [
          {"@type": "Thing", "name": "Longitudinal study", "sameAs": "https://en.wikipedia.org/wiki/Longitudinal_study"},
          {"@type": "Thing", "name": "Child development", "sameAs": "https://en.wikipedia.org/wiki/Child_development"},
          {"@type": "Thing", "name": "Observational study", "sameAs": "https://en.wikipedia.org/wiki/Observational_study"},
          {"@type": "Thing", "name": "Executive functions", "sameAs": "https://en.wikipedia.org/wiki/Executive_functions"}
        ]
      },
      {
        "@type": "ResearchOrganization",
        "@id": "https://www.blueblocks.in/#foundation",
        "name": "Blue Blocks Research Institute Foundation",
        "description": "The philanthropic and research-funding arm supporting longitudinal studies in child development, innovation pedagogy, and Montessori educational outcomes.",
        "parentOrganization": {
          "@id": "https://www.blueblocks.in/#organization"
        }
      },
      {
        "@type": "ResearchOrganization",
        "@id": "https://www.blueblocks.in/#spacelab",
        "name": "Blue Blocks Space Lab",
        "description": "Student-led aerospace research facility where adolescents design CubeSat payloads and conduct space science experiments.",
        "parentOrganization": {
          "@id": "https://www.blueblocks.in/#organization"
        }
      },
      {
        "@type": "ResearchOrganization",
        "@id": "https://www.blueblocks.in/#dronelab",
        "name": "Blue Blocks Drone Lab",
        "description": "Student drone research and innovation centre. Five patent applications filed with the Indian Patent Office by elementary students aged 8-12.",
        "parentOrganization": {
          "@id": "https://www.blueblocks.in/#organization"
        }
      },
      {
        "@type": "ResearchOrganization",
        "@id": "https://www.blueblocks.in/#biomimicry",
        "name": "Blue Blocks Biomimicry Hive",
        "description": "Hexagonal research space designed by IIT Hyderabad for nature-inspired innovation education and regenerative engineering.",
        "parentOrganization": {
          "@id": "https://www.blueblocks.in/#organization"
        }
      },
      {
        "@type": "ResearchOrganization",
        "@id": "https://www.blueblocks.in/#innovationlab",
        "name": "Blue Blocks Innovation Lab",
        "description": "Ethical making and design facility with 500 tools across all three Planes of Development, from hand tools to CNC machines.",
        "parentOrganization": {
          "@id": "https://www.blueblocks.in/#organization"
        }
      }
    ],


    "sameAs": [
      "https://www.linkedin.com/school/blue-blocks-school/",
      "https://www.facebook.com/BlueblocksSchool",
      "https://www.instagram.com/blueblocksmontessorischool/",
      "https://www.youtube.com/channel/UCnJ6uX3B-uwAg63PgTK0LhQ"
    ],


    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalOccupationalProgram",
          "name": "AMI Montessori Continuum (Ages 1-18)",
          "description": "Continuous Montessori developmental education across all four planes of development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Student Patent Incubation",
          "description": "In 2019, Blue Blocks elementary students aged 8-12 filed 5 patent applications with the Indian Patent Office for drone innovations."
        }
      }
    ]
  },


  {
    "@type": "FAQPage",
    "@id": "https://www.blueblocks.in/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do you mix ages in one classroom",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because real life is not segregated by birth year. In a mixed-age community, younger children learn by watching, and older children master concepts by teaching. This builds deep social intelligence and mirrors how humans have learned for millennia."
        }
      },
      {
        "@type": "Question",
        "name": "How does Montessori prepare children for the real world",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The real world rewards those who can think, adapt, and solve problems independently. By prioritising executive function over rote memorisation, we prepare children to lead, not just follow. Our students transition seamlessly to Cambridge IGCSE and university entrance."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Blue Blocks research approach",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Education should be a science, not an assumption. Our internal observation team at the Blue Blocks Micro Research Institute studies how children learn best across a 15-year longitudinal dataset. We don't experiment on children; we learn from them."
        }
      }
    ]
  }
]
};

const HOME_HERO_SLIDES = [
  {
    id: "home-hero-1",
    title: "The Child,\nUnderstood",
    subtitle:
      "We don't teach. We observe. Then we build the precise environment your child needs to construct themselves.",
    primaryCta: { label: "Explore Our Programmes", href: "/programs/" },
    secondaryCta: { label: "Visit the Campus", href: "/campus/" },
    bgImageUrl: "/home/homepage-banner-01.webp",
    align: "left",
    overlay: "dark",
    topSpacing: "home",
  },
  {
    id: "home-hero-2",
    title: "A Sanctuary for Your Child's Becoming",
    subtitle:
      "We don't rush the separation. We stay with your child until trust is built - on her timeline, not ours.",
    primaryCta: { label: "The Toddler Community", href: "/programs/" },
    secondaryCta: { label: "Book a Visit", href: "/contact-us/" },
    bgImageUrl: "/home-01/kids-being-part-sunday-school.webp",
    align: "left",
    overlay: "dark",
    topSpacing: "home",
  },
  {
    id: "home-hero-3",
    title: "The Same Hands That Built the Pink Tower Built a Satellite",
    subtitle:
      "Between a wooden cube and a CubeSat in orbit lies eighteen years of conscience, capability, and care.",
    primaryCta: { label: "The Adolescent Community", href: "/programs/secondary-school/" },
    bgImageUrl: "/innovation/innov_hero.webp",
    align: "left",
    overlay: "dark",
    topSpacing: "home",
  },
  {
    id: "home-hero-4",
    title: "Hands That Build Minds - and Conscience",
    subtitle:
      "Five hundred tools across eighteen years. Every one introduced with purpose, used with care, returned with respect.",
    primaryCta: { label: "Explore the Labs", href: "/innovation/innovation-lab/" },
    secondaryCta: { label: "Our Philosophy", href: "/montessori-system/" },
    bgImageUrl: "/campus/blueblocks-building-pic-min.webp",
    align: "left",
    overlay: "dark",
    topSpacing: "home",
  },
  {
    id: "home-hero-5",
    title: "Cosmic Responsibility Starts at Age Three",
    subtitle:
      "The child who learned to carry a Pink Tower cube is the same one who built a satellite for ISRO.",
    primaryCta: { label: "Explore The Space Lab", href: "/innovation/space-lab/" },
    bgImageUrl: "/research/hero.webp",
    align: "left",
    overlay: "dark",
    topSpacing: "home",
  },
];

export default function HomePage() {
  const page = siteData?.pages?.home || {};
  const baseSections = Array.isArray(page?.sections) ? page.sections : [];
  const sections = baseSections.map((section, idx) => {
    if (idx !== 0 || section?.type !== "homeHero") return section;
    return {
      ...section,
      props: {
        ...(section?.props || {}),
        slides: HOME_HERO_SLIDES,
        note: "",
        topSpacing: "home",
        autoRotate: true,
        autoRotateMs: 6000,
      },
    };
  });

  return (
    <>
      <JsonLd id="home-jsonld-graph" data={structuredData} />
      
      <SectionRenderer sections={sections} />
    </>
  );
}

