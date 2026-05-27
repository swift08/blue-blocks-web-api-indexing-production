"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

function normalizePhone(phone = "") {
  return String(phone).replace(/[^\d]/g, "");
}

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(
    window.navigator.userAgent
  );
}

function buildWaLink({ phone, text }) {
  const p = normalizePhone(phone);
  if (!p) return null;

  const encodedText = text ? encodeURIComponent(text) : "";
  const mobile = isMobileDevice();

  if (mobile) {
    return encodedText
      ? `https://wa.me/${p}?text=${encodedText}`
      : `https://wa.me/${p}`;
  }

  return encodedText
    ? `https://web.whatsapp.com/send?phone=${p}&text=${encodedText}`
    : `https://web.whatsapp.com/send?phone=${p}`;
}

function reportWhatsappConversion(url) {
  if (typeof window === "undefined") return true;

  const callback = function () {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-1064646284/DiWTCNPHmKwDEIzt1PsD",
      event_callback: callback,
    });

    // Fallback in case callback does not fire
    setTimeout(() => {
      callback();
    }, 700);

    return false;
  }

  // If gtag is not available, still open WhatsApp
  callback();
  return false;
}

export default function WhatsAppFloat({ config }) {
  const prefersReducedMotion = useReducedMotion();

  const enabled = Boolean(config?.enabled);
  const phone = config?.phone || "";
  const message = config?.message || "";
  const bottom = Number.isFinite(config?.bottom) ? config.bottom : 20;
  const right = Number.isFinite(config?.right) ? config.right : 20;
  const size = Number.isFinite(config?.size) ? config.size : 56;
  const label = config?.label ?? "WhatsApp";

  if (!enabled) return null;

  const href = buildWaLink({ phone, text: message });
  if (!href) return null;

  const handleClick = (event) => {
    event.preventDefault();
    reportWhatsappConversion(href);
  };

  return (
    <div className="fixed z-[60]" style={{ bottom, right }}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on ${label}`}
        title={`Chat on ${label}`}
        onClick={handleClick}
        className="group grid place-items-center bg-[#25d366] rounded-full shadow-lg border backdrop-blur hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        style={{ width: size, height: size }}
        initial={false}
        animate={prefersReducedMotion ? { y: 0 } : { y: [0, -10, 0] }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 1.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }
        }
        whileHover={prefersReducedMotion ? {} : { y: -12, scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:scale-110 text-white"
        >
          <path
            fill="currentColor"
            d="M19.11 17.44c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.3-.79-.7-1.33-1.56-1.48-1.83-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.71.34-.25.27-.93.91-.93 2.22 0 1.31.95 2.58 1.08 2.76.13.18 1.87 2.86 4.52 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.6-.65 1.82-1.27.22-.63.22-1.17.16-1.27-.07-.11-.25-.18-.52-.31Z"
          />
          <path
            fill="currentColor"
            d="M26.6 5.4A13.37 13.37 0 0 0 16.98 1.5C9.45 1.5 3.33 7.62 3.33 15.15c0 2.4.63 4.74 1.82 6.81L3.2 30.5l8.72-1.9a13.57 13.57 0 0 0 5.06.97c7.53 0 13.65-6.12 13.65-13.65 0-3.65-1.42-7.08-4.03-9.52Zm-9.62 21.9c-1.6 0-3.17-.31-4.65-.93l-.33-.14-5.18 1.13 1.1-5.05-.16-.34a11.2 11.2 0 0 1-1.58-5.77c0-6.2 5.05-11.25 11.25-11.25 3 0 5.82 1.17 7.94 3.27a11.16 11.16 0 0 1 3.3 7.98c0 6.2-5.05 11.25-11.25 11.25Z"
          />
        </svg>
      </motion.a>

      {label ? (
        <div className="mt-2 hidden sm:block text-xs text-slate-600 text-right">
          {label}
        </div>
      ) : null}
    </div>
  );
}