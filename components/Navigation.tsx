'use client';

import React from 'react';
import Link from 'next/link';
import { RememWordmark } from './RememWordmark';

export const Navigation: React.FC = () => {
  const links = [
    { label: 'HOW IT WORKS', href: '/how-remem-works' },
    { label: 'WHY REMEM?', href: '/why-remem' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-[#00C853] w-full flex justify-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex flex-row items-center justify-between gap-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <RememWordmark small={true} />
        </Link>
        
        <div className="flex items-center justify-center gap-4 sm:gap-8 text-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden sm:block text-xs font-black uppercase tracking-widest hover:text-[#2D4CC8] transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#2D4CC8] transition-all group-hover:w-full" />
            </Link>
          ))}
          
          <Link 
            href="/restore-demo"
            className="bg-[#00C853] text-white px-4 py-2 font-black text-xs border-2 sm:border-4 border-[#00C853] uppercase tracking-tighter hover:bg-[#2D4CC8] transition-all hover:-translate-y-1 shadow-[2px_2px_0px_rgba(0,200,83,1)] sm:shadow-[4px_4px_0px_rgba(0,200,83,1)]"
          >
            DEMO
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Made with Bob
