import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  FileCheck, 
  Bell, 
  Globe, 
  Shield, 
  ArrowRight,
  Plus,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const OrgPortal = () => {
  const [activeTab, setActiveTab] = useState('assets');

  const assets = [
    { name: 'FIFA_WC_HIGHLIGHTS_01', type: 'VIDEO', status: 'PROTECTED', date: '2026-04-20' },
    { name: 'PREMIER_LEAGUE_LOGO_FINAL', type: 'IMAGE', status: 'AUTHENTICATED', date: '2026-04-22' },
  ];

  return (
    <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
      {/* Org Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[var(--secondary)] text-[#fff] px-2 py-1 font-black text-[10px] tracking-widest uppercase border-2 border-[var(--border-color)]">
              ORGANIZATION_PARTNER
            </div>
          </div>
          <h1 className="text-6xl font-black uppercase leading-tight tracking-tighter">
            ORG <span className="text-[var(--primary)]">PORTAL</span>
          </h1>
          <p className="mt-2 text-zinc-500 font-bold uppercase tracking-widest text-sm">
            ASSET MANAGEMENT & PROTECTION HUB // FIFA.ORG
          </p>
        </div>
        <button className="bg-[var(--text-main)] text-[var(--primary)] border-4 border-[var(--border-color)] px-8 py-4 font-black uppercase text-sm shadow-[6px_6px_0px_0px_var(--primary)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-3">
          <Plus size={20} /> REGISTER NEW MEDIA
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-4">
          {[
            { id: 'assets', label: 'MY ASSETS', icon: FileCheck },
            { id: 'security', label: 'SECURITY CFG', icon: Shield },
            { id: 'alerts', label: 'NOTIFICATIONS', icon: Bell },
            { id: 'global', label: 'GLOBAL REACH', icon: Globe },
            { id: 'settings', label: 'PREFERENCES', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-4 font-black text-sm uppercase border-4 transition-all ${
                activeTab === item.id 
                  ? 'bg-[var(--primary)] border-[var(--border-color)] shadow-[4px_4px_0px_0px_var(--shadow-color)] translate-x-[-2px] translate-y-[-2px] text-[var(--primary-text)]' 
                  : 'bg-[var(--card-bg)] border-transparent hover:border-[var(--border-color)] text-[var(--text-main)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                {item.label}
              </div>
              <ArrowRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          <div className="brutalist-card border-4 p-0">
            <div className="bg-[var(--text-main)] p-4 flex justify-between items-center text-[var(--bg-color)]">
              <span className="font-black text-xs tracking-widest uppercase italic">ACTIVE_ASSET_REPOSITORY</span>
              <div className="flex gap-4">
                <div className="h-4 w-[1px] bg-[var(--bg-color)] opacity-20" />
                <span className="text-zinc-500 font-mono text-[10px]">TOTAL: {assets.length}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assets.map((asset, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-6 border-4 border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--text-main)] hover:text-[var(--bg-color)] transition-colors relative group"
                  >
                    <div className="absolute top-4 right-4">
                      <div className="bg-[var(--accent-green)] text-[#fff] p-1 border-2 border-[var(--border-color)] shadow-[2px_2px_0px_0px_var(--shadow-color)]">
                        <FileCheck size={14} />
                      </div>
                    </div>
                    
                    <p className="text-[10px] font-black text-[var(--secondary)] uppercase tracking-widest mb-1">{asset.type} // {asset.date}</p>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{asset.name}</h3>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-[var(--text-main)] text-[var(--bg-color)] py-2 font-black text-[10px] uppercase tracking-widest hover:bg-[var(--primary)] hover:text-[var(--primary-text)] transition-colors">
                        VIEW ON-CHAIN
                      </button>
                      <button className="px-4 py-2 border-2 border-[var(--border-color)] hover:bg-[var(--text-main)] hover:text-[var(--bg-color)] transition-colors">
                        <Settings size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}

                {/* Empty State / Add New CTA */}
                <div className="p-6 border-4 border-dashed border-[var(--border-color)] flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-[var(--text-main)] transition-colors">
                  <div className="w-12 h-12 rounded-full border-2 border-[var(--border-color)] flex items-center justify-center mb-4 group-hover:bg-[var(--primary)] transition-all">
                    <Plus size={24} className="group-hover:text-[var(--primary-text)] text-[var(--text-main)]"/>
                  </div>
                  <p className="font-black uppercase text-xs tracking-widest text-zinc-400 group-hover:text-[var(--bg-color)]">Add Placeholder Asset</p>
                </div>
              </div>

              {/* Security Advisory */}
              <div className="mt-12 p-6 bg-[var(--secondary)] text-[#fff] border-4 border-[var(--border-color)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[var(--card-bg)] p-2 border-2 border-[var(--border-color)]">
                    <Info size={24} className="text-[var(--secondary)]" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl uppercase italic">Security Protocol V4.2</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Automated asset scanning enabled globally</p>
                  </div>
                </div>
                <p className="text-sm font-bold leading-relaxed uppercase opacity-90">
                  Your organization's media assets are currently being monitored across 1,400+ digital platforms. 
                  Any unauthorized redistribution will be flagged and reported to the system admin immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgPortal;
