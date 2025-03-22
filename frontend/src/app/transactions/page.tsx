'use client';

import { useState } from 'react';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastProvider';

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

export default function TransactionsPage() {
  const { showToast } = useToast();
  const user = getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      description: 'Monthly salary',
      date: '2024-03-15',
    },
    {
      id: '2',
      amount: 150,
      type: 'expense',
      category: 'Groceries',
      description: 'Weekly groceries',
      date: '2024-03-14',
    },
    {
      id: '3',
      amount: 200,
      type: 'expense',
      category: 'Entertainment',
      description: 'Movie night',
      date: '2024-03-13',
    },
  ]);

  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    amount: 0,
    type: 'expense',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category || !newTransaction.date) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount: newTransaction.amount,
      type: newTransaction.type as 'income' | 'expense',
      category: newTransaction.category,
      description: newTransaction.description || '',
      date: newTransaction.date,
    };

    setTransactions([...transactions, transaction]);
    setIsModalOpen(false);
    setNewTransaction({
      amount: 0,
      type: 'expense',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
    showToast('Transaction added successfully', 'success');
  };

  const filteredTransactions = transactions
    .filter((t) => filter === 'all' || t.type === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add Transaction</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Total Income</p>
              <p className="mt-2 text-3xl font-semibold text-green-600">
                ${totalIncome.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="mt-2 text-3xl font-semibold text-red-600">
                ${totalExpenses.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Balance</p>
              <p className={`mt-2 text-3xl font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${balance.toLocaleString()}
              </p>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
            <div className="flex space-x-4">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'income' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('income')}
              >
                Income
              </Button>
              <Button
                variant={filter === 'expense' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('expense')}
              >
                Expenses
              </Button>
            </div>
            <div className="flex space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={transaction.type === 'income' ? 'success' : 'error'}>
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Transaction"
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'income' | 'expense' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter category"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
} 