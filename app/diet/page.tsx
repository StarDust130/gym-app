"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  CalendarDays,
  CheckCircle2,
  Frown,
  Info,
  Loader2,
  PenSquare,
  Sparkles,
  Trash2,
} from "lucide-react";

import { DashboardHeader } from "@/app/components/DashboardHeader";
import { useWorkoutStore } from "@/app/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "gym-buddy-diet-user";

const GOAL_OPTIONS = [
  {
    value: "weight_loss",
    label: "Weight Loss",
    blurb: "Deficit & Satiety",
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  {
    value: "weight_gain",
    label: "Weight Gain",
    blurb: "Surplus & Power",
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  {
    value: "muscle_gain",
    label: "Muscle Gain",
    blurb: "High Protein",
    color: "bg-violet-500/10 text-violet-700 border-violet-200",
  },
  {
    value: "muscle_loss",
    label: "Muscle Cut",
    blurb: "Lean & Strong",
    color: "bg-rose-500/10 text-rose-700 border-rose-200",
  },
] as const;

type ProfileGoal = (typeof GOAL_OPTIONS)[number]["value"];
type MealType = "breakfast" | "lunch" | "dinner" | "snack";

type Nutrients = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type DietProfile = {
  goal: ProfileGoal;
  weightKg: number;
  heightCm: number;
  heightText: string;
  proteinTarget: number;
};

type MealEntry = {
  id: string;
  mealType: MealType;
  description: string;
  createdAt: string;
  notes?: string;
  nutrients: Nutrients;
  confidence?: "low" | "medium" | "high";
};

type DietEntryPayload = {
  meals: MealEntry[];
  proteinGoal: number;
};

type AiHint = {
  tone: "info" | "success" | "warning" | "error";
  message: string;
  title?: string;
};

const MEAL_TYPES: { value: MealType; label: string }[] = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
];

const MEAL_FORM_DEFAULT = {
  mealType: "breakfast" as MealType,
  description: "",
};

const HINT_TONE_CONFIG: Record<
  AiHint["tone"],
  {
    Icon: typeof Info;
    container: string;
    accent: string;
    badge: string;
  }
> = {
  info: {
    Icon: Info,
    container: "border-sky-100 bg-sky-50 text-sky-900",
    accent: "bg-sky-100 text-sky-600",
    badge: "text-sky-600",
  },
  success: {
    Icon: CheckCircle2,
    container: "border-emerald-100 bg-emerald-50 text-emerald-900",
    accent: "bg-emerald-100 text-emerald-600",
    badge: "text-emerald-600",
  },
  warning: {
    Icon: Info,
    container: "border-amber-100 bg-amber-50 text-amber-900",
    accent: "bg-amber-100 text-amber-600",
    badge: "text-amber-600",
  },
  error: {
    Icon: Frown,
    container: "border-rose-100 bg-rose-50 text-rose-900",
    accent: "bg-rose-100 text-rose-600",
    badge: "text-rose-600",
  },
};

const MEAL_TYPES_LOOKUP = Object.fromEntries(
  MEAL_TYPES.map((type) => [type.value, type.label])
);

const GOAL_COPY: Record<
  ProfileGoal,
  {
    greeting: string;
    badge: string;
    title: string;
    cue: string;
    goal: string;
    message: (dateLabel: string, protein: number) => string;
    tips: string[];
  }
> = {
  weight_loss: {
    greeting: "Stay light",
    badge: "Cutting",
    title: "Weight Loss",
    cue: "High volume, low cal.",
    goal: "Deficit",
    message: (dateLabel, protein) =>
      `On ${dateLabel}, focus on fiber-rich meals. Hit ${protein}g protein to stay full.`,
    tips: [
      "Front-load protein to stay satisfied",
      "Swap sauces for citrus or herbs",
    ],
  },
  weight_gain: {
    greeting: "Eat big",
    badge: "Bulking",
    title: "Weight Gain",
    cue: "Calorie density is key.",
    goal: "Surplus",
    message: (dateLabel, protein) =>
      `It is ${dateLabel}. Add healthy fats and keep ${protein}g protein consistent for quality mass.`,
    tips: [
      "Add nut butters or olive oil to meals",
      "Blend quick shakes between meals",
    ],
  },
  muscle_gain: {
    greeting: "Build mode",
    badge: "Gains",
    title: "Muscle Gain",
    cue: "Protein timing matters.",
    goal: "Hypertrophy",
    message: (dateLabel, protein) =>
      `Stronger sessions start with fuel. Aim for ${protein}g protein spread across ${dateLabel}.`,
    tips: [
      "Include protein within 60 min of training",
      "Add carbs to support recovery",
    ],
  },
  muscle_loss: {
    greeting: "Get lean",
    badge: "Toning",
    title: "Muscle Cut",
    cue: "Maintain strength.",
    goal: "Recomp",
    message: (dateLabel, protein) =>
      `Stay sharp on ${dateLabel}. Keep protein high (${protein}g) to protect muscle while you cut.`,
    tips: ["Pair veggies with lean protein", "Prioritize sleep for recovery"],
  },
};

type MealQuality = "prime" | "balanced" | "concern";

const QUALITY_STYLES: Record<
  MealQuality,
  {
    label: string;
    pill: string;
    card: string;
    accent: string;
    emoji?: string | null;
  }
> = {
  prime: {
    label: "Clean fuel",
    pill: "bg-emerald-100 text-emerald-700",
    card: "border-emerald-100",
    accent: "text-emerald-600",
    emoji: null,
  },
  balanced: {
    label: "Balanced",
    pill: "bg-sky-100 text-sky-700",
    card: "border-slate-100",
    accent: "text-sky-600",
    emoji: null,
  },
  concern: {
    label: "Indulgent",
    pill: "bg-rose-100 text-rose-700",
    card: "border-rose-100",
    accent: "text-rose-600",
    emoji: "😞",
  },
};

export default function DietPage() {
  const { userProfile } = useWorkoutStore();
  const [userKey, setUserKey] = useState<string | null>(null);
  const [profile, setProfile] = useState<DietProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [view, setView] = useState<"loading" | "setup" | "dashboard">(
    "loading"
  );

  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [proteinGoal, setProteinGoal] = useState(120);
  const [entryLoading, setEntryLoading] = useState(false);
  const [entryError, setEntryError] = useState<string | null>(null);

  const [mealForm, setMealForm] = useState(MEAL_FORM_DEFAULT);
  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [analyzingMeal, setAnalyzingMeal] = useState(false);
  const [aiHint, setAiHint] = useState<AiHint | null>(null);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    startOfDay(new Date())
  );

  const dateKey = useMemo(() => getDateKey(selectedDate), [selectedDate]);
  const prettyDate = useMemo(() => formatDate(dateKey), [dateKey]);
  const viewingToday = useMemo(
    () => dateKey === getDateKey(startOfDay(new Date())),
    [dateKey]
  );

  const macros = useMemo(
    () =>
      meals.reduce(
        (totals, meal) => ({
          calories: totals.calories + (meal.nutrients.calories || 0),
          protein: totals.protein + (meal.nutrients.protein || 0),
          carbs: totals.carbs + (meal.nutrients.carbs || 0),
          fat: totals.fat + (meal.nutrients.fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      ),
    [meals]
  );

  const calorieGoal = useMemo(
    () => (profile ? estimateCalorieTarget(profile) : 0),
    [profile]
  );
  const carbGoal = useMemo(
    () => (calorieGoal ? Math.round((calorieGoal * 0.4) / 4) : 0),
    [calorieGoal]
  );
  const fatGoal = useMemo(
    () => (calorieGoal ? Math.round((calorieGoal * 0.25) / 9) : 0),
    [calorieGoal]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = ensureUserKey();
    if (key) {
      setUserKey(key);
    }
  }, []);

  useEffect(() => {
    if (!userKey) return;
    const fetchProfile = async () => {
      setProfileLoading(true);
      setEntryError(null);
      try {
        const res = await fetch(`/api/diet-entry/profile?userKey=${userKey}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to load profile");
        }
        if (data.profile) {
          setProfile(data.profile);
          setProteinGoal(
            data.profile.proteinTarget ?? data.profile.weightKg * 2
          );
          setView("dashboard");
        } else {
          setView("setup");
        }
      } catch (error) {
        console.error(error);
        setEntryError(error instanceof Error ? error.message : "Profile error");
        setView("setup");
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [userKey]);

  useEffect(() => {
    if (!userKey || !profile) return;
    const fetchEntry = async () => {
      setEntryLoading(true);
      setEntryError(null);
      try {
        const res = await fetch(
          `/api/diet-entry?dateKey=${dateKey}&userKey=${userKey}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to load day");
        }
        setMeals(Array.isArray(data.meals) ? data.meals : []);
        setProteinGoal(data.proteinGoal ?? profile.proteinTarget);
      } catch (error) {
        console.error(error);
        setEntryError(
          error instanceof Error ? error.message : "Unable to load day"
        );
      } finally {
        setEntryLoading(false);
      }
    };
    fetchEntry();
  }, [userKey, profile, dateKey]);

  const persistEntry = async (
    overrides?: Partial<DietEntryPayload> & { meals?: MealEntry[] }
  ) => {
    if (!userKey) return;
    try {
      const payload = {
        userKey,
        dateKey,
        meals: overrides?.meals ?? meals,
        proteinGoal: overrides?.proteinGoal ?? proteinGoal,
      };

      const res = await fetch("/api/diet-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }
    } catch (error) {
      console.error(error);
      setEntryError(error instanceof Error ? error.message : "Save failed");
    }
  };

  const handleMealDelete = async (mealId: string) => {
    const nextMeals = meals.filter((meal) => meal.id !== mealId);
    setMeals(nextMeals);
    if (editingMealId === mealId) {
      resetComposer();
    }
    await persistEntry({ meals: nextMeals });
  };

  const handleMealEdit = (meal: MealEntry) => {
    setMealForm({ mealType: meal.mealType, description: meal.description });
    setEditingMealId(meal.id);
    setAiHint(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetComposer = useCallback(() => {
    setMealForm(MEAL_FORM_DEFAULT);
    setEditingMealId(null);
    setAiHint(null);
  }, []);

  useEffect(() => {
    resetComposer();
    setExpandedMealId(null);
  }, [dateKey, resetComposer]);

  const goToToday = useCallback(() => {
    setSelectedDate(startOfDay(new Date()));
  }, []);

  const handleDateSelect = useCallback((date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(startOfDay(date));
  }, []);

  const handleMealSubmit = async () => {
    if (!mealForm.description.trim()) {
      setAiHint({
        tone: "info",
        title: "Need more detail",
        message: "Tell me what you ate and how it was prepared.",
      });
      return;
    }
    setAnalyzingMeal(true);
    setAiHint(null);

    try {
      const res = await fetch("/api/diet-entry/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: mealForm.description,
          mealType: mealForm.mealType,
          goal: profile?.goal,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        const message = data.message || "I need more detail about that meal.";
        setAiHint({
          tone: "warning",
          title: "More context please",
          message,
        });
        return;
      }

      if (data.confidence === "low") {
        setAiHint({
          tone: "error",
          title: "Does not look like food",
          message: data.feedback || "That does not look like food. Try again!",
        });
        return;
      }

      const analyzedMeal: MealEntry = {
        id: editingMealId ?? createClientId(),
        mealType: mealForm.mealType,
        description: mealForm.description.trim(),
        createdAt: editingMealId
          ? meals.find((meal) => meal.id === editingMealId)?.createdAt ??
            new Date().toISOString()
          : new Date().toISOString(),
        notes: data.feedback,
        confidence: data.confidence,
        nutrients: {
          calories: Math.round(data.nutrients.calories ?? 0),
          protein: Math.round(data.nutrients.protein ?? 0),
          carbs: Math.round(data.nutrients.carbs ?? 0),
          fat: Math.round(data.nutrients.fat ?? 0),
        },
      };

      const nextMeals = editingMealId
        ? meals.map((meal) => (meal.id === editingMealId ? analyzedMeal : meal))
        : [analyzedMeal, ...meals];

      setMeals(nextMeals);
      resetComposer();
      await persistEntry({ meals: nextMeals });
    } catch (error) {
      console.error(error);
      setAiHint({
        tone: "error",
        title: "Network issue",
        message: "Could not reach the nutritionist. Try again.",
      });
    } finally {
      setAnalyzingMeal(false);
    }
  };

  const handleProfileSave = async (
    draft: Omit<DietProfile, "proteinTarget">
  ) => {
    if (!userKey) return;
    const proteinTarget = calcProteinTarget(draft.weightKg, draft.goal);
    setProfileSaving(true);
    setEntryError(null);

    try {
      const res = await fetch("/api/diet-entry/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userKey,
          profile: { ...draft, proteinTarget },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not save profile");
      }

      const nextProfile = { ...draft, proteinTarget };
      setProfile(nextProfile);
      setProteinGoal(proteinTarget);
      setView("dashboard");
    } catch (error) {
      console.error(error);
      setEntryError(
        error instanceof Error ? error.message : "Profile save failed"
      );
    } finally {
      setProfileSaving(false);
    }
  };

  if (profileLoading || view === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (view === "setup" || !profile) {
    return (
      <section className="container mx-auto max-w-lg space-y-8 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 text-center"
        >
          <Badge variant="outline" className="uppercase tracking-widest">
            Onboarding
          </Badge>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Nutrition Goals
          </h1>
          <p className="text-muted-foreground">
            Set your targets. We&apos;ll tailor the AI coach to your needs.
          </p>
        </motion.div>
        <ProfileStep
          initialProfile={profile}
          saving={profileSaving}
          onSave={handleProfileSave}
        />
        {entryError && (
          <p className="text-center text-sm font-medium text-red-600">
            {entryError}
          </p>
        )}
      </section>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-background via-background to-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_55%)]" />
      <div className="container mx-auto max-w-5xl space-y-6 px-4 pb-24 pt-6 md:space-y-8">
        <DashboardHeader
          name={userProfile?.name || "Athlete"}
          greeting={GOAL_COPY[profile.goal].greeting}
          streakDays={Math.max(1, meals.length)}
          todayLabel="Today"
          dateDisplay={selectedDate.toISOString()}
          focus={GOAL_COPY[profile.goal].badge}
          planName={GOAL_COPY[profile.goal].title}
          onOpenSettings={() => setView("setup")}
        />
        {entryError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-red-200/70 bg-red-50/80 px-5 py-4 text-sm font-semibold text-red-700 shadow-lg"
          >
            {entryError}
          </motion.div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <MealComposer
              mealForm={mealForm}
              aiHint={aiHint}
              analyzingMeal={analyzingMeal}
              onMealTypeChange={(mealType) =>
                setMealForm((prev) => ({ ...prev, mealType }))
              }
              onDescriptionChange={(value) =>
                setMealForm((prev) => ({ ...prev, description: value }))
              }
              onSubmit={handleMealSubmit}
              isEditing={Boolean(editingMealId)}
              onCancelEdit={resetComposer}
              selectedDate={selectedDate}
              prettyDate={prettyDate}
              onSelectDate={handleDateSelect}
              onSelectToday={goToToday}
              viewingToday={viewingToday}
            />

            <DailySnapshotCard
              macros={macros}
              meals={meals}
              prettyDate={prettyDate}
              viewingToday={viewingToday}
            />

            <MealTimeline
              meals={meals}
              entryLoading={entryLoading}
              onEdit={handleMealEdit}
              onDelete={handleMealDelete}
              expandedMealId={expandedMealId}
              onToggle={(id) =>
                setExpandedMealId((prev) => (prev === id ? null : id))
              }
              dayLabel={prettyDate}
              isToday={viewingToday}
            />
          </div>

          <div className="space-y-6">
            <MacroPanel
              macros={macros}
              targets={{ protein: proteinGoal, carbs: carbGoal, fat: fatGoal }}
              calorieGoal={calorieGoal}
              proteinGoal={proteinGoal}
            />
            <CoachCard
              profile={profile}
              proteinGoal={proteinGoal}
              prettyDate={prettyDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStep({
  initialProfile,
  saving,
  onSave,
}: {
  initialProfile: DietProfile | null;
  saving: boolean;
  onSave: (payload: Omit<DietProfile, "proteinTarget">) => Promise<void>;
}) {
  const prefersFeet = (initialProfile?.heightText ?? "")
    .toLowerCase()
    .includes("ft");
  const [goal, setGoal] = useState<ProfileGoal>(
    initialProfile?.goal ?? "muscle_gain"
  );
  const [weight, setWeight] = useState(
    initialProfile?.weightKg?.toString() ?? "70"
  );
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">(
    prefersFeet ? "ft" : "cm"
  );
  const [heightCm, setHeightCm] = useState(
    initialProfile?.heightCm?.toString() ?? "170"
  );
  const [heightFt, setHeightFt] = useState(
    prefersFeet ? extractFeetValue(initialProfile?.heightText) ?? "5.8" : "5.8"
  );
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const weightNumber = Number(weight);
    if (Number.isNaN(weightNumber) || weightNumber <= 0) {
      setMessage("Enter your weight in kg.");
      return;
    }

    let heightInCm = Number(heightCm);
    let heightDisplay = `${heightInCm} cm`;

    if (heightUnit === "ft") {
      const converted = feetStringToCm(heightFt);
      if (!converted) {
        setMessage("Use format 5.8 for feet.inches (5ft 8in).");
        return;
      }
      heightInCm = converted;
      heightDisplay = `${heightFt} ft`;
    } else if (Number.isNaN(heightInCm) || heightInCm <= 0) {
      setMessage("Enter height in centimeters.");
      return;
    }

    setMessage(null);
    await onSave({
      goal,
      weightKg: weightNumber,
      heightCm: heightInCm,
      heightText: heightDisplay,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-[10px_10px_40px_rgba(15,23,42,0.06),-10px_-10px_40px_rgba(255,255,255,0.9)]"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {GOAL_OPTIONS.map((option) => (
          <button
            type="button"
            key={option.value}
            className={cn(
              "rounded-2xl border p-4 text-left transition-all",
              goal === option.value
                ? "border-primary bg-primary/5 shadow"
                : "border-transparent bg-muted/40 hover:bg-muted/60"
            )}
            onClick={() => setGoal(option.value)}
          >
            <p
              className={cn(
                "text-sm font-bold uppercase tracking-wider",
                goal === option.value ? "text-primary" : "text-muted-foreground"
              )}
            >
              {option.label}
            </p>
            <p className="text-xs text-muted-foreground">{option.blurb}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Weight (kg)
          </span>
          <Input
            type="number"
            value={weight}
            min={1}
            onChange={(event) => setWeight(event.target.value)}
            className="h-12 rounded-xl border bg-background text-lg font-medium"
          />
        </label>

        <label className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Height
            </span>
            <div className="flex rounded-lg bg-muted p-1">
              {(["cm", "ft"] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setHeightUnit(unit)}
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase",
                    heightUnit === unit
                      ? "bg-background text-foreground shadow"
                      : "text-muted-foreground"
                  )}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
          {heightUnit === "cm" ? (
            <Input
              type="number"
              value={heightCm}
              min={1}
              onChange={(event) => setHeightCm(event.target.value)}
              className="h-12 rounded-xl border bg-background text-lg font-medium"
            />
          ) : (
            <Input
              value={heightFt}
              onChange={(event) => setHeightFt(event.target.value)}
              placeholder="5.8"
              className="h-12 rounded-xl border bg-background text-lg font-medium"
            />
          )}
        </label>
      </div>

      {message && <p className="text-sm font-medium text-red-600">{message}</p>}

      <Button
        type="submit"
        disabled={saving}
        size="lg"
        className="w-full rounded-xl text-base font-bold"
      >
        {saving ? (
          <Loader2 className="mr-2 size-5 animate-spin" />
        ) : (
          "Save Profile"
        )}
      </Button>
    </form>
  );
}

type MealComposerProps = {
  mealForm: typeof MEAL_FORM_DEFAULT;
  aiHint: AiHint | null;
  analyzingMeal: boolean;
  onMealTypeChange: (mealType: MealType) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
  onCancelEdit: () => void;
  selectedDate: Date;
  prettyDate: string;
  onSelectDate: (date: Date | undefined) => void;
  onSelectToday: () => void;
  viewingToday: boolean;
};

function MealComposer({
  mealForm,
  aiHint,
  analyzingMeal,
  onMealTypeChange,
  onDescriptionChange,
  onSubmit,
  isEditing,
  onCancelEdit,
  selectedDate,
  prettyDate,
  onSelectDate,
  onSelectToday,
  viewingToday,
}: MealComposerProps) {
  const activeMealLabel =
    MEAL_TYPES_LOOKUP[mealForm.mealType] ?? mealForm.mealType;
  return (
    <Card className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/90 shadow-[20px_20px_60px_rgba(15,23,42,0.08),-20px_-20px_60px_rgba(255,255,255,0.9)]">
      <CardHeader className="space-y-4 border-b border-border/40 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Smart meal logger
            </p>
            <p className="text-xl font-semibold text-foreground">
              {isEditing
                ? "Update your plate"
                : `What fueled you on ${prettyDate}?`}
            </p>
          </div>
          <DaySelector
            selectedDate={selectedDate}
            viewingToday={viewingToday}
            onSelectDate={onSelectDate}
            onSelectToday={onSelectToday}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {MEAL_TYPES.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onMealTypeChange(item.value)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                mealForm.mealType === item.value
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted/60 text-muted-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span>Meal summary</span>
            <span className="rounded-full border border-border/60 px-3 py-1 text-[10px] font-semibold">
              {activeMealLabel}
            </span>
          </div>
          <div className="relative">
            <Textarea
              value={mealForm.description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              placeholder="E.g. steamed momos with chutney + mint tea"
              className="min-h-24 rounded-3xl border border-transparent bg-muted/40 p-4 text-base font-medium text-foreground shadow-inner focus-visible:border-primary/40 focus-visible:bg-background"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              {isEditing && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onCancelEdit}
                  className="h-9 rounded-full px-3 text-xs font-semibold"
                >
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                onClick={onSubmit}
                disabled={analyzingMeal}
                className="h-9 rounded-full px-4 text-xs font-bold shadow"
              >
                {analyzingMeal ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  "Save meal"
                )}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {aiHint && (
            <HintBanner
              key={`${aiHint.tone}-${aiHint.message}`}
              hint={aiHint}
            />
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

type DaySelectorProps = {
  selectedDate: Date;
  viewingToday: boolean;
  onSelectDate: (date: Date | undefined) => void;
  onSelectToday: () => void;
};

function DaySelector({
  selectedDate,
  viewingToday,
  onSelectDate,
  onSelectToday,
}: DaySelectorProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={viewingToday ? "default" : "ghost"}
        size="sm"
        onClick={onSelectToday}
        className="rounded-full px-4 text-xs font-semibold"
      >
        Today
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-border/60"
            onClick={() => setOpen((prev) => !prev)}
          >
            <CalendarDays className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto rounded-2xl border border-border/60 bg-card p-3 shadow-lg"
          align="end"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              onSelectDate(date);
              if (date) setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function HintBanner({ hint }: { hint: AiHint }) {
  const tone = HINT_TONE_CONFIG[hint.tone];
  const Icon = tone.Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-4 text-sm font-medium shadow-sm",
        tone.container
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          tone.accent
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="space-y-1">
        {hint.title && (
          <p
            className={cn(
              "text-[11px] font-bold uppercase tracking-widest",
              tone.badge
            )}
          >
            {hint.title}
          </p>
        )}
        <p className="leading-relaxed">{hint.message}</p>
      </div>
    </motion.div>
  );
}

function DailySnapshotCard({
  meals,
  macros,
  prettyDate,
  viewingToday,
}: {
  meals: MealEntry[];
  macros: Nutrients;
  prettyDate: string;
  viewingToday: boolean;
}) {
  const lastMeal = meals[0];
  return (
    <Card className="rounded-3xl border border-border/40 bg-card/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),20px_20px_60px_rgba(15,23,42,0.08)]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {viewingToday ? "Today" : prettyDate}
            </p>
            <CardTitle className="text-xl font-semibold">
              What you logged
            </CardTitle>
          </div>
          <div className="rounded-2xl bg-muted/50 px-3 py-2 text-right">
            <p className="text-xs text-muted-foreground">Meals</p>
            <p className="text-xl font-semibold text-foreground">
              {meals.length}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Protein", value: `${macros.protein}g` },
            { label: "Carbs", value: `${macros.carbs}g` },
            { label: "Fat", value: `${macros.fat}g` },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/40 bg-background/60 p-3 text-center shadow-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-lg font-semibold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        {lastMeal ? (
          <div className="rounded-2xl border border-border/40 bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Last meal
            </p>
            <p className="text-base font-semibold text-foreground">
              {lastMeal.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Logged at {formatMealTime(lastMeal.createdAt)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No meals logged yet. Add one above to see your snapshot.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

type MealTimelineProps = {
  meals: MealEntry[];
  entryLoading: boolean;
  onEdit: (meal: MealEntry) => void;
  onDelete: (mealId: string) => void;
  expandedMealId: string | null;
  onToggle: (mealId: string) => void;
  dayLabel: string;
  isToday: boolean;
};

function MealTimeline({
  meals,
  entryLoading,
  onEdit,
  onDelete,
  expandedMealId,
  onToggle,
  dayLabel,
  isToday,
}: MealTimelineProps) {
  const title = isToday ? "Today&apos;s meals" : `Meals on ${dayLabel}`;
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Meal log
          </p>
          <p className="text-lg font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">
            {isToday ? "Tap a card to view macros" : "Viewing a previous day"}
          </p>
        </div>
        <Badge
          variant="outline"
          className="rounded-full border-border/60 px-3 py-1 text-[11px] font-semibold"
        >
          {dayLabel}
        </Badge>
      </div>

      {entryLoading ? (
        <TimelineSkeleton />
      ) : meals.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-muted/60 bg-card/50 py-10 text-center shadow-inner">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
            <CalendarIcon className="size-4" />
            No meals logged
          </div>
          <p className="text-xs text-muted-foreground">
            {isToday
              ? "Add your first meal above."
              : "Pick another date or log a meal."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                expanded={expandedMealId === meal.id}
                onToggle={() => onToggle(meal.id)}
                onEdit={() => onEdit(meal)}
                onDelete={() => onDelete(meal.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function MealCard({
  meal,
  expanded,
  onToggle,
  onEdit,
  onDelete,
}: {
  meal: MealEntry;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const quality = assessMealQuality(meal);
  const qualityStyle = QUALITY_STYLES[quality];
  const summary = `${meal.nutrients.calories ?? 0} kcal · ${
    meal.nutrients.protein ?? 0
  }g protein`;
  const pillLabel = qualityStyle.emoji
    ? `${qualityStyle.emoji} ${qualityStyle.label}`
    : qualityStyle.label;

  return (
    <motion.div
      layout
      className={cn(
        "rounded-3xl border bg-card/90 p-4 shadow-[10px_10px_40px_rgba(15,23,42,0.06),-10px_-10px_40px_rgba(255,255,255,0.9)]",
        qualityStyle.card
      )}
    >
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 text-left"
        onClick={onToggle}
      >
        <div>
          <p className="text-base font-semibold text-foreground">
            {meal.description}
          </p>
          <p className="text-xs text-muted-foreground">
            Logged at {formatMealTime(meal.createdAt)}
          </p>
          <p className={cn("text-xs font-semibold", qualityStyle.accent)}>
            {summary}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-semibold",
            qualityStyle.pill
          )}
        >
          {pillLabel}
        </span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pt-4"
          >
            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-widest">Protein</p>
                <p className="text-base font-semibold text-foreground">
                  {meal.nutrients.protein}g
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest">Carbs</p>
                <p className="text-base font-semibold text-foreground">
                  {meal.nutrients.carbs}g
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest">Fat</p>
                <p className="text-base font-semibold text-foreground">
                  {meal.nutrients.fat}g
                </p>
              </div>
            </div>
            {meal.notes && (
              <p className="mt-3 text-sm text-muted-foreground">
                Coach note: {meal.notes}
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-3 text-xs font-semibold"
                onClick={onEdit}
              >
                <PenSquare className="mr-1 size-3.5" /> Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-3 text-xs font-semibold text-red-600 hover:text-red-700"
                onClick={onDelete}
              >
                <Trash2 className="mr-1 size-3.5" /> Delete
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-border/40 bg-card/60 p-4"
        >
          <div className="h-4 w-1/2 rounded-full bg-muted/60" />
          <div className="mt-2 h-3 w-1/3 rounded-full bg-muted/40" />
        </div>
      ))}
    </div>
  );
}

type MacroPanelProps = {
  macros: Nutrients;
  targets: { protein: number; carbs: number; fat: number };
  calorieGoal: number;
  proteinGoal: number;
};

function MacroPanel({
  macros,
  targets,
  calorieGoal,
  proteinGoal,
}: MacroPanelProps) {
  const macroBreakdown = [
    {
      label: "Protein",
      value: macros.protein,
      goal: proteinGoal,
      color: "text-rose-500",
      bar: "bg-rose-500",
    },
    {
      label: "Carbs",
      value: macros.carbs,
      goal: targets.carbs,
      color: "text-amber-500",
      bar: "bg-amber-500",
    },
    {
      label: "Fat",
      value: macros.fat,
      goal: targets.fat,
      color: "text-emerald-500",
      bar: "bg-emerald-500",
    },
  ];
  const calorieBadgeLabel = calorieGoal
    ? `${macros.calories} / ${calorieGoal} kcal`
    : `${macros.calories} kcal logged`;
  return (
    <Card className="rounded-3xl border border-border/60 bg-card/80 shadow-xl">
      <CardHeader className="px-6 pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Daily macros
            </p>
            <CardTitle className="text-xl font-bold text-foreground">
              Fuel overview
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className="rounded-full border-primary/30 px-3 py-1 text-[11px] font-semibold"
          >
            {calorieBadgeLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 px-6 pb-6 md:flex-row md:items-center">
        <CalorieRadial value={macros.calories} goal={calorieGoal} />
        <div className="flex-1 space-y-4">
          {macroBreakdown.map((macro) => (
            <MacroStatRow key={macro.label} {...macro} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CalorieRadial({ value, goal }: { value: number; goal: number }) {
  const normalizedGoal = goal || Math.max(value, 1);
  const pct = Math.min(1, value / normalizedGoal);
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="150" height="150" className="-rotate-90">
        <circle
          cx="75"
          cy="75"
          r={radius}
          strokeWidth="14"
          className="text-muted"
          stroke="currentColor"
          fill="transparent"
          opacity={0.2}
        />
        <motion.circle
          cx="75"
          cy="75"
          r={radius}
          strokeWidth="14"
          strokeLinecap="round"
          className="text-primary"
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          initial={{ strokeDashoffset: circumference }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-sm font-semibold text-muted-foreground">Calories</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">
          {(pct * 100).toFixed(0)}% of goal
        </p>
      </div>
    </div>
  );
}

function MacroStatRow({
  label,
  value,
  goal,
  color,
  bar,
}: {
  label: string;
  value: number;
  goal: number;
  color: string;
  bar: string;
}) {
  const safeGoal = goal || 1;
  const percent = Math.min(100, (value / safeGoal) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span className={color}>{label}</span>
        <span className="text-foreground">
          {value} / {goal}g
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className={cn("h-full rounded-full", bar)}
        />
      </div>
    </div>
  );
}

type CoachCardProps = {
  profile: DietProfile;
  proteinGoal: number;
  prettyDate: string;
};

function CoachCard({ profile, proteinGoal, prettyDate }: CoachCardProps) {
  const copy = GOAL_COPY[profile.goal];
  return (
    <Card className="rounded-3xl border border-border/40 bg-card/90 shadow-[20px_20px_60px_rgba(15,23,42,0.08),-20px_-20px_60px_rgba(255,255,255,0.9)]">
      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="size-3.5" /> Coach tip
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {prettyDate}
          </span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {copy.badge}
          </p>
          <p className="text-2xl font-semibold text-foreground">{copy.title}</p>
          <p className="text-sm text-muted-foreground">{copy.goal}</p>
        </div>
        <p className="text-sm leading-relaxed text-foreground">
          {copy.message(prettyDate, proteinGoal)}
        </p>
        <div className="space-y-2">
          {copy.tips.map((tip) => (
            <div
              key={tip}
              className="flex items-center gap-2 rounded-2xl border border-border/40 bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm"
            >
              <CheckCircle2 className="size-4 text-primary" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function assessMealQuality(meal: MealEntry): MealQuality {
  const calories = meal.nutrients.calories ?? 0;
  const protein = meal.nutrients.protein ?? 0;
  const fat = meal.nutrients.fat ?? 0;
  if (calories > 700 || fat > 35) {
    return "concern";
  }
  if (protein >= 25 && fat <= 25 && calories <= 650) {
    return "prime";
  }
  return "balanced";
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const value = new Date(year, (month ?? 1) - 1, day);
  return value.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function startOfDay(value: Date) {
  const copy = new Date(value);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatMealTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "--:--";
  return parsed.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function ensureUserKey() {
  if (typeof window === "undefined") return null;
  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const generated = createClientId();
  window.localStorage.setItem(STORAGE_KEY, generated);
  return generated;
}

function createClientId() {
  if (typeof crypto !== "undefined") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    if (crypto.getRandomValues) {
      const bytes = crypto.getRandomValues(new Uint8Array(16));
      return Array.from(bytes, (b) => b.toString(16).padStart(2, "0"))
        .join("")
        .slice(0, 32);
    }
  }
  return `gb-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function calcProteinTarget(weightKg: number, goal: ProfileGoal) {
  const multipliers: Record<ProfileGoal, number> = {
    weight_loss: 1.6,
    weight_gain: 1.8,
    muscle_gain: 2,
    muscle_loss: 1.7,
  };
  return Math.round(weightKg * multipliers[goal]);
}

function estimateCalorieTarget(profile: DietProfile) {
  const base = profile.weightKg * 31;
  const adjustments: Record<ProfileGoal, number> = {
    weight_loss: -350,
    weight_gain: 350,
    muscle_gain: 250,
    muscle_loss: -150,
  };
  return Math.max(1400, Math.round(base + (adjustments[profile.goal] ?? 0)));
}

function feetStringToCm(value: string) {
  if (!value) return null;
  const sanitized = value.replace(/[^0-9.]/g, "");
  if (!sanitized) return null;
  const [feetPart, inchPart] = sanitized.split(".");
  const feet = Number(feetPart);
  const inches = inchPart ? Number(inchPart.padEnd(2, "0").slice(0, 2)) : 0;
  if (Number.isNaN(feet) || feet <= 0 || Number.isNaN(inches)) return null;
  return Math.round((feet * 12 + inches) * 2.54);
}

function extractFeetValue(heightText?: string | null) {
  if (!heightText) return null;
  const match = heightText.match(/[0-9]+(?:\.[0-9]+)?/);
  return match ? match[0] : null;
}
