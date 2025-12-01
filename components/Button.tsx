import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  icon = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide";
  
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-dark hover:shadow-brand-primary/50",
    secondary: "bg-brand-accent text-white hover:bg-[#B5952F] hover:shadow-[#D4AF37]/50",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
      {icon && <ArrowRight className="w-5 h-5" />}
    </button>
  );
};
