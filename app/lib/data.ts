// data.ts

export type WorkoutExercise = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  category: string; // Added this to enable the split view (Chest vs Triceps)
  note: string | null;
  image?: string[];
  video?: string[];
  impact?: string[];
  impactImage?: string;
  tips?: string[];
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
  planName: "Fitness Passion Gym (Intermediate)",
  schedule: {
    Monday: "Chest & Triceps",
    Tuesday: "Cardio & Crunches",
    Wednesday: "Back & Biceps",
    Thursday: "Cardio & Crunches",
    Friday: "Legs & Shoulders",
    Saturday: "CrossFit & Cardio",
    Sunday: "Rest Day",
  },
  workouts: {
    "Chest & Triceps": [
      // --- CHEST ---
      {
        id: "ct-1",
        name: "Flat Dumbbell Press",
        reps: "15-12",
        sets: "3",
        category: "Chest",
        note: "Control the negative",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif"],
        video: ["https://www.youtube.com/embed/VmB1G1K7v94"],
        impact: ["Builds overall chest mass", "Improves pushing strength"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/dumbbell-press-muscles-worked.png"
      },
      {
        id: "ct-2",
        name: "Incline Dumbbell Press",
        reps: "15-12",
        sets: "3",
        category: "Chest",
        note: "Bench at 30–45 degrees",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif"],
        video: ["https://www.youtube.com/embed/8iPEnn-ltC8"],
        impact: ["Targets upper chest", "Creates 'shelf' look"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/incline-press-muscles-worked.png"
      },
      {
        id: "ct-3",
        name: "Decline Dumbbell Press",
        reps: "15-12",
        sets: "3",
        category: "Chest",
        note: "Do not flare elbows",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Dumbbell-Press.gif"],
        video: ["https://www.youtube.com/embed/0x_7JjP1sHQ"],
        impact: ["Builds lower chest", "Reduces shoulder stress"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/decline-press-muscles-worked.png"
      },
      {
        id: "ct-4",
        name: "Pec Dec Fly (1st W) / Cable Crossover (2nd W)",
        reps: "15-12",
        sets: "3",
        category: "Chest",
        note: "Week alternate",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif"
        ],
        video: ["https://www.youtube.com/embed/eozdVDA78K0"],
        impact: ["Isolates chest", "Inner chest definition"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/chest-fly-muscles-worked.png"
      },
      {
        id: "ct-5",
        name: "Pushups (Optional)",
        reps: "15-12",
        sets: "3",
        category: "Chest",
        note: "Knee or Regular",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif"],
        video: ["https://www.youtube.com/embed/IODxDxX7oi4"],
        impact: ["Burnout finisher", "Core stability"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/pushup-muscles-worked.png"
      },
      // --- TRICEPS ---
      {
        id: "ct-6",
        name: "Bar Dips (Assisted) / Close Grip Bench",
        reps: "15-12",
        sets: "3",
        category: "Triceps",
        note: "Week alternate. 1st W: Dips, 2nd W: Close Grip",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Dips.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif"
        ],
        video: ["https://www.youtube.com/embed/2z8JmcrW-As"],
        impact: ["Mass builder for triceps", "Improves lockout"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/triceps-dip-muscles.png"
      },
      {
        id: "ct-7",
        name: "Triceps Pushdown (Cable/Rope)",
        reps: "15-12",
        sets: "3",
        category: "Triceps",
        note: "Keep elbows fixed at sides",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif"],
        video: ["https://www.youtube.com/embed/2-LAMcpzODU"],
        impact: ["Isolates lateral head", "Horseshoe definition"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/triceps-pushdown-muscles.png"
      },
      {
        id: "ct-8",
        name: "Overhead Extension / Skull Crushers",
        reps: "15-12",
        sets: "3",
        category: "Triceps",
        note: "1st W: Overhead. 2nd W: Skull Crusher.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Overhead-Triceps-Extension.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Skullcrusher.gif"
        ],
        video: ["https://www.youtube.com/embed/YbX7Wd8jQ-Q"],
        impact: ["Targets long head", "Adds arm size"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/overhead-triceps-muscles.png"
      },
      {
        id: "ct-9",
        name: "Triceps Extension DB / Kickback",
        reps: "15-12",
        sets: "3",
        category: "Triceps",
        note: "Squeeze at the top",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif"],
        video: ["https://www.youtube.com/embed/6SS6K3lAwZ8"],
        impact: ["Peak contraction", "Detail work"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/triceps-kickback-muscles.png"
      },
      {
        id: "ct-10",
        name: "Triceps Press Machine",
        reps: "15-12",
        sets: "3",
        category: "Triceps",
        note: "Slow and controlled",
        image: ["https://www.inspireusafoundation.org/file/2022/09/machine-tricep-extension.gif"],
        video: ["https://www.youtube.com/embed/hkU6fSHcslw"],
        impact: ["Safe overload", "Volume accumulation"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/triceps-press-muscles.png"
      }
    ],

    "Back & Biceps": [
      // --- BACK ---
      {
        id: "bb-1",
        name: "Bent Over Row / Bench Supported Row",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "1st W: Bench Supported. 2nd W: Prone Grip.",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Row.gif"
        ],
        video: ["https://www.youtube.com/embed/roCP6wCXPqo"],
        impact: ["Thickness provider", "Lats and Rhomboids"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/bent-over-row-muscles-worked.png"
      },
      {
        id: "bb-2",
        name: "Lat Pulldown",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "Wide grip for width",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif"],
        video: ["https://www.youtube.com/embed/CAwf7n6Luuc"],
        impact: ["Back width", "V-Taper"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/lat-pulldown-muscles-worked.png"
      },
      {
        id: "bb-3",
        name: "Straight Arm Pulldown",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "Keep arms straight",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Straight-Arm-Pulldown.gif"],
        video: ["https://www.youtube.com/embed/6Z15_WdXmVw"],
        impact: ["Lat isolation", "Serratus activation"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/straight-arm-pulldown-muscles.png"
      },
      {
        id: "bb-4",
        name: "Seated Machine Row / Low Row",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "Alternate weekly",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif"],
        video: ["https://www.youtube.com/embed/GZbfZ033f74"],
        impact: ["Mid-back thickness", "Posture correction"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/seated-row-muscles-worked.png"
      },
      {
        id: "bb-5",
        name: "Shrugs DB / Infinity Shrugs",
        reps: "15-12",
        sets: "3",
        category: "Back",
        note: "Squeeze traps at top",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif"],
        video: ["https://www.youtube.com/embed/cJRVVxmytaM"],
        impact: ["Upper traps", "Neck stability"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/shrug-muscles-worked.png"
      },
      {
        id: "bb-6",
        name: "Back Extension / Good Mornings",
        reps: "Max",
        sets: "3",
        category: "Back",
        note: "Max 15kg plate",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Hyperextension.gif"],
        video: ["https://www.youtube.com/embed/ph3pddpKzzw"],
        impact: ["Lower back strength", "Spinal health"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/back-extension-muscles.png"
      },
      // --- BICEPS ---
      {
        id: "bb-7",
        name: "Supination Curl DB",
        reps: "15-12",
        sets: "3",
        category: "Biceps",
        note: "Twist pinky up at top",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif"],
        video: ["https://www.youtube.com/embed/ykJmrZ5v0Oo"],
        impact: ["Bicep peak", "Full range of motion"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/biceps-curl-muscles-worked.png"
      },
      {
        id: "bb-8",
        name: "Reverse Curl / Hammer Curl",
        reps: "15-12",
        sets: "3",
        category: "Biceps",
        note: "1st W: Reverse (Cable), 2nd W: Hammer",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif"],
        video: ["https://www.youtube.com/embed/zC3nLlEvin4"],
        impact: ["Brachialis", "Forearm thickness"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/hammer-curl-muscles.png"
      },
      {
        id: "bb-9",
        name: "Concentration / Preacher Curl",
        reps: "15-12",
        sets: "3",
        category: "Biceps",
        note: "No swinging",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif"],
        video: ["https://www.youtube.com/embed/Jvj2wV0vOYU"],
        impact: ["Isolation", "Peak development"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/preacher-curl-muscles.png"
      },
      {
        id: "bb-10",
        name: "Gorilla Gripper / Wrist Curl",
        reps: "15-12",
        sets: "3",
        category: "Biceps",
        note: "Forearm focus",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Wrist-Curl.gif"],
        video: ["https://www.youtube.com/embed/qyT5hR9Y8dQ"],
        impact: ["Grip strength", "Vascularity"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/06/wrist-curl-muscles.png"
      }
    ],

    "Legs & Shoulders": [
      // --- LEGS ---
      {
        id: "ls-1",
        name: "Barbell Squats",
        reps: "15-12",
        sets: "3 Main",
        category: "Legs",
        note: "King of exercises",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Squat.gif"],
        video: ["https://www.youtube.com/embed/ultWZbUMPL8"],
        impact: ["Total leg mass", "Core strength"],
        impactImage: "https://www.inspireusafoundation.org/file/2021/03/full-squat-side-view.gif"
      },
      {
        id: "ls-2",
        name: "Forward Lunges / Reverse Lunges",
        reps: "15-12",
        sets: "2",
        category: "Legs",
        note: "Week alternate",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif"],
        video: ["https://www.youtube.com/embed/QOVaHwm-Q6U"],
        impact: ["Unilateral strength", "Glutes and Quads"],
        impactImage: "https://www.garagegymreviews.com/wp-content/uploads/2023/01/lunge-muscles.jpg"
      },
      {
        id: "ls-3",
        name: "Leg Press / Leg Extension",
        reps: "15-12",
        sets: "2",
        category: "Legs",
        note: "Week alternate",
        image: [
          "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
          "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif"
        ],
        video: ["https://www.youtube.com/embed/yZmx_Ac3880"],
        impact: ["Quad isolation", "Volume without back stress"],
        impactImage: "https://cdn.shopify.com/s/files/1/0618/9462/3460/files/Leg-Press-min-800x800.png"
      },
      {
        id: "ls-4",
        name: "Hip Thrust (Optional)",
        reps: "15-12",
        sets: "3",
        category: "Legs",
        note: "Squeeze glutes at top",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif"],
        video: ["https://www.youtube.com/embed/LM8XHLYJoYs"],
        impact: ["Glute max builder", "Hip power"],
        impactImage: "https://www.meridian-fitness.co.uk/wp-content/uploads/2025/04/Hip-thrust-muscles-worked.webp"
      },
      {
        id: "ls-5",
        name: "Standing Calf Raise",
        reps: "15-12",
        sets: "3",
        category: "Legs",
        note: "Full range of motion",
        image: ["https://www.inspireusafoundation.org/file/2022/11/standing-calf-raise.gif"],
        video: ["https://www.youtube.com/embed/-M4-G8p8fmc"],
        impact: ["Calf size", "Ankle stability"],
        impactImage: "https://chunkfitness.com/sites/default/files/standing-calf-raises-machine.jpg"
      },
      {
        id: "ls-6",
        name: "Seated Calf Raise",
        reps: "15-12",
        sets: "4",
        category: "Legs",
        note: "Targets Soleus",
        image: ["https://www.inspireusafoundation.org/file/2022/11/seated-calf-raise.gif"],
        video: ["https://www.youtube.com/embed/Yh6wS_C0Eaw"],
        impact: ["Lower calf width", "Endurance"],
        impactImage: "https://blog.myarsenalstrength.com/hs-fs/hubfs/IMG_1714.jpg"
      },
      {
        id: "ls-7",
        name: "Leg Curl",
        reps: "15-12",
        sets: "2",
        category: "Legs",
        note: "Hamstring isolation",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Curl.gif"],
        video: ["https://www.youtube.com/embed/_lgE0gPvbik"],
        impact: ["Hamstring strength", "Knee health"],
        impactImage: "https://cdn.shopify.com/s/files/1/0564/2607/0148/files/leg_curls_msucles.png"
      },
      // --- SHOULDER ---
      {
        id: "ls-8",
        name: "Overhead Press DB / BB",
        reps: "15-12",
        sets: "3 Main",
        category: "Shoulder",
        note: "1st W: DB, 2nd W: BB",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif"],
        video: ["https://www.youtube.com/embed/eNMl9UoO7YA"],
        impact: ["Shoulder mass", "Core stability"],
        impactImage: "https://kinxlearning.com/cdn/shop/files/seated_pess_db_1000x.jpg"
      },
      {
        id: "ls-9",
        name: "Lateral Raise",
        reps: "15-12",
        sets: "2",
        category: "Shoulder",
        note: "Lead with elbows",
        image: ["https://www.inspireusafoundation.org/file/2023/07/lateral-raise-machine.gif"],
        video: ["https://www.youtube.com/embed/3VcKaXpzqRo"],
        impact: ["Shoulder width", "Capped delts"],
        impactImage: "https://media.istockphoto.com/id/538051060/photo/3d-male-figure-doing-dumbbell-standing-lateral-raise.jpg?s=1024x1024&w=is&k=20&c=c8B_VMXVI4Qb_wswhyRUWf1-TsWQaBbkuH-hx8zlX0E="
      },
      {
        id: "ls-10",
        name: "Reverse Fly / Facepull",
        reps: "15-12",
        sets: "2",
        category: "Shoulder",
        note: "Rear delt focus",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif"],
        video: ["https://www.youtube.com/embed/rep-qVOkqgk"],
        impact: ["Posture", "Rear shoulder health"],
        impactImage: "https://burnfit.io/wp-content/uploads/2023/11/FACE_PULL.gif"
      },
      {
        id: "ls-11",
        name: "External Rotation DB",
        reps: "15-12",
        sets: "2",
        category: "Shoulder",
        note: "Rotator cuff warm-up/down",
        image: ["https://gymvisual.com/img/p/2/7/3/2/6/27326.gif"],
        video: ["https://www.youtube.com/embed/Nhq49UJefwI"],
        impact: ["Shoulder health", "Injury prevention"],
        impactImage: "https://liveleantv.s3.amazonaws.com/wp-content/uploads/2023/05/18090614/muscle-diagram-shoulders.png"
      }
    ],

    "Cardio & Crunches": [
      {
        id: "cc-1",
        name: "Sit-Up (On Board)",
        reps: "20-15",
        sets: "3",
        category: "Abs",
        note: "Controlled movement",
        image: ["https://www.inspireusafoundation.org/decline-sit-up/"],
        video: ["https://youtube.com/shorts/D_6tXVmq_nM"],
        impact: ["Upper abs", "Core endurance"],
        impactImage: "https://www.pinterest.com/pin/sit-up-anatomy--373235887845586885/"
      },
      {
        id: "cc-2",
        name: "Reverse Crunch",
        reps: "20-15",
        sets: "2",
        category: "Abs",
        note: "Lift hips off floor",
        image: ["https://burnfit.io/en/library/reverse-crunch/"],
        video: ["https://www.youtube.com/embed/iFQV6q4xRXM"],
        impact: ["Lower abs", "Pelvic control"],
        impactImage: "https://youtube.com/shorts/XN7l5P8qXBA"
      },
      {
        id: "cc-3",
        name: "Leg Raise",
        reps: "20-15",
        sets: "3",
        category: "Abs",
        note: "Keep lower back flat",
        image: ["https://liftmanual.com/leg-raise-hip-lift/"],
        video: ["https://youtube.com/shorts/wt1zvu84oGo"],
        impact: ["Lower abs", "Hip flexors"],
        impactImage: "https://lifefitindia.com/hanging-leg-raise/"
      },
      {
        id: "cc-4",
        name: "Russian Twists",
        reps: "20-15",
        sets: "2",
        category: "Abs",
        note: "Legs on floor",
        image: ["https://ar.pinterest.com/pin/184788390950338119/"],
        video: ["https://youtube.com/shorts/C3RauLi8FNw"],
        impact: ["Obliques", "Rotational strength"],
        impactImage: "https://www.shutterstock.com/video/clip-3717811381"
      },
      {
        id: "cc-5",
        name: "Planks",
        reps: "Hold",
        sets: "2",
        category: "Abs",
        note: "Failure hold",
        image: ["https://www.inspireusafoundation.org/planks/"],
        video: ["https://www.youtube.com/embed/xe2MXatLTUw"],
        impact: ["Core stability", "Isometric strength"],
        impactImage: "https://www.liftingitalia.com/?a=68117130031500"
      },
      {
        id: "cc-6",
        name: "Cardio (Any)",
        reps: "30 mins",
        sets: "1",
        category: "Cardio",
        note: "Low Intensity",
        image: ["https://media.tenor.com/D_8hL4i_6k8AAAAM/treadmill-running.gif"],
        video: [],
        impact: ["Heart health", "Fat loss"],
        impactImage: ""
      }
    ],

    "CrossFit & Cardio": [
        {
        id: "cf-1",
        name: "Mobility Drills",
        reps: "10 mins",
        sets: "1",
        category: "Flexibility",
        note: "Full body joint warm up",
        image: ["https://fitnessprogramer.com/wp-content/uploads/2021/02/Arm-Circles.gif"],
        video: [],
        impact: ["Joint health", "Injury prevention"],
        },
        {
        id: "cf-2",
        name: "Cardio (Any)",
        reps: "30 mins",
        sets: "1",
        category: "Cardio",
        note: "Low Intensity",
        image: ["https://media.tenor.com/D_8hL4i_6k8AAAAM/treadmill-running.gif"],
        video: [],
        impact: ["Heart health", "Active recovery"],
        }
    ]
  },
};

// Helper for versioning
export const WORKOUT_PLAN_VERSION = hashWorkoutPlan(MOCK_WORKOUT_PLAN);

function hashWorkoutPlan(plan: WorkoutPlan): string {
  return hashString(JSON.stringify(plan));
}

function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}