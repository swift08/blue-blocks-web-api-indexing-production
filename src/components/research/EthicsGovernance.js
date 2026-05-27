"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";

function IconDoc() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      className="text-[#131313]"
      aria-hidden="true"
    >
      <path
        d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 3v4a1 1 0 0 0 1 1h4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 12h8M8 15h8M8 18h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CollapsedCard({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${label}`}
      className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-[18px] bg-[#F6F7FB] transition hover:ring-1 hover:ring-[#C97B4E]/70 focus:outline-none focus:ring-1 focus:ring-[#C97B4E]"
    >
      <span className="whitespace-nowrap rotate-[-90deg] text-sm font-medium text-[#131313]">
        {label}
      </span>
    </button>
  );
}

export default function EthicsGovernance({ title, items = [] }) {
  const [active, setActive] = useState(0);

  const current = items[active] || {};

  const collapsed = useMemo(() => {
    return items
      .map((it, i) => ({ ...it, _i: i }))
      .filter((x) => x._i !== active);
  }, [items, active]);

  return (
    <section className="bg-white hidden">
      <Container className="py-16 sm:py-20">
        <h2 className="text-center text-[2.25rem] sm:text-[3rem] leading-[1.08] font-medium text-[#131313]">
          {title}
        </h2>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1fr_220px]">
          {/* OPEN CARD */}
          <div className="relative overflow-hidden rounded-[18px] bg-[#F6F7FB] ring-1 ring-[#C97B4E]">
            {/* We animate by swapping keyed content with transition classes */}
            <div key={active} className="px-8 py-8 sm:px-10 sm:py-10">
              {/* Animated feel without plugin */}
              <div className="transition-all duration-300 ease-out opacity-100 translate-x-0">
                <div className="mb-6">
                  <IconDoc />
                </div>

                <div className="text-[1.25rem] sm:text-[1.45rem] font-medium text-[#131313]">
                  {current.title || current.label}
                </div>

                {current.text ? (
                  <p className="mt-3 max-w-3xl text-[0.85rem] sm:text-[0.95rem] leading-relaxed text-slate-600">
                    {current.text}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* COLLAPSED STACK (3) */}
          <div className="grid grid-rows-3 gap-3">
            {collapsed.slice(0, 3).map((t) => (
              <CollapsedCard
                key={`${t.label}-${t._i}`}
                label={t.label}
                onClick={() => setActive(t._i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
