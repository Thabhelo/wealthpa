'use client';

import { ReactNode } from 'react';
import { ToastProvider } from '../ui/ToastProvider';
import MainLayout from './MainLayout';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ToastProvider>
      <MainLayout>{children}</MainLayout>
    </ToastProvider>
  );
} 