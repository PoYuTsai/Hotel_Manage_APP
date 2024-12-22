import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { financialService } from '../../services/financialService';
import { FinancialMetrics } from '../../types/financial';
import { formatCurrency } from '../../utils/currencyUtils';

interface MonthlyMetricsProps {
  year: number;
}

export function MonthlyMetrics({ year }: MonthlyMetricsProps) {
  const { t, i18n } = useTranslation();
  const [monthlyData, setMonthlyData] = useState<(FinancialMetrics & { month: number })[]>([]);

  useEffect(() => {
    const loadMonthlyData = async () => {
      const data = [];
      for (let month = 0; month < 12; month++) {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        const metrics = await financialService.getFinancialMetrics({
          start: startDate,
          end: endDate,
          type: 'monthly'
        });
        data.push({ ...metrics, month });
      }
      setMonthlyData(data);
    };
    loadMonthlyData();
  }, [year]);

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">{t('financial.annualReport.monthlyBreakdown')}</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('financial.month')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('financial.annualReport.totalRevenue')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('financial.annualReport.totalExpenses')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('financial.annualReport.netProfit')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('financial.annualReport.occupancyRate')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {monthlyData.map((data) => (
            <tr key={data.month}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {t(`financial.months.${data.month}`)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatCurrency(data.totalRevenue, i18n.language)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatCurrency(data.totalExpenses, i18n.language)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                <span className={data.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(data.netProfit, i18n.language)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {(data.occupancyRate * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}