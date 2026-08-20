import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function GodModeHero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section className="relative pt-40 pb-32 min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-900/10 rounded-full blur-[200px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-sm mb-6">
              v2.0 Precision Diagnostic Engine
            </span>
          </motion.div>
          
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] mb-8 text-white"
          >
            End the Grading <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Black Box.</span>
          </motion.h1>

          <motion.p 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="text-xl text-neutral-400 leading-relaxed mb-10 max-w-xl"
          >
            Stop guessing why you lost marks. Precision diagnostics that ignore bad grammar and extract pure scientific knowledge directly mapped to NCERT standards.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className="relative h-[600px] hidden lg:flex items-center justify-center perspective-[1200px]"
        >
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-[480px] bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[30px] p-8 shadow-[0_30px_100px_rgba(168,85,247,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-[30px] pointer-events-none"></div>
            
            <div style={{ transform: "translateZ(40px)" }} className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold border border-white/10">A</div>
                <div>
                  <div className="text-white font-bold">Input Answer</div>
                  <div className="text-xs text-neutral-500 font-mono">Raw Text Stream</div>
                </div>
              </div>
            </div>
            
            <p style={{ transform: "translateZ(60px)" }} className="text-neutral-300 font-mono text-sm leading-relaxed mb-10 p-6 bg-[#0a0a0a] rounded-xl border border-white/5">
              <span className="text-red-400 line-through opacity-50">The heat make</span> liquid <span className="text-red-400 line-through opacity-50">go up</span> <span className="text-green-400 font-bold bg-green-500/10 rounded px-1">Evaporate</span> <span className="text-red-400 line-through opacity-50">and it cold down</span> <span className="text-green-400 font-bold bg-green-500/10 rounded px-1">Condense</span> <span className="text-red-400 line-through opacity-50">to come out separate.</span>
            </p>

            <div style={{ transform: "translateZ(80px)" }} className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-purple-300 font-bold text-sm tracking-widest uppercase">Fatal Defect Detected</span>
                 <span className="bg-red-500/20 text-red-400 font-black px-2 py-1 rounded text-xs">-1 MARK</span>
               </div>
               <div className="text-white font-bold text-lg">Missing: Fractionating Column</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
