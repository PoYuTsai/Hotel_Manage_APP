import React from 'react';
import { useTranslation } from 'react-i18next';
import { Wrench, Users, Zap, Package, MoreHorizontal } from 'lucide-react';
import { formatCurrency } from '../../utils/currencyUtils';

interface ExpenseBreakdownProps {
  expensesByCategory: Record<string, number>;
}

export function ExpenseBreakdown({ expensesByCategory }: ExpenseBreakdownProps) {
  const { t, i18n } = useTranslation();

  const categories = [
    { 
      id: 'maintenance',
      name: t('financial.categories.maintenance'),
      amount: expensesByCategory.maintenance || 0,
      icon: Wrench,
      color: 'text-blue-600'
    },
    {
      id: 'salary',
      name: t('financial.categories.salary'),
      amount: expensesByCategory.salary || 0,
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 'utilities',
      name: t('financial.categories.utilities'),
      amount: expensesByCategory.utilities || 0,
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      id: 'supplies',
      name: t('financial.categories.supplies'),
      amount: expensesByCategory.supplies || 0,
      icon: Package,
      color: 'text-purple-600'
    },
    {
      id: 'other',
      name: t('financial.categories.other'),
      amount: expensesByCategory.other || 0,
      icon: MoreHorizontal,
      color: 'text-gray-600'
    }
  ];

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">{t('financial.metrics.expenses')}</h2>
      
      <div className="space-y-4">
        {categories.map(category => {
          const percentage = totalExpenses > 0 ? (category.amount / totalExpenses) * 100 : 0;
          
          return (
            <div key={category.id} className="flex items-center">
              <div className={`p-2 rounded-lg ${category.color} bg-opacity-10 mr-4`}>
                <category.icon className={`w-5 h-5 ${category.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-gray-600">
                    {formatCurrency(category.amount, i18n.language)}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-current ${category.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}