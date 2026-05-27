"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GlobalLoader from "@/components/ui/GlobalLoader";

export default function NavigationLoader({ minMs = 400 }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const t = setTimeout(() => setShow(false), minMs);
    return () => clearTimeout(t);
  }, [pathname, minMs]);

  return show ? <GlobalLoader /> : null;
}
