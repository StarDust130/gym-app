"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Zap,
  Check,
  Play,
  Image as ImageIcon,
  Info,
} from "lucide-react";
import { WorkoutExercise } from "../lib/data";
import { cn } from "@/lib/utils";
import { MediaLoader } from "./MediaLoader";

export const ExerciseCard = ({
  exercise,
  isCompleted,
  onToggle,
}: {
  exercise: WorkoutExercise;
  isCompleted: boolean;
  onToggle: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"Images" | "Videos" | "Impact">("Images");
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const handleTabChange = (newTab: typeof tab) => {
    setTab(newTab);
    // Always trigger loading state when switching visual tabs
    if (newTab !== "Impact") {
      setIsMediaLoading(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white border-[3px] border-black rounded-[30px] overflow-hidden transition-all relative z-10 group",
        isOpen
          ? "shadow-[8px_8px_0px_0px_#000]"
          : "shadow-[4px_4px_0px_0px_#000] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000]"
      )}
    >
      {/* --- HEADER --- */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 flex items-start gap-4 cursor-pointer select-none bg-white relative z-20"
      >
        {/* Checkbox */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={cn(
            "h-9 w-9 rounded-full border-[3px] border-black flex items-center justify-center transition-all shrink-0 mt-0.5",
            isCompleted
              ? "bg-[#B8FF9F] shadow-none scale-95"
              : "bg-white hover:bg-neutral-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]"
          )}
        >
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-5 h-5 text-black stroke-[3.5]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={cn(
                "font-black text-lg leading-tight uppercase transition-all truncate",
                isCompleted
                  ? "text-neutral-400 line-through decoration-2"
                  : "text-black"
              )}
            >
              {exercise.name}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="inline-block bg-[#FFD27D] border-[2px] border-black px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {exercise.sets} Sets
            </span>
            <span className="inline-block bg-white border-[2px] border-black px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {exercise.reps} Reps
            </span>
          </div>
        </div>

        {/* Accordion Arrow */}
        <div className="mt-2 text-black">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown className="w-6 h-6 stroke-[3]" />
          </motion.div>
        </div>
      </div>

      {/* --- EXPANDED CONTENT --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-neutral-50 border-t-[3px] border-black"
          >
            <div className="p-5">
              {/* Note (If exists) */}
              {exercise.note && (
                <div className="mb-4 flex items-start gap-3 bg-[#FFF8E1] p-3 rounded-xl border-[2px] border-[#FFD27D] text-black">
                  <Zap className="w-5 h-5 fill-[#FFD27D] stroke-black shrink-0 mt-0.5" />
                  <p className="text-xs font-bold leading-relaxed opacity-90">
                    {exercise.note}
                  </p>
                </div>
              )}

              {/* Custom Tabs */}
              <div className="flex p-1 bg-white border-[2px] border-black rounded-xl w-full mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]">
                {[
                  { id: "Images", icon: ImageIcon },
                  { id: "Videos", icon: Play },
                  { id: "Impact", icon: Info },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTabChange(t.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                      tab === t.id
                        ? "bg-black text-white shadow-md"
                        : "text-neutral-500 hover:bg-neutral-100"
                    )}
                  >
                    <t.icon className="w-3 h-3" />
                    {t.id}
                  </button>
                ))}
              </div>

              {/* MEDIA CONTAINER */}
              <div className="relative w-full aspect-video bg-white border-[2px] border-black rounded-2xl overflow-hidden shadow-inner">
                {/* 1. LOADER (Visible until isMediaLoading is false) */}
                <AnimatePresence mode="wait">
                  {isMediaLoading && tab !== "Impact" && (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30"
                    >
                      <MediaLoader />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 2. CONTENT */}
                <div className="absolute inset-0 z-10">
                  {tab === "Images" && exercise.image && (
                    <img
                      src={exercise.image[0]}
                      alt={exercise.name}
                      className={cn(
                        "w-full h-full object-contain transition-opacity duration-500",
                        isMediaLoading ? "opacity-0" : "opacity-100"
                      )}
                      onLoad={() => {
                        // Fake delay so user sees the cool loader at least briefly
                        setTimeout(() => setIsMediaLoading(false), 800);
                      }}
                    />
                  )}

                  {tab === "Videos" && exercise.video && (
                    <iframe
                      src={exercise.video[0]}
                      className={cn(
                        "w-full h-full transition-opacity duration-500",
                        isMediaLoading ? "opacity-0" : "opacity-100"
                      )}
                      allow="autoplay; encrypted-media"
                      onLoad={() =>
                        setTimeout(() => setIsMediaLoading(false), 1000)
                      }
                    />
                  )}

                  {tab === "Impact" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full p-4 overflow-y-auto bg-[url('/noise.png')] bg-opacity-5"
                    >
                      <h4 className="font-black text-sm uppercase mb-3 flex items-center gap-2">
                        Target Muscles
                        <div className="h-px flex-1 bg-black/10" />
                      </h4>
                      <div className="space-y-2">
                        {exercise.impact?.map((imp, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs font-bold text-neutral-700 bg-neutral-100 p-2 rounded-lg border border-neutral-200"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#FFD27D] border border-black" />
                            {imp}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* 3. NO DATA STATE */}
                {!exercise.image &&
                  !exercise.video &&
                  !exercise.impact &&
                  !isMediaLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400">
                      <Info className="w-8 h-8 mb-2 opacity-50" />
                      <span className="text-[10px] font-black uppercase">
                        Data Missing
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
