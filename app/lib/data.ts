export type WorkoutExercise = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  note: string | null;
};

export type WorkoutSchedule = {
  [weekday: string]: string;
};

export type WorkoutPlan = {
  planName: string;
  schedule: WorkoutSchedule;
  workouts: Record<string, WorkoutExercise[]>;
};

export const MOCK_WORKOUT_PLAN: WorkoutPlan = {
  planName: "Fitness Passion Gym (Beginner)",
  schedule: {
    Monday: "Lower Body",
    Tuesday: "Upper Body",
    Wednesday: "Cardio & Abs",
    Thursday: "Lower Body",
    Friday: "Upper Body",
    Saturday: "Cardio & Abs",
    Sunday: "Rest Day",
  },
  workouts: {
    "Lower Body": [
      {
        id: "lb-1",
        name: "Own body Squats / Squats DB",
        reps: "20-15",
        sets: "2-3",
        note: "Use own body weight for 1st week, then Dumbbells.",
      },
      {
        id: "lb-2",
        name: "Own body static Lunges / Lunges static db",
        reps: "20-15",
        sets: "2-3",
        note: "W1: Own body. W2+: Dumbbells.",
      },
      {
        id: "lb-3",
        name: "Leg press / Leg extension",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 2.",
      },
      {
        id: "lb-4",
        name: "Standing calf",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 1.",
      },
      {
        id: "lb-5",
        name: "Seated calf",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 2.",
      },
      {
        id: "lb-6",
        name: "Leg curl",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "lb-7",
        name: "Lower body stretch",
        reps: "N/A",
        sets: "1",
        note: "Hold each stretch for 30s.",
      },
    ],
    "Upper Body": [
      {
        id: "ub-1",
        name: "Lats pull down",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 1.",
      },
      {
        id: "ub-2",
        name: "Supported Low row / Seated row M/C",
        reps: "20-15",
        sets: "2-3",
        note: "Use M/C in Week 2.",
      },
      {
        id: "ub-3",
        name: "Shrugs DB",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ub-4",
        name: "Flat DB Press",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ub-5",
        name: "Incline DB Press",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 1.",
      },
      {
        id: "ub-6",
        name: "Incline M/C Press (optional)",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 2.",
      },
      {
        id: "ub-7",
        name: "Overhead press DB",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ub-8",
        name: "External rotation DB",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ub-9",
        name: "Superman / Back extension",
        reps: "20-15",
        sets: "2-3",
        note: "Start Back extension after 15 days.",
      },
      {
        id: "ub-10",
        name: "Supination DB curl",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 1.",
      },
      {
        id: "ub-11",
        name: "Biceps curl",
        reps: "20-15",
        sets: "2-3",
        note: "Start in Week 2.",
      },
      {
        id: "ub-12",
        name: "Triceps push down cable",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ub-13",
        name: "Forearm Gorilla Gripper",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ub-14",
        name: "Upper body stretch",
        reps: "N/A",
        sets: "1",
        note: "Hold each stretch for 30s.",
      },
    ],
    "Cardio & Abs": [
      {
        id: "ca-1",
        name: "Sit up (on floor)",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ca-2",
        name: "Side crunch",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ca-3",
        name: "Leg raise",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ca-4",
        name: "Russian twists (legs on floor) / Side bend DB",
        reps: "20-15",
        sets: "2-3",
        note: null,
      },
      {
        id: "ca-5",
        name: "Plank",
        reps: "30-60s",
        sets: "2-3",
        note: null,
      },
      {
        id: "ca-6",
        name: "Stretching",
        reps: "N/A",
        sets: "1",
        note: null,
      },
    ],
    "Rest Day": [],
  },
};
