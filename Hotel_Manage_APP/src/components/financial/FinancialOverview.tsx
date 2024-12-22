import React from 'react';
import { useTranslation } from 'react-i18next';
import { FinancialMetrics } from '../../types/financial';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface FinancialOverviewProps {
  metrics: FinancialMetrics;
}

export function FinancialOverview({ metrics }: FinancialOverviewProps) {
  const { t, i18n } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(i18n.language === 'zh-TW' ? 'zh-TW' : 'en-US', {
      style: 'currency',
      currency: i18n.language === 'zh-TW' ? 'TWD' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const profitMargin = metrics.totalRevenue > 0 
    ? (metrics.netProfit / metrics.totalRevenue) * 100 
    : 0;
    
  const isProfitable = metrics.netProfit > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">{t('financial.metrics.netProfit')}</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold">
            {formatCurrency(metrics.netProfit)}
          </p>
          <div className="flex items-center mt-1">
            <span className={`flex items-center ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {isProfitable ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(profitMargin).toFixed(1)}%
            </span>
            <span className="text-gray-500 text-sm ml-2">{t('dashboard.vsLastMonth')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-600">{t('financial.metrics.revenue')}</p>
            <p className="text-xl font-semibold mt-1">{formatCurrency(metrics.totalRevenue)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('financial.metrics.expenses')}</p>
            <p className="text-xl font-semibold mt-1">{formatCurrency(metrics.totalExpenses)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}