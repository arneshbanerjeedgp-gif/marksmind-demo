import React from 'react';
import { motion } from 'framer-motion';

export default function Personas() {
  return (
    <section className="py-24 border-t border-white/5 bg-[#121212]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Who is this for?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] border border-white/10 rounded-3xl p-10 relative overflow-hidden shadow-xl"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-500/10 blur-3xl rounded-full"></div>
            <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
              For the student who knows the science but struggles to structure the perfect answer.
            </h3>
            <p className="text-neutral-400 text-sm">
              Stop losing marks just because you couldn't frame the sentence perfectly. Let the AI prove you understand the concepts.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] border border-white/10 rounded-3xl p-10 relative overflow-hidden shadow-xl"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
            <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
              For the top scorer who needs to find their blind spots to secure the last 5% of marks.
            </h3>
            <p className="text-neutral-400 text-sm">
              You know the answer, but did you hit the exact keywords the examiner is looking for? Find your blind spots instantly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
