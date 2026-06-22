"use client";

import { motion } from "framer-motion";

export default function SummerDivider() {
  const emojis = ["🌴", "☀️", "🩴", "🌊", "🏖️", "🩴", "☀️", "🌴"];

  return (
    <div className="summer-divider" aria-hidden>
      <div className="summer-divider-inner">
        {emojis.map((emoji, i) => (
          <motion.span
            key={i}
            animate={{
              y: [0, -6, 0],
              rotate: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="drop-shadow-lg"
            style={{ filter: "drop-shadow(0 2px 4px rgba(255,149,0,0.3))" }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
