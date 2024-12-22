import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  onViewAnnualReport: () => void;
}

export function YearSelector({ selectedYear, onYearChange, onViewAnnualReport }: YearSelectorProps) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="flex items-center gap-4">
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <button
        onClick={onViewAnnualReport}
        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        <Calendar className="w-4 h-4" />
        {t('financial.viewAnnualReport')}
      </button>
    </div>
  );
}