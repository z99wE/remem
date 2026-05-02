'use client';

import React from 'react';

export const SharedFooter: React.FC<{ subtitle?: string }> = ({ subtitle }) => {
  return (
    <footer className="w-full bg-[#00C853] text-white py-20 px-4 border-t-8 border-white flex flex-col items-center text-center relative overflow-hidden">
      
      {/* Bauhaus Background Elements */}
      <div className="absolute left-2 sm:left-12 top-1/2 -translate-y-1/2 opacity-90 hidden sm:block">
        <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full border-8 border-white bg-[#D94A3D]"></div>
      </div>
      <div className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 opacity-90 hidden sm:block">
        <div className="w-20 h-20 sm:w-32 sm:h-32 border-8 border-white bg-[#2D4CC8]"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 relative z-10">
        
        {/* Bauhaus geometric shape row */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#D94A3D] border-4 border-white shadow-[6px_6px_0px_#2D4CC8]"></div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#2D4CC8] border-4 border-white shadow-[6px_6px_0px_#F4C430]"></div>
          <div style={{ width: 0, height: 0, borderLeft: '24px solid transparent', borderRight: '24px solid transparent', borderBottom: '42px solid #F4C430' }} className="drop-shadow-[6px_6px_0px_rgba(255,255,255,1)]"></div>
        </div>

        {subtitle && (
          <p className="font-black text-2xl sm:text-3xl uppercase tracking-tighter text-white bg-[#00C853] px-4 py-2 border-4 border-white shadow-[8px_8px_0px_#D94A3D]">
            {subtitle}
          </p>
        )}
        
        <div className="h-2 w-full max-w-[200px] bg-white my-4"></div>
        
        <p className="text-sm font-black tracking-[0.2em] uppercase text-white">
          © 2026 REMEM.
        </p>
        
        <p className="text-xs font-bold uppercase tracking-widest text-[#00C853] max-w-2xl border-4 border-white p-4 bg-white shadow-[8px_8px_0px_#2D4CC8]">
          An experimental AI project for educational and entertainment purposes. Built for hackathons and developer exploration.
        </p>
      </div>
    </footer>
  );
};
