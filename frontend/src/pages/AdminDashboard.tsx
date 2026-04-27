import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  ShieldAlert, 
  ShieldCheck, 
  History, 
  Search,
  ArrowUpRight,
  Filter,
  Download,
  ExternalLink,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8000/assets');
        setAssets(response.data);
      } catch (error) {
        console.error('Failed to fetch assets', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const stats = [
    { label: 'TOTAL ASSETS', value: assets.length, icon: Activity, color: 'var(--primary)' },
    { label: 'FLAGGED MEDIA', value: assets.filter((a: any) => a.status === 'REJECTED').length, icon: ShieldAlert, color: 'var(--accent-red)' },
    { label: 'AUTHENTIC', value: assets.filter((a: any) => a.status === 'APPROVED').length, icon: ShieldCheck, color: 'var(--accent-green)' },
    { label: 'BLOCKCHAIN MINTS', value: assets.filter((a: any) => a.blockchain?.method === 'on_chain').length, icon: History, color: 'var(--secondary)' },
  ];

  return (
    <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[var(--text-main)] text-[var(--bg-color)] p-1 font-black text-[10px] tracking-widest uppercase">
              ADMIN_ACCESS_LEVEL_4
            </div>
          </div>
          <h1 className="text-6xl font-black uppercase leading-tight tracking-tighter">
            AUDIT <span className="text-[var(--primary)]">HUB</span>
          </h1>
          <p className="mt-2 text-[var(--text-muted)] font-bold uppercase tracking-widest text-sm">
            CENTRAL REGISTRY MONITORING // GLOBAL IP ENFORCEMENT
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] text-[var(--text-main)] px-6 py-3 font-black uppercase text-sm shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2">
            <Download size={18} /> EXPORT LOGS
          </button>
          <button className="bg-[var(--primary)] text-[var(--primary-text)] border-4 border-[var(--border-color)] px-6 py-3 font-black uppercase text-sm shadow-[4px_4px_0px_0px_var(--shadow-color)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2">
            <BarChart3 size={18} /> SYSTEM HEALTH
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="brutalist-card p-6 border-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[var(--bg-color)] border-2 border-[var(--border-color)]">
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <ArrowUpRight className="text-[var(--text-muted)] opacity-50" size={20} />
            </div>
            <p className="text-4xl font-black tracking-tighter mb-1 text-[var(--text-main)]">{stat.value}</p>
            <p className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Registry Table */}
      <div className="brutalist-card p-0 bg-[var(--card-bg)] border-4 border-[var(--border-color)] overflow-hidden">
        <div className="bg-[var(--text-main)] p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-[var(--bg-color)] font-black uppercase tracking-widest text-xs">
            <History size={16} className="text-[var(--primary)]" />
            GLOBAL_ASSET_REGISTRY.DB
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
              <input 
                type="text" 
                placeholder="SEARCH_BY_TX_HASH..." 
                className="bg-[var(--bg-color)] text-[var(--text-main)] border-2 border-[var(--text-muted)] px-10 py-2 text-xs font-mono uppercase focus:border-[var(--primary)] outline-none transition-colors w-full sm:w-64"
              />
            </div>
            <button className="bg-[var(--bg-color)] text-[var(--text-main)] p-2 border-2 border-[var(--text-muted)] hover:bg-[var(--text-muted)] hover:text-[var(--bg-color)] transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-color)] border-b-4 border-[var(--border-color)]">
                <th className="p-4 font-black uppercase text-xs tracking-widest border-r-2 border-[var(--border-color)] text-[var(--text-main)]">TIMESTAMP</th>
                <th className="p-4 font-black uppercase text-xs tracking-widest border-r-2 border-[var(--border-color)] text-[var(--text-main)]">ASSET_IDENTIFIER</th>
                <th className="p-4 font-black uppercase text-xs tracking-widest border-r-2 border-[var(--border-color)] text-[var(--text-main)]">VERDICT</th>
                <th className="p-4 font-black uppercase text-xs tracking-widest border-r-2 border-[var(--border-color)] text-[var(--text-main)]">HASH / TX_ID</th>
                <th className="p-4 font-black uppercase text-xs tracking-widest text-[var(--text-main)]">ACTION</th>
              </tr>
            </thead>
            <tbody className="font-bold text-sm">
              {assets.length > 0 ? assets.map((asset, idx) => (
                <tr key={idx} className="border-b-2 border-[var(--border-color)] hover:bg-[var(--bg-color)] transition-colors group text-[var(--text-main)]">
                  <td className="p-4 font-mono text-[11px] border-r-2 border-[var(--border-color)]">
                    {new Date(asset.timestamp || Date.now()).toLocaleString()}
                  </td>
                  <td className="p-4 border-r-2 border-[var(--border-color)] uppercase italic tracking-tighter">
                    {asset.blockchain?.asset_id || (asset.asset_hash ? asset.asset_hash.substring(0, 8) : 'U-MEDIA-77')}
                  </td>
                  <td className="p-4 border-r-2 border-[var(--border-color)]">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 border-2 border-[var(--border-color)] font-black text-[10px] uppercase ${
                      asset.status === 'REJECTED'
                        ? 'bg-[var(--accent-red)] text-white shadow-[2px_2px_0px_0px_var(--shadow-color)]' 
                        : 'bg-[var(--accent-green)] text-[var(--bg-color)] shadow-[2px_2px_0px_0px_var(--shadow-color)]'
                    }`}>
                      {asset.status === 'REJECTED' ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                      {asset.status === 'REJECTED' ? 'FLAGGED' : 'VERIFIED'}
                    </span>
                  </td>
                  <td className="p-4 border-r-2 border-[var(--border-color)] font-mono text-[10px] text-[var(--text-muted)]">
                    <div className="flex items-center gap-2 overflow-hidden max-w-[200px]">
                      <span className="truncate">{asset.blockchain?.tx_hash || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="bg-[var(--text-main)] text-[var(--bg-color)] p-2 border-2 border-[var(--border-color)] hover:bg-[var(--primary)] hover:text-[var(--primary-text)] transition-colors group-hover:translate-x-1 group-hover:translate-y-[-1px]">
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[var(--text-muted)] font-black uppercase italic tracking-widest">
                    No registry data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
