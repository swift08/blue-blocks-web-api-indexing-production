import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/blocks/PageHero";
import Container from "@/components/layout/Container";
import PageJsonLd from "@/components/seo/PageJsonLd";

export default function FounderProfilePage({ founder }) {
  const slug = String(founder?.readMoreHref || "")
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .pop();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: founder?.name || "Founder",
      url: slug ? `#/about-us/founders/${slug}/` : undefined,
      isPartOf: { "@id": "##website" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: founder?.name || "Founder",
      jobTitle: founder?.tagline || founder?.roleLabel || "Founder",
      description: founder?.bio || "Founder profile at Blue Blocks.",
      image: founder?.image || undefined,
      worksFor: {
        "@type": "EducationalOrganization",
        name: "Blue Blocks",
      },
      sameAs: (founder?.modal?.social || [])
        .map((item) => item?.href)
        .filter(Boolean),
    },
  ];

  return (
    <>
      <PageJsonLd baseId={`founder-${slug || "profile"}`} schema={schema} />

      <PageHero
        title={founder?.name || "Founder"}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about-us/" },
          { label: "Founders", href: "/about-us/" },
          { label: founder?.name || "Founder" },
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
              <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="relative h-[320px] overflow-hidden rounded-xl bg-slate-100">
                    {founder?.image ? (
                      <Image
                        src={founder.image}
                        alt={founder?.imageAlt || founder?.name || "Founder"}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                    ) : null}
                  </div>
                  {founder?.roleLabel ? (
                    <div className="mt-4 rounded-lg bg-[#E08B64] px-3 py-2 text-center text-sm font-medium text-white">
                      {founder.roleLabel}
                    </div>
                  ) : null}
                </div>

                <article className="rounded-2xl border border-slate-200 p-6 sm:p-8">
                  {founder?.tagline ? (
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                      {founder.tagline}
                    </p>
                  ) : null}
                  <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                    {founder?.name}
                  </h1>
                  {founder?.bio ? (
                    <p
                      className="mt-4 text-sm leading-7 text-slate-700"
                      dangerouslySetInnerHTML={{ __html: founder.bio }}
                    />
                  ) : null}

                  <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                    {(founder?.modal?.content || [
                      "TODO: Founder long-form profile content will be added here.",
                    ]).map((entry, idx) => {
                      if (typeof entry === "string") {
                        return (
                          <p
                            key={idx}
                            dangerouslySetInnerHTML={{ __html: entry }}
                          />
                        );
                      }

                      if (entry && typeof entry === "object") {
                        return (
                          <p key={idx}>
                            {entry.label ? <strong>{entry.label}: </strong> : null}
                            <span
                              dangerouslySetInnerHTML={{ __html: entry.text || "" }}
                            />
                          </p>
                        );
                      }

                      return null;
                    })}
                  </div>

                  {(founder?.modal?.social || []).length ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {founder.modal.social
                        .filter((item) => item?.href)
                        .map((item) => (
                          <Link
                            key={`${item.label}-${item.href}`}
                            href={item.href}
                            target={/^https?:\/\//.test(item.href) ? "_blank" : undefined}
                            rel={/^https?:\/\//.test(item.href) ? "noreferrer" : undefined}
                            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
                          >
                            {item.label}
                          </Link>
                        ))}
                    </div>
                  ) : null}
                </article>
              </div>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}
