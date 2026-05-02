'use client';

import React, { useState } from 'react';
import { LandingPage, InputInterface, LoadingState, OutputDashboard } from '@/components';
import { AnalysisResult, GitContext } from '@/types';

type AppState = 'landing' | 'input' | 'loading' | 'output';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleStart = () => {
    setAppState('input');
  };

  const handleBack = () => {
    setAppState('landing');
  };

  const handleSubmit = async (text: string, gitContext?: GitContext) => {
    setAppState('loading');
    
    try {
      const response = await fetch('/api/reconstruct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText: text,
          gitContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);
      setAppState('output');
    } catch (error) {
      console.error('Error processing request:', error);
      alert('Failed to process your request. Please try again.');
      setAppState('landing');
    }
  };

  return (
    <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden flex flex-col items-center">
      {appState === 'landing' && <LandingPage onGetStarted={handleStart} />}
      {appState === 'input' && <InputInterface onBack={handleBack} onSubmit={handleSubmit} />}
      {appState === 'loading' && <LoadingState />}
      {appState === 'output' && analysisResult && (
        <OutputDashboard result={analysisResult} onNewSession={handleBack} />
      )}
    </div>
  );
}
