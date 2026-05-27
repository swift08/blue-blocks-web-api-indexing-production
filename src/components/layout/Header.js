"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import siteData from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { normalizeSiteHref } from "@/lib/links";

/* ------------------------- helpers ------------------------- */

const normalizeHref = (href) => {
  return normalizeSiteHref(href);
};

const isValidLinkHref = (href) => {
  const h = String(href || "").trim();
  return Boolean(h);
};

export default function Header({ variant = "dark" }) {
  const { site } = siteData;
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAnnouncementClosed, setIsAnnouncementClosed] = useState(true);

  // Mobile accordion open key (one open at a time)
  const [mobileOpenKey, setMobileOpenKey] = useState("");

  // Read announcement close state
  useEffect(() => {
    const closed = sessionStorage.getItem("announcementClosed") === "true";
    setIsAnnouncementClosed(closed);
  }, []);

  const isLight = variant === "light" && !scrolled;

  const closeAnnouncementBar = () => {
    setIsAnnouncementClosed(true);
    sessionStorage.setItem("announcementClosed", "true");
  };

  // Scroll background change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [menuOpen]);

  // close on route change
  useEffect(() => {
    setMenuOpen(false);
    setMobileOpenKey("");
  }, [pathname]);

  // -------- ACTIVE HELPERS --------
  const isActiveHref = (href) => {
    const h = normalizeHref(href);
    if (!h) return false;
    if (h === "/") return pathname === "/";
    return pathname === h || pathname.startsWith(h + "/");
  };

  const navLinkClass = ({ active = false } = {}) => {
    const base = isLight ? "text-white" : "text-[#131313]";
    const hover = isLight ? "hover:text-indigo-100" : "hover:text-[#000000]";
    const activeCls = isLight
      ? "text-indigo-100 border-b border-white/70"
      : "text-[#0F52BA] border-b border-[#0F52BA]";
    return `transition ${base} ${hover} ${active ? activeCls : ""}`;
  };

  const { megaByLabel, navItems } = useMemo(() => {
    const mm = siteData?.megaMenu || {};
    const map = {};

    const whatWeDo = mm.whatDoWeDo
      ? {
          ...mm.whatDoWeDo,
          label: "What We Do",
          items: Array.isArray(mm.whatDoWeDo.items)
            ? [...mm.whatDoWeDo.items]
            : [],
        }
      : null;

    if (whatWeDo) {
      const hasAmi = whatWeDo.items.some((it) => normalizeHref(it.href) === "/ami-training/");
      const hasCareers = whatWeDo.items.some((it) => normalizeHref(it.href) === "/careers/");

      if (!hasAmi) {
        whatWeDo.items.push({
          id: "ami-training",
          title: "AMI Training",
          href: "/ami-training/",
          description: "AMI-aligned training pathway for guides and educational leaders.",
          image: "/programs/thumb-secondary.webp",
        });
      }

      if (!hasCareers) {
        whatWeDo.items.push({
          id: "careers",
          title: "Careers",
          href: "/careers/",
          description: "Open roles for educators, researchers, and mission-aligned professionals.",
          image: "/programs/thumb-primary.webp",
        });
      }
    }

    const programs = mm.programs
      ? {
          ...mm.programs,
          items: Array.isArray(mm.programs.items) ? [...mm.programs.items] : [],
          ctaCard: mm.programs.ctaCard
            ? {
                ...mm.programs.ctaCard,
                button: mm.programs.ctaCard.button
                  ? { ...mm.programs.ctaCard.button, label: "Admissions", href: "/admissions/" }
                  : undefined,
              }
            : mm.programs.ctaCard,
        }
      : null;

    if (programs) {
      const hasAdmissionsItem = programs.items.some(
        (it) => normalizeHref(it.href) === "/admissions/"
      );
      if (!hasAdmissionsItem) {
        const admissionsItem = {
          id: "admissions",
          title: "Admissions",
          href: "/admissions/",
          description: "Admissions workflow, entry windows, and parent onboarding journey.",
          image: "/programs/thumb-secondary.webp",
        };
        const insertAt = Math.min(4, programs.items.length);
        programs.items.splice(insertAt, 0, admissionsItem);
      }
    }

    const innovations = mm.innovations
      ? { ...mm.innovations, items: Array.isArray(mm.innovations.items) ? [...mm.innovations.items] : [] }
      : null;

    if (programs?.label) map[programs.label] = programs;
    if (whatWeDo?.label) map[whatWeDo.label] = whatWeDo;
    if (innovations?.label) map[innovations.label] = innovations;

    const nav = Array.isArray(site?.nav)
      ? site.nav.map((item) => {
          const href = normalizeHref(item?.href);
          let label = item?.label || "";

          if (label === "What do we do") label = "What We Do";
          if (href === "/about-us") return { ...item, label, href: "/about-us/" };
          return { ...item, label, href };
        })
      : [];

    return { megaByLabel: map, navItems: nav };
  }, []);

  const socials = siteData.footer.socials || [];

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <div
      id="site-header"
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Announcement Bar */}
      {!isAnnouncementClosed && (
        <div className="bg-[#D97B58] text-white text-xs sm:text-sm relative overflow-hidden">
          <Container className="py-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 overflow-hidden">
                {site?.announcements?.length ? (
                  <marquee direction="left">
                    {site.announcements.map((item, idx) => (
                      <span key={idx} className="mr-10">
                        {item.text}
                      </span>
                    ))}
                  </marquee>
                ) : null}
              </div>

              <button
                onClick={closeAnnouncementBar}
                className="px-2 font-semibold"
                aria-label="Close announcement"
              >
                {"\u2715"}
              </button>
            </div>
          </Container>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-[#FFFFFF]/30 backdrop-blur">
        <Container className="py-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/">
            <Image
              src={site.logo || "/icon/logo.svg"}
              alt={site.name || "Logo"}
              width={82}
              height={67}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            {(navItems || []).map((item, i) => {
              const key = `${item.href || "nohref"}|${item.label || "nolabel"}|${i}`;
              const label = item.label || "";
              const mega = megaByLabel[label];

              // Mega entries (desktop)
              if (mega) {
                const active =
                  isActiveHref(item.href) || (label === "Programs" ? pathname.startsWith("/programs") : false);

                return (
                  <ProgramsMegaMenu
                    key={key}
                    mega={mega}
                    socials={socials}
                    isLight={isLight}
                    isActive={active}
                    className={navLinkClass({ active })}
                  />
                );
              }

              // Normal link
              const active = isActiveHref(item.href);
              const href = normalizeHref(item.href);

              // If href missing, render as plain text (prevents Next <Link> crash)
              if (!isValidLinkHref(href)) {
                return (
                  <span key={key} className={navLinkClass({ active: false })}>
                    {label}
                  </span>
                );
              }

              return (
                <Link key={key} href={href} className={navLinkClass({ active })}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden ${isLight ? "text-white" : "text-[#131313]"}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "\u2715" : "\u2630"}
          </button>
        </Container>

        {/* ? MOBILE FULL-VIEWPORT DRAWER (scrollable) */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="fixed inset-0 z-[60] md:hidden bg-black/35 h-[100vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                className="fixed inset-0 bg-[#141c2f] h-[100vh]"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Keep header space so it doesn't go under your fixed header */}
                <div className="h-[90vh] w-full pt-[72px]">
                  {/* Scroll container */}
                  <div className="h-full ">
                    <div className="h-full mx-3 my-3 rounded-2xl bg-[#273C75] text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                      <div className="h-full px-5 py-6 pb-10">
                        <MobileNav
                          nav={navItems || []}
                          megaByLabel={megaByLabel}
                          pathname={pathname}
                          isActiveHref={isActiveHref}
                          openKey={mobileOpenKey}
                          setOpenKey={setMobileOpenKey}
                          socials={socials}
                          onNavigate={() => setMenuOpen(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close button (optional, nicer UX) */}
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15"
                  aria-label="Close menu"
                >
                  ?
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </div>
  );
}

/* ---------- PROGRAMS MEGA MENU (DESKTOP ONLY) ---------- */

function ProgramsMegaMenu({ mega, socials, isLight, isActive = false, className = "" }) {
  const [open, setOpen] = useState(false);

  const items = mega.items || [];
  const viewAll = mega.viewAll;
  const ctaCard = mega.ctaCard;

  const showActive = open || isActive;

  const openActiveCls = showActive
    ? isLight
      ? "text-indigo-100 border-b border-white/70"
      : "text-[#0F52BA] border-b border-[#0F52BA]"
    : "";

  return (
    <div
      className="flex h-full items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`flex items-center gap-1 text-sm font-medium transition ${className} ${openActiveCls}`}
      >
        {mega.label || "Menu"}
        <span className="text-lg">{"\u25BE"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-[60] mt-0 w-[min(1152px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
          >
            <div className="grid grid-cols-[4fr_2fr] gap-0">
              {/* LEFT */}
              <div>
                <div className="mb-2 p-5 pb-0 flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    
                    {viewAll?.href ? (
                      <Link
                        href={normalizeHref(viewAll.href)}
                        className="text-xs font-medium text-[#0E4AA2] hover:underline"
                      >
                        {viewAll.label || "View All"} <span aria-hidden>{"\u2192"}</span>
                      </Link>
                    ) : null}
                  </p>
                </div>

                <div className="grid grid-cols-2 border-t border-slate-100">
                  {items.map((program, idx) => (
                    <Link
                      key={`${program.href || program.title || "item"}|${idx}`}
                      href={normalizeHref(program.href)}
                      className="flex gap-3 p-5 sm:p-6 hover:bg-slate-50 border-r border-slate-100 last:border-r-0"
                    >
                      <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
                        {program?.image ? (
                          <Image src={program.image} alt={program.title || ""} fill className="object-cover" />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                            img
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-slate-900">{program?.title}</div>
                        <p className="line-clamp-2 text-xs text-slate-600">{program?.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex justify-between gap-4 p-5 sm:p-6 border-l border-slate-100">
                {ctaCard ? <div className="flex flex-col justify-between space-y-2 bg-[#F3E3CF] rounded-2xl p-5 w-full">
                  <div>
                    <p className="text-[1.2rem] mb-4 font-semibold text-slate-900">
                      {ctaCard.title}
                    </p>
                    <p className="text-[0.75rem] text-slate-600">{ctaCard.text}</p>
                  </div>

                  {ctaCard?.button?.href ? (
                    <Link
                      href={normalizeHref(ctaCard?.button?.href)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#0F52BA] px-4 py-3 text-xs font-medium text-white hover:bg-[#0D47A1]"
                    >
                      {ctaCard?.button?.label}
                    </Link>
                  ) : null}
                </div> : null}

                <div className="mt-2 flex flex-col gap-2">
                  {(socials || []).map((s, idx) => {
                    const href = normalizeHref(s.href);
                    if (!isValidLinkHref(href)) return null;

                    return (
                      <Link
                        key={`${s.label || "social"}|${idx}`}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#000000]/5 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                        aria-label={s.label}
                      >
                        <Image
                          src={s.icon}
                          alt={(s.label || "").slice(0, 2)}
                          width={34}
                          height={34}
                          className="object-contain"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- MOBILE NAV (MEGA + NORMAL, SAFE HREF) ---------- */

function MobileNav({
  nav,
  megaByLabel,
  pathname,
  isActiveHref,
  openKey,
  setOpenKey,
  socials,
  onNavigate,
}) {
  return (
    <div className="space-y-2 h-full overflow-y-auto overscroll-contain">
      {(nav || []).map((item, idx) => {
        const label = item?.label || "";
        const mega = megaByLabel?.[label];
        const key = `${label}|${idx}`;
        const href = normalizeHref(item?.href);

        // Mega groups (accordion)
        if (mega) {
          const isOpen = openKey === key;

          return (
            <div key={key} className="rounded-xl bg-white/5">
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? "" : key)}
                className="flex w-full items-center justify-between px-4 py-4 text-left"
              >
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-lg">{isOpen ? "-" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div className="px-4 py-3 space-y-3">
                      {/* View all */}
                      {mega?.viewAll?.href ? (
                        <Link
                          href={normalizeHref(mega?.viewAll?.href)}
                          onClick={onNavigate}
                          className="block rounded-lg bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/15"
                        >
                          {mega.viewAll.label || "View All"} <span aria-hidden>{"\u2192"}</span>
                        </Link>
                      ) : null}

                      {/* Mega items */}
                      <div className="space-y-2">
                        {(mega.items || []).map((m, i) => {
                          const mhref = normalizeHref(m?.href);
                          if (!isValidLinkHref(mhref)) return null;

                          return (
                            <Link
                              key={`${mhref}|${i}`}
                              href={mhref}
                              onClick={onNavigate}
                              className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 hover:bg-white/10"
                            >
                              <div className="relative h-12 w-14 overflow-hidden rounded-lg bg-white/10">
                                {m?.image ? (
                                  <Image
                                    src={m?.image}
                                    alt={m?.title || ""}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                  />
                                ) : null}
                              </div>
                              <div>
                                <div className="text-sm font-semibold">{m?.title}</div>
                                {m?.description ? (
                                  <div className="text-xs text-white/65 line-clamp-2">{m?.description}</div>
                                ) : null}
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* CTA */}
                      {mega?.ctaCard?.button?.href ? (
                        <Link
                          href={normalizeHref(mega?.ctaCard?.button?.href)}
                          onClick={onNavigate}
                          className="mt-2 block rounded-xl bg-[#0F52BA] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#0D47A1]"
                        >
                          {mega?.ctaCard?.button?.label}
                        </Link>
                      ) : null}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        }

        // Normal link (safe)
        const active = isActiveHref(href);

        // If href missing, render label as non-click item (prevents Link crash)
        if (!isValidLinkHref(href)) {
          return (
            <div key={key} className="px-4 py-3 text-sm font-semibold text-white/70">
              {label}
            </div>
          );
        }

        return (
          <Link
            key={key}
            href={href}
            onClick={onNavigate}
            className={[
              "block rounded-xl px-4 py-4 text-sm font-semibold",
              active ? "bg-white/10 text-white" : "bg-white/5 hover:bg-white/10",
            ].join(" ")}
          >
            {label}
          </Link>
        );
      })}

      {/* Socials */}
      {(socials || []).length ? (
        <div className="pt-3 sticky bottom-0 bg-[#273C75]">
          <div className="px-2 text-xs font-semibold tracking-[0.18em] uppercase text-white/55">
            Follow
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {(socials || []).map((s, i) => {
              const href = normalizeHref(s.href);
              if (!isValidLinkHref(href)) return null;

              return (
                <a
                  key={`${s.label || "social"}|${i}`}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10"
                  aria-label={s.label}
                >
                  <Image src={s.icon} alt="" width={22} height={22} className="object-contain" />
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

