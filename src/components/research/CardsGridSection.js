import Image from "next/image";
import Container from "@/components/layout/Container";
import { resolveBg } from "@/lib/ui";
import RichTextContent from "@/components/ui/RichTextContent";

function splitTitleToTwoLines(title = "") {
  const t = String(title || "").trim();
  const lastSpace = t.lastIndexOf(" ");
  if (lastSpace === -1) return { first: t, second: "" };
  return { first: t.slice(0, lastSpace), second: t.slice(lastSpace + 1) };
}

function toColsClass(cols) {
  switch (cols) {
    case 1: return "grid-cols-1";
    case 2: return "grid-cols-2";
    case 3: return "grid-cols-3";
    case 4: return "grid-cols-4";
    case 5: return "grid-cols-5";
    case 6: return "grid-cols-6";
    default: return "grid-cols-1";
  }
}

function maxWidthClassToPx(maxWidthClass = "") {
  const token = String(maxWidthClass).split(" ").find((x) => x.startsWith("max-w-"));
  switch (token) {
    case "max-w-2xl": return 672;
    case "max-w-3xl": return 768;
    case "max-w-4xl": return 896;
    case "max-w-5xl": return 1024;
    case "max-w-6xl": return 1152;
    case "max-w-7xl": return 1280;
    default: return null;
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function numOrFallback(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function stripMtClass(className = "") {
  // removes any "mt-*" tokens (keeps everything else)
  return String(className)
    .split(" ")
    .filter((t) => !/^mt-\[.*\]$/.test(t) && !/^mt-\d+$/.test(t))
    .join(" ")
    .trim();
}

function stripTypographySizing(className = "") {
  // removes typography sizing tokens so all sections use global bb-ui typography
  return String(className)
    .split(" ")
    .filter((t) => {
      if (!t) return false;
      // text sizes / weights / line-heights / tracking
      if (/^(sm:|md:|lg:|xl:|2xl:)?text-/.test(t)) return false;
      if (/^(sm:|md:|lg:|xl:|2xl:)?font-/.test(t)) return false;
      if (/^(sm:|md:|lg:|xl:|2xl:)?leading-/.test(t)) return false;
      if (/^(sm:|md:|lg:|xl:|2xl:)?tracking-/.test(t)) return false;
      return true;
    })
    .join(" ")
    .trim();
}

export default function CardsGridSection({
  // Section
  bg = "#FBF7F1",
  sectionBg = "",
  containerClassName = "",
  sectionClassName = "",
  py = "",

  // Header
  eyebrow,
  title,
  description,
  subdescription,
  subtitle,
  headerAlign = "center",
  eyebrowBg = "#E7E8FF",
  eyebrowText = "#2C2F8F",

  // Keep props (but defaults no longer force font sizing)
  titleClassName = "",
  descriptionClassName = "",

  // Grid behavior
  maxWidth = "max-w-6xl",
  gap = "gap-6",
  cols = { base: 1, sm: 2, lg: 3 },
  gridClassName = "",

  referenceColsDesktop = 4,
  desktopSpan,
  centerWhenShrunk = true,

  // Card styling
  cardBg = "#273C75",
  cardRadius = "rounded-[18px]",
  cardPadding = "px-6 py-7",
  cardMinHeight,
  cardClassName = "",

  // Card content styling
  iconSize = 40,
  iconWrapClassName = "h-10 w-10",
  imageWrapClassName = "h-45 w-full relative",
  titleSplit = true,
  cardTitleClassName = "mt-5 font-medium leading-[1.18] text-white whitespace-pre-line",
  cardTextClassName = "mt-4 leading-6 text-white/75",

  showNum = false,
  numClassName = "text-[3rem] sm:text-[3.2rem] font-semibold leading-none text-white/20",
  cardRightTabs,
  cardBehindTabs,
  cardDivider,
  equalHeight = false,
  tightTitleWhenNoIcon = false,
  items = [],
}) {
  const headerAlignClass = headerAlign === "left" ? "text-left" : "text-center";
  const resolvedSection = resolveBg(sectionBg || bg);

  const baseColsClass = toColsClass(cols?.base ?? 1);
  const smColsClass = toColsClass(cols?.sm ?? 1);
  const lgColsClass = toColsClass(cols?.lg ?? 1);

  const desktopSlots = typeof desktopSpan === "number" ? desktopSpan : (cols?.lg ?? 1);

  const refCols = clamp(Number(referenceColsDesktop) || 4, 1, 6);
  const span = clamp(Number(desktopSlots) || 1, 1, refCols);

  const maxPx = maxWidthClassToPx(maxWidth);
  const shouldShrink = Boolean(maxPx && refCols > 0 && span < refCols);

  const gridWrapStyle = shouldShrink
    ? { maxWidth: `${Math.round((maxPx * span) / refCols)}px` }
    : undefined;

  return (
    <section
      className={["bb-ui", "bb-section", sectionClassName, resolvedSection.className]
        .filter(Boolean)
        .join(" ")}
      style={resolvedSection.style}
    >
      <Container className={["bb-section__inner", py, containerClassName].filter(Boolean).join(" ")}>
        {(eyebrow || title || description || subdescription || subtitle) ? (
          <div className={headerAlignClass}>
            {eyebrow ? (
              <span
                className="bb-pill"
                style={{
                  "--bb-pill-bg": eyebrowBg,
                  "--bb-pill-border": "transparent",
                  "--bb-pill-text": eyebrowText,
                }}
              >
                <span className="bb-pill__text">{eyebrow}</span>
              </span>
            ) : null}

            {title ? (
              <h2 className={["bb-section-title", stripTypographySizing(titleClassName)].filter(Boolean).join(" ")}>
                {title}
              </h2>
            ) : null}

            {description ? (
              <RichTextContent
                as="p"
                value={description}
                className={["bb-text mt-2", "mx-auto", stripTypographySizing(descriptionClassName)].filter(Boolean).join(" ")}
              />
            ) : null}

            {subdescription ? (
              <RichTextContent
                as="p"
                value={subdescription}
                className={["bb-text mt-2", "mx-auto", stripTypographySizing(descriptionClassName)].filter(Boolean).join(" ")}
              />
            ) : null}

            {subtitle ? (
              <RichTextContent
                as="p"
                value={`<b>${subtitle}</b>`}
                className={["bb-text mt-2", "mx-auto", stripTypographySizing(descriptionClassName)].filter(Boolean).join(" ")}
              />
            ) : null}
          </div>
        ) : null}

        <div className={`mt-10 sm:mt-12 mx-auto ${centerWhenShrunk ? "flex justify-center" : ""}`}>
          <div
            className={[
              "grid w-full",
              maxWidth,
              gap,
              baseColsClass,
              `sm:${smColsClass}`,
              `lg:${lgColsClass}`,
              equalHeight ? "items-stretch" : "",
              gridClassName,
              centerWhenShrunk ? "mx-auto" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={gridWrapStyle}
          >
            {items.map((item, idx) => {
              const {
                icon,
                image,
                alt,
                num,
                title: cardTitle,
                text,
                href,

                // Optional overrides per-card
                cardBg: cardBgOverride,
                cardTextClassName: cardTextClassNameOverride,
                cardTitleClassName: cardTitleClassNameOverride,
                cardClassName: cardClassNameOverride,
                cardPadding: cardPaddingOverride,
                cardRadius: cardRadiusOverride,
                iconSize: iconSizeOverride,
                iconWrapClassName: iconWrapOverride,
                imageWrapClassName: imageWrapOverride,
                showNum: showNumOverride,
                numClassName: numClassNameOverride,
                cardDivider: cardDividerOverride,
                cardRightTabs: cardRightTabsOverride,
                cardBehindTabs: cardBehindTabsOverride,
                titleSplit: titleSplitOverride,
                tightTitleWhenNoIcon: tightTitleWhenNoIconOverride,
              } = item || {};

              const finalCardBg = cardBgOverride ?? cardBg;
              const finalCardPadding = cardPaddingOverride ?? cardPadding;
              const finalCardRadius = cardRadiusOverride ?? cardRadius;
              const finalIconSize = iconSizeOverride ?? iconSize;
              const finalIconWrap = iconWrapOverride ?? iconWrapClassName;
              const finalImageWrap = imageWrapOverride ?? imageWrapClassName;

              const finalShowNum = typeof showNumOverride === "boolean" ? showNumOverride : showNum;
              const finalNumClass = numClassNameOverride ?? numClassName;

              const finalCardDivider = cardDividerOverride ?? cardDivider;
              const finalCardRightTabs = cardRightTabsOverride ?? cardRightTabs;
              const finalCardBehindTabs = cardBehindTabsOverride ?? cardBehindTabs;

              const finalTitleSplit =
                typeof titleSplitOverride === "boolean" ? titleSplitOverride : titleSplit;

              const finalTightTitleWhenNoIcon =
                typeof tightTitleWhenNoIconOverride === "boolean"
                  ? tightTitleWhenNoIconOverride
                  : tightTitleWhenNoIcon;

              const titleToRender = String(cardTitle || "").trim();
              const split = finalTitleSplit ? splitTitleToTwoLines(titleToRender) : null;

              const computedNum =
                typeof num === "string"
                  ? num
                  : typeof num === "number"
                    ? String(num)
                    : String(idx + 1).padStart(2, "0");

              const hasIcon = Boolean(icon);
              const hasImage = Boolean(image);

              const minHStyle = cardMinHeight ? { minHeight: `${cardMinHeight}px` } : undefined;

              const contentTitleMt =
                !hasIcon && !hasImage && finalTightTitleWhenNoIcon ? "mt-0" : "";

              const CardTag = href ? "a" : "div";
              const cardProps = href ? { href } : {};

              return (
                <CardTag
                  key={titleToRender || idx}
                  {...cardProps}
                  className={[
                    "relative overflow-hidden",
                    finalCardRadius,
                    finalCardPadding,
                    cardClassName,
                    cardClassNameOverride,
                    href ? "block hover:opacity-95 transition-opacity" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ backgroundColor: finalCardBg, ...(minHStyle || {}) }}
                >
                  {/* Behind tabs (optional) */}
                  {Array.isArray(finalCardBehindTabs) && finalCardBehindTabs.length ? (
                    <div className="absolute inset-0 pointer-events-none">
                      {finalCardBehindTabs.map((tab, i) => (
                        <div
                          key={i}
                          className={tab.className}
                          style={tab.style}
                        />
                      ))}
                    </div>
                  ) : null}

                  {/* Right tabs (optional) */}
                  {Array.isArray(finalCardRightTabs) && finalCardRightTabs.length ? (
                    <div className="absolute right-4 top-4 flex flex-col gap-2">
                      {finalCardRightTabs.map((tab, i) => (
                        <div
                          key={i}
                          className={tab.className}
                          style={tab.style}
                        />
                      ))}
                    </div>
                  ) : null}

                  {/* Icon / Image */}
                  {hasImage ? (
                    <div className={finalImageWrap}>
                      <Image
                        src={image}
                        alt={alt || titleToRender || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : hasIcon ? (
                    <div className={finalIconWrap}>
                      <Image
                        src={icon}
                        alt=""
                        width={finalIconSize}
                        height={finalIconSize}
                        className="object-contain"
                      />
                    </div>
                  ) : null}

                  {/* Big number */}
                  {finalShowNum ? (
                    <div className={finalNumClass}>{computedNum}</div>
                  ) : null}

                  {/* Divider (optional) */}
                  {finalCardDivider ? (
                    <div className={finalCardDivider} />
                  ) : null}

                  {/* Title */}
                  {titleToRender ? (
                    <div
                      className={[
                        cardTitleClassNameOverride ?? cardTitleClassName,
                        contentTitleMt,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {split ? (
                        <>
                          <div>{split.first}</div>
                          {split.second ? <div>{split.second}</div> : null}
                        </>
                      ) : (
                        titleToRender
                      )}
                    </div>
                  ) : null}

                  {/* Text */}
                  {text ? (
                    <RichTextContent
                      as="div"
                      value={text}
                      className={cardTextClassNameOverride ?? cardTextClassName}
                    />
                  ) : null}
                </CardTag>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
