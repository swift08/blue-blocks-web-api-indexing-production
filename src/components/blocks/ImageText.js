import Container from "@/components/layout/Container";
import Image from "next/image";
import { resolveBg } from "@/lib/ui";
import ReadMoreBlock from "@/components/ui/ReadMoreBlock";
import Link from "next/link";
import RichTextContent from "@/components/ui/RichTextContent";

export default function ImageText({
  sectionBg = "white",
  wrapBg = "",
  bgClass = "",
  SecBg = "",
  title,
  subtitle,
  text = [],
  readMore,
  imageUrl = "",
  cta,
  variant = "default",
  cardBg = "#EEF7FD",
  cardRadius = "rounded-2xl",
  cardPadding = "p-8 sm:p-10",
  imageSide = "left",
  imageClassName = "",
  imageFit = "contain",
  imageAspect = "aspect-[16/10]",
  titleClassName = "",
  subtitleClassName = "",
  textClassName = "",
  contentCenter = false,
}) {
  const hasImage = Boolean(imageUrl);
  const isCard = variant === "card";

  const resolvedSection = resolveBg(bgClass || sectionBg);
  const resolvedWrap = resolveBg(SecBg || wrapBg);

  const gridColsClass = hasImage ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";
  const contentAlignClass = contentCenter ? "text-center" : "";

  const imageOrderClass = hasImage && imageSide === "right" ? "md:order-2" : "";
  const contentOrderClass = hasImage && imageSide === "right" ? "md:order-1" : "";

  const imgOuterClass = isCard
    ? `overflow-hidden ${imageClassName || "rounded-2xl"}`
    : `rounded-2xl overflow-hidden bg-slate-100 border ${imageClassName || ""}`;

  const imgInnerClass = isCard
    ? `${imageAspect} relative`
    : "aspect-[16/10] flex items-center justify-center text-sm text-slate-500";

  const imgFitClass = imageFit === "cover" ? "object-cover" : "object-contain";

  const finalTitleClass = titleClassName || "bb-section-title whitespace-pre-line";
  const finalSubtitleClass = subtitleClassName || "bb-subtitle whitespace-pre-line mt-3";
  const finalTextWrapClass = textClassName || "bb-text mt-4 space-y-3";

  const innerClass = isCard ? [cardRadius, cardPadding].join(" ") : resolvedWrap.className;
  const innerStyle = isCard ? { backgroundColor: cardBg } : resolvedWrap.style;

  return (
    <section
      className={["bb-ui", "bb-section", resolvedSection.className].filter(Boolean).join(" ")}
      style={resolvedSection.style}
    >
      <Container className="bb-section__inner">
        <div
          className={[
            "grid",
            gridColsClass,
            "gap-8 items-center",
            contentAlignClass,
            innerClass,
          ].filter(Boolean).join(" ")}
          style={innerStyle}
        >
          {hasImage ? (
            <div className={`${imgOuterClass} ${imageOrderClass}`.trim()}>
              <div className={imgInnerClass}>
                {isCard ? (
                  <Image
                    src={imageUrl}
                    alt={title || ""}
                    fill
                    className={imgFitClass}
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt={title || ""}
                    width={815}
                    height={555}
                    className={imgFitClass}
                  />
                )}
              </div>
            </div>
          ) : null}

          <div className={contentOrderClass}>
            {title ? <RichTextContent as="h2" value={title} className={finalTitleClass} /> : null}
            {subtitle ? <RichTextContent as="h3" value={subtitle} className={finalSubtitleClass} /> : null}

            {Array.isArray(text) && text.length ? (
              <div className={finalTextWrapClass}>
                {text.map((p, idx) =>
                  typeof p === "string" ? <RichTextContent key={idx} as="p" value={p} /> : null
                )}
              </div>
            ) : null}

            <ReadMoreBlock
              readMore={readMore}
              className=""
              contentClassName="bb-text"
              buttonClassName="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:opacity-80"
            />

            {cta?.href ? (
              <Link className="bb-btn bb-btn--inverse mt-6" href={cta?.href}>
                <RichTextContent as="span" value={cta?.label} allowHtml={false} />
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
