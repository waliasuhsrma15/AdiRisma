import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] bg-accent-navy flex flex-col items-center justify-center text-white">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-20 h-20 border-2 border-accent-gold/30 border-t-accent-gold rounded-full mb-8"
      />
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-2xl font-serif tracking-[0.3em] uppercase text-accent-gold"
      >
        Romeo & Juliet
      </motion.h2>
      <p className="text-xs tracking-widest mt-2 opacity-50 uppercase">Please wait a moment...</p>
    </div>
  );
}
