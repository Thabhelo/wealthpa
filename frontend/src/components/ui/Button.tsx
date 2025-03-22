'use client';

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  isLoading,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || isLoading}
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
        />
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button; 