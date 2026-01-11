"use client";

import { useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { ExerciseCard } from "./ExerciseCard";
import { Check, Trophy } from "lucide-react";
import { cn } from "@/lib/utils"; // Adjust path
import { WorkoutExercise } from "../lib/data";

// --- Types ---
type WorkoutListProps = {
  exercises: WorkoutExercise[];
  completedIds: string[];
  dayLabel: string;
  isLoading?: boolean;
  onToggle: (exerciseId: string) => void;
};

// --- Helper: Cool Shimmer Skeleton Loader ---
const LoadingSkeleton = () => (
  <div className="space-y-6 w-full max-w-3xl mx-auto px-2 mt-8">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="relative h-28 w-full bg-white border-[3px] border-black/5 rounded-[30px] overflow-hidden shadow-sm"
      >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 to-transparent" />
      </div>
    ))}
  </div>
);

// --- Helper: Rest Day Card ---
const RestDayCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-xl mx-auto mt-12 px-4"
  >
    <div className="relative border-[3px] border-black bg-[#FFFDF7] rounded-[40px] p-10 text-center shadow-[8px_8px_0px_0px_#000]">
      <div className="w-20 h-20 bg-[#FFD27D] border-[3px] border-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_#000]">
        <span className="text-4xl">💤</span>
      </div>
      <h3 className="text-3xl font-black uppercase tracking-tighter text-black mb-2">
        Rest Day
      </h3>
      <p className="font-bold text-neutral-500 max-w-xs mx-auto">
        Time to recover. See you tomorrow!
      </p>
    </div>
  </motion.div>
);

// --- Main Component ---
export function WorkoutList({
  exercises,
  completedIds,
  isLoading = false,
  onToggle,
}: WorkoutListProps) {
  const groupedData = useMemo(() => {
    if (!exercises.length) return null;

    /**
     * IMPORTANT:
     * - Do NOT reorder exercises
     * - Respect original array order
     */
    const groups: {
      category: string;
      items: WorkoutExercise[];
    }[] = [];

    const categoryMap = new Map<string, WorkoutExercise[]>();

    for (const ex of exercises) {
      const cat = ex.category || "General";

      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
        groups.push({ category: cat, items: categoryMap.get(cat)! });
      }

      categoryMap.get(cat)!.push(ex);
    }

    /**
     * OPTIONAL UX:
     * Move completed exercises to bottom
     * WITHOUT changing original order
     */
    return groups.map((group) => {
      const pending = group.items.filter((e) => !completedIds.includes(e.id));
      const done = group.items.filter((e) => completedIds.includes(e.id));

      return {
        category: group.category,
        items: [...pending, ...done],
      };
    });
  }, [exercises, completedIds]);

  if (isLoading) return <LoadingSkeleton />;

  if (!groupedData || groupedData.length === 0) {
    return <RestDayCard />;
  }

  return (
    <LayoutGroup>
      <motion.div
        className="w-full max-w-3xl mx-auto pb-32 space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {groupedData.map((group) => {
          const completedCount = group.items.filter((i) =>
            completedIds.includes(i.id)
          ).length;

          return (
            <div key={group.category}>
              {/* CATEGORY HEADER */}
              <div className="mb-5 px-2">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border-2 border-black bg-black text-white shadow">
                  <span className="text-xs font-black uppercase tracking-widest">
                    {group.category}
                  </span>
                  <span className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded-full">
                    {completedCount}/{group.items.length}
                  </span>
                </div>
              </div>

              {/* EXERCISES */}
              <motion.div layout className="space-y-4 px-1">
                <AnimatePresence>
                  {group.items.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      isCompleted={completedIds.includes(exercise.id)}
                      onToggle={() => onToggle(exercise.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </LayoutGroup>
  );
}

