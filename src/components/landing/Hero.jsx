import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide text-purple-300 uppercase">Precision Diagnostics Engine</span>
          </motion.div>

          <motion.h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
            End the Grading <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Black Box.
            </span>
          </motion.h1>

          <motion.p className="text-lg lg:text-xl text-neutral-400 mb-10 leading-relaxed max-w-xl">
            Traditional grading tells you what you scored. MarksMind AI tells you exactly why you lost marks. We parse your English, ignore the bad grammar, and evaluate your pure scientific concepts against exact NCERT standards.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative h-[500px] lg:h-[600px] hidden md:block"
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          style={{ perspective: 1000 }}
        >
          <motion.div 
            className="absolute right-10 top-1/2 -translate-y-1/2 w-[420px] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
            animate={{ y: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">A</div>
                <div>
                  <p className="text-sm font-medium text-white">Student Answer</p>
                  <p className="text-xs text-neutral-400">Class 10 Science</p>
                </div>
              </div>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-mono bg-black/40 p-4 rounded-lg border border-white/5">
              "The heat make liquid go up and it cold down to come out separate."
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-100 font-medium">Concept Score</span>
                </div>
                <span className="text-green-400 font-bold">100%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-red-300">Missing NCERT Keyword</span>
                </div>
                <span className="text-red-400 font-bold text-xs bg-red-950 px-2 py-1 rounded">Fractionating Column</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
