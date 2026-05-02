import React from 'react';
import { Navigation } from '@/components/Navigation';
import { SharedFooter } from '@/components/SharedFooter';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#00C853] font-medium flex flex-col items-center w-full">
      <Navigation />
      <main className="pt-48 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full flex flex-col items-center">
        {/* Bauhaus Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430] opacity-10 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-full bg-[#00C853] opacity-5" />
        
        <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
          <div className="relative mb-16 w-full max-w-2xl">
            <div className="bg-[#00C853] text-white p-10 sm:p-12 border-4 border-[#00C853] text-center flex flex-col items-center shadow-[12px_12px_0px_rgba(217, 74, 61, 1)]">
              <h1 className="font-black text-4xl sm:text-6xl uppercase leading-none tracking-tighter mb-4 text-center">PRIVACY POLICY</h1>
              <div className="h-2 w-32 bg-[#F4C430]" />
            </div>
          </div>

          <div className="bg-white border-4 border-[#00C853] p-8 sm:p-12 space-y-16 shadow-[16px_16px_0px_rgba(0,200,83,1)] w-full mb-24 text-center flex flex-col items-center">
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900 border-b-4 border-[#2D4CC8] pb-6 inline-block">
                Privacy by Architecture:
              </p>
            </div>

            <div className="space-y-16 w-full">
              {[
                {
                  id: '01',
                  title: 'Data Capture',
                  color: '#F4C430',
                  textColor: '#00C853',
                  desc: 'We capture only the text data you provide. This data is used solely for the purpose of mental state reconstruction. We do not sell your "thought threads" to advertisers.'
                },
                {
                  id: '02',
                  title: 'Storage',
                  color: '#D94A3D',
                  textColor: 'white',
                  desc: 'Session data is encrypted and stored temporarily. By default, reconstructions are cleared after 24 hours unless you explicitly save them to your permanent vault.'
                },
                {
                  id: '03',
                  title: 'Third Party Services',
                  color: '#2D4CC8',
                  textColor: 'white',
                  desc: 'We use state-of-the-art AI models to process your data. All data sent to these providers is anonymized and stripped of personally identifiable information where possible.'
                }
              ].map((item) => (
                <div key={item.id} className="flex flex-col items-center text-center max-w-2xl mx-auto">
                  <div className="w-16 h-16 border-4 border-[#00C853] flex items-center justify-center font-black text-2xl mb-6 shadow-[4px_4px_0px_rgba(0,200,83,1)]" style={{ backgroundColor: item.color, color: item.textColor }}>
                    {item.id}
                  </div>
                  <h2 className="font-black text-2xl sm:text-3xl uppercase mb-4">{item.title}</h2>
                  <p className="text-lg sm:text-xl font-bold text-gray-700 leading-relaxed uppercase tracking-tighter">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SharedFooter subtitle="Privacy by Architecture. Not Just Policy." />
    </div>
  );
}
