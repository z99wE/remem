'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from './Navigation';
import { SharedFooter } from './SharedFooter';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden w-full max-w-full">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Yellow Background */}
      <section className="pt-52 sm:pt-60 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 relative min-h-[80vh] flex items-center justify-center text-center w-full overflow-hidden" style={{ backgroundColor: '#F4C430' }}>


        <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">
          <div className="max-w-5xl w-full flex flex-col items-center">
            <h1 className="font-black mb-8 sm:mb-12 leading-[0.9] uppercase text-[#00C853] text-center" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.03em', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              READY TO<br />
              TRANSFORM<br />
              YOUR<br />
              <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#00C853] text-[#F4C430] mt-2 sm:mt-4">WORKFLOW?</span>
            </h1>
            <p className="font-bold mb-12 sm:mb-16 leading-relaxed text-[#00C853] max-w-3xl mx-auto" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.875rem)' }}>
              Remember where your mind left off. AI-powered cognitive restoration for developers navigating fragmented workflows.
            </p>
            <div className="flex justify-center w-full">
              <button
                onClick={onGetStarted}
                className="group relative bg-[#D94A3D] text-white font-black py-4 sm:py-6 px-8 sm:px-12 border-4 border-[#00C853] uppercase tracking-wide transition-all hover:-translate-y-[2px] overflow-hidden"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', boxShadow: '8px 8px 0px rgba(0, 200, 83, 1)' }}
              >
                <span className="relative z-10">REMIT NOW</span>
                <div className="absolute inset-0 bg-[#2D4CC8] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity font-black">
                  REMIT NOW
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Rolling Copy Ticker */}
      <section className="border-y-4 border-[#00C853] bg-[#00C853] text-white py-6 sm:py-8 overflow-hidden w-full">
        <div className="ticker-wrapper">
          <div className="ticker-content">
            <span className="ticker-item">Because debugging isn't just code. It's memory.</span>
            <span className="ticker-item">The future of debugging is remembering.</span>
            <span className="ticker-item">Engineering continuity, reconstructed.</span>
            <span className="ticker-item">AI should not just generate code. It should restore understanding.</span>
            <span className="ticker-item">Paste the chaos. Recover the architecture.</span>
            <span className="ticker-item">Resume the exact thought you lost three hours ago.</span>
            <span className="ticker-item">Your brain had a thread. REMEM brings it back.</span>
            <span className="ticker-item">Not summaries. Recovered mental state.</span>
            <span className="ticker-item">Cognitive continuity for developers.</span>
            <span className="ticker-item">The missing memory layer for modern development.</span>
            <span className="ticker-item">Where debugging resumes exactly where your mind stopped.</span>
            <span className="ticker-item">From fragmented chaos to engineering clarity.</span>
          </div>
          <div className="ticker-content" aria-hidden="true">
            <span className="ticker-item">Because debugging isn't just code. It's memory.</span>
            <span className="ticker-item">The future of debugging is remembering.</span>
            <span className="ticker-item">Engineering continuity, reconstructed.</span>
            <span className="ticker-item">AI should not just generate code. It should restore understanding.</span>
            <span className="ticker-item">Paste the chaos. Recover the architecture.</span>
            <span className="ticker-item">Resume the exact thought you lost three hours ago.</span>
            <span className="ticker-item">Your brain had a thread. REMEM brings it back.</span>
            <span className="ticker-item">Not summaries. Recovered mental state.</span>
            <span className="ticker-item">Cognitive continuity for developers.</span>
            <span className="ticker-item">The missing memory layer for modern development.</span>
            <span className="ticker-item">Where debugging resumes exactly where your mind stopped.</span>
            <span className="ticker-item">From fragmented chaos to engineering clarity.</span>
          </div>
        </div>
      </section>

      {/* Features Section - Red Background */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#D94A3D] border-y-4 border-[#00C853] w-full">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          <div className="mb-16 lg:mb-24 w-full">
            <h2 className="font-black text-white mb-8 uppercase leading-tight text-center" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
              WHY TEAMS<br />CHOOSE REMEM
            </h2>
            <div className="h-2 w-48 bg-white mb-8 mx-auto" />
            <p className="font-bold text-white uppercase tracking-wide opacity-90 mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
              ENGINEERING CONTINUITY, RECONSTRUCTED
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Feature Card 1 */}
            <div className="bg-white border-4 border-[#00C853] p-8 sm:p-10 flex flex-col items-center text-center" style={{ boxShadow: '12px 12px 0px rgba(0, 200, 83, 1)' }}>
              <div className="w-20 h-20 bg-[#F4C430] border-4 border-[#00C853] flex items-center justify-center mb-8 transition-transform hover:rotate-12">
                <div className="w-8 h-8 bg-[#00C853] border-2 border-[#00C853]" />
              </div>
              <h3 className="font-black mb-6 uppercase leading-tight text-2xl">
                SAVE TIME AND<br />RESOURCES
              </h3>
              <p className="text-lg font-bold text-gray-700 leading-relaxed uppercase tracking-tighter">
                Reduce manual work by up to 60% with intelligent automation. Focus on what matters: building great products.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white border-4 border-[#00C853] p-8 sm:p-10 flex flex-col items-center text-center" style={{ boxShadow: '12px 12px 0px rgba(0, 200, 83, 1)' }}>
              <div className="w-20 h-20 bg-[#F4C430] border-4 border-[#00C853] flex items-center justify-center mb-8 transition-transform hover:-rotate-12">
                <div className="w-8 h-8 rounded-full bg-[#00C853] border-2 border-[#00C853]" />
              </div>
              <h3 className="font-black mb-6 uppercase leading-tight text-2xl">
                IMPROVE TEAM<br />PRODUCTIVITY
              </h3>
              <p className="text-lg font-bold text-gray-700 leading-relaxed uppercase tracking-tighter">
                Give your team the tools they need to collaborate effectively. Seamless context sharing across your workflow.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white border-4 border-[#00C853] p-8 sm:p-10 flex flex-col items-center text-center" style={{ boxShadow: '12px 12px 0px rgba(0, 200, 83, 1)' }}>
              <div className="w-20 h-20 bg-[#F4C430] border-4 border-[#00C853] flex items-center justify-center mb-8 transition-transform hover:rotate-12">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-[#00C853]" />
              </div>
              <h3 className="font-black mb-6 uppercase leading-tight text-2xl">
                SCALE WITH<br />CONFIDENCE
              </h3>
              <p className="text-lg font-bold text-gray-700 leading-relaxed uppercase tracking-tighter">
                Built to grow with your business. From startups to enterprises, Remem adapts with enterprise-grade reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Blue Background */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#2D4CC8] w-full">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          <h2 className="font-black text-white mb-12 uppercase leading-tight text-center" style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}>
            EXPERIENCE THE FUTURE OF<br />
            TEAM COLLABORATION TODAY.
          </h2>
          <p className="font-bold text-white mb-12 leading-relaxed max-w-3xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
            Remem Platform centralizes your entire workflow into one intuitive interface, eliminating the need for disjointed tools. By harnessing the power of real-time data and smart automation, we empower your team to focus on high-impact innovation.
          </p>
          
          {/* Balanced Geometric Shapes */}
          <div className="flex gap-8 mb-12 items-center justify-center flex-wrap">
            <div className="w-24 h-24 rounded-full bg-white border-4 border-[#00C853]" />
            <div className="w-32 h-32 bg-[#D94A3D] border-4 border-[#00C853]" style={{ boxShadow: '8px 8px 0px rgba(0, 200, 83, 1)' }} />
            <div className="w-24 h-24 rounded-full bg-[#F4C430] border-4 border-[#00C853]" />
          </div>

          <button
            onClick={onGetStarted}
            className="group relative bg-[#00C853] text-[#F4C430] font-black py-6 px-12 border-4 border-white uppercase tracking-wide text-xl transition-all hover:-translate-y-[2px] overflow-hidden"
            style={{ boxShadow: '8px 8px 0px rgba(255, 255, 255, 1)' }}
          >
            <span className="relative z-10">GET STARTED NOW</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 flex items-center justify-center text-[#00C853] opacity-0 group-hover:opacity-100 transition-opacity font-black">
              GET STARTED NOW
            </span>
          </button>
        </div>
      </section>

      <SharedFooter subtitle="Remember where your mind left off." />

      <style jsx>{`
        .ticker-wrapper {
          display: flex;
          overflow: hidden;
          user-select: none;
          width: 100%;
        }
        
        .ticker-content {
          display: flex;
          animation: scroll 60s linear infinite;
          will-change: transform;
        }
        
        .ticker-content:hover {
          animation-play-state: paused;
        }
        
        .ticker-item {
          flex-shrink: 0;
          padding: 0 2rem;
          font-size: clamp(1rem, 3vw, 2rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        
        @media (min-width: 640px) {
          .ticker-item {
            padding: 0 3rem;
          }
        }
        
        @media (min-width: 1024px) {
          .ticker-item {
            padding: 0 4rem;
          }
        }
        
        .ticker-item:hover {
          color: #F4C430;
          text-shadow: 0 0 20px rgba(244, 196, 48, 0.5);
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .ticker-content {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

// Made with Bob
