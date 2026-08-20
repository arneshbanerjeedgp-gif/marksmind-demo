import React from 'react';
import { motion } from 'framer-motion';

export default function GlassNav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/60 backdrop-blur-3xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-extrabold tracking-tight text-white">MarksMind</span>
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">AI</span>
          <span className="text-xl ml-0.5">✨</span>
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
