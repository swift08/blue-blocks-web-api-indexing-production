"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/Container";
import CarouselTrack from "@/components/ui/carousel/CarouselTrack";
import siteData from "@/data/site";
import { normalizeSiteHref } from "@/lib/links";

/* ------------------------- helpers ------------------------- */

function isEmail(v = "") {
  const s = String(v || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function getHutkCookie() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

// HubSpot endpoint depends on region (na1/na2/eu1, etc.)
function hsBaseUrl(region = "") {
  const r = String(region || "").toLowerCase().trim();
  if (!r) return "https://api.hsforms.com";
  return `https://api-${r}.hsforms.com`;
}

async function submitToHubSpot({ portalId, formId, fields, context, region }) {
  const base = hsBaseUrl(region);
  const url = `${base}/submissions/v3/integration/submit/${portalId}/${formId}`;

  const payload = {
    fields: fields.map((f) => ({ name: f.name, value: f.value })),
    context: {
      hutk: getHutkCookie() || undefined,
      pageUri:
        context.pageUri ||
        (typeof window !== "undefined" ? window.location.href : ""),
      pageName: context.pageName || undefined,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = "Unable to submit. Please try again.";
    try {
      const j = await res.json();
      msg =
        j.message ||
        j.errors?.[0]?.message ||
        j.errors?.[0]?.error ||
        msg;
      // Helpful debug
      // eslint-disable-next-line no-console
      console.error("HubSpot newsletter error:", j);
    } catch (e) {}
    throw new Error(msg);
  }

  return true;
}

export default function Footer() {
  const { footer } = siteData;

  const [email, setEmail] = useState("");
  const [newsStatus, setNewsStatus] = useState({ type: "", msg: "" });
  const [newsSubmitting, setNewsSubmitting] = useState(false);

  const gallery = useMemo(() => {
    if (Array.isArray(footer.gallery) && footer.gallery.length) return footer.gallery;
    return [{ src: "/footer-map-img.webp", alt: "Campus" }];
  }, [footer]);

  async function onNewsletterSubmit(e) {
    e.preventDefault();
    setNewsStatus({ type: "", msg: "" });

    const v = String(email || "").trim();
    if (!v) {
      setNewsStatus({ type: "error", msg: "Please enter your email." });
      return;
    }
    if (!isEmail(v)) {
      setNewsStatus({ type: "error", msg: "Please enter a valid email address." });
      return;
    }

    const hs = footer.newsletter.hubspot;
    if (!hs.portalId || !hs.formId) {
      setNewsStatus({
        type: "error",
        msg: "Newsletter is not configured yet (missing HubSpot portalId/formId).",
      });
      return;
    }

    try {
      setNewsSubmitting(true);

      // HubSpot field name must match your form property (usually: "email")
      const fieldName = footer.newsletter.emailFieldName || "email";

      await submitToHubSpot({
        region: hs.region, // add region from JSON (ex: "na2")
        portalId: hs.portalId,
        formId: hs.formId,
        fields: [{ name: fieldName, value: v }],
        context: { pageUri: hs.pageUri, pageName: hs.pageName },
      });

      setNewsStatus({
        type: "success",
        msg: footer.newsletter.successMessage || "Subscribed successfully.",
      });
      setEmail("");
    } catch (err) {
      setNewsStatus({
        type: "error",
        msg: err.message || "Unable to subscribe. Please try again.",
      });
    } finally {
      setNewsSubmitting(false);
    }
  }

  return (
    <footer className="bg-[#141414] text-white">
      <Container>
        <div className="pt-8 sm:pt-10 lg:pt-12 pb-10">
          {/* MAIN GRID */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-6">
            {/* LEFT: GALLERY SLIDER */}
            <div className="overflow-hidden rounded-[1.75rem] bg-[#1c1c1c]">
              <FooterGallerySlider slides={gallery} />
              <div className="h-10 bg-gradient-to-r from-lime-200/30 via-amber-200/25 to-lime-200/30" />
            </div>

            {/* RIGHT: PANEL */}
            <div className="rounded-[1.75rem] bg-[#1c1c1c] p-4 sm:p-5 lg:p-6">
              {/* TOP ROW: about/newsletter + socials */}
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
                {/* About + Newsletter card */}
                <div className="rounded-[1.25rem] bg-[#232323] p-4 sm:p-5 relative z-10">
                  <div className="flex flex-col items-start gap-3">
                    <div className="relative h-10 w-12 overflow-hidden rounded-md bg-white">
                      <Image
                        src="/icon/logo.svg"
                        alt={siteData.site.name || "Blue Blocks"}
                        className="object-contain p-1"
                        fill
                        sizes="48px"
                      />
                    </div>

                    <p className="text-[0.75rem] leading-5 text-white/65">
                      {footer.aboutText}
                    </p>
                  </div>

                  {/* Newsletter */}
                  <form
                    onSubmit={onNewsletterSubmit}
                    className="mt-4 grid grid-cols-[1fr_auto] gap-3 relative z-10"
                    noValidate
                  >
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder={footer.newsletter.placeholder || "Enter Your E-mail"}
                      className="h-11 w-full rounded-xl bg-[#3a3a3a] px-4 text-[0.8125rem] text-white placeholder:text-white/45 outline-none ring-1 ring-transparent focus:ring-white/20"
                      disabled={newsSubmitting}
                    />

                    <button
                      type="submit"
                      disabled={newsSubmitting}
                      className={[
                        "h-11 rounded-xl bg-white px-4 text-[0.8125rem] font-medium text-[#111] hover:bg-white/90",
                        newsSubmitting ? "opacity-70 cursor-not-allowed" : "",
                      ].join(" ")}
                    >
                      <span className="hidden sm:inline">
                        {newsSubmitting
                          ? footer.newsletter.submittingLabel || "Submitting"
                          : footer.newsletter.buttonLabel || "Submit"}{" "}
                      </span>
                      <span aria-hidden>{"\u2192"}</span>
                    </button>
                  </form>

                  {newsStatus.msg ? (
                    <div
                      className={[
                        "mt-3 rounded-xl px-4 py-3 text-[0.8125rem]",
                        newsStatus.type === "success"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700",
                      ].join(" ")}
                    >
                      {newsStatus.msg}
                    </div>
                  ) : null}
                </div>

                {/* Social stack */}
                <div className="hidden lg:flex lg:flex-col lg:gap-3">
                  {footer.socials.map((s) => (
                    <SocialButton key={s.label} item={s} />
                  ))}
                </div>
              </div>

              {/* LINKS GRID */}
              <div className="mt-5 rounded-[1.25rem] bg-transparent">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <FooterColumn title="Quick Links" items={footer.quickLinks || []} />
                  <FooterColumn title="Programs" items={footer.programs || []} />
                  <FooterColumn title="Connect" items={footer.connect || []} />
                </div>
              </div>

              {/* CONTACT PILL */}
              <div className="mt-6 rounded-[1rem] bg-[#2a2a2a] px-4 py-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3 text-[0.75rem] text-white/70">
                    <span aria-hidden className="text-white/60">{"\u260E"}</span>
                    <Link className="whitespace-nowrap" href={`tel:${footer.contact.phone}`}>{footer.contact.phone}</Link>
                    <Link className="whitespace-nowrap" href="https://wa.link/vohpxj">{footer.contact.whatsapp}</Link>
                  </div>

                  <div className="flex items-center gap-2 text-[0.75rem] text-white/70">
                    <span aria-hidden className="text-white/60">{"\u2709"}</span>
                    <a
                      className="underline-offset-4 hover:underline"
                      href={`mailto:${footer.contact.email}`}
                    >
                      {footer.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile socials */}
              <div className="mt-5 grid grid-cols-1 gap-3 lg:hidden">
                {footer.socials.map((s) => (
                  <SocialButton key={s.label} item={s} />
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM LEGAL ROW */}
          <div className="mt-6 flex flex-col gap-3 text-[0.75rem] text-white/45 lg:flex-row lg:items-center lg:justify-between">
            <div>{"\u00A9"} 2025 Blue Blocks Micro Research Institute</div>

            <div className="flex items-center gap-2 lg:justify-end">
              <Link className="underline-offset-4 hover:underline" href="/sitemap">Sitemap</Link>
              <span className="text-white/25">{"\u00B7"}</span>
              <Link className="underline-offset-4 hover:underline" href="/privacy-policy">Privacy Policy</Link>
              <span className="text-white/25">{"\u00B7"}</span>
              <Link className="underline-offset-4 hover:underline" href="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ------------------------- Sub Components ------------------------- */

function FooterGallerySlider({ slides }) {
  return (
    <div className="relative">
      <CarouselTrack
        total={slides.length}
        perView={{ base: 1, md: 1, lg: 1 }}
        gap={0}
        className="relative"
        dots={{
          show: true,
          className:
            "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2",
          dotClassName: "h-1.5 w-10 rounded-full",
          activeClassName: "bg-white/90",
          inactiveClassName: "bg-white/25",
          focusRingClassName: "focus:ring-white/30",
          showOn: "all",
        }}
      >
        {({ cardW }) =>
          slides.map((item, idx) => (
            <div
              key={`${item.src}-${idx}`}
              className="relative shrink-0"
              style={{ width: cardW || "100%" }}
            >
              <div className="relative h-[14.5rem] sm:h-[18rem] lg:h-[32rem] w-full">
                <Image
                  src={item.src}
                  alt={item.alt || "Footer gallery"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
            </div>
          ))
        }
      </CarouselTrack>
    </div>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-[0.875rem] font-medium text-white">{title}</h4>
      <ul className="mt-3 space-y-2 text-[0.75rem] text-white/55">
        {items.map((l) => (
          <li key={l.label}>
            <Link className="hover:text-white/80 transition-colors" href={normalizeSiteHref(l.href)}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({ item }) {
  const href = normalizeSiteHref(item.href);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 items-center justify-between rounded-[0.9rem] bg-[#2a2a2a] px-4 text-[0.875rem] text-white/80 hover:bg-[#303030] transition"
    >
      <span className="flex items-center gap-3">
        <span className="relative h-5 w-5">
          <Image src={item.icon} alt="" fill className="object-contain" sizes="20px" />
        </span>
        {item.label}
      </span>
      <span aria-hidden className="text-white/40">
        {"\u2197"}
      </span>
    </a>
  );
}

