"use client";

import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import type { WorkoutExercise } from "@/app/lib/data";

type ExerciseCardProps = {
  exercise: WorkoutExercise;
  completed: boolean;
  onToggle: () => void;
  delay: number;
};

export function ExerciseCard({
  exercise,
  completed,
  onToggle,
  delay,
}: ExerciseCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay * 0.03 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-3xl"
    >
      <Accordion type="single" collapsible>
        <AccordionItem
          value={exercise.id}
          className={`overflow-hidden rounded-3xl border-2 border-border bg-white shadow-[4px_4px_0_var(--border)] transition ${
            completed ? "opacity-70" : ""
          }`}
        >
          <AccordionTrigger className="flex flex-col gap-3 px-5 py-4 text-left sm:flex-row sm:items-center">
            <div className="flex w-full items-start gap-3">
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={completed}
                  onCheckedChange={onToggle}
                  className="mt-1 size-6 rounded-full border-[3px] border-border bg-white data-[state=checked]:bg-primary data-[state=checked]:text-white"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base font-semibold leading-tight">
                  {exercise.name}
                </p>
              </div>
            </div>
            <span className="rounded-full border-2 border-border bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-wide text-border">
              {exercise.sets} sets · {exercise.reps} reps
            </span>
          </AccordionTrigger>
          <AccordionContent className="border-t-2 border-dashed border-border/50 bg-muted/40 px-5 py-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <StatBlock label="Sets" value={exercise.sets} />
              <StatBlock label="Reps" value={exercise.reps} />
            </div>
            
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border-2 border-border bg-white px-4 py-3 text-center">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
