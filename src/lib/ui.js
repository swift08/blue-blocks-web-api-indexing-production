const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * resolveBg(value)
 * Accepts:
 *  - "bg-sand" (class)
 *  - "sand" (token -> class "bg-sand")
 *  - "#F3E3CF" (inline style)
 *  - "" / undefined (nothing)
 */
export function resolveBg(value) {
  if (!value) return { className: "", style: undefined };

  // already a class like bg-white, bg-[#F3E3CF], etc.
  if (typeof value === "string" && value.startsWith("bg-")) {
    return { className: value, style: undefined };
  }

  // hex color
  if (typeof value === "string" && HEX_RE.test(value)) {
    return { className: "", style: { backgroundColor: value } };
  }

  // token (e.g., "sand" -> "bg-sand")
  if (typeof value === "string") {
    return { className: `bg-${value}`, style: undefined };
  }

  return { className: "", style: undefined };
}