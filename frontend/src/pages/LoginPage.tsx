import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ChevronRight, AlertTriangle, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // admin or org
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Mock Authentication
    if (role === 'admin' && email === 'admin@aegis.net' && password === 'admin123') {
      localStorage.setItem('user_role', 'admin');
      navigate('/admin');
    } else if (role === 'org' && email === 'org@fifa.com' && password === 'org123') {
      localStorage.setItem('user_role', 'org');
      navigate('/');
    } else {
      setError('AUTHORIZATION_FAILURE: INVALID_CREDENTIALS');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-[var(--bg-color)] px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[100px] border-[var(--text-main)] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[60px] border-[var(--text-main)] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="brutalist-card p-0 overflow-hidden bg-[var(--card-bg)] border-4 border-[var(--border-color)] shadow-[12px_12px_0px_0px_var(--shadow-color)]">
          {/* Header */}
          <div className="bg-[var(--text-main)] p-6 flex flex-col items-center text-center">
            <div className="bg-[var(--primary)] p-4 border-4 border-[var(--border-color)] shadow-[4px_4px_0px_0px_var(--shadow-color)] mb-4">
              <Shield className="text-[var(--primary-text)]" size={40} />
            </div>
            <h1 className="text-3xl font-black text-[var(--bg-color)] uppercase tracking-tighter italic">
              SECURE <span className="text-[var(--primary)]">AUTHORIZATION</span>
            </h1>
            <p className="text-[var(--primary)] font-mono text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">
              // AEGISNET TACTICAL INTERFACE //
            </p>
          </div>

          <div className="p-8">
            {/* Role Selector */}
            <div className="flex gap-2 mb-8 bg-[var(--bg-color)] p-2 border-2 border-[var(--border-color)]">
              <button 
                onClick={() => setRole('admin')}
                className={`flex-1 py-3 font-black uppercase text-xs transition-all ${
                  role === 'admin' ? 'bg-[var(--text-main)] text-[var(--bg-color)]' : 'hover:bg-[var(--text-muted)] hover:text-[var(--bg-color)] text-[var(--text-main)]'
                }`}
              >
                SYSTEM_ADMIN
              </button>
              <button 
                onClick={() => setRole('org')}
                className={`flex-1 py-3 font-black uppercase text-xs transition-all ${
                  role === 'org' ? 'bg-[var(--text-main)] text-[var(--bg-color)]' : 'hover:bg-[var(--text-muted)] hover:text-[var(--bg-color)] text-[var(--text-main)]'
                }`}
              >
                ORGANIZATION
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-black uppercase text-xs tracking-widest text-[var(--text-muted)]">CREDENTIAL_EMAIL</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[var(--bg-color)] text-[var(--text-main)] border-4 border-[var(--border-color)] p-4 pl-12 font-bold uppercase text-sm focus:bg-[var(--primary)]/10 focus:border-[var(--primary)] outline-none transition-all"
                    placeholder="ENTER_ID..."
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-black uppercase text-xs tracking-widest text-[var(--text-muted)]">SECURITY_TOKEN</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[var(--bg-color)] text-[var(--text-main)] border-4 border-[var(--border-color)] p-4 pl-12 font-bold uppercase text-sm focus:bg-[var(--primary)]/10 focus:border-[var(--primary)] outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-[var(--accent-red)] text-white p-3 border-2 border-[var(--border-color)] flex items-center gap-3 animate-shake">
                  <AlertTriangle size={18} />
                  <span className="font-black text-[10px] uppercase tracking-widest">{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full bg-[var(--primary)] text-[var(--primary-text)] py-5 border-4 border-[var(--border-color)] font-black uppercase text-lg shadow-[6px_6px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 group"
              >
                INITIATE_SESSION
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-[var(--border-color)] flex justify-between items-center opacity-50 text-[var(--text-main)]">
              <div className="flex items-center gap-2">
                <Fingerprint size={16} />
                <span className="font-mono text-[10px] font-bold">BIOMETRIC_READY</span>
              </div>
              <span className="font-mono text-[10px] font-bold underline cursor-pointer">FORGOT_KEY?</span>
            </div>
          </div>
        </div>

        {/* Tactical Footer Note */}
        <div className="mt-6 flex items-center justify-center gap-3 opacity-30 group cursor-default text-[var(--text-main)]">
          <div className="h-[2px] w-8 bg-[var(--text-muted)]" />
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest group-hover:opacity-100 transition-opacity">
            DECRYPTING_PACKETS... RSA_2048_ENABLED
          </p>
          <div className="h-[2px] w-8 bg-[var(--text-muted)]" />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
