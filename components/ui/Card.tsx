import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'outline' | 'prosecutor' | 'defense' | 'judge';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'glass',
  padding = 'md',
}) => {
  const variants = {
    glass: 'glass',
    solid: 'bg-bg-secondary border-2 border-carbon-black',
    outline: 'bg-transparent border-2 border-carbon-black',
    prosecutor: 'glass border-l-4 border-l-bauhaus-red',
    defense: 'glass border-l-4 border-l-bauhaus-yellow',
    judge: 'glass border-l-4 border-l-bauhaus-blue',
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={`geometric-rounded ${variants[variant]} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-xl font-bold uppercase tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Made with Bob
