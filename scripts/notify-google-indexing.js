const fs = require("fs");
const path = require("path");
const { GoogleAuth } = require("google-auth-library");

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const INDEXING_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const DEFAULT_KEY_FILE = path.join(process.cwd(), "indexing-service.json.json");

function loadCredentials() {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline && inline.trim()) {
    return JSON.parse(inline);
  }

  const keyPath =
    (process.env.GOOGLE_APPLICATION_CREDENTIALS &&
      process.env.GOOGLE_APPLICATION_CREDENTIALS.trim()) ||
    DEFAULT_KEY_FILE;

  if (!fs.existsSync(keyPath)) {
    throw new Error(
      [
        "No Google service account JSON found.",
        "Set GOOGLE_SERVICE_ACCOUNT_JSON, set GOOGLE_APPLICATION_CREDENTIALS to a key file path,",
        `or add your key at: ${DEFAULT_KEY_FILE}`,
      ].join(" "),
    );
  }

  return JSON.parse(fs.readFileSync(keyPath, "utf8"));
}

function extractLocUrls(xml) {
  const urls = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    urls.push(m[1].trim());
  }
  return [...new Set(urls)];
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    console.error(
      "Missing public/sitemap.xml. Run `npm run build` (prebuild generates the sitemap) first.",
    );
    process.exit(1);
  }

  const credentials = loadCredentials();
  const auth = new GoogleAuth({
    credentials,
    scopes: [INDEXING_SCOPE],
  });
  const client = await auth.getClient();

  const xml = fs.readFileSync(sitemapPath, "utf8");
  const urls = extractLocUrls(xml);
  if (!urls.length) {
    console.error("No <loc> entries found in public/sitemap.xml.");
    process.exit(1);
  }

  const max = Math.max(
    1,
    Number.parseInt(process.env.INDEX_GOOGLE_MAX_URLS || "200", 10) || 200,
  );
  const delayMs = Math.max(
    0,
    Number.parseInt(process.env.INDEX_GOOGLE_DELAY_MS || "150", 10) || 0,
  );

  const batch = urls.slice(0, max);
  if (urls.length > max) {
    console.warn(
      `Notifying ${batch.length} of ${urls.length} URLs (set INDEX_GOOGLE_MAX_URLS to raise; mind Google's daily quota).`,
    );
  }

  let ok = 0;
  let failed = 0;

  for (const url of batch) {
    try {
      await client.request({
        url: INDEXING_URL,
        method: "POST",
        data: { url, type: "URL_UPDATED" },
      });
      ok += 1;
      console.log("OK", url);
    } catch (err) {
      failed += 1;
      const detail = err.response?.data ?? err.message;
      console.error("FAIL", url, detail);
    }
    if (delayMs) await sleep(delayMs);
  }

  console.log(`Done: ${ok} succeeded, ${failed} failed.`);
  if (failed > 0) {
    if (ok === 0 && credentials.client_email) {
      console.error(
        "\nIf every request failed with PERMISSION_DENIED / URL ownership:" +
          "\n  In Google Search Console → Settings → Users and permissions," +
          "\n  add this service account email as an Owner:" +
          `\n  ${credentials.client_email}\n`,
      );
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
