import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SharedFooter } from '@/components/SharedFooter';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#00C853] font-medium flex flex-col items-center w-full">
      <Navigation />
      
      <main className="pt-48 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full flex flex-col items-center">
        {/* Bauhaus Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F4C430] opacity-5 -z-10" />
        <div className="absolute top-40 left-10 w-24 h-24 border-8 border-[#D94A3D] rounded-full opacity-20 -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
          <div className="text-center mb-20">
            <h1 className="font-black text-[#00C853] mb-8 leading-none uppercase text-center" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '-0.04em' }}>
              ABOUT<br />
              <span className="bg-[#D94A3D] text-white px-6 py-2 inline-block transform -rotate-1">REMEM</span>
            </h1>
            <div className="h-4 w-64 bg-[#00C853] mx-auto mb-12" />
            <p className="text-2xl sm:text-3xl font-black max-w-4xl mx-auto leading-tight uppercase tracking-tighter">
              The world's first AI-powered cognitive restoration engine designed for the fragmented reality of modern engineering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mb-24 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#F4C430] border-4 border-[#00C853] transition-transform group-hover:translate-x-2 group-hover:translate-y-2 -z-10" />
              <div className="bg-white border-4 border-[#00C853] p-10 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#00C853] text-[#F4C430] flex items-center justify-center font-black text-2xl mb-8 border-4 border-[#00C853]">01</div>
                <h2 className="font-black text-2xl sm:text-3xl mb-6 uppercase leading-tight">OUR<br />MISSION</h2>
                <p className="text-lg font-bold leading-relaxed text-gray-800 uppercase tracking-tight">
                  To eliminate the "context switch tax" that costs developers hours of deep focus every day.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-[#2D4CC8] border-4 border-[#00C853] transition-transform group-hover:translate-x-2 group-hover:translate-y-2 -z-10" />
              <div className="bg-white border-4 border-[#00C853] p-10 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#00C853] text-[#2D4CC8] flex items-center justify-center font-black text-2xl mb-8 border-4 border-[#00C853]">02</div>
                <h2 className="font-black text-2xl sm:text-3xl mb-6 uppercase leading-tight">OUR<br />TECH</h2>
                <p className="text-lg font-bold leading-relaxed text-gray-800 uppercase tracking-tight">
                  State-of-the-art Large Language Models and proprietary cognitive mapping algorithms.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full border-t-8 border-[#00C853] pt-20 mb-24">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <h2 className="font-black text-4xl sm:text-5xl mb-12 uppercase leading-none italic">WHY WE BUILT THIS</h2>
              <div className="space-y-12 text-xl font-bold leading-relaxed text-gray-900 uppercase tracking-tight">
                <p>
                  Software development has become a game of juggling 50 things at once. Slack, PRs, standups, and complex debugging all fight for your memory.
                </p>
                <div className="py-12 px-12 bg-[#00C853] text-white border-4 border-[#F4C430] flex flex-col items-center">
                  <p className="max-w-2xl">
                    When you get interrupted, you don't just lose time—you lose the specific, intricate mental model you built of the problem.
                  </p>
                </div>
                <p>
                  Remem acts as an external cache for your brain, allowing you to "Rememit" back into the exact thought process you had before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SharedFooter subtitle="Engineering Continuity, Reconstructed." />
    </div>
  );
}
