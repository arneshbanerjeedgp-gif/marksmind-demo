import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          <motion.h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[1] mb-6 text-white">
            End the Grading <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Black Box.
            </span>
          </motion.h1>

          <motion.p className="text-lg lg:text-xl text-neutral-400 mb-10 leading-relaxed max-w-xl">
            Stop guessing why you lost marks. MarksMind AI is the world's first precision diagnostic engine that ignores bad grammar and extracts your pure scientific knowledge against exact NCERT standards.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative h-[500px] lg:h-[600px] hidden md:flex items-center justify-center perspective-[1000px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-[450px] bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.2)]"
          >
            <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(30px)" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">A</div>
                <div>
                  <p className="text-base font-semibold text-white">Raw Student Answer</p>
                  <p className="text-sm text-neutral-400">Concept: Fractional Distillation</p>
                </div>
              </div>
            </div>
            
            <p style={{ transform: "translateZ(40px)" }} className="text-neutral-300 text-sm leading-relaxed mb-8 font-mono bg-black/50 p-5 rounded-xl border border-white/5">
              "The liquid is heat and then one gas go up first because it boil early and then it cool down in another tube."
            </p>

            <div className="space-y-4" style={{ transform: "translateZ(50px)" }}>
              <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-100 font-semibold">Concept Extracted</span>
                </div>
                <span className="text-green-400 font-bold">100%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-red-400" />
                  <span className="text-sm text-red-300 font-semibold">Missing NCERT Keyword</span>
                </div>
                <span className="text-red-400 font-bold text-xs bg-red-950/50 px-2 py-1 rounded border border-red-500/20">Fractionating Column</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
