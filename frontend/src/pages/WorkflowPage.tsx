import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, BrainCircuit, ShieldCheck, Link2 } from 'lucide-react';

const WorkflowPage = () => {
  const steps = [
    {
      id: 1,
      title: 'UPLOAD & FINGERPRINT',
      icon: Fingerprint,
      description: 'Media is ingested through the Drag & Drop module. A unique SHA-256 cryptographic hash is generated instantly to serve as the asset identifier.',
      color: 'var(--primary)'
    },
    {
      id: 2,
      title: 'FORENSIC AI ANALYSIS',
      icon: BrainCircuit,
      description: 'The Watchtower AI Agent analyzes the content for IP violations, deepfakes, and copyright infringement using deep vision models.',
      color: 'var(--accent-red)'
    },
    {
      id: 3,
      title: 'AUDITOR CONSENSUS',
      icon: ShieldCheck,
      description: 'The Auditor Agent reviews the AI confidence scores and performs cross-reference checks against the global registry.',
      color: 'var(--accent-green)'
    },
    {
      id: 4,
      title: 'BLOCKCHAIN MINTING',
      icon: Link2,
      description: 'Upon verification, the Treasurer Agent mints an Algorand Standard Asset (ASA) embedding the forensic data immutably.',
      color: 'var(--secondary)'
    }
  ];

  return (
    <div className="page-wrapper min-h-screen">
      <div className="mb-16">
        <h1 className="text-6xl font-black uppercase leading-tight tracking-tighter">
          SYSTEM <span style={{ color: 'var(--primary)' }}>WORKFLOW</span>
        </h1>
        <p className="mt-2 font-bold uppercase tracking-widest text-sm opacity-60">
          UNDERSTANDING THE AEGISNET-X DECENTRALIZED PIPELINE
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div 
          className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-2 -translate-x-1/2" 
          style={{ backgroundColor: 'var(--border-color)' }}
        />

        <div className="space-y-16">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Connector Node */}
                <div 
                  className="absolute left-[24px] md:left-1/2 -translate-x-1/2 w-12 h-12 border-4 z-10 flex items-center justify-center font-black text-xl"
                  style={{ 
                    backgroundColor: step.color,
                    borderColor: 'var(--border-color)',
                    color: step.id === 4 ? '#fff' : 'var(--text-main)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {step.id}
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  <div className={`brutalist-card p-8 ${isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 border-2" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-color)' }}>
                        <step.icon size={28} style={{ color: step.color }} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">{step.title}</h3>
                    </div>
                    <p className="font-bold opacity-80 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowPage;
