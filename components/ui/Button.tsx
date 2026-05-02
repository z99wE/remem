import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-bold uppercase tracking-wide transition-smooth border-2 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-terminal-green text-carbon-black border-carbon-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
    secondary: 'bg-bg-secondary text-text-primary border-carbon-black shadow-brutalist hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none',
    outline: 'bg-transparent text-text-primary border-carbon-black hover:bg-carbon-black hover:text-bg-primary',
    ghost: 'bg-transparent text-text-primary border-transparent hover:bg-bg-secondary hover:border-carbon-black',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Made with Bob
