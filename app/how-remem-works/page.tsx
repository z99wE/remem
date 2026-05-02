'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SharedFooter } from '@/components/SharedFooter';
import Link from 'next/link';

export default function HowRememWorksPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full max-w-full flex flex-col items-center">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-4 sm:px-6 lg:px-8 relative min-h-[80vh] flex items-center justify-center text-center w-full overflow-hidden" style={{ backgroundColor: '#F4C430' }}>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">
          <h1 className="font-black mb-8 leading-none uppercase text-[#00C853] text-center" style={{ fontSize: 'clamp(3rem, 12vw, 9rem)', letterSpacing: '-0.05em' }}>
            HOW<br />
            REMEM<br />
            WORKS
          </h1>
          <div className="h-4 w-48 bg-[#00C853] mb-12" />
          <p className="font-black text-[#00C853] max-w-4xl leading-tight mx-auto uppercase tracking-tighter text-center" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
            A cognitive reconstruction engine that transforms fragmented chaos into engineering clarity.
          </p>
        </div>
      </section>

      {/* Section 1: Paste Your Chaos */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y-4 border-[#00C853] relative overflow-hidden w-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <div className="inline-block bg-[#00C853] text-[#F4C430] px-8 py-4 font-black text-sm mb-8 border-4 border-[#00C853] uppercase tracking-widest">
            STEP 01
          </div>
          <h2 className="font-black mb-10 uppercase leading-none text-center" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}>
            PASTE YOUR<br /><span className="text-[#D94A3D]">CHAOS</span>
          </h2>
          
          <div className="space-y-6 text-xl sm:text-2xl font-black text-[#00C853] uppercase tracking-tighter mb-16 flex flex-col items-center text-center w-full">
            {[
              'Terminal logs from failed deployments',
              'Scattered ChatGPT/Cursor prompts',
              'Fragmented TODO lists',
              'Stack traces and debugging notes',
              'Half-finished thoughts'
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-4 group transition-all hover:scale-105">
                <div className="w-4 h-4 bg-[#2D4CC8] border-2 border-[#00C853] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#00C853] border-4 border-[#00C853] p-6 sm:p-12 w-full max-w-4xl mx-auto transition-all hover:-translate-y-2 flex flex-col items-center text-center" style={{ boxShadow: '16px 16px 0px #2D4CC8' }}>
            <div className="font-mono text-[#F4C430] text-sm sm:text-lg space-y-4 w-full text-center">
              <div className="text-[#F4C430] mb-8 font-black border-b-4 border-gray-800 pb-4">$ cat debug_session.log</div>
              <div className="text-gray-500">// WebSocket keeps disconnecting...</div>
              <div className="text-[#D94A3D] font-black text-xl">Error: Connection timeout</div>
              <div className="text-gray-500">// TODO: check nginx config</div>
              <div className="text-[#F4C430] font-black text-xl">WARNING: Retry limit exceeded</div>
              <div className="text-gray-500">// Asked ChatGPT about this</div>
              <div className="text-[#2D4CC8] font-black text-xl">Maybe it&apos;s the load balancer?</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AI Reconstruction Engine */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative border-b-4 border-[#00C853] w-full flex items-center justify-center" style={{ backgroundColor: '#2D4CC8' }}>
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <div className="mb-24 text-center flex flex-col items-center">
            <div className="inline-block bg-white text-[#00C853] px-8 py-4 font-black text-sm mb-8 border-4 border-[#00C853] uppercase tracking-widest">
              STEP 02
            </div>
            <h2 className="font-black text-white mb-8 uppercase leading-none text-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
              AI RECONSTRUCTION<br />ENGINE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full place-items-center">
            {[
              { num: '01', title: 'Content Categorization', color: '#F4C430', desc: 'Identifies logs, prompts, errors, and notes.' },
              { num: '02', title: 'Thread Reconstruction', color: '#D94A3D', desc: 'Connects scattered thoughts into reasoning chains.' },
              { num: '03', title: 'Context Linking', color: '#FFFFFF', desc: 'Maps relationships between errors and solutions.' },
              { num: '04', title: 'Memory Recovery', numColor: '#F4C430', color: '#00C853', desc: 'Reconstructs your exact mental state.' }
            ].map((item, i) => (
              <div key={i} className="bg-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-2 h-full w-full" style={{ boxShadow: '12px 12px 0px #00C853' }}>
                <div className="w-16 h-16 border-4 border-[#00C853] flex items-center justify-center mb-8 shrink-0" style={{ backgroundColor: item.color }}>
                  <span className="font-black text-3xl" style={{ color: item.numColor || '#00C853' }}>{item.num}</span>
                </div>
                <h3 className="font-black text-2xl mb-6 uppercase transition-colors group-hover:text-[#2D4CC8] leading-tight">{item.title}</h3>
                <p className="text-lg font-bold text-[#00C853] uppercase tracking-tighter leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Cognitive Courtroom */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b-4 border-[#00C853] relative overflow-hidden w-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <div className="mb-20 flex flex-col items-center text-center">
            <div className="inline-block bg-[#00C853] text-[#F4C430] px-8 py-4 font-black text-sm mb-8 border-4 border-[#00C853] uppercase tracking-widest">
              STEP 03
            </div>
            <h2 className="font-black mb-8 uppercase leading-none text-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
              COGNITIVE<br />COURTROOM
            </h2>
            <p className="font-black text-[#00C853] max-w-4xl mx-auto text-2xl uppercase tracking-tighter leading-tight text-center">
              Three AI agents debate your debugging session to extract truth from chaos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full place-items-center">
            {[
              { type: 'square', title: 'Prosecutor', color: '#D94A3D', desc: 'CHALLENGES YOUR ASSUMPTIONS' },
              { type: 'circle', title: 'Defense', color: '#2D4CC8', desc: 'VALIDATES YOUR REASONING' },
              { type: 'triangle', title: 'Judge', color: '#F4C430', desc: 'SYNTHESIZES FINAL VERDICT' }
            ].map((agent, i) => (
              <div key={i} className="relative bg-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 h-full w-full" style={{ boxShadow: '12px 12px 0px #00C853' }}>
                <div className="w-20 h-20 border-4 border-[#00C853] flex items-center justify-center mb-8 shrink-0" style={{ backgroundColor: agent.color }}>
                  {agent.type === 'square' && <div className="w-10 h-10 bg-[#00C853]" />}
                  {agent.type === 'circle' && <div className="w-10 h-10 bg-[#00C853] rounded-full" />}
                  {agent.type === 'triangle' && (
                    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[32px] border-b-[#00C853]" />
                  )}
                </div>
                <h3 className="font-black text-2xl mb-6 uppercase leading-tight">{agent.title}</h3>
                <p className="font-black text-[#00C853] text-lg border-t-4 border-[#00C853] pt-4 uppercase leading-none mt-auto">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Restore Cognitive Continuity */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full flex items-center justify-center" style={{ backgroundColor: '#D94A3D' }}>
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <div className="inline-block bg-white text-[#00C853] px-8 py-4 font-black text-sm mb-8 border-4 border-[#00C853] uppercase tracking-widest">
            STEP 04
          </div>
          <h2 className="font-black text-white mb-12 uppercase leading-none text-center" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            RESTORE<br />CONTINUITY
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full mb-20 place-items-center">
            {[
              { t: 'Interruption Recovery', d: 'Resume exactly where you left off.' },
              { t: 'Stack Restoration', d: 'Rebuild your complete mental context.' },
              { t: 'Faster Debugging', d: 'Skip re-investigation.' },
              { t: 'Reduced Fatigue', d: 'Stop losing hours to context switches.' }
            ].map(item => (
              <div key={item.t} className="bg-white border-4 border-[#00C853] p-8 transition-all hover:scale-105 h-full w-full flex flex-col items-center justify-center text-center" style={{ boxShadow: '8px 8px 0px #00C853' }}>
                <h3 className="font-black text-xl mb-4 uppercase leading-tight">{item.t}</h3>
                <p className="text-[#00C853] font-bold uppercase tracking-tighter opacity-90 leading-tight">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#00C853] border-4 border-[#00C853] p-8 sm:p-12 w-full max-w-5xl mx-auto transition-all hover:-translate-y-2 flex flex-col items-center text-center" style={{ boxShadow: '16px 16px 0px #F4C430' }}>
            <div className="text-[#F4C430] font-mono space-y-8 w-full text-center">
              <div className="font-black text-3xl border-b-4 border-gray-800 pb-6 uppercase">RECONSTRUCTED STATE</div>
              <div className="flex flex-col items-center border-t-4 border-b-4 border-[#F4C430] py-8">
                <div className="text-white font-black text-xl mb-3 uppercase">WHAT YOU KNEW:</div>
                <div className="text-gray-400 font-bold uppercase text-lg">WebSocket timeout = nginx config issue</div>
              </div>
              <div className="flex flex-col items-center border-b-4 border-[#2D4CC8] pb-8">
                <div className="text-white font-black text-xl mb-3 uppercase">NEXT STEPS:</div>
                <div className="text-gray-400 font-bold uppercase text-lg">Check load balancer keepalive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#00C853] text-white text-center border-t-4 border-white w-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <h2 className="font-black mb-16 uppercase leading-none text-center" style={{ fontSize: 'clamp(2.5rem, 10vw, 8rem)' }}>
            READY TO<br /><span className="text-[#F4C430]">RESTORE</span>?
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full max-w-4xl">
            <Link
              href="/restore-demo"
              className="group relative bg-[#D94A3D] text-white font-black py-8 px-12 border-4 border-white uppercase tracking-widest text-2xl transition-all hover:-translate-y-2 w-full sm:w-auto text-center"
              style={{ boxShadow: '12px 12px 0px #FFFFFF' }}
            >
              <span className="relative z-10">REMIT NOW</span>
              <div className="absolute inset-0 bg-[#2D4CC8] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                REMIT NOW
              </span>
            </Link>
          </div>
        </div>
      </section>

      <SharedFooter subtitle="The science of cognitive restoration." />
    </div>
  );
}

// Made with Bob
