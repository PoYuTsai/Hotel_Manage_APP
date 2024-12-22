import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, DollarSign, Percent, Hotel } from 'lucide-react';
import { FinancialMetrics } from '../../types/financial';

interface MetricsGridProps {
  metrics: FinancialMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const { t, i18n } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(i18n.language === 'zh-TW' ? 'zh-TW' : 'en-US', {
      style: 'currency',
      currency: i18n.language === 'zh-TW' ? 'TWD' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const cards = [
    {
      title: t('financial.metrics.revenue'),
      value: formatCurrency(metrics.totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: t('financial.metrics.expenses'),
      value: formatCurrency(metrics.totalExpenses),
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: t('financial.metrics.occupancy'),
      value: `${Math.round(metrics.occupancyRate * 100)}%`,
      icon: Hotel,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('financial.metrics.revPAR'),
      value: formatCurrency(metrics.revPAR),
      icon: Percent,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="relative overflow-hidden rounded-lg bg-white p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="relative z-10">
              <p className="text-sm text-gray-600">{card.title}</p>
              <p className="text-2xl font-semibold mt-1">{card.value}</p>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
          <div className={`absolute inset-0 ${card.bgColor} opacity-[0.03]`} />
        </div>
      ))}
    </div>
  );
}