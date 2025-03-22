'use client';

import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-indigo-600">WealthPA</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Your Financial Mentor & Assistant
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect with qualified personal financial assistants for personalized guidance.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            href="/auth/register"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
