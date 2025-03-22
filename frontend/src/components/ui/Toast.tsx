'use client';

import { HTMLMotionProps, motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { createPortal } from 'react-dom';

interface ToastProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
  icon?: ReactNode;
}

const Toast = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  icon,
  className,
  ...props
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  const icons = {
    success: (
      <svg
        className="h-5 w-5 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
    error: (
      <svg
        className="h-5 w-5 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),
    warning: (
      <svg
        className="h-5 w-5 text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    info: (
      <svg
        className="h-5 w-5 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={twMerge(
          'fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg border flex items-center space-x-3',
          variants[type],
          className
        )}
        {...props}
      >
        {icon || icons[type]}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-current hover:text-opacity-70 focus:outline-none"
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default Toast; 