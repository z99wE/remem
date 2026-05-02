import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-3 bg-bg-primary border-2 border-carbon-black text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-terminal-green transition-smooth ${className}`}
      {...props}
    />
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  characterCount?: number;
  maxCharacters?: number;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  characterCount,
  maxCharacters,
  className = '',
  ...props
}) => {
  const isNearLimit = maxCharacters && characterCount ? characterCount / maxCharacters > 0.9 : false;
  
  return (
    <div className="relative">
      <textarea
        className={`w-full px-4 py-3 bg-carbon-black text-terminal-green border-2 border-carbon-black focus:border-terminal-green placeholder:text-terminal-green/50 focus:outline-none transition-smooth resize-none text-mono ${className}`}
        {...props}
      />
      {maxCharacters && characterCount !== undefined && (
        <div className={`absolute bottom-3 right-3 text-sm font-mono ${
          isNearLimit ? 'text-bauhaus-red' : 'text-terminal-green/70'
        }`}>
          {characterCount} / {maxCharacters}
        </div>
      )}
    </div>
  );
};

// Made with Bob
