import React from 'react';
import { motion } from 'framer-motion';

export default function GlassNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/60 backdrop-blur-3xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-black text-white text-xl">M</div>
          <span className="text-2xl font-black tracking-tighter text-white">MarksMind<span className="text-purple-500">.AI</span></span>
        </div>
        <div className="flex items-center gap-8">
          <a href="/login?mode=signin" className="text-sm font-semibold text-neutral-400 hover:text-white transition-colors">Sign In</a>
          <motion.a 
            href="/login?mode=signup" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 py-3 bg-purple-600 rounded-full font-bold text-white text-sm overflow-hidden"
          >
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.a>
        </div>
      </div>
    </nav>
  );
}
