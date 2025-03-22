'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

const Tabs = ({ tabs, defaultTab, className, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <motion.div className={twMerge('w-full', className)} {...props}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={twMerge(
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="mt-6"
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </motion.div>
    </motion.div>
  );
};

export default Tabs; 