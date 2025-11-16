"use client";

import { useEffect, useMemo, useState } from "react";

import type { WorkoutPlan } from "@/app/lib/data";

const STORE_KEY = "gym-app-store";

type UserProfile = {
  name: string;
  joinDate: string;
};

type WorkoutStoreState = {
  userProfile: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  completedExercises: string[];
  lastResetDate: string | null;
};

const initialState: WorkoutStoreState = {
  userProfile: null,
  workoutPlan: null,
  completedExercises: [],
  lastResetDate: null,
};

export function useWorkoutStore() {
  const todayKey = useMemo(() => new Date().toDateString(), []);
  const [state, setState] = useState<WorkoutStoreState>(() => {
    if (typeof window === "undefined") {
      return { ...initialState, lastResetDate: todayKey };
    }
    const data = window.localStorage.getItem(STORE_KEY);
    if (!data) return { ...initialState, lastResetDate: todayKey };
    try {
      const parsed = JSON.parse(data) as WorkoutStoreState;
      if (parsed.lastResetDate === todayKey) return parsed;
      return { ...parsed, completedExercises: [], lastResetDate: todayKey };
    } catch (error) {
      console.error("Failed to parse workout store", error);
      return { ...initialState, lastResetDate: todayKey };
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }, [state]);

  const completeOnboarding = (name: string, plan: WorkoutPlan) => {
    setState({
      userProfile: { name, joinDate: new Date().toISOString() },
      workoutPlan: plan,
      completedExercises: [],
      lastResetDate: todayKey,
    });
  };

  const toggleComplete = (exerciseId: string) => {
    setState((prev) => {
      const exists = prev.completedExercises.includes(exerciseId);
      return {
        ...prev,
        completedExercises: exists
          ? prev.completedExercises.filter((id) => id !== exerciseId)
          : [...prev.completedExercises, exerciseId],
      };
    });
  };

  const resetAll = () => setState({ ...initialState, lastResetDate: todayKey });

  return {
    ...state,
    completeOnboarding,
    toggleComplete,
    resetAll,
  };
}
