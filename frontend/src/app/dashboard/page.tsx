'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUser, isAuthenticated } from '@/lib/auth';
import Card from '@/components/ui/Card';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isAuthenticated()) {
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.replace(`/auth/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [router, searchParams]);

  const user = getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user.firstName}!</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Financial Overview</h3>
              <p className="mt-2 text-sm text-gray-600">
                View your financial summary and recent activity
              </p>
            </div>
          </Card>
          
          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Goals Progress</h3>
              <p className="mt-2 text-sm text-gray-600">
                Track your progress towards financial goals
              </p>
            </div>
          </Card>
          
          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
              <p className="mt-2 text-sm text-gray-600">
                Monitor your recent income and expenses
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 