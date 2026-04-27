import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, Terminal, LogOut, Settings, Wallet, Activity, Moon, Sun, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLute } from '../hooks/useLute';

const Navbar = () => {
  const location = useLocation();
  const userRole = localStorage.getItem('user_role');
  const [isDark, setIsDark] = useState(false);
  const { address, isConnecting, connect, disconnect, isConnected } = useLute();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { name: 'TERMINAL', path: '/', icon: Terminal },
    { name: 'WORKFLOW', path: '/workflow', icon: Activity },
    ...(userRole === 'admin' ? [{ name: 'AUDIT HUB', path: '/admin', icon: LayoutDashboard }] : []),
    ...(userRole === 'org' ? [{ name: 'ORG PORTAL', path: '/org', icon: Settings }] : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  };

  const handleWalletAction = () => {
    if (isConnected) {
      if (window.confirm('Disconnect Lute Wallet?')) {
        disconnect();
      }
    } else {
      connect();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-[var(--card-bg)] border-4 border-[var(--border-color)] p-3 shadow-[6px_6px_0px_0px_var(--shadow-color)] transition-colors duration-300">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[var(--text-main)] p-2 border-2 border-[var(--border-color)] group-hover:bg-[var(--primary)] transition-colors duration-300">
            <Shield className="text-[var(--bg-color)] group-hover:text-[var(--text-main)]" size={28} />
          </div>
          <div>
            <span className="block text-2xl font-black uppercase leading-none tracking-tighter text-[var(--text-main)]">AEGIS<span className="text-[var(--primary)]">NET</span></span>
            <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Forensic Defense v2.0</span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center gap-2 px-4 py-2 font-black text-sm uppercase transition-all border-2 text-[var(--text-main)] ${
                  location.pathname === item.path 
                    ? 'bg-[var(--primary)] border-[var(--border-color)] shadow-[3px_3px_0px_0px_var(--shadow-color)] translate-x-[-2px] translate-y-[-2px] text-[var(--primary-text)]' 
                    : 'border-transparent hover:bg-[var(--text-main)] hover:text-[var(--bg-color)] hover:border-[var(--border-color)]'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="h-8 w-1 bg-[var(--text-main)] opacity-10 mx-2" />

          <button 
            onClick={toggleTheme}
            className="p-2 border-2 border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--primary)] hover:text-[var(--primary-text)] transition-colors shadow-[3px_3px_0px_0px_var(--shadow-color)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {userRole ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={handleWalletAction}
                disabled={isConnecting}
                className={`hidden lg:flex items-center gap-2 px-4 py-2 border-2 border-[var(--border-color)] font-black text-xs uppercase shadow-[3px_3px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${
                  isConnected 
                    ? 'bg-[var(--accent-green)] text-white' 
                    : 'bg-[var(--secondary)] text-white'
                }`}
              >
                {isConnecting ? (
                  <Activity className="animate-spin" size={16} />
                ) : isConnected ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Wallet size={16} />
                )}
                {isConnecting 
                  ? 'CONNECTING...' 
                  : isConnected 
                    ? `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}` 
                    : 'LUTE WALLET'}
              </button>
              <button 
                onClick={handleLogout}
                className="bg-[#EF4444] text-white p-2 border-2 border-[var(--border-color)] shadow-[3px_3px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                title="LOGOUT"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-[var(--primary)] text-[var(--primary-text)] px-6 py-2 border-4 border-[var(--border-color)] font-black uppercase text-sm shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              AUTHORIZE ACCESS
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

