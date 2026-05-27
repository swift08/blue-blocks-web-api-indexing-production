"use client";

import { useEffect } from "react";

export default function GoogleConversions() {
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target;
      if (!el) return;

      const a = el.closest ? el.closest("a") : null;
      if (!a || !a.href) return;

      // WhatsApp conversion (wa.me or wa.link)
      if (a.href.includes("wa.link") || a.href.includes("wa.me")) {
        window.gtag?.("event", "conversion", {
          send_to: "AW-1064646284/DiWTCNPHmKwDEIzt1PsD",
        });
      }

      // Book a Meeting conversion - text match fallback
      const text = (a.textContent || "").trim();
      if (text === "Book a Meeting Now") {
        window.gtag?.("event", "conversion", {
          send_to: "AW-1064646284/614DCO275KsDEIzt1PsD",
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}