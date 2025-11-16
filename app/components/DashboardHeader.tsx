"use client";

import type { ReactNode } from "react";
import { CalendarDays, Flame } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

type DashboardHeaderProps = {
  name: string;
  greeting: string;
  streakDays: number;
  todayLabel: string;
  dateDisplay: string;
  focus: string;
  planName: string;
};

export function DashboardHeader({
  name,
  greeting,
  streakDays,
  todayLabel,
  dateDisplay,
  focus,
  planName,
}: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="neubrut-card relative overflow-hidden border border-border/70 bg-gradient-to-br from-card via-background to-secondary/15 text-foreground shadow-[6px_6px_0_var(--border)]">
        <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)]" />
        <CardContent className="relative flex flex-col gap-5 px-6 py-6">
          <div className="space-y-3">
            <span className="inline-flex w-max items-center gap-2 rounded-full border border-border/40 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] shadow-sm backdrop-blur">
              {greeting}
            </span>
            <div className="space-y-2 text-balance">
              <h2 className="text-xl font-semibold leading-tight items-center">
                <span className="bg-gradient-to-r from-rose-400 via-orange-300 to-amber-200 bg-clip-text text-2xl font-black text-transparent">
                  {name}
                </span>
                ,{" "}
               
                  {name.trim().toLowerCase() === "shreyesh"
                    ? "you are gay 😏"
                    : "Ready to crush it today?"}
               
              </h2>
              <p className="text-sm text-muted-foreground/80">
                {todayLabel} ·{" "}
                <span className="font-semibold text-foreground">
                  {dateDisplay}
                </span>
              </p>
            </div>
            <span className="inline-flex w-max items-center rounded-full border border-border/60 bg-foreground text-background px-3 py-1 text-xs font-semibold uppercase tracking-widest shadow-sm">
              Plan · {planName}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <HeaderStat
              icon={<Flame className="size-4 b" />}
              label="Streak"
              value={`${streakDays} days`}
            />
            <HeaderStat
              icon={<CalendarDays className="size-4 " />}
              label="Focus Day"
              value={focus}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

type HeaderStatProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function HeaderStat({ icon, label, value }: HeaderStatProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-white/90 px-3 py-3 shadow-[3px_3px_0_var(--border)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_6px_0_var(--border)] backdrop-blur sm:px-4 sm:py-4 sm:gap-3">
      <div className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-secondary/50 text-border sm:size-11">
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.3em]">
          {label}
        </p>
        <p className="text-base font-semibold text-foreground sm:text-lg">{value}</p>
      </div>
    </div>
  );
}
