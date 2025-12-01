"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "WORKOUT" },
  { href: "/diet", label: "DIET" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-center gap-3 border-b border-border/40 bg-gradient-to-b from-background to-background/80 px-4 py-3 backdrop-blur">
      {TABS.map((tab) => {
        const isActive =
          tab.href === "/"
            ? pathname === "/" // home
            : pathname.startsWith(tab.href); // /diet, /diet/...

        return (
          <Link key={tab.href} href={tab.href} className="inline-flex">
            <button
              className={[
                "relative rounded-full px-6 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em]",
                "transition-all duration-200",
                "border border-black/60",
                // inactive: lifted pill
                !isActive &&
                  "bg-background text-foreground shadow-[0_3px_0_rgba(0,0,0,0.8)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_rgba(0,0,0,0.9)] active:translate-y-[1px] active:shadow-[0_1px_0_rgba(0,0,0,0.9)]",
                // active: pressed-in pill
                isActive &&
                  "bg-black text-background shadow-[0_0_0_rgba(0,0,0,0.9)] translate-y-[2px]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {tab.label}
            </button>
          </Link>
        );
      })}
    </header>
  );
}
