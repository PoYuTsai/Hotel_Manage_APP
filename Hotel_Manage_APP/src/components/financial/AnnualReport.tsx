import React from 'react';
import { useTranslation } from 'react-i18next';
import { MonthlyMetrics } from './MonthlyMetrics';
import { AnnualSummary } from './AnnualSummary';
import { ReportTimeframe } from '../../types/financial';

interface AnnualReportProps {
  year: number;
  onClose: () => void;
}

export function AnnualReport({ year, onClose }: AnnualReportProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-6xl max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('financial.annualReport.title', { year })}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <AnnualSummary year={year} />
          <MonthlyMetrics year={year} />
        </div>
      </div>
    </div>
  );
}