"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsGridProps {
  focus: string;
  progressPercent: number;
  streakDays: number;
  workoutsThisWeek: number;
  nextRestDay: string;
}

export function StatsGrid(props: StatsGridProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-sm "
    >
      <Card className="neubrut-card bg-white/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
        <CardContent className="space-y-5 px-5 ">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Progress today
              </p>
              <p className="text-3xl font-semibold text-primary">
                {Math.round(props.progressPercent)}%
              </p>
            </div>
            <motion.div
              key={props.streakDays}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-full border border-border bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em]"
            >
              Streak · {props.streakDays}d
            </motion.div>
          </div>

          <Progress
            value={props.progressPercent}
            className="h-1.5 border border-border bg-transparent [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-primary/60"
          />

        </CardContent>
      </Card>
    </motion.div>
  );
}
