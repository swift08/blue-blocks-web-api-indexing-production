const SITE_HOSTS = new Set([
  "blueblocks.in",
  "www.blueblocks.in",
  "dev65.blueblocks.in",
  "localhost",
  "127.0.0.1",
]);

const PATH_REDIRECTS = new Map([
  ["/about-us.shtml", "/about-us/"],
  ["/montessori.shtml", "/montessori-system/"],
  ["/careers.shtml", "/careers/"],
  ["/campus.shtml", "/campus/"],
  ["/faq.shtml", "/faq/"],
  ["/admission.shtml", "/admissions/"],
  ["/programs.shtml", "/programs/"],
  ["/innovation.shtml", "/innovation/"],
  ["/privacy-policy.shtml", "/privacy-policy/"],
  ["/toddler.shtml", "/programs/playgroup/"],
  ["/self.shtml", "/programs/nursery-school/"],
  ["/elementary.shtml", "/programs/primary-school-elementary/"],
  ["/high.shtml", "/programs/secondary-school/"],
  ["/drone-patent.shtml", "/innovation/drone-lab/"],
  ["/space-program.shtml", "/innovation/space-lab/"],
  ["/biomimicryhive.shtml", "/innovation/biomimicry-hive/"],
  ["/positive-parenting.shtml", "/parents/"],
  ["/virtual-learning.shtml", "/programs/"],
  ["/videos.shtml", "/videos/"],
  ["/schedule-meeting-with-parent-coordinator.shtml", "/contact-us/"],
  ["/schedule-meeting-with-director-elementory.shtml", "/admissions/"],
  ["/index.shtml", "/"],
  ["/index.html", "/"],
  ["/research/about", "/research-institute/"],
  ["/research/patents", "/research-institute/"],
  ["/research/sbb-1", "/research-institute/"],
  ["/founders/pavan-goyal", "/about-us/founders/pavan-goyal/"],
  ["/founders/munira-hussain", "/about-us/founders/munira-hussain/"],
  ["/toddler-developmental-architecture", "/neuropsychiatry-of-toddler-plane/"],
  ["/toddler-developmental-architecture/", "/neuropsychiatry-of-toddler-plane/"],
]);

function normalizePath(pathname = "") {
  const clean = String(pathname || "").trim();
  if (!clean) return "/";

  const withLead = clean.startsWith("/") ? clean : `/${clean}`;
  const lower = withLead.toLowerCase();

  return PATH_REDIRECTS.get(lower) || withLead;
}

export function normalizeSiteHref(href = "") {
  const raw = String(href || "").trim();
  if (!raw) return "";

  if (
    raw.startsWith("#") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:")
  ) {
    return raw;
  }

  // External URL (potentially our own domain)
  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      const host = String(url.hostname || "").toLowerCase();
      if (!SITE_HOSTS.has(host)) return raw;

      url.pathname = normalizePath(url.pathname);
      return url.toString();
    } catch {
      return raw;
    }
  }

  return normalizePath(raw);
}
