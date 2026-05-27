"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function HeaderShell() {
  const pathname = usePathname();

  // Home only => light. All other pages => dark.
  const variant = pathname === "/" ? "light" : "dark";

  return <Header variant={variant} />;
}