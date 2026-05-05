import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, CheckCircle } from 'lucide-react';

interface RSVPFormProps {
  guestName: string;
}

export default function RSVPForm({ guestName }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: guestName || '',
    attendance: 'Hadir',
    guestCount: 1,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, invitedAs: guestName })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-accent-soft text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto glass-morphism p-12 rounded-3xl"
        >
          <CheckCircle className="text-accent-gold w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-serif mb-4">Terima Kasih!</h2>
          <p className="text-accent-navy/70">Konfirmasi kehadiran Anda telah kami terima. Sampai jumpa di hari bahagia kami!</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 bg-accent-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto glass-morphism p-8 md:p-12 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Konfirmasi Kehadiran</h2>
          <p className="text-center mb-12 text-accent-navy/60">Merupakan suatu kehormatan bagi kami jika Anda dapat hadir di hari istimewa kami.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm uppercase tracking-widest mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-premium"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">Pernyataan Kehadiran</label>
                <select 
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                  className="input-premium"
                >
                  <option value="Hadir">Saya Akan Hadir</option>
                  <option value="Tidak Hadir">Maaf, Tidak Bisa Hadir</option>
                </select>
              </div>
              <div>
                <label className="block text-sm uppercase tracking-widest mb-2">Jumlah Tamu</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="1" 
                    max="10"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({...formData, guestCount: parseInt(e.target.value)})}
                    className="input-premium"
                  />
                  <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-gold/50" size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest mb-2">Ucapan & Doa</label>
              <textarea 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="input-premium resize-none"
                placeholder="Tuliskan ucapan dan doa restu Anda..."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-premium gold-gradient !text-accent-navy flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-accent-navy border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={18} />
                  Kirim Konfirmasi
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
