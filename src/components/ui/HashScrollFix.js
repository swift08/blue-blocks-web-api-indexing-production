"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const FLAG_KEY = "bb_hash_click";

function getHeaderHeight() {
  const header =
    document.getElementById("site-header") || document.querySelector("header");
  if (!header) return 0;
  const rect = header.getBoundingClientRect();
  return Math.ceil(rect.height);
}

function scrollToHashTarget(hash, extraGap = 12) {
  if (!hash) return;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const headerH = getHeaderHeight();
  const y = window.scrollY + el.getBoundingClientRect().top - headerH - extraGap;

  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

export default function HashScrollFix({ extraGap = 12 }) {
  const pathname = usePathname();

  // mark when user clicks an anchor link anywhere
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target?.closest?.("a");
      if (!a) return;

      const href = a.getAttribute("href") || "";
      // handle "/contact#careers" OR "#careers"
      if (href.includes("#")) {
        sessionStorage.setItem(FLAG_KEY, "1");
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // when route changes, adjust scroll ONLY if it was a hash-click navigation
  useEffect(() => {
    const wasHashClick = sessionStorage.getItem(FLAG_KEY) === "1";
    if (!wasHashClick) return;

    sessionStorage.removeItem(FLAG_KEY);

    const hash = window.location.hash;
    if (!hash) return;

    // wait for page + sections to render
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToHashTarget(hash, extraGap);
      });
    });
  }, [pathname, extraGap]);

  // when hash changes on same page (#careers), also apply offset
  useEffect(() => {
    const onHashChange = () => {
      const wasHashClick = sessionStorage.getItem(FLAG_KEY) === "1";
      if (!wasHashClick) return;

      sessionStorage.removeItem(FLAG_KEY);
      scrollToHashTarget(window.location.hash, extraGap);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [extraGap]);

  return null;
}
