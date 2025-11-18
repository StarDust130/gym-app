"use client";

import { motion, AnimatePresence } from "framer-motion";

import type { WorkoutExercise } from "@/app/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { ExerciseCard } from "@/app/components/ExerciseCard";

type WorkoutListProps = {
  exercises: WorkoutExercise[];
  completedIds: string[];
  dayLabel: string;
  onToggle: (exerciseId: string) => void;
};

export function WorkoutList({
  exercises,
  completedIds,
  dayLabel,
  onToggle,
}: WorkoutListProps) {
  const completedSet = new Set(completedIds);

  // Sort: Unfinished first, then finished
  const sortedExercises = [...exercises].sort((a, b) => {
    const aDone = completedSet.has(a.id);
    const bDone = completedSet.has(b.id);
    return Number(aDone) - Number(bDone);
  });

  if (exercises.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full px-3 sm:px-6"
      >
        <Card className="border-none bg-linear-to-br from-primary/15 via-background to-background shadow-lg rounded-2xl sm:rounded-3xl overflow-hidden">
          <CardContent className="text-center px-4 py-8 sm:px-6 sm:py-12 space-y-2 sm:space-y-3">
            <p className="text-xl sm:text-2xl font-semibold text-foreground leading-tight">
              {dayLabel} reset mode
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
              Light walks, big exhales, solid fuel. Still training.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      // Layout prop here handles the list reordering animation
      layout
      className="space-y-2.5 sm:space-y-3 md:space-y-4 w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-6 pb-6 sm:pb-8"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {sortedExercises.map((exercise, index) => {
          const completed = completedSet.has(exercise.id);
          return (
            <motion.div
              key={exercise.id}
              layout="position"
              // Using layoutId creates a smooth transition when items swap places
              layoutId={exercise.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
                opacity: { duration: 0.2 },
              }}
            >
              <ExerciseCard
                exercise={exercise}
                completed={completed}
                onToggle={() => onToggle(exercise.id)}
                delay={index}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
