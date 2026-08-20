import React from 'react';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-purple-500" />
          <span className="text-xl font-bold tracking-tight text-white">MarksMind <span className="text-purple-400">AI</span></span>
        </div>
        <p className="text-sm font-medium text-neutral-600">© 2026 MarksMind AI. Built in Durgapur.</p>
        <div className="flex items-center gap-8 text-sm font-medium text-neutral-500">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
