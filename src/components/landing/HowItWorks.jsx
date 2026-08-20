import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PenTool, BrainCircuit, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 relative bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-neutral-400 text-lg">From messy thoughts to board-perfect answers in seconds.</p>
        </div>

        <div className="relative">
          {/* Vertical Line Background */}
          <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full" />
          
          {/* Animated Glow Line */}
          <motion.div 
            className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-rose-500 rounded-full"
            style={{ height: lineHeight, transformOrigin: 'top' }}
          />

          <div className="space-y-24 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 text-left md:text-right flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">1. Write Freely</h3>
                <p className="text-neutral-400">Focus on the science, not perfect English. Write down your raw scientific understanding.</p>
              </div>
              <div className="w-20 h-20 shrink-0 bg-[#121212] border-2 border-purple-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <PenTool className="w-8 h-8 text-purple-400" />
              </div>
              <div className="md:w-1/2 flex-1 hidden md:block"></div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
              <div className="md:w-1/2 text-left flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">2. AI Concept Extraction</h3>
                <p className="text-neutral-400">The engine ignores the grammatical noise and extracts the pure academic concepts.</p>
              </div>
              <div className="w-20 h-20 shrink-0 bg-[#121212] border-2 border-pink-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                <BrainCircuit className="w-8 h-8 text-pink-400" />
              </div>
              <div className="md:w-1/2 flex-1 hidden md:block"></div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 text-left md:text-right flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">3. Granular Score & Keyword Diagnostic</h3>
                <p className="text-neutral-400">Instantly see your missing keywords and get a granular score based purely on your knowledge.</p>
              </div>
              <div className="w-20 h-20 shrink-0 bg-[#121212] border-2 border-rose-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                <CheckCircle2 className="w-8 h-8 text-rose-400" />
              </div>
              <div className="md:w-1/2 flex-1 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
