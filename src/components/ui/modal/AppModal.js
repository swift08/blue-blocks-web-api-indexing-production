// src/components/ui/modal/AppModal.js
"use client";

import * as Dialog from "@radix-ui/react-dialog";

/**
 * Reusable Radix Modal
 *
 * Props:
 * - trigger: ReactNode (button/link/etc.)
 * - title: string
 * - subtitle?: string
 * - children: ReactNode
 * - footer?: ReactNode
 * - maxWidthClass?: string (e.g. "max-w-6xl")
 */
export default function AppModal({
  trigger,
  title,
  subtitle,
  children,
  footer,
  maxWidthClass = "max-w-6xl",
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />

        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] ${maxWidthClass} -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-xl focus:outline-none my-3`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-7">
            <div>
              <Dialog.Title className="text-3xl sm:text-4xl font-semibold text-slate-900">
                {title}
              </Dialog.Title>
              {subtitle ? (
                <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
              ) : null}
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="px-5 py-5 sm:px-7 sm:py-7 max-h-[80vh] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer ? (
            <div className="border-t px-5 py-4 sm:px-7">{footer}</div>
          ) : (
            <div className="flex justify-end gap-3 border-t px-5 py-4 sm:px-7">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
