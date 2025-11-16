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
      <Card className="neubrut-card bg-card text-foreground">
        <CardContent className="flex flex-col gap-5 px-6 py-6">
          <div className="space-y-3">
            <span className="inline-flex w-max items-center gap-2 rounded-full border-2 border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
              {greeting}
            </span>
            <div className="space-y-2 text-balance">
              <h2 className="text-xl font-semibold leading-tight">
                <span className="font-bold text-2xl text-red-400">{name}</span>, let&apos;s keep it light + strong
              </h2>
              <p className="text-sm text-muted-foreground">
                {todayLabel} · {dateDisplay}
              </p>
            </div>
            <span className="inline-flex w-max items-center rounded-full border-2 border-border bg-secondary/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Plan · {planName}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
            <HeaderStat
              icon={<Flame className="size-4" />}
              label="Streak"
              value={`${streakDays} days`}
            />
            <HeaderStat
              icon={<CalendarDays className="size-4" />}
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
    <div className="flex items-center gap-2 rounded-xl border-2 border-border bg-white px-3 py-3 shadow-[3px_3px_0_var(--border)] sm:px-4 sm:py-4 sm:gap-3 sm:shadow-[4px_4px_0_var(--border)]">
      <div className="flex size-9 items-center justify-center rounded-full border-2 border-border bg-secondary/70 text-border sm:size-11">
        {icon}
      </div>
      <div className="leading-tight">
        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.3em]">
          {label}
        </p>
        <p className="text-base font-semibold sm:text-lg">{value}</p>
      </div>
    </div>
  );
}
