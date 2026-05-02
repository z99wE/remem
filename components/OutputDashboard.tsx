'use client';

import React, { useState } from 'react';
import { Scale, Gavel, MessageSquare, Copy, Check, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { AnalysisResult } from '@/types';
import { copyAgenticIDEExport, downloadAgenticIDEExport } from '@/lib/export';
import { RememWordmark } from './RememWordmark';
import { SharedFooter } from './SharedFooter';

interface OutputDashboardProps {
  result: AnalysisResult;
  onNewSession: () => void;
}

export const OutputDashboard: React.FC<OutputDashboardProps> = ({ result, onNewSession }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    insights: true,
    recommendations: true,
    nextActions: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCopyForAI = async () => {
    setCopyStatus('copying');
    const success = await copyAgenticIDEExport(result);
    
    if (success) {
      setCopyStatus('success');
      setShowCopyFeedback(true);
      setTimeout(() => {
        setCopyStatus('idle');
        setShowCopyFeedback(false);
      }, 3000);
    } else {
      setCopyStatus('error');
      setShowCopyFeedback(true);
      setTimeout(() => {
        setCopyStatus('idle');
        setShowCopyFeedback(false);
      }, 3000);
    }
  };

  const handleDownloadForAI = () => {
    downloadAgenticIDEExport(result);
  };

  return (
    <div className="min-h-screen bg-white text-[#00C853] font-medium flex flex-col items-center w-full">
      {/* Header */}
      <nav className="border-b-4 border-[#00C853] px-4 sm:px-6 lg:px-8 py-6 bg-[#2D4CC8] sticky top-0 z-50 w-full flex justify-center shadow-[0px_4px_0px_rgba(0,200,83,1)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6 w-full text-center">
          <div className="bg-white px-4 py-2 border-2 border-[#00C853] transform -rotate-1">
            <RememWordmark />
          </div>
          <div className="flex gap-4">
            <button
              onClick={onNewSession}
              className="bg-[#D94A3D] text-white font-black py-2 px-6 border-2 border-[#00C853] uppercase tracking-widest hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(0,200,83,1)] text-sm"
            >
              NEW SESSION
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 w-full">
          {[
            { id: 'overview', label: 'OVERVIEW', color: '#F4C430' },
            { id: 'prosecutor', label: 'PROSECUTOR', color: '#D94A3D', textColor: 'white' },
            { id: 'defense', label: 'DEFENSE', color: '#2D4CC8', textColor: 'white' },
            { id: 'judge', label: 'JUDGE', color: '#F4C430' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-black py-4 px-8 border-4 border-[#00C853] uppercase tracking-widest transition-all hover:-translate-y-1 text-base sm:text-lg ${
                activeTab === tab.id
                  ? 'shadow-none translate-y-1'
                  : 'shadow-[6px_6px_0px_rgba(0,200,83,1)]'
              }`}
              style={{ 
                backgroundColor: activeTab === tab.id ? tab.color : 'white',
                color: activeTab === tab.id && tab.textColor ? tab.textColor : '#00C853'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on activeTab */}
        <div className="w-full">
          {activeTab === 'overview' && (
            <div className="space-y-16 flex flex-col items-center">
              {/* Recovery Score Hero */}
              <div className="bg-[#2D4CC8] border-8 border-[#00C853] p-12 sm:p-20 w-full flex flex-col items-center text-center shadow-[20px_20px_0px_#F4C430]">
                <h2 className="font-black text-white mb-8 uppercase tracking-tighter" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                  COGNITIVE RECOVERY SCORE
                </h2>
                <div className="font-black text-white leading-none mb-8" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}>
                  {result.recoveryScore.overall}
                  <span className="text-4xl sm:text-6xl text-[#F4C430]">/100</span>
                </div>
                <p className="font-bold text-white uppercase tracking-widest max-w-2xl text-xl opacity-90">
                  MENTAL CONTEXT RECONSTRUCTION COMPLETE.
                </p>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="bg-[#F4C430] border-4 border-[#00C853] p-10 flex flex-col items-center text-center shadow-[8px_8px_0px_rgba(0,200,83,1)]">
                  <div className="font-black mb-4 text-7xl">{result.recoveryScore.threadClarity}</div>
                  <div className="font-black uppercase mb-4 text-2xl tracking-tighter">CLARITY</div>
                  <p className="text-sm font-bold uppercase leading-tight">LOGICAL COHERENCE OF RECONSTRUCTED FRAGMENTS.</p>
                </div>
                <div className="bg-[#D94A3D] text-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center shadow-[8px_8px_0px_rgba(0,200,83,1)]">
                  <div className="font-black mb-4 text-7xl">{result.recoveryScore.contextCompleteness}</div>
                  <div className="font-black uppercase mb-4 text-2xl tracking-tighter">DEPTH</div>
                  <p className="text-sm font-bold uppercase leading-tight">COVERAGE OF ESSENTIAL DEPENDENCIES AND STATE.</p>
                </div>
                <div className="bg-[#2D4CC8] text-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center shadow-[8px_8px_0px_rgba(0,200,83,1)]">
                  <div className="font-black mb-4 text-7xl">{result.recoveryScore.actionability}</div>
                  <div className="font-black uppercase mb-4 text-2xl tracking-tighter">MOMENTUM</div>
                  <p className="text-sm font-bold uppercase leading-tight">IMMEDIATE READINESS FOR CONTINUED EXECUTION.</p>
                </div>
              </div>

              {/* Export Section */}
              <div className="bg-[#00C853] text-white border-8 border-[#00C853] p-12 sm:p-16 w-full flex flex-col items-center text-center shadow-[16px_16px_0px_#D94A3D]">
                <h3 className="font-black mb-8 uppercase tracking-tighter text-4xl sm:text-5xl">INJECT CONTEXT INTO AI AGENT</h3>
                <p className="font-bold mb-12 uppercase tracking-widest max-w-3xl text-lg opacity-80">
                  Optimized markdown payload for Cursor, Windsurf, or Copilot.
                </p>
                <div className="flex flex-col lg:flex-row gap-8 w-full justify-center items-center">
                  <button
                    onClick={handleCopyForAI}
                    className="bg-[#F4C430] text-[#00C853] font-black py-6 px-8 border-4 border-[#00C853] uppercase tracking-widest text-lg hover:-translate-y-1 transition-all shadow-[8px_8px_0px_white] w-full max-w-[300px]"
                  >
                    {copyStatus === 'success' ? 'COPIED TO CLIPBOARD' : 'COPY PAYLOAD'}
                  </button>
                  <button
                    onClick={handleDownloadForAI}
                    className="bg-white text-[#00C853] font-black py-6 px-8 border-4 border-[#00C853] uppercase tracking-widest text-lg hover:-translate-y-1 transition-all shadow-[8px_8px_0px_#2D4CC8] w-full max-w-[300px]"
                  >
                    DOWNLOAD .MD
                  </button>
                  <button
                    onClick={() => {
                      import('@/lib/export').then(m => m.exportAsPDF(result));
                    }}
                    className="bg-[#D94A3D] text-white font-black py-6 px-8 border-4 border-[#00C853] uppercase tracking-widest text-lg hover:-translate-y-1 transition-all shadow-[8px_8px_0px_#F4C430] w-full max-w-[300px]"
                  >
                    DOWNLOAD HTML
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prosecutor' && (
            <div className="bg-[#D94A3D] text-white border-8 border-[#00C853] p-12 sm:p-20 w-full flex flex-col items-center shadow-[20px_20px_0px_rgba(0,200,83,1)]">
              <h2 className="font-black mb-12 uppercase tracking-tighter text-center" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>THE PROSECUTOR</h2>
              <div className="bg-white text-[#00C853] border-4 border-[#00C853] p-12 w-full max-w-4xl shadow-[12px_12px_0px_#F4C430]">
                <h3 className="font-black mb-8 uppercase text-3xl border-b-4 border-[#00C853] pb-4 tracking-widest text-center">CRITICAL GAPS IDENTIFIED</h3>
                <ul className="space-y-8">
                  {result.prosecutorDefense.prosecutor.issues.map((issue, idx) => (
                    <li key={idx} className="flex flex-col items-center text-center gap-4">
                      <span className="font-black text-4xl text-[#D94A3D] flex-shrink-0">/</span>
                      <span className="font-black uppercase text-xl leading-none">{issue}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-8 border-t-4 border-[#00C853] flex flex-col items-center gap-4 text-center">
                  <span className="font-black text-2xl uppercase tracking-widest">SEVERITY LEVEL</span>
                  <span className="bg-[#D94A3D] text-white px-6 py-2 font-black text-2xl border-2 border-[#00C853] uppercase">{result.prosecutorDefense.prosecutor.severity}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'defense' && (
            <div className="bg-[#2D4CC8] text-white border-8 border-[#00C853] p-12 sm:p-20 w-full flex flex-col items-center shadow-[20px_20px_0px_rgba(0,200,83,1)]">
              <h2 className="font-black mb-12 uppercase tracking-tighter text-center" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>THE DEFENSE</h2>
              <div className="bg-white text-[#00C853] border-4 border-[#00C853] p-12 w-full max-w-4xl shadow-[12px_12px_0px_#D94A3D]">
                <h3 className="font-black mb-8 uppercase text-3xl border-b-4 border-[#00C853] pb-4 tracking-widest text-center">STRENGTHS PRESERVED</h3>
                <ul className="space-y-8">
                  {result.prosecutorDefense.defense.reasons.map((reason, idx) => (
                    <li key={idx} className="flex flex-col items-center text-center gap-4">
                      <span className="font-black text-4xl text-[#2D4CC8] flex-shrink-0">+</span>
                      <span className="font-black uppercase text-xl leading-none">{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-8 border-t-4 border-[#00C853] flex flex-col items-center gap-4 text-center">
                  <span className="font-black text-2xl uppercase tracking-widest">RELIABILITY</span>
                  <span className="bg-[#2D4CC8] text-white px-6 py-2 font-black text-2xl border-2 border-[#00C853] uppercase">{result.prosecutorDefense.defense.context}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'judge' && (
            <div className="bg-[#F4C430] border-8 border-[#00C853] p-12 sm:p-20 w-full flex flex-col items-center shadow-[20px_20px_0px_rgba(0,200,83,1)]">
              <h2 className="font-black mb-12 uppercase tracking-tighter text-center" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>THE VERDICT</h2>
              <div className="bg-white border-4 border-[#00C853] p-12 w-full max-w-4xl shadow-[12px_12px_0px_#2D4CC8]">
                <div className="space-y-16">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-[#00C853] text-white px-8 py-3 font-black text-2xl uppercase tracking-widest mb-6">FINAL VERDICT</div>
                    <p className="font-black uppercase text-3xl leading-tight">{result.prosecutorDefense.judge.verdict}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t-4 border-[#00C853]">
                    <div className="flex flex-col items-center text-center">
                      <div className="font-black text-[#2D4CC8] text-sm uppercase tracking-widest mb-4">KEY INSIGHT</div>
                      <p className="font-bold uppercase text-lg leading-tight">{result.prosecutorDefense.judge.keyInsight}</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="font-black text-[#D94A3D] text-sm uppercase tracking-widest mb-4">RECOMMENDATION</div>
                      <p className="font-bold uppercase text-lg leading-tight">{result.prosecutorDefense.judge.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Next Actions (Always Visible) */}
        {result.nextActions && result.nextActions.length > 0 && activeTab === 'overview' && (
          <div className="mt-24 w-full flex flex-col items-center">
            <h3 className="font-black uppercase text-5xl mb-12 tracking-tighter text-center">STRATEGIC NEXT STEPS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {result.nextActions.map((action, idx) => (
                <div key={idx} className="bg-white border-8 border-[#00C853] p-10 flex flex-col items-center text-center shadow-[12px_12px_0px_rgba(0,200,83,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <div className="w-16 h-16 bg-[#00C853] text-white flex items-center justify-center font-black text-3xl mb-8 transform rotate-3">{idx + 1}</div>
                  <h4 className="font-black uppercase text-2xl mb-8 leading-tight tracking-tighter min-h-[5rem] flex items-center justify-center px-4">{action.action}</h4>
                  <div className="flex gap-12 w-full justify-center pt-8 border-t-4 border-[#00C853]">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">PRIORITY</span>
                      <span className="font-black text-4xl text-[#D94A3D]">{action.priority}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">CONFIDENCE</span>
                      <span className="font-black text-4xl text-[#2D4CC8]">{action.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SharedFooter />
    </div>
  );
};
