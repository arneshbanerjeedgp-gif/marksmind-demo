import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubjectSandbox() {
  const [activeTab, setActiveTab] = useState('Physics');
  const tabs = ['Physics', 'Chemistry', 'Biology', 'Computer Science'];

  const content = {
    'Physics': { title: 'Velocity & Acceleration', topic: 'Kinematics', missing: 'Rate of change', score: '80%' },
    'Chemistry': { title: 'Fractional Distillation', topic: 'Separation Techniques', missing: 'Boiling Points', score: '85%' },
    'Biology': { title: 'Cellular Powerhouse', topic: 'Mitochondria Structure', missing: 'Cristae', score: '90%' },
    'Computer Science': { title: 'Retrieval-Augmented Gen', topic: 'RAG Architecture', missing: 'Vector Database', score: '95%' }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">Interactive Subject Sandbox</h2>
        <p className="text-neutral-400 text-lg">Test the diagnostic engine live.</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 rounded-full font-bold transition-all text-sm uppercase tracking-wider ${
              activeTab === tab 
                ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-105' 
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#121212] border border-white/10 rounded-3xl p-10 min-h-[350px] relative overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col justify-center"
          >
            <h3 className="text-4xl font-black text-white mb-2">{content[activeTab].title}</h3>
            <p className="text-neutral-400 mb-10 text-lg">{content[activeTab].topic}</p>
            
            <div className="bg-black/60 p-8 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-medium text-lg">Diagnostic Result</span>
                <span className="text-red-400 text-sm font-bold bg-red-950/50 px-4 py-2 rounded-full border border-red-500/20">
                  Missing: {content[activeTab].missing}
                </span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: content[activeTab].score }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <p className="text-sm text-neutral-400 mt-4 font-mono">{content[activeTab].score} Concept Mastery</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
