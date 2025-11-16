"use client";

import { motion } from "framer-motion";

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
  if (exercises.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="border-none bg-gradient-to-br from-primary/15 via-background to-background shadow-lg rounded-3xl">
          <CardContent className="text-center px-6 py-10 space-y-3">
            <p className="text-2xl font-semibold text-foreground">
              {dayLabel} reset mode
            </p>
            <p className="text-sm text-muted-foreground">
              Light walks, big exhales, solid fuel. Still training.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const completedSet = new Set(completedIds);
  const sortedExercises = [...exercises].sort((a, b) => {
    const aDone = completedSet.has(a.id);
    const bDone = completedSet.has(b.id);
    return Number(aDone) - Number(bDone);
  });

  return (
    <motion.div
      layout
      className="space-y-3 sm:space-y-4 w-full max-w-3xl mx-auto px-2 sm:px-0"
    >
      {sortedExercises.map((exercise, index) => {
        const completed = completedSet.has(exercise.id);
        return (
          <motion.div
            key={exercise.id}
            layout
            transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
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
    </motion.div>
  );
}
