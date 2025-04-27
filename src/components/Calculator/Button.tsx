
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-2xl font-light rounded-full p-4 transition-all duration-200 active:scale-95',
        variant === 'primary' && 'bg-purple-100 text-purple-900 hover:bg-purple-200',
        variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        variant === 'accent' && 'bg-purple-600 text-white hover:bg-purple-700',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
