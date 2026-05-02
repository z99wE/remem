'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { scenarios } from '@/lib/demo-scenarios';
import { SharedFooter } from '@/components/SharedFooter';
import Link from 'next/link';

export default function RestoreDemoPage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [showOutput, setShowOutput] = useState(false);

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setShowOutput(false);
    // Simulate instant processing
    setTimeout(() => setShowOutput(true), 800);
  };

  const currentScenario = scenarios.find(s => s.id === selectedScenario);

  return (
    <div className="min-h-screen bg-white text-[#00C853] font-medium flex flex-col items-center w-full">
      <Navigation />

      <main className="w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#00C853] text-white border-b-8 border-[#00C853] w-full flex items-center justify-center text-center">
          <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
            <div className="h-4 w-64 bg-[#2D4CC8] mb-12" />
            <h1 className="font-black mb-10 leading-none uppercase text-white text-center" style={{ fontSize: 'clamp(3rem, 12vw, 9rem)', letterSpacing: '-0.04em' }}>
              RESTORE<br />
              <span className="text-[#D94A3D]">DEMO</span>
            </h1>
            <div className="h-4 w-64 bg-[#2D4CC8] mb-12" />
            <p className="font-bold text-gray-200 max-w-4xl mx-auto text-2xl leading-relaxed uppercase tracking-tight text-center">
              See cognitive reconstruction in action. Click a scenario to instantly restore engineering context.
            </p>
          </div>
        </section>

        {/* Scenario Selection */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center" style={{ backgroundColor: '#F4C430' }}>
          <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
            <h2 className="font-black mb-16 uppercase text-center leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
              CHOOSE A<br />SCENARIO
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full place-items-center">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioClick(scenario.id)}
                  className={`text-center flex flex-col items-center bg-[#2D4CC8] text-white border-4 border-white p-10 transition-all hover:-translate-y-2 w-full ${
                    selectedScenario === scenario.id ? 'ring-8 ring-[#F4C430]' : ''
                  }`}
                  style={{ boxShadow: '12px 12px 0px rgba(217, 74, 61, 1)' }}
                >
                  <div className="w-20 h-20 bg-white text-[#2D4CC8] border-4 border-white flex items-center justify-center font-black text-3xl mb-8">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-black text-2xl uppercase leading-tight mb-6">{scenario.title}</h3>
                  <p className="text-white font-bold leading-relaxed uppercase tracking-tighter mb-8 text-center opacity-90">
                    {scenario.description}
                  </p>
                  <div className="mt-auto pt-6 border-t-4 border-white w-full">
                    <span className="text-lg font-black uppercase text-[#F4C430] group-hover:text-white transition-colors">
                      RESTORE NOW
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Interface */}
        {selectedScenario && currentScenario && (
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y-8 border-[#00C853] w-full flex items-center justify-center">
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full place-items-center">
                {/* Input Panel */}
                <div className="flex flex-col items-center w-full">
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="bg-[#D94A3D] text-white px-8 py-3 font-black text-lg border-4 border-[#00C853] uppercase shadow-[6px_6px_0px_rgba(0,200,83,1)]">
                      INPUT
                    </div>
                    <h3 className="font-black text-3xl uppercase tracking-tighter text-center">Fragmented Chaos</h3>
                  </div>
                  <div className="bg-[#00C853] border-4 border-[#00C853] p-8 h-[600px] w-full overflow-y-auto shadow-[12px_12px_0px_rgba(217,74,61,1)] flex flex-col items-center text-center">
                    <div className="font-mono text-sm sm:text-base text-[#2D4CC8] whitespace-pre-wrap leading-relaxed w-full text-center">
                      {currentScenario.inputContent}
                    </div>
                  </div>
                </div>

                {/* Output Panel */}
                <div className="flex flex-col items-center w-full">
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="bg-[#2D4CC8] text-white px-8 py-3 font-black text-lg border-4 border-[#00C853] uppercase shadow-[6px_6px_0px_rgba(0,200,83,1)]">
                      OUTPUT
                    </div>
                    <h3 className="font-black text-3xl uppercase tracking-tighter text-center">Reconstructed State</h3>
                  </div>
                  
                  {!showOutput ? (
                    <div className="bg-[#00C853] border-4 border-[#00C853] p-8 h-[600px] w-full flex flex-col items-center justify-center shadow-[12px_12px_0px_rgba(45,76,200,1)]">
                      <div className="text-center">
                        <div className="text-[#F4C430] font-mono text-2xl mb-8 animate-pulse uppercase font-black">
                          RECONSTRUCTING<br />COGNITIVE STATE...
                        </div>
                        <div className="flex justify-center gap-4">
                          <div className="w-6 h-6 bg-[#D94A3D] animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-6 h-6 bg-[#2D4CC8] animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-6 h-6 bg-[#F4C430] animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#00C853] border-4 border-[#00C853] p-8 h-[600px] w-full overflow-y-auto shadow-[12px_12px_0px_rgba(45,76,200,1)]">
                      <div className="space-y-10">
                        {/* Recovery Score */}
                        <div className="border-4 border-[#2D4CC8] p-6 text-center">
                          <div className="text-[#2D4CC8] font-black text-sm mb-4 uppercase tracking-widest">RECOVERY SCORE</div>
                          <div className="flex flex-col items-center gap-4">
                            <div className="text-white font-black text-6xl italic">{currentScenario.output.recoveryScore}%</div>
                            <div className="w-full h-6 bg-gray-900 border-2 border-white">
                              <div 
                                className="h-full bg-[#2D4CC8]" 
                                style={{ width: `${currentScenario.output.recoveryScore}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Courtroom Elements - Centered */}
                        <div className="space-y-12">
                          <div className="border-t-4 border-[#D94A3D] pt-6 text-center">
                            <div className="text-[#D94A3D] font-black text-xl mb-4 uppercase italic">PROSECUTOR</div>
                            <div className="space-y-3">
                              {currentScenario.output.prosecutor.map((point, i) => (
                                <div key={i} className="text-gray-300 font-bold uppercase tracking-tight text-sm text-center">
                                  [{i+1}] {point}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="border-t-4 border-[#2D4CC8] pt-6 text-center">
                            <div className="text-[#2D4CC8] font-black text-xl mb-4 uppercase italic">DEFENSE</div>
                            <div className="space-y-3">
                              {currentScenario.output.defense.map((point, i) => (
                                <div key={i} className="text-gray-300 font-bold uppercase tracking-tight text-sm text-center">
                                  [{i+1}] {point}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white p-6 border-4 border-[#F4C430] text-center text-[#00C853]">
                            <div className="text-[#00C853] font-black text-xl mb-4 uppercase">JUDGE VERDICT</div>
                            <div className="font-black text-xl mb-4 uppercase leading-tight italic">&quot;{currentScenario.output.judge.verdict}&quot;</div>
                            <div className="text-gray-800 font-bold uppercase text-sm border-t-2 border-[#00C853] pt-4 text-center">
                              <span className="text-[#D94A3D] font-black">RECOMMENDATION:</span><br />
                              {currentScenario.output.judge.recommendation}
                            </div>
                          </div>
                        </div>

                        {/* Next Actions */}
                        <div className="border-4 border-white p-6 text-center">
                          <div className="text-white font-black text-xl mb-6 uppercase tracking-widest bg-[#00C853] inline-block px-4">NEXT ACTIONS</div>
                          <div className="space-y-4">
                            {currentScenario.output.nextActions.map((action, i) => (
                              <div key={i} className="text-[#F4C430] font-black uppercase text-sm leading-relaxed text-center">
                                {i + 1}. {action}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Forensic Breakdown Section */}
        {showOutput && currentScenario && (
          <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center" style={{ backgroundColor: '#2D4CC8' }}>
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
              <h2 className="font-black text-white mb-16 uppercase text-center leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
                FORENSIC<br />BREAKDOWN
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full place-items-center">
                <div className="bg-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center w-full" style={{ boxShadow: '12px 12px 0px rgba(0, 200, 83, 1)' }}>
                  <div className="w-20 h-20 bg-[#00C853] text-white flex items-center justify-center mb-8">
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: '15px solid transparent',
                      borderRight: '15px solid transparent',
                      borderBottom: '25px solid white',
                    }} />
                  </div>
                  <h3 className="font-black text-2xl mb-6 uppercase">COGNITIVE<br />COURTROOM</h3>
                  <p className="text-gray-800 font-bold leading-relaxed uppercase tracking-tighter text-center">
                    Three AI agents debated your debugging session to extract truth from chaos.
                  </p>
                </div>

                <div className="bg-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center w-full" style={{ boxShadow: '12px 12px 0px rgba(0, 200, 83, 1)' }}>
                  <div className="w-20 h-20 bg-[#D94A3D] text-white flex items-center justify-center mb-8">
                    <div className="w-10 h-10 border-4 border-white rounded-full" />
                  </div>
                  <h3 className="font-black text-2xl mb-6 uppercase">THREAD<br />DETECTION</h3>
                  <p className="text-gray-800 font-bold leading-relaxed uppercase tracking-tighter text-center">
                    Identified {currentScenario.output.activeThreads.length} active reasoning threads from fragmented input.
                  </p>
                </div>

                <div className="bg-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center w-full" style={{ boxShadow: '12px 12px 0px rgba(0, 200, 83, 1)' }}>
                  <div className="w-20 h-20 bg-[#F4C430] text-[#00C853] flex items-center justify-center mb-8">
                    <div className="w-10 h-10 border-4 border-[#00C853]" />
                  </div>
                  <h3 className="font-black text-2xl mb-6 uppercase">RECOVERY<br />SCORE</h3>
                  <p className="text-gray-800 font-bold leading-relaxed uppercase tracking-tighter text-center">
                    {currentScenario.output.recoveryScore}% of your cognitive state successfully reconstructed.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-center w-full flex items-center justify-center border-t-8 border-[#00C853]" style={{ backgroundColor: '#F4C430' }}>
          <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
            <h2 className="font-black mb-12 uppercase leading-none text-center" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
              READY TO<br /><span className="bg-[#00C853] text-white px-4">RESTORE</span><br />YOUR CONTEXT?
            </h2>
            <p className="text-2xl font-black mb-16 text-gray-900 uppercase tracking-tight max-w-3xl text-center">
              This is just a demo. The real power comes from your actual debugging sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full">
              <Link
                href="/"
                className="group relative bg-[#D94A3D] text-white font-black py-8 px-16 border-4 border-[#00C853] uppercase tracking-widest text-2xl hover:-translate-y-2 transition-all w-full sm:w-auto text-center"
                style={{ boxShadow: '12px 12px 0px rgba(0, 200, 83, 1)' }}
              >
                <span className="relative z-10">REMIT NOW</span>
                <div className="absolute inset-0 bg-[#2D4CC8] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/how-remem-works"
                className="bg-[#00C853] text-white font-black py-8 px-16 border-4 border-[#00C853] uppercase tracking-widest text-2xl hover:-translate-y-2 transition-all w-full sm:w-auto text-center"
                style={{ boxShadow: '12px 12px 0px rgba(45, 76, 200, 1)' }}
              >
                HOW IT WORKS
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter subtitle="Demo Completed. Reality Restored." />
    </div>
  );
}
