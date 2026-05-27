"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const FALLBACK_OVERRIDE_CSS = `
:root {
  --bb-blog-font: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --bb-blog-text: #0f172a;
  --bb-blog-link: #0f52ba;
  --bb-blog-bg: transparent;
  --bb-blog-size: 16px;
  --bb-blog-line: 1.65;
}

html, body {
  background: var(--bb-blog-bg) !important;
  color: var(--bb-blog-text) !important;
  font-family: var(--bb-blog-font) !important;
  font-size: var(--bb-blog-size) !important;
  line-height: var(--bb-blog-line) !important;
}
header,
footer,
#masthead,
#colophon,
.site-header,
.site-footer,
.main-header,
.main-footer,
.navbar,
.topbar,
.top-bar,
.wp-block-template-part,
.elementor-location-header,
.elementor-location-footer {
  display: none !important;
}
main,
.site-main,
#content,
.content-area,
.wp-site-blocks,
.site,
#page {
  background: transparent !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
}
a {
  color: var(--bb-blog-link) !important;
}
`;

const CSS_ENDPOINT = "/blog-embed-overrides.css";
const STYLE_ID = "bb-blog-embed-overrides";
const TOKEN_STYLE_ID = "bb-blog-embed-tokens";
const HEIGHT_MESSAGE_TYPE = "bb-blog-embed-height";
const MIN_FRAME_HEIGHT = 640;
const DEFAULT_FRAME_HEIGHT = 1200;

async function loadOverrideCss() {
  try {
    const res = await fetch(CSS_ENDPOINT, { cache: "force-cache" });
    if (!res.ok) return FALLBACK_OVERRIDE_CSS;
    const css = await res.text();
    return css?.trim() ? css : FALLBACK_OVERRIDE_CSS;
  } catch {
    return FALLBACK_OVERRIDE_CSS;
  }
}

function applyCssToDocument(doc, cssText) {
  if (!doc?.head) return;
  let style = doc.getElementById(STYLE_ID);
  if (!style) {
    style = doc.createElement("style");
    style.id = STYLE_ID;
    doc.head.appendChild(style);
  }
  style.textContent = cssText;
}

function applyHostTokens(doc) {
  if (!doc?.head || typeof window === "undefined") return;

  const hostRoot = getComputedStyle(document.documentElement);
  const hostBody = getComputedStyle(document.body);

  const tokens = {
    font: hostRoot.getPropertyValue("--bb-font")?.trim() || hostBody.fontFamily,
    text: hostRoot.getPropertyValue("--bb-text")?.trim() || hostBody.color,
    link: "#0f52ba",
    bg: "transparent",
    size:
      hostRoot.getPropertyValue("--bb-body-size")?.trim() ||
      hostBody.fontSize ||
      "16px",
    line: hostRoot.getPropertyValue("--bb-body-line")?.trim() || "1.65",
  };

  let style = doc.getElementById(TOKEN_STYLE_ID);
  if (!style) {
    style = doc.createElement("style");
    style.id = TOKEN_STYLE_ID;
    doc.head.appendChild(style);
  }

  style.textContent = `
    :root {
      --bb-blog-font: ${tokens.font};
      --bb-blog-text: ${tokens.text};
      --bb-blog-link: ${tokens.link};
      --bb-blog-bg: ${tokens.bg};
      --bb-blog-size: ${tokens.size};
      --bb-blog-line: ${tokens.line};
    }
  `;
}

function getFrameHeight(doc) {
  const body = doc?.body;
  const root = doc?.documentElement;

  return Math.max(
    MIN_FRAME_HEIGHT,
    body?.scrollHeight ?? 0,
    body?.offsetHeight ?? 0,
    root?.scrollHeight ?? 0,
    root?.offsetHeight ?? 0,
    root?.clientHeight ?? 0
  );
}

export default function BlogEmbedFrame({ src, title, fallbackHref }) {
  const iframeRef = useRef(null);
  const cleanupObserversRef = useRef(null);
  const rafRef = useRef(null);
  const [canControlFrame, setCanControlFrame] = useState(true);
  const [frameHeight, setFrameHeight] = useState(DEFAULT_FRAME_HEIGHT);

  const applyHeight = useCallback((nextHeight) => {
    const safeHeight = Number(nextHeight) || 0;
    setFrameHeight(Math.max(MIN_FRAME_HEIGHT, Math.round(safeHeight)));
  }, []);

  const syncFrameHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;
      applyHeight(getFrameHeight(doc));
    } catch {
      // noop for cross-origin access
    }
  }, [applyHeight]);

  const onLoad = useCallback(async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;
      applyHostTokens(doc);
      const css = await loadOverrideCss();
      applyCssToDocument(doc, css);

      syncFrameHeight();

      if (cleanupObserversRef.current) {
        cleanupObserversRef.current();
      }

      const scheduleSync = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(syncFrameHeight);
      };

      const mutationObserver = new MutationObserver(scheduleSync);
      mutationObserver.observe(doc.documentElement, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      });

      let resizeObserver = null;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(scheduleSync);
        if (doc.body) resizeObserver.observe(doc.body);
        resizeObserver.observe(doc.documentElement);
      }

      iframe.contentWindow?.addEventListener("resize", scheduleSync);
      window.addEventListener("resize", scheduleSync);

      cleanupObserversRef.current = () => {
        mutationObserver.disconnect();
        resizeObserver?.disconnect();
        iframe.contentWindow?.removeEventListener("resize", scheduleSync);
        window.removeEventListener("resize", scheduleSync);
      };

      setCanControlFrame(true);
    } catch {
      // Cross-origin guard: we cannot style/hide internals when frame access is blocked.
      setCanControlFrame(false);
      applyHeight(DEFAULT_FRAME_HEIGHT);
    }
  }, [applyHeight, syncFrameHeight]);

  useEffect(() => {
    const onMessage = (event) => {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow || event.source !== iframeWindow) return;
      if (event.origin !== window.location.origin) return;

      const data = event.data;
      if (!data || data.type !== HEIGHT_MESSAGE_TYPE) return;
      applyHeight(data.height);
    };

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
      if (cleanupObserversRef.current) {
        cleanupObserversRef.current();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [applyHeight]);

  return (
    <>
      <div className="overflow-hidden">
        <iframe
          ref={iframeRef}
          title={title}
          src={src}
          className="block w-full border-0"
          style={{ background: "transparent", height: `${frameHeight}px` }}
          scrolling="no"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={onLoad}
        />
      </div>

      {!canControlFrame ? (
        <p className="mt-3 text-xs text-slate-500">
          Embedded content could not be styled in-frame.{" "}
          <Link
            href={fallbackHref || src}
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Open live blog
          </Link>
          .
        </p>
      ) : null}
    </>
  );
}
