const DIRECT_REPLACEMENTS = [
  ["Ã¢â‚¬â„¢", "’"],
  ["Ã¢â‚¬Ëœ", "‘"],
  ["Ã¢â‚¬Å“", "“"],
  ["Ã¢â‚¬Â", "”"],
  ["Ã¢â‚¬â€œ", "–"],
  ["Ã¢â‚¬â€", "—"],
  ["Ã¢â‚¬Â¦", "…"],
  ["Ã¢â‚¬Â¢", "•"],
  ["Ã¢â€žÂ¢", "™"],
  ["â€™", "’"],
  ["â€˜", "‘"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["â€¦", "…"],
  ["â€¢", "•"],
  ["â„¢", "™"],
  ["â†’", "→"],
  ["â†", "←"],
  ["â†‘", "↑"],
  ["â†“", "↓"],
  ["âˆ’", "−"],
  ["Â©", "©"],
  ["Â®", "®"],
  ["Â°", "°"],
  ["Â±", "±"],
  ["Â·", "·"],
  ["Â", ""],
  ["Ã—", "×"],
  ["Ã·", "÷"],
  ["â˜°", "☰"],
  ["âœ–", "✖"],
  ["âœ•", "✕"],
  ["â–¾", "▾"],
];

const HTML_TAG_PATTERN = /<\s*\/?\s*([a-z][a-z0-9]*)\b[^>]*>/i;
const MOJIBAKE_PATTERN = /[ÃÂâ]/;

function replaceKnownArtifacts(value) {
  let next = value;
  for (const [from, to] of DIRECT_REPLACEMENTS) {
    next = next.split(from).join(to);
  }
  return next;
}

function decodeUtf8FromLatin1(value) {
  try {
    const bytes = new Uint8Array(Array.from(value, (char) => char.charCodeAt(0) & 0xff));
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  } catch {
    return value;
  }
}

function mojibakeScore(value) {
  const matches = value.match(/[ÃÂâ]/g);
  return matches ? matches.length : 0;
}

export function normalizeMojibake(value) {
  if (typeof value !== "string" || !value) return value;

  let next = value;
  for (let i = 0; i < 3; i += 1) {
    const withKnownReplacements = replaceKnownArtifacts(next);

    let candidate = withKnownReplacements;
    if (MOJIBAKE_PATTERN.test(withKnownReplacements)) {
      const decoded = decodeUtf8FromLatin1(withKnownReplacements);
      const decodedNormalized = replaceKnownArtifacts(decoded);
      if (mojibakeScore(decodedNormalized) < mojibakeScore(withKnownReplacements)) {
        candidate = decodedNormalized;
      }
    }

    if (candidate === next) break;
    next = candidate;
  }

  return next;
}

export function normalizeMojibakeDeep(value) {
  if (typeof value === "string") return normalizeMojibake(value);
  if (Array.isArray(value)) return value.map((item) => normalizeMojibakeDeep(item));
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] = normalizeMojibakeDeep(item);
    }
    return out;
  }
  return value;
}

export function hasHtmlTags(value) {
  if (typeof value !== "string") return false;
  return HTML_TAG_PATTERN.test(value);
}

export function sanitizeTrustedHtml(input) {
  if (!input) return "";

  let safe = normalizeMojibake(String(input));

  safe = safe
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/\son\w+\s*=\s*\{[^}]*\}/gi, "")
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, ' $1="#"')
    .replace(/<br\s*\/?>/gi, "<br/>");

  return safe;
}
