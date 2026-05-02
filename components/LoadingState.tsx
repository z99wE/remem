'use client';

import React, { useState, useEffect } from 'react';

const stages = [
  { id: 1, label: 'PARSING\nFRAGMENTS', icon: '1', color: '#F4C430' },
  { id: 2, label: 'ANALYZING\nPATTERNS', icon: '2', color: '#D94A3D' },
  { id: 3, label: 'RECONSTRUCTING\nTHREADS', icon: '3', color: '#2D4CC8' },
  { id: 4, label: 'GENERATING\nINSIGHTS', icon: '4', color: '#F4C430' },
];

export const LoadingState: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const newProgress = prev + 1;
        
        // Update current stage based on progress
        if (newProgress >= 75) setCurrentStage(3);
        else if (newProgress >= 50) setCurrentStage(2);
        else if (newProgress >= 25) setCurrentStage(1);
        else setCurrentStage(0);
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden w-full max-w-full">
      {/* Decorative Background Shapes - Hidden on mobile */}


      <div className="max-w-5xl w-full relative z-10 px-4">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <h1 className="font-black mb-4 sm:mb-6 uppercase leading-tight" style={{ fontSize: 'clamp(2rem, 8vw, 7rem)', letterSpacing: '-0.03em', wordWrap: 'break-word' }}>
            RESTORING YOUR<br />
            <span className="bg-[#F4C430] px-3 sm:px-4 py-2 inline-block border-4 border-[#00C853]" style={{ boxShadow: 'clamp(4px, 1vw, 8px) clamp(4px, 1vw, 8px) 0px rgba(0, 200, 83, 1)' }}>
              COGNITIVE CONTEXT
            </span>
          </h1>
          <p className="font-bold text-gray-700 mt-6 sm:mt-8" style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}>
            Our AI prosecutor, defense, and judge are analyzing your fragments.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <span className="text-lg font-black uppercase tracking-wide">PROGRESS</span>
            <span className="text-4xl font-black">{progress}%</span>
          </div>
          <div className="relative w-full h-8 bg-gray-200 border-4 border-[#00C853]">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                backgroundColor: progress >= 75 ? '#2D4CC8' : progress >= 50 ? '#D94A3D' : '#F4C430'
              }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`border-4 border-[#00C853] p-4 sm:p-6 transition-all ${
                currentStage >= index 
                  ? 'opacity-100' 
                  : 'opacity-40'
              }`}
              style={{ 
                backgroundColor: currentStage >= index ? stage.color : 'white',
                boxShadow: currentStage >= index ? '6px 6px 0px rgba(0, 200, 83, 1)' : 'none'
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 sm:w-16 h-12 sm:h-16 rounded-full border-4 border-[#00C853] flex items-center justify-center mb-3 sm:mb-4 ${
                    currentStage >= index ? 'bg-white' : 'bg-gray-200'
                  }`}
                >
                  <span className="text-xl sm:text-2xl font-black">{stage.icon}</span>
                </div>
                <span className="text-xs sm:text-sm font-black uppercase leading-tight whitespace-pre-line">
                  {stage.label}
                </span>
                {currentStage === index && (
                  <div className="mt-4 flex gap-1">
                    <div className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fun Fact */}
        <div className="mt-8 sm:mt-12 bg-[#2D4CC8] text-white border-4 border-[#00C853] p-4 sm:p-6 text-center" style={{ boxShadow: 'clamp(4px, 1vw, 8px) clamp(4px, 1vw, 8px) 0px rgba(0, 200, 83, 1)' }}>
          <p className="font-bold" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}>
            Did you know? Remem uses a unique prosecutor-defense-judge system to ensure balanced analysis!
          </p>
        </div>
      </div>
    </div>
  );
};

// Made with Bob
