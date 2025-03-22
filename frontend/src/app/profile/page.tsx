'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Card from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import { useToast } from '@/components/ui/ToastProvider';

export default function ProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const user = getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Overview</h3>
            <div className="space-y-4">
              <Progress
                value={75}
                max={100}
                label="Financial Health Score"
                variant="success"
              />
              <Progress
                value={60}
                max={100}
                label="Investment Portfolio Growth"
                variant="info"
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Monthly Budget Review</p>
                  <p className="text-sm text-gray-500">Completed on March 15, 2024</p>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Investment Portfolio Update</p>
                  <p className="text-sm text-gray-500">Due on March 20, 2024</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      content: (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Button variant="outline" size="sm" className="mt-1">
                  Change Password
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates about your account</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5"
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive instant updates on your device</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"
                  />
                </button>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Current Device</p>
                  <p className="text-sm text-gray-500">MacBook Pro • Chrome</p>
                </div>
                <Badge variant="success" dot>
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">iPhone 12</p>
                  <p className="text-sm text-gray-500">Safari • Last active 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">
                  End Session
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
          <Button
            onClick={() => {
              showToast('Profile updated successfully', 'success');
            }}
          >
            Save Changes
          </Button>
        </div>
        <Tabs tabs={tabs} defaultTab="overview" />
      </div>
    </div>
  );
} 