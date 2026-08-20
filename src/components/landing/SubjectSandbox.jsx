import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubjectSandbox() {
  const [activeTab, setActiveTab] = useState('Chemistry');

  const tabs = ['Physics', 'Chemistry', 'Biology', 'Computer Science'];

  const content = {
    'Physics': { title: 'Velocity & Acceleration', topic: 'Kinematics', missing: 'Rate of change' },
    'Chemistry': { title: 'Fractional Distillation', topic: 'Separation Techniques', missing: 'Boiling Points' },
    'Biology': { title: 'Cellular Powerhouse', topic: 'Mitochondria Structure', missing: 'Cristae' },
    'Computer Science': { title: 'Retrieval-Augmented Gen', topic: 'RAG AI Architecture', missing: 'Vector Database' }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Interactive Subject Sandbox</h2>
        <p className="text-neutral-400">Test the engine right now across core science and tech subjects.</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === tab 
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]' 
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#161618] border border-white/10 rounded-3xl p-8 min-h-[300px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <div className="inline-block px-3 py-1 rounded bg-purple-500/10 text-purple-400 text-sm font-bold tracking-wider uppercase mb-4 border border-purple-500/20">
              {activeTab} Diagnostics
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{content[activeTab].title}</h3>
            <p className="text-neutral-400 mb-8">{content[activeTab].topic}</p>
            
            <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">Diagnostic Result</span>
                <span className="text-red-400 text-sm font-bold bg-red-900/30 px-3 py-1 rounded-full border border-red-500/20">
                  Missing: {content[activeTab].missing}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <p className="text-xs text-neutral-500 mt-3 text-right">85% Concept Mastery</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
