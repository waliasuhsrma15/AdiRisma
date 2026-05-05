'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <main className="min-h-screen bg-accent-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-morphism p-8 rounded-3xl !bg-white">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-accent-gold" />
          </div>
          <h1 className="text-2xl font-serif">Admin Dashboard</h1>
          <p className="text-sm text-accent-navy/60">Silakan login untuk mengelola undangan</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>}
          
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-accent-navy/60 font-bold">Username</label>
            <div className="relative">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-accent-soft rounded-xl border border-transparent focus:border-accent-gold outline-none transition-all"
                placeholder="Masukkan username"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-navy/30" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-accent-navy/60 font-bold">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-accent-soft rounded-xl border border-transparent focus:border-accent-gold outline-none transition-all"
                placeholder="Masukkan password"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-navy/30" size={18} />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full btn-premium gold-gradient !text-accent-navy flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
