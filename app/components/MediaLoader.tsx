"use client";

import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";

export const MediaLoader = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20">
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Dumbbell className="w-10 h-10 text-black fill-[#FFD27D] stroke-[1.5]" />
      </motion.div>
      <p className="text-xs font-bold uppercase tracking-widest mt-2 animate-pulse">
        Loading...
      </p>
    </div>
  );
};
