import { motion } from "motion/react";

export default function Loader({ message = "Finding your home..." }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <motion.div
        className="mb-4 h-[2px] w-16 bg-[#1b3b2b]"
        animate={{
          scaleX: [0.3, 1, 0.3],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <span className="text-[11px] font-semibold tracking-[0.3em] text-[#1b3b2b]">
        MYHOME
      </span>

      <motion.span
        className="mt-2 text-sm text-neutral-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {message}
      </motion.span>
    </div>
  );
}
