import Container from "@/components/layout/Container";

export default function LocationsGrid({ bg = "#F3E3CF", locations = [] }) {
  return (
    <section className="w-full" style={{ backgroundColor: bg }}>
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          {locations.map((loc, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-slate-800/70" />
                <div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900">{loc?.title}</div>
                  <div className="mt-1 text-[11px] sm:text-xs text-slate-600/80 leading-snug">{loc?.address}</div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {loc?.mapEmbedUrl ? (
                  <iframe
                    src={getMapIframeSrc(loc?.mapEmbedUrl)}
                    className="w-full h-[260px] lg:h-[420px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={loc?.title || "Campus map"}
                  />
                ) : (
                  <div className="flex h-[260px] lg:h-[420px] items-center justify-center bg-slate-50 p-6 text-center text-sm text-slate-600">
                    Map unavailable
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function getMapIframeSrc(url) {
  const value = String(url || "").trim();
  const lowered = value.toLowerCase();
  if (!value) return "";

  if (lowered.includes("<iframe")) {
    const srcMatch = value.match(/src=["']([^"']+)["']/i);
    if (srcMatch?.[1]) return srcMatch[1];
  }

  if (
    lowered.includes("output=embed") ||
    lowered.includes("/maps/embed") ||
    lowered.includes("google.com/maps?q=")
  ) {
    return value;
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
}
