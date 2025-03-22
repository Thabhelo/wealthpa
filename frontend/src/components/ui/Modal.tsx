'use client';

import { HTMLMotionProps, motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface ModalProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  size = 'md',
  showCloseButton = true,
  ...props
}: ModalProps) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={twMerge(
              'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-white rounded-lg shadow-xl z-50',
              sizes[size],
              className
            )}
            {...props}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                {title && (
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
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
                )}
              </div>
              <div className="mt-2">{children}</div>
              {footer && <div className="mt-6 flex justify-end space-x-3">{footer}</div>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal; 