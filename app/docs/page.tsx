import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SharedFooter } from '@/components/SharedFooter';

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      content: "Simply paste your fragmented debug logs, terminal output, or meeting notes into the input field. Our engine will analyze the entropy and begin the reconstruction process."
    },
    {
      title: "Cognitive Courtroom",
      content: "The heart of REMEM. We run a simulated debate between a Prosecutor (who finds the gaps), a Defense (who justifies the state), and a Judge (who finalizes the reconstruction)."
    },
    {
      title: "Restoration Dashboard",
      content: "View your reconstructed mental state, including the specific thread you were following, the current variable context, and the immediate 'next steps' your brain had planned."
    },
    {
      title: "API Integration",
      content: "Connect REMEM to your IDE or Slack to automatically capture context before a known interruption occurs. The ultimate safety net for deep work."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#00C853] font-medium flex flex-col items-center w-full">
      <Navigation />
      
      <main className="pt-48 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full flex flex-col items-center">
        {/* Bauhaus Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-full bg-[#F4C430] opacity-10 -z-10" />
        <div className="absolute top-40 left-0 w-16 h-64 bg-[#D94A3D] opacity-10 -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
          <div className="text-center mb-24 w-full flex flex-col items-center">
            <h1 className="font-black text-[#00C853] mb-8 leading-none uppercase text-center" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.04em' }}>
              DOCUMENTATION
            </h1>
            <div className="h-4 w-64 bg-[#00C853] mb-12" />
            <div className="grid grid-cols-4 gap-4 h-8 w-full max-w-lg mb-12">
              <div className="bg-[#D94A3D] border-2 border-[#00C853]" />
              <div className="bg-[#2D4CC8] border-2 border-[#00C853] rounded-full" />
              <div className="bg-[#F4C430] border-2 border-[#00C853]" />
              <div className="bg-[#00C853] border-2 border-[#00C853]" />
            </div>
          </div>
          
          <div className="w-full max-w-5xl flex flex-col items-center space-y-32">
            {sections.map((s, i) => (
              <section key={i} id={s.title.toLowerCase().replace(/\s+/g, '-')} className="relative group w-full flex flex-col items-center text-center">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-9xl font-black text-[#00C853] opacity-5 -z-10 select-none">
                  0{i + 1}
                </div>
                <div className="flex flex-col items-center w-full">
                  <h2 className="font-black text-4xl sm:text-6xl mb-12 uppercase leading-tight bg-[#00C853] text-white inline-block px-10 py-4 shadow-[12px_12px_0px_#2D4CC8]">
                    {s.title}
                  </h2>
                  <div className="bg-white border-4 border-[#00C853] p-10 sm:p-16 shadow-[16px_16px_0px_#D94A3D] w-full">
                    <p className="text-xl sm:text-3xl font-black leading-tight text-gray-800 uppercase tracking-tighter">
                      {s.content}
                    </p>
                  </div>
                </div>
                
                {i < sections.length - 1 && (
                  <div className="mt-32 w-24 h-24 bg-[#F4C430] border-4 border-[#00C853] rounded-full" />
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <SharedFooter subtitle="Read. Remember. Rememit." />
    </div>
  );
}
