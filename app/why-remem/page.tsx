'use client';

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SharedFooter } from '@/components/SharedFooter';
import Link from 'next/link';

export default function WhyRememPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full max-w-full flex flex-col items-center">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-64 pb-24 px-4 sm:px-6 lg:px-8 relative min-h-[70vh] flex items-center justify-center text-center bg-[#00C853] text-white w-full">
        
        <div className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
          <h1 className="font-black mb-10 leading-[0.9] uppercase text-white text-center" style={{ fontSize: 'clamp(2rem, 8vw, 6.4rem)', letterSpacing: '-0.03em' }}>
            YOUR BRAIN<br />
            WAS NEVER<br />
            DESIGNED FOR<br />
            <span className="inline-block px-5 py-2 sm:px-6 sm:py-3 bg-[#D94A3D] text-white mt-4 border-4 border-white">99 TABS.</span>
          </h1>
          <div className="h-2 w-48 bg-white mb-10" />
          <p className="font-bold text-white max-w-4xl leading-relaxed mx-auto uppercase tracking-tighter text-center" style={{ fontSize: 'clamp(1rem, 2.4vw, 2rem)' }}>
            Developers don&apos;t lose code.<br />
            They lose context.
          </p>
          <div className="mt-12 flex justify-center w-full">
            <Link
              href="/restore-demo"
              className="group relative bg-[#D94A3D] text-white font-black py-6 px-12 border-4 border-white uppercase tracking-widest text-xl transition-all hover:-translate-y-2 w-full sm:w-auto text-center"
              style={{ boxShadow: '8px 8px 0px rgba(255, 255, 255, 1)' }}
            >
              <span className="relative z-10">SEE DEMO</span>
              <div className="absolute inset-0 bg-[#2D4CC8] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                SEE DEMO
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full flex items-center justify-center" style={{ backgroundColor: '#D94A3D' }}>
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <h2 className="font-black text-white mb-16 uppercase leading-tight text-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            THE REAL PROBLEM
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full place-items-center">
            {[
              { shape: 'circle', title: 'Cognitive Overload', color: '#F4C430', desc: 'Working memory is limited. Modern dev is unlimited chaos.' },
              { shape: 'square', title: 'Fragmented AI', color: '#2D4CC8', desc: 'Your AI assistants lose context between every single session.' },
              { shape: 'triangle', title: 'Interruption Fatigue', color: '#00C853', desc: 'Context switches destroy hours of carefully built mental state.' },
              { shape: 'circle', title: 'Memory Loss', color: '#FFFFFF', desc: 'You spend half your day re-investigating what you already knew.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#00C853] text-white border-4 border-white p-10 flex flex-col items-center text-center w-full" style={{ boxShadow: '12px 12px 0px rgba(255, 255, 255, 1)' }}>
                <div className="w-20 h-20 border-4 border-white flex items-center justify-center mb-8" style={{ backgroundColor: item.color }}>
                  {item.shape === 'circle' && <div className="w-10 h-10 rounded-full bg-white border-2 border-[#00C853]" />}
                  {item.shape === 'square' && <div className="w-10 h-10 bg-white border-2 border-[#00C853]" />}
                  {item.shape === 'triangle' && (
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: '15px solid transparent',
                      borderRight: '15px solid transparent',
                      borderBottom: '25px solid white',
                    }} />
                  )}
                </div>
                <h3 className="font-black text-2xl mb-6 uppercase">{item.title}</h3>
                <p className="text-lg font-medium leading-relaxed text-gray-300 uppercase tracking-tighter text-center">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Chaos Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y-4 border-[#00C853] relative overflow-hidden w-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <h2 className="font-black mb-12 uppercase leading-tight text-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            FRAGMENTED TOOLS
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['CURSOR', 'CHATGPT', 'TERMINAL', 'GITHUB', 'SLACK'].map((tool, index) => (
              <div key={tool} className="bg-[#00C853] text-white font-black px-6 py-3 border-4 border-[#00C853] text-lg uppercase"
                style={{ color: index % 3 === 0 ? '#F4C430' : index % 3 === 1 ? '#D94A3D' : '#2D4CC8' }}>
                {tool}
              </div>
            ))}
          </div>
          
          <div className="bg-[#00C853] border-4 border-[#00C853] p-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center" style={{ boxShadow: '16px 16px 0px #D94A3D' }}>
            <p className="font-mono text-[#F4C430] text-lg sm:text-2xl mb-8 leading-relaxed text-center w-full">
              &quot;I know I solved this before...&quot;<br />
              &quot;Where did I put that error?&quot;<br />
              &quot;What was I even debugging?&quot;
            </p>
            <div className="h-1 w-full bg-[#D94A3D] mb-8" />
            <p className="text-white font-black text-3xl uppercase tracking-widest text-center">
              SOUND FAMILIAR?
            </p>
          </div>
        </div>
      </section>

      {/* The Real Cost Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative w-full flex items-center justify-center" style={{ backgroundColor: '#2D4CC8' }}>
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <h2 className="font-black text-white mb-16 uppercase leading-tight text-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            THE COST OF<br />SWITCHING
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full place-items-center">
            {[
              { shape: 'circle', title: 'Lost Reasoning', color: '#F4C430' },
              { shape: 'square', title: 'Forgotten Context', color: '#D94A3D' },
              { shape: 'triangle', title: 'AI Amnesia', color: '#FFFFFF' }
            ].map((item, i) => (
              <div key={i} className="bg-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center transition-all hover:-translate-y-2 w-full" style={{ boxShadow: '12px 12px 0px #00C853' }}>
                <div className="w-24 h-24 border-4 border-[#00C853] flex items-center justify-center mb-8" style={{ backgroundColor: item.color }}>
                  {item.shape === 'circle' && <div className="w-12 h-12 rounded-full bg-[#00C853]" />}
                  {item.shape === 'square' && <div className="w-12 h-12 bg-[#00C853]" />}
                  {item.shape === 'triangle' && (
                    <div style={{
                      width: 0,
                      height: 0,
                      borderLeft: '18px solid transparent',
                      borderRight: '18px solid transparent',
                      borderBottom: '30px solid #00C853',
                    }} />
                  )}
                </div>
                <h3 className="font-black text-2xl mb-4 uppercase">{item.title}</h3>
                <div className="h-1.5 w-12 bg-[#2D4CC8] mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#00C853] text-white border-t-4 border-white relative w-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <h2 className="font-black mb-12 uppercase leading-tight text-center" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            REMEM<br />RESTORES STATE.
          </h2>
          <div className="h-2 w-48 bg-[#2D4CC8] mb-12" />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full mb-20 place-items-center">
            {['WHAT YOU KNEW', 'WHAT YOU TRIED', 'WHAT YOU FOUND', 'WHERE YOU LEFT'].map((item) => (
              <div key={item} className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-[#2D4CC8] border-4 border-white flex items-center justify-center">
                  <div className="w-6 h-6 bg-white border-2 border-[#00C853]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-center">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border-4 border-white p-8 sm:p-12 w-full max-w-4xl mx-auto flex flex-col items-center text-center" style={{ boxShadow: '16px 16px 0px #F4C430' }}>
            <div className="space-y-8 w-full">
              <div className="flex flex-col items-center border-t-4 border-b-4 border-[#2D4CC8] py-8">
                <div className="font-black text-[#00C853] text-xl mb-3 uppercase">BEFORE:</div>
                <div className="text-gray-500 font-bold italic text-lg">&quot;What was I doing?&quot;</div>
              </div>
              <div className="flex flex-col items-center border-b-4 border-[#D94A3D] pb-8">
                <div className="font-black text-[#00C853] text-xl mb-3 uppercase">AFTER:</div>
                <div className="text-[#00C853] font-black text-lg uppercase">&quot;Right. Nginx timeout. Try load balancer next.&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 text-center relative w-full flex items-center justify-center" style={{ backgroundColor: '#F4C430' }}>
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <h2 className="font-black mb-12 uppercase leading-tight text-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
            START<br />RESTORING.
          </h2>
          <Link
            href="/restore-demo"
            className="group relative bg-[#D94A3D] text-white font-black py-8 px-16 border-4 border-[#00C853] uppercase tracking-widest text-2xl transition-all hover:-translate-y-2 w-full sm:w-auto text-center"
            style={{ boxShadow: '12px 12px 0px rgba(0, 200, 83, 1)' }}
          >
            <span className="relative z-10">SEE DEMO</span>
            <div className="absolute inset-0 bg-[#2D4CC8] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              SEE DEMO
            </span>
          </Link>
        </div>
      </section>

      <SharedFooter subtitle="Context isn't lost. It's just fragmented." />
    </div>
  );
}

// Made with Bob
