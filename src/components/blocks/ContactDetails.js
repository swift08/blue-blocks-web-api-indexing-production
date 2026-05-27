"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";

/* ------------------------- helpers ------------------------- */
function isEmail(v = "") {
  const s = String(v || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function getHutkCookie() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

async function submitToHubSpot({ portalId, formId, fields, context }) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  const payload = {
    fields: fields.map((f) => ({ name: f.name, value: f.value })),
    context: {
      hutk: getHutkCookie() || undefined,
      pageUri: context?.pageUri || (typeof window !== "undefined" ? window.location.href : ""),
      pageName: context?.pageName || undefined,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = "Unable to submit. Please try again.";
    try {
      const j = await res.json();
      msg = j?.message || msg;
    } catch (e) {}
    throw new Error(msg);
  }

  return true;
}

/* ------------------------- component ------------------------- */

export default function ContactDetails({ eyebrow, heading, items = [], form }) {
  const fields = useMemo(() => Array.isArray(form?.fields) ? form.fields : [], [form]);
  const hubspot = form?.hubspot || null;

  const initialValues = useMemo(() => {
    const out = {};
    fields.forEach((f) => {
      if (f?.name) out[f.name] = f.defaultValue ?? "";
    });
    return out;
  }, [fields]);

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [submitting, setSubmitting] = useState(false);

  function setField(name, value) {
    setValues((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    const errors = {};
    fields.forEach((f) => {
      const name = f?.name;
      if (!name) return;

      const val = String(values?.[name] ?? "").trim();
      const required = Boolean(f?.required);

      if (required && !val) {
        errors[name] = f?.requiredMessage || "This field is required.";
        return;
      }

      if ((f?.type === "email" || f?.validate === "email") && val && !isEmail(val)) {
        errors[name] = f?.invalidMessage || "Please enter a valid email address.";
      }
    });
    return errors;
  }

  const errors = useMemo(() => validate(), [values]); // basic live validation

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    // mark all touched
    const touchAll = {};
    fields.forEach((f) => f?.name && (touchAll[f.name] = true));
    setTouched(touchAll);

    const vErrors = validate();
    const hasErrors = Object.keys(vErrors).length > 0;
    if (hasErrors) {
      setStatus({ type: "error", msg: "Please fix the highlighted fields." });
      return;
    }

    // If HubSpot config missing, keep old behavior (non-breaking)
    if (!hubspot?.portalId || !hubspot?.formId) {
      setStatus({
        type: "error",
        msg: "Form is not configured yet (missing HubSpot portalId/formId).",
      });
      return;
    }

    try {
      setSubmitting(true);

      const payloadFields = fields
        .filter((f) => f?.name)
        .map((f) => ({
          name: f.name,
          value: String(values?.[f.name] ?? "").trim(),
        }));

      await submitToHubSpot({
        portalId: hubspot.portalId,
        formId: hubspot.formId,
        fields: payloadFields,
        context: {
          pageUri: hubspot.pageUri,
          pageName: hubspot.pageName,
        },
      });

      setStatus({ type: "success", msg: form?.successMessage || "Thanks! We’ll get back to you shortly." });
      setValues(initialValues);
      setTouched({});
    } catch (err) {
      setStatus({ type: "error", msg: err?.message || "Unable to submit. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left */}
          <div>
            {eyebrow ? (
              <div className="text-slate-400 text-xl sm:text-2xl font300">{eyebrow}</div>
            ) : null}

            <h2 className="mt-2 text-3xl sm:text-5xl font-semibold text-slate-900">
              {heading}
            </h2>

            <div className="mt-8 space-y-5">
              {items.map((it, idx) => (
                <div key={idx} className="text-sm">
                  <div className="flex items-start gap-4 text-slate-800">
                    <span className="inline-block h-[24px] w-[24px]">
                      <Image src={it.icon} width={24} height={24} alt={it.label} />
                    </span>
                    <div className="text-[1.2rem]">
                      {it.label}
                      <a
                        className="mt-1 block text-[#000000]/50 hover:text-slate-700"
                        href={it.href || "#"}
                      >
                        {it.value}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="w-full">
            <form className="space-y-3" onSubmit={onSubmit} noValidate>
              {(fields || []).map((f) => {
                const name = f?.name;
                if (!name) return null;

                const hasError = Boolean(touched?.[name] && errors?.[name]);
                const commonClass =
                  "w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:ring-2";
                const borderClass = hasError
                  ? "border-red-300 focus:ring-red-100"
                  : "border-slate-200 focus:ring-slate-200";

                if (f.type === "textarea") {
                  return (
                    <div key={name}>
                      <textarea
                        name={name}
                        placeholder={f.placeholder}
                        rows={f.rows || 5}
                        value={values?.[name] ?? ""}
                        onChange={(e) => setField(name, e.target.value)}
                        onBlur={() => setTouched((p) => ({ ...p, [name]: true }))}
                        className={`${commonClass} ${borderClass}`}
                        required={Boolean(f.required)}
                      />
                      {hasError ? (
                        <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <div key={name}>
                    <input
                      name={name}
                      type={f.type || "text"}
                      placeholder={f.placeholder}
                      value={values?.[name] ?? ""}
                      onChange={(e) => setField(name, e.target.value)}
                      onBlur={() => setTouched((p) => ({ ...p, [name]: true }))}
                      className={`${commonClass} ${borderClass}`}
                      required={Boolean(f.required)}
                      autoComplete={f.autoComplete || undefined}
                    />
                    {hasError ? (
                      <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
                    ) : null}
                  </div>
                );
              })}

              {status?.msg ? (
                <div
                  className={[
                    "rounded-lg px-4 py-3 text-sm",
                    status.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700",
                  ].join(" ")}
                >
                  {status.msg}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className={[
                  "w-full rounded-lg bg-[#1f3b82] px-5 py-3 text-sm font-medium text-white hover:opacity-95",
                  submitting ? "opacity-70 cursor-not-allowed" : "",
                ].join(" ")}
              >
                {submitting ? (form?.submittingLabel || "Submitting...") : (form?.buttonLabel || "Submit →")}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
