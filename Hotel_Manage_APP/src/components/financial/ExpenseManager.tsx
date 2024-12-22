import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { Expense } from '../../types/financial';
import { financialService } from '../../services/financialService';

interface ExpenseManagerProps {
  onExpenseAdded: () => void;
}

export function ExpenseManager({ onExpenseAdded }: ExpenseManagerProps) {
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const timeframe = {
      start: new Date(new Date().setDate(1)), // Start of current month
      end: new Date(),
      type: 'monthly' as const
    };
    const data = await financialService.getExpenses(timeframe);
    setExpenses(data);
  };

  const handleAddExpense = async (expenseData: Omit<Expense, 'id'>) => {
    const newExpense = await financialService.addExpense(expenseData);
    await loadExpenses();
    onExpenseAdded();
    setEditingExpense(null);
  };

  const handleEditExpense = async (expenseData: Expense) => {
    await financialService.updateExpense(expenseData.id, expenseData);
    await loadExpenses();
    onExpenseAdded();
    setEditingExpense(null);
  };

  const handleDeleteExpense = async (id: string) => {
    await financialService.deleteExpense(id);
    await loadExpenses();
    onExpenseAdded();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">{t('financial.expense.title')}</h2>
      
      <div className="space-y-6">
        <ExpenseForm 
          onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
          onCancel={() => setEditingExpense(null)}
          expense={editingExpense}
        />
        
        {expenses.length > 0 ? (
          <ExpenseList 
            expenses={expenses} 
            onDelete={handleDeleteExpense}
            onEdit={setEditingExpense}
          />
        ) : (
          <p className="text-center text-gray-500 py-8">
            {t('financial.expense.noExpenses')}
          </p>
        )}
      </div>
    </div>
  );
}