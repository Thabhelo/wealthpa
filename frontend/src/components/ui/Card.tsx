'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
}

const Card = ({
  children,
  className,
  variant = 'default',
  hover = true,
  ...props
}: CardProps) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border-0',
    outlined: 'bg-transparent border-2 border-indigo-200',
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={twMerge(
        'rounded-lg p-6 transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card; 