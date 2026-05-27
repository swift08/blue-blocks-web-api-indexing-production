"use client";

import { useEffect, useId, useState } from "react";

export default function HubspotForm({
  portalId,
  formId,
  region = "na1",
  targetId, // optional override
  onSubmitted,
  className = "",
}) {
  const autoId = useId().replace(/:/g, "");
  const mountId = targetId || `hs-form-${autoId}`;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!portalId || !formId) return;

    // Load HubSpot forms script once
    const SCRIPT_ID = "hs-forms-script";
    const existing = document.getElementById(SCRIPT_ID);

    function create() {
      if (!window.hbspt?.forms?.create) return;

      // To avoid duplicate forms if React remounts
      const mountEl = document.getElementById(mountId);
      if (!mountEl) return;
      mountEl.innerHTML = "";

      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: `#${mountId}`,
        onFormReady: () => setLoaded(true),
        onFormSubmitted: () => {
          onSubmitted?.();
        },
      });
    }

    if (existing) {
      create();
      return;
    }

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://js.hsforms.net/forms/v2.js";
    s.async = true;
    s.onload = create;
    document.body.appendChild(s);
  }, [portalId, formId, region, mountId, onSubmitted]);

  return (
    <div className={className}>
      <div id={mountId} />
      {!loaded ? (
        <div className="mt-2 text-sm text-slate-500">Loading form…</div>
      ) : null}
    </div>
  );
}
