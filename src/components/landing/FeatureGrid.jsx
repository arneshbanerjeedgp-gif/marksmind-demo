import React from 'react';
import { motion } from 'framer-motion';
import { Target, Search, Database, RefreshCcw } from 'lucide-react';

export default function FeatureGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">The Intelligence Engine</h2>
        <p className="text-neutral-400">Everything you need to secure the last 5%.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={item} className="col-span-1 md:col-span-2 lg:col-span-2 bg-[#161618] border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:-translate-y-1">
          <Target className="w-10 h-10 text-purple-400 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3">CEDA Protocol (Concept Extraction)</h3>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            We see past your grammar. Our engine extracts the raw scientific concepts you're trying to convey in English, grading you strictly on knowledge, not vocabulary.
          </p>
          <div className="bg-black/50 rounded-xl p-4 border border-white/5 font-mono text-xs text-neutral-500">
            <span className="text-purple-400">Analysis:</span> {`{ "status": "Success", "concepts_found": ["momentum", "inertia"] }`}
          </div>
        </motion.div>

        <motion.div variants={item} className="col-span-1 bg-[#161618] border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] hover:-translate-y-1">
          <Search className="w-10 h-10 text-pink-400 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3">NCERT Keyword Mapping</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Stop losing marks because you forgot one word. We highlight the exact terminology examiners look for.
          </p>
        </motion.div>

        <motion.div variants={item} className="col-span-1 bg-[#161618] border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-sky-500/50 hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] hover:-translate-y-1">
          <Database className="w-10 h-10 text-sky-400 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3">Mistake Database</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Every error you make is logged. Pattern recognition for your conceptual gaps highlights recurring mistakes.
          </p>
        </motion.div>

        <motion.div variants={item} className="col-span-1 md:col-span-2 bg-[#161618] border border-white/10 rounded-3xl p-8 transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:-translate-y-1">
          <RefreshCcw className="w-10 h-10 text-amber-400 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-3">Smart Revision Tracking</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Memory decay algorithms ensure you review weak concepts before exam day. We track your learning curve and optimize your revision time.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
