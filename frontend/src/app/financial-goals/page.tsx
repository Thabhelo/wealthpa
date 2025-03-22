'use client';

import { useState } from 'react';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastProvider';

interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: 'in_progress' | 'completed' | 'abandoned';
}

export default function FinancialGoalsPage() {
  const { showToast } = useToast();
  const user = getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      description: 'Build a 6-month emergency fund',
      targetAmount: 30000,
      currentAmount: 15000,
      deadline: '2024-12-31',
      status: 'in_progress',
    },
    {
      id: '2',
      title: 'Down Payment',
      description: 'Save for a house down payment',
      targetAmount: 50000,
      currentAmount: 25000,
      deadline: '2025-06-30',
      status: 'in_progress',
    },
    {
      id: '3',
      title: 'Retirement',
      description: 'Max out 401(k) contributions',
      targetAmount: 19500,
      currentAmount: 19500,
      deadline: '2024-12-31',
      status: 'completed',
    },
  ]);

  const [newGoal, setNewGoal] = useState<Partial<FinancialGoal>>({
    title: '',
    description: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    status: 'in_progress',
  });

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const goal: FinancialGoal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newGoal.title,
      description: newGoal.description || '',
      targetAmount: newGoal.targetAmount,
      currentAmount: newGoal.currentAmount || 0,
      deadline: newGoal.deadline,
      status: 'in_progress',
    };

    setGoals([...goals, goal]);
    setIsModalOpen(false);
    setNewGoal({});
    showToast('Financial goal added successfully', 'success');
  };

  const getStatusColor = (status: FinancialGoal['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'abandoned':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Financial Goals</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add New Goal</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-500">{goal.description}</p>
                </div>
                <Badge variant={getStatusColor(goal.status)}>
                  {goal.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="space-y-4 mt-auto">
                <Progress
                  value={goal.currentAmount}
                  max={goal.targetAmount}
                  label={`$${goal.currentAmount.toLocaleString()} / $${goal.targetAmount.toLocaleString()}`}
                  variant={goal.status === 'completed' ? 'success' : 'info'}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                  <span>
                    {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Financial Goal"
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter goal title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={3}
                placeholder="Enter goal description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Target Amount</label>
                <input
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter target amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Amount</label>
                <input
                  type="number"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter current amount"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
} 