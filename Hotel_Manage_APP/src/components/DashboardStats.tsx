import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, Hotel, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/currencyUtils';

export function DashboardStats() {
  const { t, i18n } = useTranslation();

  const stats = [
    {
      name: t('dashboard.totalRevenue'),
      value: formatCurrency(13456, i18n.language),
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: t('dashboard.occupancyRate'),
      value: '78%',
      change: '+4.2%',
      icon: Hotel,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: t('dashboard.totalBookings'),
      value: '156',
      change: '+8.1%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: t('dashboard.activeGuests'),
      value: '42',
      change: '+2.4%',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">
              {stat.change}
            </span>
            <span className="text-gray-600 text-sm ml-2">
              {t('dashboard.vsLastMonth')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}