import React from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <footer className="relative bg-gradient-to-t from-purple-900/30 to-black pt-32 pb-12 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight"
        >
          Ready to find out where your marks are actually going?
        </motion.h2>
        <motion.a 
          href="/login?mode=signup"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-black px-10 py-5 rounded-full font-bold text-xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          Start Your Free Diagnostic
        </motion.a>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-white">MarksMind <span className="text-purple-400">AI</span></span>
        </div>
        <p className="text-sm text-neutral-500">© {new Date().getFullYear()} MarksMind AI. All rights reserved.</p>
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
