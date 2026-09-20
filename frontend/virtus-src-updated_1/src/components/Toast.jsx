import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { FiCheckCircle } from 'react-icons/fi';

export default function Toast() {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10"
        >
          <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <FiCheckCircle size={14} />
          </div>
          <span className="text-sm font-medium">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}