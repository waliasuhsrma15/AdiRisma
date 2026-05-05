'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, MessageSquare, Settings, 
  LogOut, Download, Trash2, Edit, Check, X, Send, Smartphone 
} from 'lucide-react';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [broadcastList, setBroadcastList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'rsvps' | 'broadcast'>('rsvps');
  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    notAttending: 0,
    totalGuests: 0
  });
  const [loading, setLoading] = useState(true);
  const [waTemplate, setWaTemplate] = useState("Halo [Nama]! Kami mengundang Anda ke pernikahan Romeo & Juliet. Buka undangan Anda di: [Link]");
  const router = useRouter();

  useEffect(() => {
    // Auth check
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }
    fetchRSVPs();
    fetchBroadcastList();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const res = await fetch('/api/rsvp');
      const data = await res.json();
      setRsvps(data);
      
      const attending = data.filter((r: any) => r.attendance === 'Hadir');
      setStats({
        total: data.length,
        attending: attending.length,
        notAttending: data.length - attending.length,
        totalGuests: attending.reduce((acc: number, curr: any) => acc + (parseInt(curr.guestCount) || 0), 0)
      });
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    }
  };

  const fetchBroadcastList = async () => {
    try {
      const res = await fetch('/api/broadcast');
      const data = await res.json();
      setBroadcastList(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching broadcast list:', error);
      setLoading(false);
    }
  };

  const sendWA = (name: string, phone: string) => {
    const currentUrl = window.location.origin;
    const link = `${currentUrl}/${encodeURIComponent(name.replace(/ /g, '-'))}`;
    const message = waTemplate.replace("[Nama]", name).replace("[Link]", link);
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(rsvps);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RSVP List");
    XLSX.writeFile(wb, "Daftar_Tamu_Undangan.xlsx");
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-accent-soft">
      <div className="w-12 h-12 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-accent-soft">
      {/* Sidebar */}
      <aside className="w-64 bg-accent-navy text-white hidden md:flex flex-col">
        <div className="p-8 border-b border-white/10">
          <h2 className="font-serif text-2xl text-accent-gold">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('rsvps')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'rsvps' ? 'bg-white/10 text-accent-gold' : 'hover:bg-white/5'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('broadcast')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'broadcast' ? 'bg-white/10 text-accent-gold' : 'hover:bg-white/5'}`}
          >
            <Smartphone size={20} /> Broadcast WA
          </button>
        </nav>
        <button 
          onClick={handleLogout}
          className="p-8 border-t border-white/10 flex items-center gap-3 text-red-400 hover:bg-red-950 transition-colors"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-accent-navy">Ringkasan Statistik</h1>
            <p className="text-accent-navy/60">Kelola data tamu dan pengaturan undangan</p>
          </div>
          <button 
            onClick={handleExport}
            className="btn-premium gold-gradient !text-accent-navy flex items-center gap-2"
          >
            <Download size={18} /> Export ke Excel
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Konfirmasi', value: stats.total, icon: Users, color: 'text-blue-500' },
            { label: 'Hadir', value: stats.attending, icon: Check, color: 'text-green-500' },
            { label: 'Tidak Hadir', value: stats.notAttending, icon: X, color: 'text-red-500' },
            { label: 'Total Personil', value: stats.totalGuests, icon: Users, color: 'text-purple-500' }
          ].map((stat, idx) => (
            <div key={idx} className="glass-morphism p-6 rounded-2xl border-l-4 border-accent-gold">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold uppercase tracking-widest text-accent-navy/60">{stat.label}</span>
                <stat.icon className={stat.color} size={20} />
              </div>
              <p className="text-3xl font-serif">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Tabs */}
        {activeTab === 'rsvps' ? (
          <div className="glass-morphism rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-accent-navy/5 flex justify-between items-center">
              <h2 className="text-xl font-serif">Daftar Konfirmasi Tamu</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-accent-soft/50 text-accent-navy/60 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Nama Tamu</th>
                    <th className="px-6 py-4">Kehadiran</th>
                    <th className="px-6 py-4">Jumlah</th>
                    <th className="px-6 py-4">Pesan</th>
                    <th className="px-6 py-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-navy/5">
                  {rsvps.map((rsvp, idx) => (
                    <tr key={idx} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4 font-medium">{rsvp.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          rsvp.attendance === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {rsvp.attendance}
                        </span>
                      </td>
                      <td className="px-6 py-4">{rsvp.guestCount} Orang</td>
                      <td className="px-6 py-4 text-sm max-w-xs truncate">{rsvp.message || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="glass-morphism p-8 rounded-3xl">
              <h2 className="text-xl font-serif mb-4">Template Pesan WhatsApp</h2>
              <textarea 
                rows={4}
                value={waTemplate}
                onChange={(e) => setWaTemplate(e.target.value)}
                className="w-full p-4 bg-white/50 border border-accent-gold/20 rounded-xl outline-none focus:border-accent-gold"
              />
              <p className="text-xs mt-2 opacity-50 italic">Gunakan [Nama] untuk nama tamu dan [Link] untuk URL otomatis.</p>
            </div>

            <div className="glass-morphism rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-accent-soft/50 text-accent-navy/60 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Nama Tamu</th>
                    <th className="px-6 py-4">No WhatsApp</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-navy/5">
                  {broadcastList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-accent-navy/60">{item.phone}</td>
                      <td className="px-6 py-4 text-xs italic opacity-50">{item.status || 'Belum Terkirim'}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => sendWA(item.name, item.phone)}
                          className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                        >
                          <Send size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
