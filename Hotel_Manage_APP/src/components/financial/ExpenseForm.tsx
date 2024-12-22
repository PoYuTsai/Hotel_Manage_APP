import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Expense } from '../../types/financial';
import { getCurrencyConfig } from '../../utils/currencyUtils';

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
  onCancel: () => void;
  expense?: Expense | null;
}

export function ExpenseForm({ onSubmit, onCancel, expense }: ExpenseFormProps) {
  const { t, i18n } = useTranslation();
  const [description, setDescription] = useState(expense?.description || '');
  const [amount, setAmount] = useState(expense?.amount.toString() || '');
  const [category, setCategory] = useState<Expense['category']>(expense?.category || 'supplies');

  const { symbol } = getCurrencyConfig(i18n.language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onSubmit({
      id: expense?.id || crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date(),
      recurring: false
    });

    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('financial.expense.description')}
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder={t('financial.expense.descriptionPlaceholder')}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('financial.expense.amount')}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{symbol}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('financial.expense.category')}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Expense['category'])}
            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="maintenance">{t('financial.categories.maintenance')}</option>
            <option value="supplies">{t('financial.categories.supplies')}</option>
            <option value="utilities">{t('financial.categories.utilities')}</option>
            <option value="salary">{t('financial.categories.salary')}</option>
            <option value="other">{t('financial.categories.other')}</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-3 px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {t('common.cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {expense ? t('common.save') : t('financial.expense.add')}
        </button>
      </div>
    </form>
  );
}