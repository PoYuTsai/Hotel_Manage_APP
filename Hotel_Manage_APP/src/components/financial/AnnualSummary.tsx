import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { financialService } from '../../services/financialService';
import { FinancialMetrics } from '../../types/financial';
import { formatCurrency } from '../../utils/currencyUtils';

interface AnnualSummaryProps {
  year: number;
}

export function AnnualSummary({ year }: AnnualSummaryProps) {
  const { t, i18n } = useTranslation();
  const [annualMetrics, setAnnualMetrics] = useState<FinancialMetrics | null>(null);

  useEffect(() => {
    const loadAnnualMetrics = async () => {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      const metrics = await financialService.getFinancialMetrics({
        start: startDate,
        end: endDate,
        type: 'yearly'
      });
      setAnnualMetrics(metrics);
    };
    loadAnnualMetrics();
  }, [year]);

  if (!annualMetrics) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('financial.annualReport.summary')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">
            {t('financial.annualReport.totalRevenue')}
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-900">
            {formatCurrency(annualMetrics.totalRevenue, i18n.language)}
          </p>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">
            {t('financial.annualReport.totalExpenses')}
          </h3>
          <p className="mt-2 text-3xl font-bold text-red-900">
            {formatCurrency(annualMetrics.totalExpenses, i18n.language)}
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">
            {t('financial.annualReport.netProfit')}
          </h3>
          <p className="mt-2 text-3xl font-bold text-blue-900">
            {formatCurrency(annualMetrics.netProfit, i18n.language)}
          </p>
        </div>
      </div>
    </div>
  );
}