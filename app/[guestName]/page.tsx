'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, MapPin, Clock, Music, Volume2, VolumeX, Send } from 'lucide-react';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import LoveStory from '@/components/LoveStory';
import Gallery from '@/components/Gallery';
import RSVPForm from '@/components/RSVPForm';
import GiftSection from '@/components/GiftSection';
import LoadingScreen from '@/components/LoadingScreen';

export default function InvitationPage() {
  const { guestName } = useParams();
  const decodedGuestName = typeof guestName === 'string' ? decodeURIComponent(guestName).replace(/-/g, ' ') : '';
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <main className="relative min-h-screen">
      {/* Background Music */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full glass-morphism text-accent-gold hover:scale-110 transition-transform"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Opening Screen */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-accent-navy text-white text-center px-4"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-xl md:text-2xl font-light mb-2 tracking-widest uppercase">The Wedding of</h2>
              <h1 className="text-5xl md:text-7xl font-handwriting text-accent-gold mb-6">Romeo & Juliet</h1>
              <p className="text-lg mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <h3 className="text-2xl md:text-3xl font-serif mb-8 capitalize">{decodedGuestName || 'Tamu Undangan'}</h3>
              
              <button 
                onClick={handleOpenInvitation}
                className="btn-premium gold-gradient !text-accent-navy flex items-center gap-2 group"
              >
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                Buka Undangan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Hero />
        <section id="countdown" className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-12">Menuju Hari Bahagia</h2>
            <Countdown targetDate="2026-12-31T09:00:00" />
          </div>
        </section>

        <LoveStory />
        <Gallery />
        
        <section id="event" className="py-20 bg-accent-soft">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">Detail Acara</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="glass-morphism p-8 text-center rounded-2xl border-t-4 border-accent-gold">
                <h3 className="text-2xl font-serif mb-4 text-accent-gold">Akad Nikah</h3>
                <p className="mb-2"><Calendar className="inline mr-2" size={18} /> Minggu, 31 Desember 2026</p>
                <p className="mb-2"><Clock className="inline mr-2" size={18} /> 08:00 - 10:00 WIB</p>
                <p className="mb-6"><MapPin className="inline mr-2" size={18} /> Gedung Pernikahan Mewah, Jakarta</p>
                <a href="#" className="text-accent-gold hover:underline">Buka Google Maps</a>
              </div>
              <div className="glass-morphism p-8 text-center rounded-2xl border-t-4 border-accent-gold">
                <h3 className="text-2xl font-serif mb-4 text-accent-gold">Resepsi</h3>
                <p className="mb-2"><Calendar className="inline mr-2" size={18} /> Minggu, 31 Desember 2026</p>
                <p className="mb-2"><Clock className="inline mr-2" size={18} /> 11:00 - Selesai</p>
                <p className="mb-6"><MapPin className="inline mr-2" size={18} /> Gedung Pernikahan Mewah, Jakarta</p>
                <a href="#" className="text-accent-gold hover:underline">Buka Google Maps</a>
              </div>
            </div>
          </div>
        </section>

        <RSVPForm guestName={decodedGuestName} />
        <GiftSection />

        <footer className="py-12 bg-accent-navy text-white text-center">
          <p className="font-handwriting text-3xl text-accent-gold mb-4">Romeo & Juliet</p>
          <p className="text-sm opacity-70">© 2026 Digital Invitation. All rights reserved.</p>
        </footer>
      </div>

      {/* Hidden Audio Element */}
      <audio 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        autoPlay={isOpen && isPlaying} 
        loop 
        style={{ display: 'none' }}
        ref={(el) => {
          if (el) {
            if (isOpen && isPlaying) el.play();
            else el.pause();
          }
        }}
      />
    </main>
  );
}
