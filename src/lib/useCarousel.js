"use client";

import { useEffect, useRef, useState } from "react";

export function useCarousel({
  total = 0,
  initialIndex = 0,
  swipeThreshold = 60,
  rubberBand = true,
}) {
  const [active, setActive] = useState(() =>
    clamp(initialIndex, 0, Math.max(0, total - 1))
  );
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false); // ✅ exposed state

  const startX = useRef(0);
  const didMove = useRef(false);

  useEffect(() => {
    setActive((prev) => clamp(prev, 0, Math.max(0, total - 1)));
  }, [total]);

  const goTo = (idx) => {
    if (total <= 0) return;
    setActive(clamp(idx, 0, total - 1));
  };

  const goPrev = () => goTo(active - 1);
  const goNext = () => goTo(active + 1);

  const onPointerDown = (e, { captureTarget } = {}) => {
    if (total <= 1) return;

    setDragging(true);
    didMove.current = false;
    startX.current = e.clientX;
    setDragX(0);

    if (captureTarget?.setPointerCapture) {
      try {
        captureTarget.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const onPointerMove = (e) => {
    if (!dragging) return;

    let delta = e.clientX - startX.current;

    if (rubberBand) {
      if (active === 0 && delta > 0) delta *= 0.35;
      if (active === total - 1 && delta < 0) delta *= 0.35;
    }

    if (Math.abs(delta) > 4) didMove.current = true;
    setDragX(delta);
  };

  const onPointerUp = () => {
    if (!dragging) return;

    setDragging(false);

    const delta = dragX;
    setDragX(0);

    if (!didMove.current) return;

    if (delta <= -swipeThreshold) goNext();
    else if (delta >= swipeThreshold) goPrev();
  };

  return {
    active,
    dragX,
    dragging, // ✅ SAFE boolean
    goTo,
    goPrev,
    goNext,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
