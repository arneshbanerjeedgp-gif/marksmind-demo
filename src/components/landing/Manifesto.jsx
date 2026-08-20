import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1]);

  return (
    <section ref={ref} className="py-40 border-y border-white/5 bg-[#0a0a0a] flex items-center justify-center min-h-screen">
      <motion.div 
        style={{ opacity }}
        className="max-w-6xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight text-white tracking-tighter">
          Elite level diagnostic feedback shouldn't belong only to those who can afford ₹2000/hr private tutors.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">It belongs to every student willing to put in the work.</span>
        </h2>
      </motion.div>
    </section>
  );
}
