'use client';

import React from 'react';

export const RememWordmark: React.FC<{ small?: boolean }> = ({ small = false }) => {
  return (
    <div className={`flex flex-col items-center ${small ? 'gap-1' : 'gap-2'}`}>
      {/* Geometric Shapes Logo */}
      <div className={`flex items-center ${small ? 'gap-1' : 'gap-2'}`}>
        {/* Red Circle */}
        <div 
          className={`${small ? 'w-4 h-4 border-2' : 'w-6 h-6 border-[3px]'} rounded-full border-[#00C853]`}
          style={{ backgroundColor: '#D94A3D' }}
        />
        {/* Blue Square */}
        <div 
          className={`${small ? 'w-4 h-4 border-2' : 'w-6 h-6 border-[3px]'} border-[#00C853]`}
          style={{ backgroundColor: '#2D4CC8' }}
        />
        {/* Yellow Triangle */}
        <div className={`relative ${small ? 'w-4 h-4' : 'w-6 h-6'}`}>
          <div 
            className="absolute inset-0"
            style={{
              width: 0,
              height: 0,
              borderLeft: small ? '8px solid transparent' : '12px solid transparent',
              borderRight: small ? '8px solid transparent' : '12px solid transparent',
              borderBottom: small ? '14px solid #F4C430' : '20px solid #F4C430',
              borderBottomWidth: small ? '16px' : '24px',
            }}
          />
          <div 
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: small ? '8px solid transparent' : '12px solid transparent',
              borderRight: small ? '8px solid transparent' : '12px solid transparent',
              borderBottom: small ? '14px solid #00C853' : '20px solid #00C853',
              borderBottomWidth: small ? '16px' : '24px',
              top: small ? '1px' : '2px',
              left: '0px',
            }}
          />
        </div>
      </div>
      
      {/* Wordmark */}
      <div className="flex flex-col leading-none text-center">
        <span 
          className="font-black tracking-tighter uppercase"
          style={{ 
            fontSize: small ? '14px' : '24px',
            letterSpacing: '-0.05em',
            color: '#00C853'
          }}
        >
          REMEM
        </span>
      </div>
    </div>
  );
};

// Made with Bob
