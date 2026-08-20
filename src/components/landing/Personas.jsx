import React from 'react';
import { motion } from 'framer-motion';

export default function Personas() {
  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-[#121212] border border-white/10 rounded-[40px] p-12 relative overflow-hidden shadow-2xl group"
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-pink-500/10 blur-[100px] rounded-full group-hover:bg-pink-500/20 transition-colors duration-500"></div>
            <h3 className="text-4xl font-black text-white mb-6 tracking-tight">For the Hustler.</h3>
            <p className="text-neutral-400 text-lg leading-relaxed">
              You know the science, but you struggle to structure the perfect answer. Stop losing marks because you can't frame the sentence perfectly. Let the AI prove you understand the concepts.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-[#121212] border border-white/10 rounded-[40px] p-12 relative overflow-hidden shadow-2xl group"
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-500"></div>
            <h3 className="text-4xl font-black text-white mb-6 tracking-tight">For the Top 1%.</h3>
            <p className="text-neutral-400 text-lg leading-relaxed">
              You know the answer, but did you hit the exact keywords the examiner is looking for? Find your microscopic blind spots instantly to secure full marks.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
