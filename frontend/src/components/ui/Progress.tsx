'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ProgressProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  value: number;
  max?: number;
  label?: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const Progress = ({
  value,
  max = 100,
  label,
  className,
  variant = 'default',
  size = 'md',
  showValue = true,
  ...props
}: ProgressProps) => {
  const percentage = Math.min(100, (value / max) * 100);

  const variants = {
    default: 'bg-indigo-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <motion.div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <span className="text-sm font-medium text-gray-700">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <motion.div
        className={twMerge(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizes[size],
          className
        )}
        {...props}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={twMerge('h-full rounded-full', variants[variant])}
        />
      </motion.div>
    </motion.div>
  );
};

export default Progress; 