"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PartnerCard({
  src,
  alt,
  index = 0,
}: {
  src: string;
  alt: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.55,
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="relative aspect-[16/9] rounded-xl flex items-center justify-center p-4 bg-white isolate"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Gradient ring on hover */}
      <motion.div
        className="absolute -inset-px rounded-xl -z-10"
        style={{ background: "var(--grad)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ filter: "saturate(.6) brightness(.96)" }}
        whileHover={{ filter: "saturate(1.1) brightness(1.02)", scale: 1.07 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src}
          alt={alt}
          width={120}
          height={60}
          className="object-contain max-h-[60px] max-w-full w-auto"
        />
      </motion.div>
    </motion.div>
  );
}
