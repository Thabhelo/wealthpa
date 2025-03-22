'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  ...props
}: BadgeProps) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const dotColors = {
    default: 'bg-gray-400',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={twMerge(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className={twMerge(
            'w-2 h-2 rounded-full mr-1.5',
            dotColors[variant]
          )}
        />
      )}
      {children}
    </motion.span>
  );
};

export default Badge; 