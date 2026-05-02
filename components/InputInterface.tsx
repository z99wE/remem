'use client';

import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { GitContext } from '@/types';
import { RememWordmark } from './RememWordmark';

interface InputInterfaceProps {
  onBack: () => void;
  onSubmit: (text: string, gitContext?: GitContext) => void;
}

export const InputInterface: React.FC<InputInterfaceProps> = ({ onBack, onSubmit }) => {
  const [inputText, setInputText] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_CHARACTERS = 20000;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Read file contents and append to input text
    for (const file of files) {
      const text = await file.text();
      setInputText(prev => prev + `\n\n--- File: ${file.name} ---\n${text}\n`);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (inputText.trim() || githubUrl.trim()) {
      const gitContext: GitContext | undefined = githubUrl.trim() ? {
        repositoryUrl: githubUrl.trim(),
        includeCommits: true,
        includeBranch: true,
        includeModifiedFiles: true
      } : undefined;
      
      onSubmit(inputText, gitContext);
    }
  };

  const characterCount = inputText.length;
  const percentage = (characterCount / MAX_CHARACTERS) * 100;

  return (
    <div className="min-h-screen bg-white text-[#00C853] font-medium flex flex-col items-center w-full">
      {/* Header */}
      <nav className="border-b-4 border-[#00C853] px-4 sm:px-6 lg:px-8 py-6 bg-white w-full flex justify-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6 w-full text-center">
          <RememWordmark />
          <button
            onClick={onBack}
            className="text-sm font-black text-[#00C853] hover:text-[#2D4CC8] transition-colors uppercase tracking-widest border-2 border-[#00C853] px-4 py-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#00C853]" />
              BACK
            </div>
          </button>
        </div>
      </nav>

      {/* Progress Steps */}
      <div className="border-b-8 border-[#00C853] px-4 sm:px-6 lg:px-8 py-10 bg-[#F4C430] w-full flex justify-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 sm:gap-16 w-full">
          {/* Step 1 - Active */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#D94A3D] border-4 border-[#00C853] flex items-center justify-center shadow-[4px_4px_0px_rgba(0,200,83,1)]">
              <span className="text-white font-black text-2xl">01</span>
            </div>
            <span className="font-black text-sm sm:text-base uppercase tracking-widest">INPUT</span>
          </div>
          
          <div className="h-2 w-12 sm:w-24 bg-[#00C853]" />
          
          {/* Step 2 - Inactive */}
          <div className="flex flex-col items-center gap-4 opacity-30">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-[#00C853] flex items-center justify-center">
              <span className="text-[#00C853] font-black text-2xl">02</span>
            </div>
            <span className="font-black text-sm sm:text-base uppercase tracking-widest">ANALYZE</span>
          </div>
          
          <div className="h-2 w-12 sm:w-24 bg-[#00C853] opacity-30" />
          
          {/* Step 3 - Inactive */}
          <div className="flex flex-col items-center gap-4 opacity-30">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-[#00C853] flex items-center justify-center">
              <span className="text-[#00C853] font-black text-2xl">03</span>
            </div>
            <span className="font-black text-sm sm:text-base uppercase tracking-widest">RESTORE</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        <div className="text-center mb-16">
          <h1 className="font-black mb-8 uppercase leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            PASTE YOUR<br />
            <span className="bg-[#2D4CC8] text-white px-6 py-2 inline-block transform -rotate-1">CONTEXT</span>
          </h1>
          <p className="font-bold text-gray-800 leading-tight uppercase tracking-tight max-w-3xl mx-auto text-xl">
            Logs, prompts, TODOs, notes, thoughts...<br />
            Or upload files for instant cognitive restoration.
          </p>
        </div>

        {/* GitHub Repository Section */}
        <div className="mb-12 w-full flex flex-col items-center">
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="PASTE GITHUB REPOSITORY URL (e.g., https://github.com/user/repo)"
            className="w-full p-8 border-4 border-[#00C853] text-xl font-bold focus:outline-none focus:ring-0 uppercase text-center bg-white shadow-[12px_12px_0px_#F4C430]"
            style={{ 
              fontFamily: 'monospace'
            }}
          />
        </div>

        {/* File Upload Section */}
        <div className="mb-12 w-full">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".txt,.log,.md,.json,.js,.ts,.tsx,.jsx,.py,.java,.cpp,.c,.h,.css,.html,.xml,.yaml,.yml"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-[#F4C430] border-4 border-[#00C853] p-10 font-black uppercase hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all flex flex-col items-center justify-center gap-4 shadow-[12px_12px_0px_rgba(0,200,83,1)]"
          >
            <Upload className="w-12 h-12" />
            <span className="text-2xl tracking-tighter">UPLOAD ENGINEERING FRAGMENTS</span>
          </button>
        </div>

        {/* Uploaded Files Display */}
        {uploadedFiles.length > 0 && (
          <div className="mb-12 bg-gray-100 border-4 border-[#00C853] p-8 w-full flex flex-col items-center">
            <h3 className="font-black text-xl uppercase mb-6 tracking-widest">UPLOADED FRAGMENTS:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-white border-2 border-[#00C853] p-6 gap-4">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-[#2D4CC8] border-2 border-[#00C853] flex items-center justify-center">
                      <span className="text-white font-black text-xl">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase break-all">{file.name}</p>
                      <p className="text-xs font-bold text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="w-10 h-10 bg-[#D94A3D] border-2 border-[#00C853] flex items-center justify-center hover:bg-[#00C853] transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="mb-12 w-full">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="PASTE YOUR CHAOS HERE..."
            className="w-full h-96 lg:h-[600px] p-8 sm:p-12 border-4 border-[#00C853] text-xl font-bold focus:outline-none focus:ring-0 resize-none bg-white shadow-[16px_16px_0px_#2D4CC8] uppercase text-center"
            style={{ 
              fontFamily: 'monospace'
            }}
            maxLength={MAX_CHARACTERS}
          />
        </div>

        {/* Character Counter */}
        <div className="mb-16 w-full max-w-2xl text-center">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <span className="text-sm font-black uppercase tracking-widest">
              {characterCount.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()} CHARS
            </span>
            <span className="text-sm font-black uppercase tracking-widest">
              {percentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-6 bg-gray-200 border-4 border-[#00C853]">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${percentage}%`,
                backgroundColor: percentage > 90 ? '#D94A3D' : percentage > 70 ? '#F4C430' : '#2D4CC8'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-24 w-full">
          <button
            onClick={onBack}
            className="bg-white text-[#00C853] font-black py-6 px-12 border-4 border-[#00C853] uppercase tracking-widest text-xl hover:-translate-y-1 transition-all shadow-[8px_8px_0px_rgba(0,200,83,1)] w-full sm:w-auto"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            disabled={!inputText.trim() && !githubUrl.trim()}
            className={`font-black py-6 px-12 border-4 border-[#00C853] uppercase tracking-widest text-xl transition-all w-full sm:w-auto ${
              (inputText.trim() || githubUrl.trim())
                ? 'bg-[#D94A3D] text-white hover:-translate-y-1 shadow-[8px_8px_0px_rgba(0,200,83,1)]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            }`}
          >
            ANALYZE CONTEXT
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-[#F4C430] border-4 border-[#00C853] p-10 flex flex-col items-center text-center shadow-[8px_8px_0px_rgba(0,200,83,1)]">
            <div className="w-12 h-12 bg-[#00C853] border-4 border-[#00C853] mb-6" />
            <h3 className="font-black text-xl mb-4 uppercase tracking-tighter">LOGS & TRACES</h3>
            <p className="text-sm font-bold leading-tight uppercase">
              Terminal outputs, stack traces, build logs, and test results.
            </p>
          </div>
          <div className="bg-[#2D4CC8] text-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center shadow-[8px_8px_0px_rgba(0,200,83,1)]">
            <div className="w-12 h-12 rounded-full bg-white border-4 border-white mb-6" />
            <h3 className="font-black text-xl mb-4 uppercase tracking-tighter">AI PROMPTS</h3>
            <p className="text-sm font-bold leading-tight uppercase">
              Conversations with AI agents and context-sharing history.
            </p>
          </div>
          <div className="bg-[#D94A3D] text-white border-4 border-[#00C853] p-10 flex flex-col items-center text-center shadow-[8px_8px_0px_rgba(0,200,83,1)]">
            <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-white mb-6" />
            <h3 className="font-black text-xl mb-4 uppercase tracking-tighter">TODOS & NOTES</h3>
            <p className="text-sm font-bold leading-tight uppercase">
              Task lists, meeting notes, and engineering mental models.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
