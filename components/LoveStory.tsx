import { motion } from 'framer-motion';

export default function LoveStory() {
  const stories = [
    { year: '2020', title: 'Pertemuan Pertama', content: 'Di sebuah kafe kecil di sudut kota, mata kami bertemu untuk pertama kalinya. Sebuah awal yang sederhana namun berkesan.' },
    { year: '2022', title: 'Mulai Menjalin Kasih', content: 'Setelah dua tahun berteman, kami memutuskan untuk melangkah lebih jauh dan memulai hubungan yang lebih serius.' },
    { year: '2025', title: 'Lamaran (Engagement)', content: 'Di bawah cahaya bintang, Romeo melamar Juliet untuk menjadi pasangan hidupnya selamanya.' }
  ];

  return (
    <section id="story" className="py-20 bg-accent-soft overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">Cerita Cinta Kami</h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent-gold/30 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {stories.map((story, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`flex flex-col md:flex-row items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 px-8 text-center md:text-right">
                  <div className={idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}>
                    <span className="text-2xl font-serif text-accent-gold block mb-2">{story.year}</span>
                    <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                    <p className="text-accent-navy/80 leading-relaxed">{story.content}</p>
                  </div>
                </div>
                
                <div className="relative flex items-center justify-center my-6 md:my-0">
                  <div className="w-4 h-4 bg-accent-gold rounded-full z-10" />
                  <div className="absolute w-8 h-8 border border-accent-gold rounded-full animate-ping opacity-20" />
                </div>

                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
