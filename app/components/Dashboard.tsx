"use client";

import { differenceInDays, format } from "date-fns";
import { motion } from "framer-motion";

import type { WorkoutPlan } from "@/app/lib/data";
import { DashboardHeader } from "@/app/components/DashboardHeader";
import { StatsGrid } from "@/app/components/StatsGrid";
import { WorkoutList } from "@/app/components/WorkoutList";

interface DashboardProps {
  name: string;
  joinDate: string;
  workoutPlan: WorkoutPlan;
  completedExercises: string[];
  toggleComplete: (exerciseId: string) => void;
}

export function Dashboard({
  name,
  joinDate,
  workoutPlan,
  completedExercises,
  toggleComplete,
}: DashboardProps) {
  const today = new Date();
  const todayLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const focus =
    workoutPlan.schedule[todayLabel] ?? Object.values(workoutPlan.schedule)[0];
  const exercisesToday = workoutPlan.workouts[focus] ?? [];
  const progressPercent = exercisesToday.length
    ? Math.min(
        100,
        (completedExercises.filter((id) =>
          exercisesToday.some((ex) => ex.id === id)
        ).length /
          exercisesToday.length) *
          100
      )
    : 0;
  const streakDays = Math.max(
    1,
    differenceInDays(new Date(), new Date(joinDate)) + 1
  );
  const workoutsThisWeek = Object.values(workoutPlan.schedule).filter(
    (value) => value !== "Rest Day"
  ).length;
  const hasExercises = exercisesToday.length > 0;
  const previewExercises = exercisesToday.slice(0, 3);
  const nextRestDay =
    Object.entries(workoutPlan.schedule).find(
      ([, value]) => value === "Rest Day"
    )?.[0] ?? "Rest Day";
  const friendlyDate = format(today, "MMM d, yyyy");
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayIndex = weekDays.indexOf(todayLabel);
  const upcomingBlocks = Array.from({ length: 3 }).map((_, index) => {
    const dayIndex =
      todayIndex === -1 ? index : (todayIndex + index) % weekDays.length;
    const dayName = weekDays[dayIndex];
    return {
      day: dayName,
      block: workoutPlan.schedule[dayName] ?? "Rest Day",
    };
  });

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 pb-24 pt-10"
      >
        <DashboardHeader
          name={name}
          greeting={buildGreeting()}
          streakDays={streakDays}
          todayLabel={todayLabel}
          dateDisplay={friendlyDate}
          focus={focus}
          planName={workoutPlan.planName}
        />
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-4 md:grid-cols-2"
        >
          <div className="neubrut-card bg-card px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Up next
                </p>
                <h3 className="text-2xl font-semibold leading-tight">
                  {focus}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {todayLabel} · {friendlyDate}
                </p>
              </div>
              <span className="rounded-full border-2 border-border bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-wider">
                {workoutPlan.planName}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <SummaryStat
                label="Moves today"
                value={`${exercisesToday.length}`}
              />
              <SummaryStat
                label="Weekly sessions"
                value={`${workoutsThisWeek}`}
              />
              <SummaryStat label="Next rest" value={nextRestDay} />
            </div>
            {hasExercises ? (
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  First moves
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {previewExercises.map((exercise) => (
                    <span
                      key={exercise.id}
                      className="rounded-full border-2 border-border bg-white px-4 py-1 text-xs font-semibold"
                    >
                      {exercise.name}
                    </span>
                  ))}
                  {exercisesToday.length > previewExercises.length ? (
                    <span className="rounded-full border-2 border-dashed border-border/60 bg-muted px-4 py-1 text-xs text-muted-foreground">
                      +{exercisesToday.length - previewExercises.length} more
                    </span>
                  ) : null}
                </div>
              </div>
            ) : (
              <p className="mt-5 rounded-2xl border-2 border-dashed border-border/70 bg-muted px-4 py-3 text-sm text-muted-foreground">
                Recovery day. Walk, stretch, and hydrate.
              </p>
            )}
          </div>

          <div className="neubrut-card bg-secondary/40 px-6 py-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Week at a glance
              </p>
              <h3 className="text-xl font-semibold">Keep your rhythm easy</h3>
            </div>
            <div className="mt-4 space-y-3">
              {upcomingBlocks.map(({ day, block }) => (
                <div
                  key={day}
                  className="flex items-center justify-between rounded-2xl border-2 border-border bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{day}</p>
                    <p className="text-xs text-muted-foreground">
                      {day === todayLabel ? "Today" : "Next"}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border-2 border-border px-3 py-1 text-xs font-semibold ${
                      block === "Rest Day" ? "bg-muted" : "bg-accent/30"
                    }`}
                  >
                    {block}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-2xl border-2 border-border bg-white px-4 py-3 text-sm font-medium">
              Next deep rest lands on{" "}
              <span className="text-primary">{nextRestDay}</span>. Pre-book it
              like any other session.
            </p>
          </div>
        </motion.section>

        <StatsGrid
          focus={focus}
          progressPercent={progressPercent}
          streakDays={streakDays}
          workoutsThisWeek={workoutsThisWeek}
          nextRestDay={nextRestDay}
        />

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              {format(new Date(), "MMM d, yyyy")}
            </p>
            <h3 className="text-2xl font-semibold text-foreground">
              {todayLabel}&apos;s checklist
            </h3>
            <p className="text-sm text-muted-foreground">
              Tick items as you go. Everything lives here—no PDFs, no guessing.
            </p>
          </div>
          <WorkoutList
            exercises={exercisesToday}
            completedIds={completedExercises}
            dayLabel={todayLabel}
            onToggle={toggleComplete}
          />
        </motion.section>
      </motion.main>
    </div>
  );
}

function buildGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border-2 border-border bg-white px-4 py-4 text-center shadow-[4px_4px_0_var(--border)]">
      <p className="text-2xl font-semibold text-primary">{value}</p>
      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
