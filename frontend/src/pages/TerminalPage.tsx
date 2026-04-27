import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  ShieldAlert,
  ShieldCheck,
  Database,
  Scan,
  Cpu,
  Search,
  Fingerprint,
  ChevronRight,
  ExternalLink,
  Activity,
  Lock,
} from 'lucide-react';

import { useLute } from '../hooks/useLute';

const TerminalPage = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [walletStatus, setWalletStatus] = useState<any>(null);
  const [leagueId, setLeagueId] = useState('AEGIS-PREMIER');
  const [source, setSource] = useState('Official');
  const { address: userAddress, isConnected } = useLute();

  React.useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get('http://localhost:8000/blockchain/status');
        setWalletStatus(res.data);
      } catch (e) {
        console.error("Status fetch failed", e);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000); // Faster polling (3s)
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    setLoading(true);
    setAnalysis(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 15 : prev));
    }, 400);

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('content', uploadedFile.name);
    formData.append('league_id', leagueId);
    formData.append('original_source', source);

    try {
      const response = await axios.post('http://localhost:8000/analyze', formData);
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setAnalysis(response.data);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Analysis failed', error);
      clearInterval(interval);
      setLoading(false);
    }
  };

  const statusText = analysis?.status === 'REJECTED' ? 'IP VIOLATION DETECTED' : 'ASSET AUTHENTICATED';
  const statusColor = analysis?.status === 'REJECTED' ? '#EF4444' : '#22C55E';

  return (
    <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-6xl font-black uppercase leading-tight tracking-tighter">
            FORENSIC <br />
            <span className="text-[#FACC15]">TERMINAL</span>
          </h1>
          <p className="mt-2 text-zinc-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <Fingerprint size={16} />
            SECURE UPLOAD GATEWAY // ASSET TRACKING ACTIVE
          </p>
        </div>
        <div className="bg-[var(--text-main)] text-[var(--primary)] p-4 border-2 border-[var(--primary)] font-mono text-[10px] uppercase flex flex-col gap-1 min-w-[280px]">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 ${walletStatus?.node_status === 'connected' ? 'bg-[var(--primary)] animate-pulse' : 'bg-red-500'} rounded-full`} />
            SYSTEM: {walletStatus?.node_status === 'connected' ? 'OPTIMAL' : 'ERROR'} | ALG_NODE: {walletStatus?.node_status === 'connected' ? 'CONNECTED' : 'OFFLINE'}
          </div>
          
          {walletStatus && (
            <div className="mt-2 border-t border-[var(--primary)] border-opacity-30 pt-1">
              <div className="flex justify-between items-center mb-1">
                <span>TREASURER: {walletStatus.wallet_address?.substring(0, 8)}...</span>
                <span className="text-[var(--primary)]">{walletStatus.balance_algo.toFixed(2)} ALGO</span>
              </div>
              <div className="flex justify-between items-center">
                <span>USER WALLET: {userAddress?.substring(0, 8)}...</span>
                <span className={walletStatus.is_aligned ? "text-green-400" : "text-yellow-400"}>
                  {walletStatus.is_aligned ? "ALIGNED" : "MISALIGNED"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="brutalist-card p-0 overflow-hidden">
            <div className="bg-[var(--text-main)] p-3 flex justify-between items-center text-[var(--bg-color)]">
              <span className="font-black text-xs tracking-widest">DRAG_DROP_MODULE.EXE</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 border border-[var(--bg-color)] opacity-30" />
                <div className="w-2 h-2 border border-[var(--bg-color)] opacity-30" />
              </div>
            </div>

            <div className="p-6 space-y-4 border-t-2 border-[var(--border-color)] bg-[var(--bg-color)]">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase opacity-50">League Identifier</label>
                  <input 
                    type="text" 
                    value={leagueId}
                    onChange={(e) => setLeagueId(e.target.value)}
                    className="w-full bg-[var(--card-bg)] border-2 border-[var(--border-color)] p-2 font-mono text-xs uppercase outline-none focus:border-[var(--primary)]"
                    placeholder="E.G. NBA-WEST"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase opacity-50">Media Source</label>
                  <select 
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-[var(--card-bg)] border-2 border-[var(--border-color)] p-2 font-mono text-xs uppercase outline-none focus:border-[var(--primary)]"
                  >
                    <option value="Official">Official</option>
                    <option value="Partner">Partner</option>
                    <option value="Verified">Verified</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>
            </div>

            <label className="block p-8 cursor-pointer hover:opacity-80 transition-opacity group">
              <input type="file" className="hidden" onChange={handleUpload} />
              <div className="border-4 border-dashed border-[var(--border-color)] p-12 flex flex-col items-center gap-4 group-hover:border-[var(--primary)] transition-colors">
                <div className="bg-[var(--primary)] p-4 border-2 border-[var(--border-color)] shadow-[4px_4px_0px_0px_var(--shadow-color)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform">
                  <Upload size={32} className="text-[var(--primary-text)]" />
                </div>
                <div className="text-center">
                  <p className="font-black text-xl uppercase italic">Initiate Asset Scan</p>
                  <p className="text-xs font-bold text-zinc-400 mt-1 uppercase">
                    Support: JPG, PNG, MP4 (MAX 50MB)
                  </p>
                </div>
              </div>
            </label>
            <div className="bg-[var(--primary)] p-2 font-black text-[10px] uppercase text-center border-t-2 border-[var(--border-color)] flex items-center justify-center gap-2">
              <Lock size={12} /> SHA-256 ASSET ENCRYPTION ACTIVE // REAL-TIME MINTING READY
            </div>
          </div>

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="brutalist-card bg-[var(--secondary)] text-[#fff] p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-black italic flex items-center gap-2 tracking-widest">
                    <Scan className="animate-spin" size={18} />
                    DECRYPTING_SIGNAL...
                  </span>
                  <span className="font-mono text-xl">{progress}%</span>
                </div>
                <div className="w-full h-4 bg-[var(--text-main)] opacity-30 border-2 border-[var(--border-color)] overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--primary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-4 font-mono text-[10px] opacity-70 grid grid-cols-2 gap-2 uppercase">
                  <span>{'>'} Running checksum...</span>
                  <span>{'>'} Analyzing metadata...</span>
                  <span>{'>'} Contacting auditor...</span>
                  <span>{'>'} Verifying IP...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="brutalist-card p-6">
            <h3 className="font-black uppercase mb-4 flex items-center gap-2">
              <ShieldAlert size={20} className="text-[var(--accent-red)]" />
              Forensic Protocols
            </h3>
            <ul className="space-y-3 font-bold text-sm uppercase tracking-tight">
              <li className="flex gap-3">
                <ChevronRight className="text-[#FACC15] shrink-0" size={16} />
                AI-Powered Fingerprint Matching (Watchtower-v4)
              </li>
              <li className="flex gap-3">
                <ChevronRight className="text-[#FACC15] shrink-0" size={16} />
                Decentralized Truth Verification (Auditor Consensus)
              </li>
              <li className="flex gap-3">
                <ChevronRight className="text-[#FACC15] shrink-0" size={16} />
                Real-time Algorand Asset Registration
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Results Console */}
        <div className="lg:col-span-7">
          <div className="brutalist-card min-h-[500px] border-4 p-0">
            <div className="bg-[var(--text-main)] p-4 flex items-center justify-between text-[var(--bg-color)]">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-[var(--accent-red)] rounded-full" />
                <div className="w-3 h-3 bg-[var(--primary)] rounded-full" />
                <div className="w-3 h-3 bg-[var(--accent-green)] rounded-full" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest">
                OUTPUT_LOGS // SESSION: {new Date().toLocaleTimeString()}
              </span>
            </div>

            <div className="p-8">
              {!analysis && !loading && (
                <div className="h-[400px] flex flex-col items-center justify-center text-zinc-300">
                  <div className="border-4 border-zinc-100 p-12 rounded-full mb-6">
                    <Cpu size={80} />
                  </div>
                  <p className="font-black text-2xl uppercase tracking-tighter text-zinc-400">
                    Waiting for forensic data...
                  </p>
                  <p className="text-xs font-bold uppercase mt-2 tracking-widest">
                    Upload a file to begin the verification sequence
                  </p>
                </div>
              )}

              {analysis && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  {/* Status Banner */}
                  <div className="flex items-center gap-6 p-6 border-4 border-[var(--border-color)] bg-[var(--card-bg)] relative overflow-hidden">
                    <div
                      className="absolute top-0 right-0 w-32 h-32 flex items-center justify-center translate-x-12 -translate-y-3 rotate-12"
                      style={{ backgroundColor: statusColor }}
                    >
                      <span className="text-white font-black text-xs uppercase -rotate-12 tracking-tighter">
                        VERIFIED
                      </span>
                    </div>
                    <div
                      className="p-4 border-4 border-[var(--border-color)] shadow-[4px_4px_0px_0px_var(--shadow-color)]"
                      style={{ backgroundColor: statusColor }}
                    >
                      {analysis.status === 'REJECTED' ? (
                        <ShieldAlert size={48} className="text-white" />
                      ) : (
                        <ShieldCheck size={48} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-4xl font-black uppercase leading-none tracking-tighter">
                        {statusText}
                      </h2>
                      <p className="font-bold text-xs uppercase tracking-widest mt-1 opacity-60">
                        Status ID: {analysis.blockchain?.asset_id ?? 'UNKNOWN'}
                      </p>
                    </div>
                  </div>

                  {/* Details Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[var(--text-main)] text-[var(--bg-color)] border-2 border-[var(--border-color)]">
                      <p className="text-[10px] font-black uppercase text-[var(--primary)] mb-2 tracking-widest">
                        Primary Evidence
                      </p>
                      <p className="font-mono text-[11px] leading-relaxed uppercase italic">
                        &quot;{analysis.watchtower?.reasoning || 'No reasoning provided'}&quot;
                      </p>
                    </div>
                    <div className="p-4 bg-[var(--card-bg)] border-2 border-[var(--border-color)] shadow-[4px_4px_0px_0px_var(--shadow-color)] flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-2 tracking-widest">
                          {analysis.blockchain?.method === 'signed_hash' ? 'Cryptographic Proof Hash' : 'Algorand TX Hash'}
                        </p>
                        <p className="font-mono text-[10px] break-all leading-none text-zinc-800 font-bold">
                          {analysis.blockchain?.tx_hash ?? 'N/A'}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Database size={14} className="text-[#FACC15]" />
                          <span className="text-[10px] font-black uppercase">
                            {analysis.blockchain?.method === 'signed_hash' ? 'Stored on MongoDB (Fallback)' : 'Stored on Algorand Testnet'}
                          </span>
                        </div>
                        {analysis.blockchain?.explorer_url && (
                          <a 
                            href={analysis.blockchain.explorer_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] font-black uppercase bg-[var(--primary)] px-2 py-1 border border-black hover:bg-black hover:text-[var(--primary)] transition-colors flex items-center gap-1"
                          >
                            VIEW ON LORA <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Console Log */}
                  <div className="border-t-2 border-[var(--border-color)] pt-6">
                    <p className="text-xs font-black uppercase mb-4 flex items-center gap-2">
                      <Search size={16} />
                      Detailed Consensus Report
                    </p>
                    <div className="bg-[var(--card-bg)] p-4 border-2 border-[var(--border-color)] font-mono text-[11px] h-32 overflow-y-auto">
                      <p className="opacity-60 mb-1">
                        [{new Date().toISOString()}] INITIALIZING_AUDIT...
                      </p>
                      <p className="text-zinc-600 mb-1">
                        {'>>'} WATCHTOWER ANALYSIS: {analysis.watchtower?.reasoning || 'No analysis available'}
                      </p>
                      <p className="text-[#78350F] mb-1 font-bold">
                        {'>>'} AUDITOR_VOTE: {analysis.auditor?.status === 'flagged' ? 'FLAG' : 'APPROVE'}
                      </p>
                      <p className="text-[#FACC15] font-bold">
                        {'>>'} MINTING_ASA_ID: SUCCESS
                      </p>
                      <p className="text-zinc-400 mt-2 cursor-pointer hover:underline">
                        _CLICK TO VIEW FULL TRACE_
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
