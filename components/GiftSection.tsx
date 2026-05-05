import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check } from 'lucide-react';

export default function GiftSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const bankAccounts = [
    {
      bank: 'Bank Central Asia (BCA)',
      number: '1234567890',
      owner: 'Romeo Montague'
    },
    {
      bank: 'Bank Mandiri',
      number: '0987654321',
      owner: 'Juliet Capulet'
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="gift" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif mb-8">Kado Digital</h2>
        <p className="max-w-2xl mx-auto mb-12 text-accent-navy/70 italic">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
          Namun jika memberi adalah bentuk tanda kasih Anda, kami sediakan fitur kado digital ini.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bankAccounts.map((acc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass-morphism p-8 rounded-3xl border-t-4 border-accent-gold"
            >
              <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="text-accent-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">{acc.bank}</h3>
              <p className="text-2xl font-serif text-accent-gold mb-1 tracking-widest">{acc.number}</p>
              <p className="text-sm uppercase tracking-widest text-accent-navy/60 mb-6">a.n {acc.owner}</p>
              
              <button 
                onClick={() => handleCopy(acc.number, idx)}
                className="btn-premium !bg-accent-soft !text-accent-navy border border-accent-gold/30 flex items-center justify-center gap-2 w-full hover:!bg-accent-gold hover:!text-white"
              >
                {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
                {copiedIndex === idx ? 'Tersalin' : 'Salin Nomor Rekening'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* QR Code Placeholder */}
        <div className="mt-16 max-w-xs mx-auto">
          <p className="mb-4 text-sm uppercase tracking-widest">Atau scan QR Code</p>
          <div className="aspect-square bg-accent-soft rounded-2xl border-2 border-dashed border-accent-gold/30 flex items-center justify-center p-8">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeddingGift" 
              alt="QR Code"
              className="w-full h-full opacity-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
