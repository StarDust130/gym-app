export type WorkoutExercise = {
  id: string;
  name: string;
  reps: string;
  sets: string;
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
  Monday: "Back & Biceps",
  Tuesday: "Cardio & Crunches",
  Wednesday: "Chest & Triceps",
  Thursday: "Cardio & Crunches",
  Friday: "Legs & Shoulders",
  Saturday: "Cardio & Crunches",
  Sunday: "Rest Day",
},

  workouts: {
    "Back & Biceps": [
  {
    id: "bb-1",
    name: "Bent over row / Bench supported row",
    reps: "15-12",
    sets: "3",
    note: "Week 1: Bench supported. Week 2: Bent over.",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Barbell-Row.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif"
    ],
    video: [
      "https://www.youtube.com/embed/vT2GjY_Umpw",
      "https://www.youtube.com/embed/roCP6wCXPqo"
    ],
    impact: [
      "Builds mid-back thickness",
      "Improves pulling strength",
      "Enhances posture and spinal stability"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/bent-over-row-muscles-worked.png"
  },

  {
    id: "bb-2",
    name: "Barbell row (prone grip)",
    reps: "15-12",
    sets: "3",
    note: "Week 2 exercise",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Row.gif"
    ],
    video: ["https://www.youtube.com/embed/9efgcAjQe7E"],
    impact: [
      "Targets lats and middle back",
      "Improves overall back density",
      "Strengthens core under load"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/barbell-row-muscles-worked.png"
  },

  {
    id: "bb-3",
    name: "Lat pull down",
    reps: "15-12",
    sets: "3",
    note: "Pull to upper chest",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif"
    ],
    video: ["https://www.youtube.com/embed/CAwf7n6Luuc"],
    impact: [
      "Builds lat width",
      "Improves V-taper",
      "Enhances pulling mechanics"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/lat-pulldown-muscles-worked.png"
  },

  {
    id: "bb-4",
    name: "Straight arm pull down",
    reps: "15-12",
    sets: "2",
    note: "Keep arms slightly bent",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Straight-Arm-Pulldown.gif"
    ],
    video: ["https://www.youtube.com/embed/6Z15_WdXmVw"],
    impact: [
      "Isolates lats without biceps involvement",
      "Improves mind-muscle connection",
      "Helps lat activation before heavy rows"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/straight-arm-pulldown-muscles.png"
  },

  {
    id: "bb-5",
    name: "Low row machine / Seated row machine",
    reps: "15-12",
    sets: "3",
    note: "Alternate weekly",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif"
    ],
    video: ["https://www.youtube.com/embed/GZbfZ033f74"],
    impact: [
      "Builds mid-back thickness",
      "Improves scapular control",
      "Supports posture correction"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/seated-row-muscles-worked.png"
  },

  {
    id: "bb-6",
    name: "Dumbbell shrugs / Infinity shrugs",
    reps: "15-12",
    sets: "3",
    note: "Alternate weekly",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shrug.gif"
    ],
    video: ["https://www.youtube.com/embed/cJRVVxmytaM"],
    impact: [
      "Builds upper traps",
      "Supports neck and shoulder stability",
      "Improves upper-back appearance"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/shrug-muscles-worked.png"
  },

  {
    id: "bb-7",
    name: "Back extension / Good morning",
    reps: "15-12",
    sets: "3",
    note: "Max 15kg",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hyperextension.gif"
    ],
    video: ["https://www.youtube.com/embed/ph3pddpKzzw"],
    impact: [
      "Strengthens lower back",
      "Reduces injury risk",
      "Improves hip hinge strength"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/back-extension-muscles.png"
  },

  {
    id: "bb-8",
    name: "Supination dumbbell curl",
    reps: "15-12",
    sets: "3",
    note: "Rotate wrist at top",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/ykJmrZ5v0Oo"],
    impact: [
      "Builds biceps peak",
      "Improves arm aesthetics",
      "Enhances elbow strength"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/biceps-curl-muscles-worked.png"
  },

  {
    id: "bb-9",
    name: "Reverse cable curl / Hammer curl",
    reps: "15-12",
    sets: "2",
    note: "Alternate weekly",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/zC3nLlEvin4"],
    impact: [
      "Targets brachialis",
      "Builds arm thickness",
      "Improves grip strength"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/hammer-curl-muscles.png"
  },

  {
    id: "bb-10",
    name: "Concentration curl / Preacher curl",
    reps: "15-12",
    sets: "2",
    note: "Strict form only",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/Jvj2wV0vOYU"],
    impact: [
      "Improves biceps isolation",
      "Enhances peak contraction",
      "Reduces cheating"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/preacher-curl-muscles.png"
  },

  {
    id: "bb-11",
    name: "Barbell / Cable biceps curl",
    reps: "15-12",
    sets: "2",
    note: null,
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/kwG2ipFRgfo"],
    impact: [
      "Builds overall biceps mass",
      "Increases pulling strength",
      "Improves arm symmetry"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/barbell-curl-muscles.png"
  },

  {
    id: "bb-12",
    name: "Forearms – Gorilla gripper",
    reps: "15-12",
    sets: "3",
    note: "Slow controlled squeeze",
    image: [
      "https://5.imimg.com/data5/SELLER/Default/2021/10/GI/IC/WX/13678780/gorilla-gripper-1000x1000.jpg"
    ],
    video: ["https://www.youtube.com/embed/J62QOrYtbfo"],
    impact: [
      "Builds crushing grip strength",
      "Enhances forearm density",
      "Improves performance in pulls"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/forearm-muscles-worked.png"
  },

  {
    id: "bb-13",
    name: "Dumbbell forearm curl",
    reps: "15-12",
    sets: "2",
    note: null,
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Wrist-Curl.gif"
    ],
    video: ["https://www.youtube.com/embed/qyT5hR9Y8dQ"],
    impact: [
      "Strengthens wrist flexors",
      "Prevents elbow pain",
      "Improves grip endurance"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/wrist-curl-muscles.png"
  }
],

    "Chest & Triceps": [
  {
    id: "ct-1",
    name: "Flat DB press",
    reps: "15-12",
    sets: "3",
    note: "Control the negative",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif"
    ],
    video: ["https://www.youtube.com/embed/WbCEvFA0NJs"],
    impact: [
      "Builds overall chest mass",
      "Improves pushing strength",
      "Engages shoulders and triceps"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/dumbbell-press-muscles-worked.png"
  },

  {
    id: "ct-2",
    name: "Incline DB press",
    reps: "15-12",
    sets: "3",
    note: "Bench at 30–45 degrees",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif"
    ],
    video: ["https://www.youtube.com/embed/8fXfwG4ftaQ"],
    impact: [
      "Targets upper chest",
      "Improves chest fullness",
      "Reduces shoulder dominance"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/incline-press-muscles-worked.png"
  },

  {
    id: "ct-3",
    name: "Decline DB press",
    reps: "15-12",
    sets: "3",
    note: "Do not flare elbows",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Decline-Dumbbell-Press.gif"
    ],
    video: ["https://www.youtube.com/embed/LfyQBUKR8SE"],
    impact: [
      "Builds lower chest density",
      "Allows heavier loading",
      "Reduces shoulder stress"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/decline-press-muscles-worked.png"
  },

  {
    id: "ct-4",
    name: "Pec dec fly / Cable crossover",
    reps: "15-12",
    sets: "3",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif"
    ],
    video: [
      "https://www.youtube.com/embed/eozdVDA78K0",
      "https://www.youtube.com/embed/taI4XduLpTk"
    ],
    impact: [
      "Improves chest isolation",
      "Enhances inner chest contraction",
      "Increases time under tension"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/chest-fly-muscles-worked.png"
  },

  {
    id: "ct-5",
    name: "Push-ups (optional)",
    reps: "15-12",
    sets: "3",
    note: "Knee → Regular",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif"
    ],
    video: ["https://www.youtube.com/embed/IODxDxX7oi4"],
    impact: [
      "Improves chest endurance",
      "Enhances core stability",
      "Good metabolic finisher"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/pushup-muscles-worked.png"
  },

  {
    id: "ct-6",
    name: "Bar dips assisted / Close grip bench press",
    reps: "15-12",
    sets: "3",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bench-Dips.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Close-Grip-Bench-Press.gif"
    ],
    video: [
      "https://www.youtube.com/embed/2z8JmcrW-As",
      "https://www.youtube.com/embed/0w9FzvYJ5cA"
    ],
    impact: [
      "Builds triceps mass",
      "Improves lockout strength",
      "Transfers to pressing movements"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/triceps-dip-muscles.png"
  },

  {
    id: "ct-7",
    name: "Triceps pushdown cable / rope",
    reps: "15-12",
    sets: "3",
    note: "Elbows fixed",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif"
    ],
    video: ["https://www.youtube.com/embed/2-LAMcpzODU"],
    impact: [
      "Builds triceps definition",
      "Improves elbow stability",
      "Isolates lateral head"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/triceps-pushdown-muscles.png"
  },

  {
    id: "ct-8",
    name: "Overhead triceps extension / Skull crusher DB",
    reps: "15-12",
    sets: "3",
    note: "Stretch at bottom",
    image: [
      "data:image/jpeg;base64,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",
      
    ],
    video: [
      "https://www.youtube.com/shorts/AYqg9S5FrUU",
      "https://www.youtube.com/embed/d_KZxkY_0cM"
    ],
    impact: [
      "Targets long head of triceps",
      "Increases arm thickness",
      "Improves overhead stability"
    ],
    impactImage:
      "https://fitnessprogramer.com/exercise/seated-dumbbell-triceps-extension/"
  },

  {
    id: "ct-9",
    name: "Kickback DB / Triceps extension DB",
    reps: "15-12",
    sets: "3",
    note: "Strict form only",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Kickback.gif"
    ],
    video: ["https://www.youtube.com/embed/6SS6K3lAwZ8"],
    impact: [
      "Improves triceps peak contraction",
      "Enhances arm detail",
      "Low joint stress finisher"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/triceps-kickback-muscles.png"
  },

  {
    id: "ct-10",
    name: "Triceps press machine",
    reps: "15-12",
    sets: "3",
    note: "Slow and controlled",
    image: [
      "https://cdn.jefit.com/assets/img/exercises/gifs/220.gif"
    ],
    video: ["https://www.youtube.com/embed/hkU6fSHcslw"],
    impact: [
      "Safely overloads triceps",
      "Good for volume accumulation",
      "Minimal shoulder stress"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/06/triceps-press-muscles.png"
  }
],

    "Legs & Shoulders": [
  {
    id: "ls-1",
    name: "Barbell Squats",
    reps: "15-12",
    sets: "3",
    note: "Main compound lift. Keep neutral spine.",
    image: [
      "https://media.tenor.com/pdMmsiutWkcAAAAM/gym.gif"
    ],
    video: ["https://www.youtube.com/embed/ultWZbUMPL8"],
    impact: [
      "Builds overall leg mass",
      "Improves core and hip strength",
      "Boosts total-body power"
    ],
    impactImage:
      "https://www.inspireusafoundation.org/file/2021/03/full-squat-side-view.gif"
  },

  {
    id: "ls-2",
    name: "Forward lunges / Reverse lunges",
    reps: "15-12",
    sets: "2",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif","https://www.inspireusafoundation.org/file/2023/07/reverse-deficit-lunge.gif"
    ],
    video: ["https://www.youtube.com/embed/QOVaHwm-Q6U"],
    impact: [
      "Improves single-leg strength",
      "Enhances balance and coordination",
      "Targets glutes and quads"
    ],
    impactImage:
      "https://www.garagegymreviews.com/wp-content/uploads/2023/01/lunge-muscles.jpg"
  },

  {
    id: "ls-3",
    name: "Leg press / Leg extension",
    reps: "15-12",
    sets: "2",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2015/11/Leg-Press.gif",
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif"
    ],
    video: [
      "https://www.youtube.com/embed/pCLf-OeSMtQ",
      "https://www.youtube.com/embed/YyvSfVjQeL0"
    ],
    impact: [
      "Isolates quadriceps",
      "Allows safe overload",
      "Improves knee stability"
    ],
    impactImage:
      "https://cdn.shopify.com/s/files/1/0618/9462/3460/files/Leg-Press-min-800x800.png"
  },

  {
    id: "ls-4",
    name: "Hip thrust (optional)",
    reps: "15-12",
    sets: "3",
    note: "Pause at top",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif","https://media.tenor.com/YYb0P0Kdr84AAAAM/hip-thrust.gif"
    ],
    video: ["https://www.youtube.com/embed/LM8XHLYJoYs"],
    impact: [
      "Maximally activates glutes",
      "Improves hip power",
      "Supports squat and deadlift strength"
    ],
    impactImage:
      "https://www.meridian-fitness.co.uk/wp-content/uploads/2025/04/Hip-thrust-muscles-worked.webp"
  },

  {
    id: "ls-5",
    name: "Standing calf raise",
    reps: "15-12",
    sets: "3",
    note: "Full stretch at bottom",
    image: [
      "https://www.inspireusafoundation.org/file/2022/11/standing-calf-raise.gif"
    ],
    video: ["https://www.youtube.com/embed/-M4-G8p8fmc"],
    impact: [
      "Builds gastrocnemius muscle",
      "Improves ankle strength",
      "Enhances running and jumping ability"
    ],
    impactImage:
      "https://chunkfitness.com/sites/default/files/standing-calf-raises-machine.jpg"
  },

  {
    id: "ls-6",
    name: "Seated calf raise",
    reps: "15-12",
    sets: "4",
    note: "Slow tempo",
    image: [
      "https://www.inspireusafoundation.org/file/2022/11/seated-calf-raise.gif"
    ],
    video: ["https://www.youtube.com/embed/Yh6wS_C0Eaw"],
    impact: [
      "Targets soleus muscle",
      "Improves lower-leg endurance",
      "Supports squat stability"
    ],
    impactImage:
      "https://blog.myarsenalstrength.com/hs-fs/hubfs/IMG_1714.jpg"
  },

  {
    id: "ls-7",
    name: "Leg curl",
    reps: "15-12",
    sets: "2",
    note: "Controlled negatives",
    image: [
      "https://media.tenor.com/ZElx6PviDq0AAAAM/gym.gif"
    ],
    video: ["https://www.youtube.com/embed/_lgE0gPvbik"],
    impact: [
      "Strengthens hamstrings",
      "Protects knees",
      "Balances quad dominance"
    ],
    impactImage:
      "https://cdn.shopify.com/s/files/1/0564/2607/0148/files/leg_curls_msucles.png?v=1707809130"
  },

  {
    id: "ls-8",
    name: "Overhead press DB / BB",
    reps: "15-12",
    sets: "3",
    note: "Week alternate",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2023/09/Standing-Dumbbell-Overhead-Press.gif"
    ],
    video: ["https://www.youtube.com/embed/eNMl9UoO7YA"],
    impact: [
      "Builds shoulder mass",
      "Improves overhead strength",
      "Enhances core stability"
    ],
    impactImage:
      "https://kinxlearning.com/cdn/shop/files/seated_pess_db_1000x.jpg?v=1690581184"
  },

  {
    id: "ls-9",
    name: "Lateral raise DB / Machine",
    reps: "15-12",
    sets: "2",
    note: "No swinging",
    image: [
      "https://media.tenor.com/-OavRqpxSaEAAAAM/eleva%C3%A7%C3%A3o-lateral.gif","https://i.pinimg.com/originals/f1/61/4d/f1614d1e8e4bc45b75e682533dd7c940.gif","https://www.inspireusafoundation.org/file/2023/07/lateral-raise-machine.gif"
    ],
    video: ["https://www.youtube.com/embed/3VcKaXpzqRo"],
    impact: [
      "Builds shoulder width",
      "Improves upper-body aesthetics",
      "Targets medial delts"
    ],
    impactImage:
      "https://media.istockphoto.com/id/538051060/photo/3d-male-figure-doing-dumbbell-standing-lateral-raise.jpg?s=1024x1024&w=is&k=20&c=c8B_VMXVI4Qb_wswhyRUWf1-TsWQaBbkuH-hx8zlX0E="
  },

  {
    id: "ls-10",
    name: "Reverse fly / Face pull",
    reps: "15-12",
    sets: "2",
    note: "Control every rep",
    image: [
      "https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif"
    ],
    video: ["https://www.youtube.com/embed/rep-qVOkqgk"],
    impact: [
      "Strengthens rear delts",
      "Improves shoulder health",
      "Corrects posture imbalance"
    ],
    impactImage:
      "https://burnfit.io/wp-content/uploads/2023/11/FACE_PULL.gif"
  },

  {
    id: "ls-11",
    name: "External rotation DB",
    reps: "15-12",
    sets: "2",
    note: "Light weight only",
    image: [
      "https://gymvisual.com/img/p/2/7/3/2/6/27326.gif"
    ],
    video: ["https://www.youtube.com/embed/Nhq49UJefwI"],
    impact: [
      "Protects rotator cuff",
      "Prevents shoulder injuries",
      "Improves joint stability"
    ],
    impactImage:
      "https://liveleantv.s3.amazonaws.com/wp-content/uploads/2023/05/18090614/muscle-diagram-shoulders.png"
  },

  {
    id: "ls-12",
    name: "Lower body & compound stretching",
    reps: "20s hold",
    sets: "2",
    note: "Do not skip",
    image: [
      "https://cdn-prod.medicalnewstoday.com/content/images/articles/326/326799/a-gif-of-the-knee-hug.gif","https://i.pinimg.com/originals/20/82/af/2082afc1a5fdc5cedb46526b6b5822ad.gif","https://fitnessprogramer.com/wp-content/uploads/2021/05/Standing-Hamstring-Stretch.gif","https://www.inspireusafoundation.org/file/2023/08/hip-swirls.gif","https://fitnessprogramer.com/wp-content/uploads/2021/02/Butterfly-Stretch.gif","https://cdn-prod.medicalnewstoday.com/content/images/articles/326/326799/a-gif-of-childs-pose.gif","https://cdn.shopify.com/s/files/1/0109/0663/2256/files/Woman_doing_downward_dog_yoga_pose_1_480x480.gif?v=1692590848","https://media.post.rvohealth.io/wp-content/uploads/sites/2/2021/02/Shoulder-roll.gif","https://images.squarespace-cdn.com/content/v1/5d31ed671abe780001b2964d/1620947533438-0RF8Y1OXN4KDEMIIKC36/Briohny+Smyth+doing+a+side-body+extension+stretch","https://media.post.rvohealth.io/wp-content/uploads/sites/3/2024/01/Childs-Pose.gif"
    ],
    video: ["https://www.youtube.com/embed/sTxC3J3gQEU"],
    impact: [
      "Improves flexibility",
      "Reduces post-workout soreness",
      "Enhances recovery"
    ],
    impactImage:
      "https://nadin4eblog.wordpress.com/wp-content/uploads/2016/03/stretching-12.png?w=640"
  }
],
"Cardio & Crunches": [
  {
    id: "cc-1",
    name: "Sit-ups (on board)",
    reps: "20-15",
    sets: "3",
    note: "Controlled movement, no jerking",
    tips: [
      "Lock feet securely and keep knees bent.",
      "Exhale as you come up, inhale on the way down.",
      "Do not pull neck — core should initiate movement."
    ],
    image: [
      "https://www.inspireusafoundation.org/decline-sit-up/"
    ],
    video: ["https://youtube.com/shorts/D_6tXVmq_nM?si=pAgBMJOqOalMLlKM"],
    impact: [
      "Targets upper abdominal muscles",
      "Improves core endurance",
      "Builds foundational ab strength"
    ],
    impactImage:
      "https://www.pinterest.com/pin/sit-up-anatomy--373235887845586885/"
  },

  {
    id: "cc-2",
    name: "Reverse crunch",
    reps: "20-15",
    sets: "2",
    note: "Lift hips, not legs only",
    tips: [
      "Press lower back into the floor.",
      "Lift hips upward, not just legs.",
      "Control the negative — don’t swing."
    ],
    image: [
      "https://www.liftingitalia.com/?a=75265667021500","https://burnfit.io/en/library/reverse-crunch/"
    ],
    video: ["https://www.pinterest.com/pin/abdominals-decline-reverse-crunch--2744449763698107/"],
    impact: [
      "Targets lower abdominal region",
      "Reduces lower belly fat appearance",
      "Improves pelvic control"
    ],
    impactImage:
      "https://youtube.com/shorts/XN7l5P8qXBA?si=KvxWNqfaC20qyVGG"
  },

  {
    id: "cc-3",
    name: "Leg raise",
    reps: "20-15",
    sets: "3",
    note: "Lower back pressed to floor",
    tips: [
      "Keep hands under hips for support if needed.",
      "Lower legs slowly — no dropping.",
      "Stop before lower back arches."
    ],
    image: [
      "https://liftmanual.com/leg-raise-hip-lift/"
    ],
    video: ["https://youtube.com/shorts/wt1zvu84oGo?si=dEN2OkvNO6MBSIuc",
      "https://youtube.com/shorts/Gw_3oAQyHXA?si=h5DjcI64oI10JkpX"
    ],
    impact: [
      "Builds lower abs",
      "Strengthens hip flexors",
      "Improves core stability"
    ],
    impactImage:
      "https://lifefitindia.com/hanging-leg-raise/?srsltid=AfmBOorR8UA4QXWxmprlhcRLCE0PZqiimiPs07Km-POB8KmMOI0Ewvhy"
  },

  {
    id: "cc-4",
    name: "Double leg cycling",
    reps: "20-15",
    sets: "2",
    note: "Slow and controlled",
    tips: [
      "Keep elbows wide and chest open.",
      "Twist from torso, not neck.",
      "Maintain constant tension on abs."
    ],
    image: [
      "https://kr.pinterest.com/pin/717550153168191153/","https://newlife.com.cy/en/bicycle-crunch/","https://tenor.com/search/cycling-crunch-gifs",
    ],
    video: ["https://www.youtube.com/embed/9FGilxCbdz8","https://youtube.com/shorts/uHHJOP68o6k?si=Vdq5vfxnUBekBKCq","https://youtube.com/shorts/H12jbLNNo8o?si=cCNjKLlky6fOgXR4"],
    impact: [
      "Engages entire core",
      "Improves coordination",
      "Increases calorie burn"
    ],
    impactImage:
      "https://www.strengthlog.com/stationary-bike/"
  },

  {
    id: "cc-5",
    name: "Russian twists (legs on floor)",
    reps: "20-15",
    sets: "2",
    note: "Twist from torso, not arms",
    tips: [
      "Sit on mat with knees bent, hold DB.",
      "Twist torso left, touch DB near hip.",
      "Repeat on right side with control."
    ],
    image: [
      "https://ar.pinterest.com/pin/184788390950338119/"
    ],
    video: ["https://www.youtube.com/embed/iFQV6q4xRXM","https://youtube.com/shorts/C3RauLi8FNw?si=kq99Ybx5wHBOjB6u"],
    impact: [
      "Targets oblique muscles",
      "Improves rotational strength",
      "Helps shape waistline"
    ],
    impactImage:
      "https://www.shutterstock.com/video/clip-3717811381-dumbbell-military-press-russian-twist-legs-floor"
  },

  {
    id: "cc-6",
    name: "Plank",
    reps: "20-15 sec",
    sets: "2",
    note: "Neutral spine, squeeze glutes",
    tips: [
      "Keep head, spine, and hips aligned.",
      "Brace core as if preparing for impact.",
      "Breathe steadily — don’t hold breath."
    ],
    image: [
      "https://www.inspireusafoundation.org/planks/"
    ],
    video: ["https://www.youtube.com/embed/xe2MXatLTUw"],
    impact: [
      "Strengthens entire core",
      "Improves posture",
      "Enhances spinal stability"
    ],
    impactImage:
      "https://www.liftingitalia.com/?a=68117130031500"
  },

  {
    id: "cc-7",
    name: "Side bend cable",
    reps: "20-15",
    sets: "3",
    note: "Slow eccentric",
    tips: [
      "Keep hips fixed — only torso moves.",
      "Lower weight slowly for max tension.",
      "Avoid leaning forward or backward."
    ],
    image: [
      "https://burnfit.io/en/library/cable-side-bend/"
    ],
    video: ["https://www.youtube.com/embed/44DazvtgpGE"],
    impact: [
      "Strengthens obliques",
      "Improves lateral core stability",
      "Supports spinal balance"
    ],
    impactImage:
      "https://fitliferegime.com/how-to-do-cable-side-bend-its-benefits/?srsltid=AfmBOoqQckCWke_f43Gw6trkFST1puCc0ftVphG0EUt5PaHWEHc7-Xk2"
  },

  {
    id: "cc-8",
    name: "Caterpillar walk",
    reps: "20-15",
    sets: "2",
    note: "Slow walkout and return",
    tips: [
      "Walk hands out slowly to plank.",
      "Keep core tight throughout movement.",
      "Reverse back with control."
    ],
    image: [
      "https://www.dgmindia.in/index.php?shop/interattrition/dioxane14613215466.html","https://www.shutterstock.com/image-vector/girl-doing-caterpillar-walk-exercise-fitness-1999709960"
    ],
    video: ["https://www.youtube.com/embed/w2vZ0k6JX1o"],
    impact: [
      "Improves core and shoulder mobility",
      "Enhances flexibility",
      "Acts as active recovery"
    ],
    impactImage:
      "https://www.shutterstock.com/image-vector/woman-doing-inchworm-walking-exercise-fitness-2054345171"
  }
],

    "Rest Day": [],
  },
};

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
