import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={ref} className="py-40 border-y border-white/5 bg-[#121212] flex items-center justify-center min-h-screen">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-5xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400">
          Elite level diagnostic feedback shouldn't be a luxury reserved for those with private tutors. It belongs to every student.
        </h2>
      </motion.div>
    </section>
  );
}
