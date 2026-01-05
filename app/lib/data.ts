// data.ts

export type WorkoutExercise = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  category: string;
  note: string | null;
  image?: string[];
  video?: string[];
  impact?: string[];
  impactImage?: string;
};

export type WorkoutPlan = {
  planName: string;
  schedule: Record<string, string>;
  workouts: Record<string, WorkoutExercise[]>;
};

export const MOCK_WORKOUT_PLAN: WorkoutPlan = {
  planName: "Fitness Passion Gym (Intermediate)",

  // ✅ CORRECTED SCHEDULE: Monday is Back & Biceps
  schedule: {
    Monday: "Back & Biceps",
    Tuesday: "Cardio & Crunches",
    Wednesday: "Chest & Triceps",
    Thursday: "Cardio & Full Body Stretching",
    Friday: "Legs & Shoulder",
    Saturday: "CrossFit & Cardio",
    Sunday: "Rest Day",
  },

  workouts: {
    // ===========================================
    // MONDAY: BACK & BICEPS
    // ===========================================
    "Back & Biceps": [
      // BACK
      {
        id: "bk-1",
        name: "Bent over row 1st W / Bench supported row",
        reps: "15-12",
        sets: "3 sets",
        category: "Back",
        note: "1st Week Option",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif",
          "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/11/chest-supported-dumbbell-row.gif?resize=600%2C600&ssl=1",
        ],
        video: [
          "https://youtube.com/embed/MXfyuB6DjWE?si=QhSv-G1q4btsOW8v",
          "https://youtube.com/embed/czoQ_ncuqqI?si=gPfOxPYu8kglw8nE",
        ],
        impact: ["Back Strengthening", "Posture Improvement"],
      },
      {
        id: "bk-2",
        name: "BB row prone grip",
        reps: "15-12",
        sets: "3 sets",
        category: "Back",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Row.gif",
        ],
      },
      {
        id: "bk-3",
        name: "Lat pull down",
        reps: "15-12",
        sets: "3 sets",
        category: "Back",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif",
        ],
      },
      {
        id: "bk-4",
        name: "Straight arm pull down",
        reps: "15-12",
        sets: "2 sets",
        category: "Back",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Straight-Arm-Pulldown.gif",
        ],
      },
      {
        id: "bk-5",
        name: "Low M/C row",
        reps: "15-12",
        sets: "3 sets",
        category: "Back",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif",
        ],
      },
      {
        id: "bk-6",
        name: "Seated row M/C",
        reps: "15-12",
        sets: "3 sets",
        category: "Back",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Machine-Row.gif",
        ],
      },
      {
        id: "bk-7",
        name: "Shrugs DB",
        reps: "15-12",
        sets: "3 sets",
        category: "Back",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif",
        ],
      },
      {
        id: "bk-8",
        name: "Shrugs Infinity",
        reps: "15-12",
        sets: "3 sets",
        category: "Back",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif",
        ],
      },
      {
        id: "bk-9",
        name: "Back extension with plates (max 15 kg) / Good morning",
        reps: "15-12",
        sets: "3 sets",
        category: "Back",
        note: "Caution with weight",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Back-Extension.gif",
        ],
      },

      {
        id: "bi-1",
        name: "Supination curl DB",
        reps: "15-12",
        sets: "3 sets",
        category: "Biceps",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif",
        ],
      },
      {
        id: "bi-2",
        name: "Reverse curl cable prone 1st W / Hammer curl 2nd W",
        reps: "15-12",
        sets: "2 sets",
        category: "Biceps",
        note: "Week Dependent",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Reverse-Curl.gif",
        ],
      },
      {
        id: "bi-3",
        name: "Concentration Curl / Preacher curl",
        reps: "15-12",
        sets: "2 sets",
        category: "Biceps",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif",
        ],
      },
      {
        id: "bi-4",
        name: "Barbell / Cable Biceps curl",
        reps: "15-12",
        sets: "2 sets",
        category: "Biceps",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif",
        ],
      },
      {
        id: "bi-5",
        name: "Gorilla Gripper",
        reps: "15-12",
        sets: "3 sets",
        category: "Forearm",
        note: null,
      },
      {
        id: "bi-6",
        name: "DB forearms curl",
        reps: "15-12",
        sets: "3 sets",
        category: "Forearm",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Wrist-Curl.gif",
        ],
      },
    ],

    // ===========================================
    // TUESDAY: CARDIO & CRUNCHES
    // ===========================================
    "Cardio & Crunches": [
      {
        id: "abs-1",
        name: "Sit up (on board)",
        reps: "20-15",
        sets: "3 sets",
        category: "Abs",
        note: null,
      }, // [cite: 23]
      {
        id: "abs-2",
        name: "Reverse crunch",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: null,
      }, // [cite: 23]
      {
        id: "abs-3",
        name: "Leg raise",
        reps: "20-15",
        sets: "3 sets",
        category: "Abs",
        note: null,
      }, // [cite: 23]
      {
        id: "abs-4",
        name: "Double leg cycling",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: null,
      }, // [cite: 23]
      {
        id: "abs-5",
        name: "Russian twists (legs on floor)",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: null,
      }, // [cite: 23]
      {
        id: "abs-6",
        name: "Planks",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: null,
      }, // [cite: 23]
      {
        id: "abs-7",
        name: "Side bend with Cables",
        reps: "20-15",
        sets: "3 sets",
        category: "Abs",
        note: null,
      }, // [cite: 23]
      {
        id: "abs-8",
        name: "Caterpillar",
        reps: "20-15",
        sets: "2 sets",
        category: "Abs",
        note: null,
      }, // [cite: 23]
    ],

    // ===========================================
    // WEDNESDAY: CHEST & TRICEPS
    // ===========================================
    "Chest & Triceps": [
      // CHEST [cite: 2]
      {
        id: "ch-1",
        name: "Flat DB",
        reps: "15-12",
        sets: "3 sets",
        category: "Chest",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif",
        ],
      },
      {
        id: "ch-2",
        name: "Incline DB",
        reps: "15-12",
        sets: "3 sets",
        category: "Chest",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif",
        ],
      },
      {
        id: "ch-3",
        name: "Decline DB",
        reps: "15-12",
        sets: "3 sets",
        category: "Chest",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Dumbbell-Press.gif",
        ],
      },
      {
        id: "ch-4",
        name: "Pec dec fly",
        reps: "15-12",
        sets: "3 sets",
        category: "Chest",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif",
        ],
      },
      {
        id: "ch-5",
        name: "Cable crossover / Vertical pec fly",
        reps: "15-12",
        sets: "3 sets",
        category: "Chest",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif",
        ],
      },
      {
        id: "ch-6",
        name: "Pushups (Knee)",
        reps: "15-12",
        sets: "3 sets",
        category: "Chest",
        note: "Optional",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Kneeling-Push-up.gif",
        ],
      },
      {
        id: "ch-7",
        name: "Pushups (Regular)",
        reps: "15-12",
        sets: "3 sets",
        category: "Chest",
        note: "Optional",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Push-Up.gif",
        ],
      },

      // TRICEPS [cite: 2]
      {
        id: "tr-1",
        name: "Bar dips weight assisted 1st W / close grip bench press",
        reps: "15-12",
        sets: "3 sets",
        category: "Triceps",
        note: "Week Dependent",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/06/Assisted-Dip.gif",
        ],
      },
      {
        id: "tr-2",
        name: "Bar dips resistance band assisted",
        reps: "15-12",
        sets: "3 sets",
        category: "Triceps",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Band-Assisted-Dip.gif",
        ],
      },
      {
        id: "tr-3",
        name: "Triceps push down cable/rope",
        reps: "15-12",
        sets: "3 sets",
        category: "Triceps",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Down.gif",
        ],
      },
      {
        id: "tr-4",
        name: "Cable overhead triceps extension / Skull crusher DB",
        reps: "15-12",
        sets: "3 sets",
        category: "Triceps",
        note: "1st Week Option",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Overhead-Triceps-Extension.gif",
        ],
      },
      {
        id: "tr-5",
        name: "Triceps extension DB / Kickback DB",
        reps: "15-12",
        sets: "3 sets",
        category: "Triceps",
        note: "2nd Week Option",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif",
        ],
      },
      {
        id: "tr-6",
        name: "Triceps press M/C",
        reps: "15-12",
        sets: "3 sets",
        category: "Triceps",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Machine-Dip.gif",
        ],
      },
    ],

    // ===========================================
    // THURSDAY: CARDIO & STRETCHING
    // ===========================================
    "Cardio & Full Body Stretching": [
      {
        id: "cardio-1",
        name: "Cardio (any)",
        reps: "30 mins",
        sets: "1 set",
        category: "Cardio",
        note: "Low Intensity",
      }, // [cite: 23]
      {
        id: "stretch-1",
        name: "Passive Stretch",
        reps: "After workout",
        sets: "1 set",
        category: "Mobility",
        note: null,
      }, // [cite: 23]
    ],

    // ===========================================
    // FRIDAY: LEGS & SHOULDER
    // ===========================================
    "Legs & Shoulder": [
      {
        id: "leg-1",
        name: "Squats",
        reps: "15-12",
        sets: "3 Main Sets",
        category: "Legs",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Squat.gif",
        ],
      },
      {
        id: "leg-2",
        name: "Lunges forward",
        reps: "15-12",
        sets: "2 Sets",
        category: "Legs",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
        ],
      },
      {
        id: "leg-3",
        name: "Reverse lunges",
        reps: "15-12",
        sets: "2 Sets",
        category: "Legs",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Reverse-Lunge.gif",
        ],
      },
      {
        id: "leg-4",
        name: "Leg press",
        reps: "15-12",
        sets: "2 Sets",
        category: "Legs",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif",
        ],
      },
      {
        id: "leg-5",
        name: "Leg extension",
        reps: "15-12",
        sets: "2 Sets",
        category: "Legs",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Extension.gif",
        ],
      },
      {
        id: "leg-6",
        name: "Hip thrust",
        reps: "15-12",
        sets: "3 Sets",
        category: "Legs",
        note: "Optional",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif",
        ],
      },
      {
        id: "leg-7",
        name: "Standing calf",
        reps: "15-12",
        sets: "3 Sets",
        category: "Legs",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Standing-Calf-Raise.gif",
        ],
      },
      {
        id: "leg-8",
        name: "Seated calf",
        reps: "15-12",
        sets: "4 Sets",
        category: "Legs",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Calf-Raise.gif",
        ],
      },
      {
        id: "leg-9",
        name: "Leg curl",
        reps: "15-12",
        sets: "2 Sets",
        category: "Legs",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif",
        ],
      },
      {
        id: "leg-10",
        name: "Toe raise",
        reps: "20 sec hold",
        sets: "1",
        category: "Legs",
        note: null,
      },
      {
        id: "leg-11",
        name: "Lower body stretch",
        reps: "20 sec hold",
        sets: "1",
        category: "Mobility",
        note: null,
      },
      {
        id: "leg-12",
        name: "Whole body compound stretch",
        reps: "21 sec hold",
        sets: "1",
        category: "Mobility",
        note: null,
      },

      {
        id: "sh-1",
        name: "Overhead press DB",
        reps: "15-12",
        sets: "3 Main Sets",
        category: "Shoulder",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif",
        ],
      },
      {
        id: "sh-2",
        name: "Overhead press BB",
        reps: "15-12",
        sets: "3 Main Sets",
        category: "Shoulder",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif",
        ],
      },
      {
        id: "sh-3",
        name: "Lateral raise DB",
        reps: "15-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "1st Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif",
        ],
      },
      {
        id: "sh-4",
        name: "Lateral raise M/C",
        reps: "15-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: "2nd Week",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Machine-Lateral-Raise.gif",
        ],
      },
      {
        id: "sh-5",
        name: "Reverse fly M/C / Facepull",
        reps: "15-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Reverse-Pec-Deck-Fly.gif",
        ],
      },
      {
        id: "sh-6",
        name: "External rotation DB",
        reps: "15-12",
        sets: "2 Sets",
        category: "Shoulder",
        note: null,
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-External-Rotation.gif",
        ],
      },
    ],

    // ===========================================
    // SATURDAY: CROSSFIT & CARDIO
    // ===========================================
    "CrossFit & Cardio": [
      {
        id: "sat-1",
        name: "Cardio (any)",
        reps: "5 min",
        sets: "1",
        category: "Cardio",
        note: "Warmup",
      }, // [cite: 23]
      {
        id: "sat-2",
        name: "Mobility drills",
        reps: "Duration",
        sets: "1",
        category: "Mobility",
        note: null,
      }, // [cite: 23]
      {
        id: "sat-3",
        name: "Weight training / crunches",
        reps: "Duration",
        sets: "1",
        category: "Circuit",
        note: null,
      }, // [cite: 23]
      {
        id: "sat-4",
        name: "Cardio (any)",
        reps: "30 mins",
        sets: "1",
        category: "Cardio",
        note: "Low Intensity",
      }, // [cite: 23]
      {
        id: "sat-5",
        name: "Passive stretch",
        reps: "After workout",
        sets: "1",
        category: "Mobility",
        note: null,
      }, // [cite: 23]
    ],
  },
};

// =========================
// VERSIONING (REQUIRED EXPORT)
// =========================

export const WORKOUT_PLAN_VERSION = hashWorkoutPlan(MOCK_WORKOUT_PLAN);

function hashWorkoutPlan(plan: WorkoutPlan): string {
  return hashString(JSON.stringify(plan));
}

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return hash.toString(16);
}