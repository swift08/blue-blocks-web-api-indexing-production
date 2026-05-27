"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RichTextContent from "@/components/ui/RichTextContent";

export default function Accordion({
  items = [],
  defaultOpenIndex = 0,
  allowToggleAllClosed = true,
  onChange,
  itemClassName = "",
  buttonClassName = "",
  contentClassName = "",
  iconClassName = "",
  openItemClassName = "bg-white shadow-sm",
  closedItemClassName = "bg-transparent",
}) {
  const safeDefault = useMemo(() => {
    if (!items?.length) return null;
    if (defaultOpenIndex === null || defaultOpenIndex === undefined) return null;
    if (defaultOpenIndex < 0 || defaultOpenIndex >= items.length) return 0;
    return defaultOpenIndex;
  }, [items, defaultOpenIndex]);

  const [openIndex, setOpenIndex] = useState(safeDefault);

  useEffect(() => {
    setOpenIndex(safeDefault);
  }, [safeDefault, items]);

  const toggle = (index) => {
    const next = openIndex === index ? (allowToggleAllClosed ? null : index) : index;
    setOpenIndex(next);
    if (typeof onChange === "function") onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        const q = item?.q ?? "";
        const a = item?.a ?? "";

        return (
          <div
            key={item?.id || `${q}-${index}`}
            className={`rounded-2xl transition-colors ${
              open ? openItemClassName : closedItemClassName
            } ${itemClassName}`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className={`w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-4 text-left ${buttonClassName}`}
              aria-expanded={open}
            >
              <RichTextContent as="span" value={q} className="bb-text font-semibold text-slate-900" />
              <span className={`text-xl text-slate-500 ${iconClassName}`}>{open ? "×" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <RichTextContent
                    as="div"
                    value={a}
                    className={`px-5 sm:px-7 pb-5 bb-text text-slate-600 ${contentClassName}`}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
