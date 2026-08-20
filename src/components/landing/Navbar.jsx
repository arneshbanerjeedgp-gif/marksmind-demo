import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#121212]/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold tracking-tight text-white">
            MarksMind <span className="text-purple-400">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/login?mode=signin" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
            Login
          </a>
          <a href="/login?mode=signup" className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]">
            Get Started Free
          </a>
        </div>
      </div>
    </nav>
  );
}
