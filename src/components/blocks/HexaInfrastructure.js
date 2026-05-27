import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import AppModal from "@/components/ui/modal/AppModal";

export default function HexaInfrastructure({
  title = "Infrastructure for Innovation (0–18): Designed for the Developing Mind.",
  text = "At Blue Blocks, we believe architecture is not just a container for learning; it is an active participant in it...",
  items = [],
  bgClass = "bg-white",
  sectionBg = "",
  maxWidth = "max-w-6xl",
  closingNote
}) {
  const resolved = resolveBg(sectionBg || bgClass);
  const modalContent = (Array.isArray(items) ? items : []).filter(
    (item) => item?.modal?.title && Array.isArray(item?.modal?.paragraphs) && item.modal.paragraphs.length
  );

  return (
    <section
      className={["bb-ui", "bb-section", resolved.className].filter(Boolean).join(" ")}
      style={resolved.style}
    >
      <Container className={["bb-section__inner", maxWidth].filter(Boolean).join(" ")}>
        {/* Heading */}
        <div className="w-full text-center ">
          <h2 className="text-center bb-section-title">{title}</h2>
          {text ? (
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700">
              {text}
            </p>
          ) : null}
        </div>

        {/* Desktop honeycomb */}
        <div className="mt-10 hidden sm:block">
          <HexHoneycomb items={items} />
        </div>

        {/* Mobile stacked */}
        <div className="mt-8 sm:hidden space-y-5">
          {items.map((it, idx) => (
            <HexCard key={it?.href || it?.title || idx} {...it} />
          ))}
        </div>

        {modalContent.length ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="text-xl font-semibold text-slate-900">
              Infrastructure Notes
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Extended descriptions from each infrastructure card are also available below for crawlable page content visibility.
            </p>
            <div className="mt-5 space-y-3">
              {modalContent.map((item, idx) => (
                <details
                  key={`${item.modal.title}-${idx}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                    {item.modal.title}
                  </summary>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                    {item.modal.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        {closingNote?.enabled && Array.isArray(closingNote.paragraphs) ? (
          <div className="mt-10 bb-text text-center  leading-relaxed text-slate-700 space-y-3">
            {closingNote.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function HexHoneycomb({ items = [] }) {
  const top = items.slice(0, 3);
  const bottom = items.slice(3, 5);

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-center gap-6">
        {top.map((it, idx) => (
          <HexCard key={it?.href || it?.title || idx} {...it} />
        ))}
      </div>

      {bottom.length ? (
        <div className="mt-[-22px] flex items-start justify-center gap-6">
          {bottom.map((it, idx) => (
            <HexCard key={it?.href || it?.title || `b-${idx}`} {...it} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HexCard({
  title = "",
  image = "",
  href,
  readMoreLabel = "Read More",
  overlay = "bg-black/20",

  // ✅ NEW JSON-driven modal payload
  modal, // { title?, subtitle?, paragraphs?, bullets?, image?, cta?, maxWidthClass? }
}) {
  const hasModal = Boolean(modal?.paragraphs?.length || modal?.bullets?.length || modal?.image);

  const trigger = (
    <button
      type="button"
      className="group relative block h-[170px] w-[190px] sm:h-[190px] sm:w-[210px] text-left"
      aria-label={title}
    >
      {/* Hex */}
      <div
        className="relative h-full w-full overflow-hidden shadow-sm"
        style={{
          clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Overlay */}
        <div className={`absolute inset-0 ${overlay} transition-opacity group-hover:opacity-80`} />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="whitespace-pre-line text-sm sm:text-base font-medium text-white drop-shadow">
            {title}
          </div>

          <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium text-white/90">
            {readMoreLabel}
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </button>
  );

  // ✅ If modal exists → popup
  if (hasModal) {
    return (
      <AppModal
        trigger={trigger}
        title={modal?.title || title}
        subtitle={modal?.subtitle}
        maxWidthClass={modal?.maxWidthClass || "max-w-4xl"}
        footer={
          modal?.cta?.href ? (
            <a
              href={modal.cta.href}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {modal?.cta?.label || "Learn more"} <span aria-hidden="true">→</span>
            </a>
          ) : null
        }
      >
        <ModalBody modal={modal} />
      </AppModal>
    );
  }

  // ✅ If no modal → fallback to normal link (optional)
  if (href) {
    return (
      <a href={href} className="block" aria-label={title}>
        {trigger}
      </a>
    );
  }

  return trigger;
}

function ModalBody({ modal }) {
  return (
    <div className="space-y-6">
      {/* Optional image */}
      {modal?.image ? (
        <div className="overflow-hidden rounded-2xl border">
          {/* Use normal img to keep it simple in modal */}
          <img
            src={modal.image.src}
            alt={modal.image.alt || ""}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      {/* Paragraphs (array) */}
      {Array.isArray(modal?.paragraphs) && modal.paragraphs.length ? (
        <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
          {modal.paragraphs.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
      ) : null}

      {/* Bullets */}
      {Array.isArray(modal?.bullets) && modal.bullets.length ? (
        <ul className="list-disc pl-5 text-sm sm:text-base text-slate-700 space-y-2">
          {modal.bullets.map((b, idx) => (
            <li key={idx}>{b}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
