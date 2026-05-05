import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax effect simulation */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url("https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop")'
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="text-accent-gold font-serif italic text-xl tracking-widest block mb-4">Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.</span>
          <h1 className="text-6xl md:text-8xl font-handwriting text-accent-navy mb-4">Romeo & Juliet</h1>
          <p className="text-xl md:text-2xl font-serif tracking-[0.2em] uppercase">31 Desember 2026</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-handwriting text-accent-gold mb-2">Romeo Montague</h2>
            <p className="text-sm uppercase tracking-widest mb-4">Putra Pertama dari</p>
            <p className="font-serif italic">Bapak Montague & Ibu Montague</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-handwriting text-accent-gold mb-2">Juliet Capulet</h2>
            <p className="text-sm uppercase tracking-widest mb-4">Putri Pertama dari</p>
            <p className="font-serif italic">Bapak Capulet & Ibu Capulet</p>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-l-2 border-t-2 border-accent-gold/30" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-r-2 border-b-2 border-accent-gold/30" />
    </section>
  );
}
