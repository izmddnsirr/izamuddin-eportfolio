"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionReveal({
  children,
  className,
}: SectionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
