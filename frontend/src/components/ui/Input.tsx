'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <motion.div
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <input
            ref={ref}
            className={twMerge(
              'w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200',
              error
                ? 'border-red-300 text-red-900 placeholder-red-300'
                : 'border-gray-300 text-gray-900 placeholder-gray-400',
              className
            )}
            {...props}
          />
        </motion.div>
        {(error || helperText) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={twMerge(
              'mt-1 text-sm',
              error ? 'text-red-600' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 