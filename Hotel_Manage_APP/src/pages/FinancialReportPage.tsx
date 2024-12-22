import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { financialService } from '../services/financialService';
import { FinancialMetrics, ReportTimeframe } from '../types/financial';
import { FinancialOverview } from '../components/financial/FinancialOverview';
import { RevenueChart } from '../components/financial/RevenueChart';
import { ExpenseBreakdown } from '../components/financial/ExpenseBreakdown';
import { ExpenseManager } from '../components/financial/ExpenseManager';
import { ReportControls } from '../components/financial/ReportControls';
import { MetricsGrid } from '../components/financial/MetricsGrid';
import { YearSelector } from '../components/financial/YearSelector';
import { AnnualReport } from '../components/financial/AnnualReport';

export function FinancialReportPage() {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showAnnualReport, setShowAnnualReport] = useState(false);
  const [timeframe, setTimeframe] = useState<ReportTimeframe>(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    return {
      start: startOfMonth,
      end: endOfMonth,
      type: 'monthly'
    };
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFinancialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await financialService.getFinancialMetrics(timeframe);
      setMetrics(data);
    } catch (err) {
      setError(t('financial.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFinancialData();
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe: ReportTimeframe) => {
    setTimeframe(newTimeframe);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-gray-500">{t('common.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('financial.reports')}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <YearSelector
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              onViewAnnualReport={() => setShowAnnualReport(true)}
            />
            <ReportControls
              timeframe={timeframe}
              onTimeframeChange={handleTimeframeChange}
            />
          </div>
        </div>

        {metrics && (
          <div className="mt-6">
            <MetricsGrid metrics={metrics} />
          </div>
        )}
      </div>

      {metrics && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FinancialOverview metrics={metrics} />
              <ExpenseBreakdown expensesByCategory={metrics.expensesByCategory} />
            </div>
            <div className="space-y-6">
              <RevenueChart timeframe={timeframe} />
              <ExpenseManager onExpenseAdded={loadFinancialData} />
            </div>
          </div>
        </>
      )}

      {showAnnualReport && (
        <AnnualReport
          year={selectedYear}
          onClose={() => setShowAnnualReport(false)}
        />
      )}
    </div>
  );
}