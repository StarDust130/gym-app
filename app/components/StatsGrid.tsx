import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";

interface StatsGridProps {
  focus: string;
  progressPercent: number;
  workoutsThisWeek: number;
  nextRestDay: string;
  todayExercisesDone: number;
  todayExercisesTotal: number;
}

const emojis = ["🐥", "💪", "🔥", "⚡", "🎯", "🚀", "⭐", "🏋️", "🎉", "✨"];

export function StatsGrid(props: StatsGridProps) {
  const dailyEmoji = useMemo(() => {
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return emojis[seed % emojis.length];
  }, []);

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
                Workout Completed
              </p>
              <p className="text-3xl font-semibold text-primary">
                {Math.round(props.progressPercent)}%
              </p>
            </div>
            <motion.div
              key={`${props.todayExercisesDone}-${props.todayExercisesTotal}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-[3px_3px_0_rgba(0,0,0,0.15)]"
            >
              <span className="text-lg leading-none">{dailyEmoji}</span>
              <span className="tracking-wide">
              {props.todayExercisesDone}
              <span className="mx-0.5 text-muted-foreground">/</span>
              {props.todayExercisesTotal}
              </span>
            </motion.div>
          </div>

          <Progress
            value={props.progressPercent}
            className="h-1.5 border border-border bg-transparent [&>div]:bg-linear-to-r [&>div]:from-primary [&>div]:to-primary/60"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
