import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { ReportTimeframe } from '../../types/financial';
import { getMonthOptions, getYearOptions } from '../../utils/dateUtils';

interface ReportControlsProps {
  timeframe: ReportTimeframe;
  onTimeframeChange: (timeframe: ReportTimeframe) => void;
}

export function ReportControls({ timeframe, onTimeframeChange }: ReportControlsProps) {
  const { t } = useTranslation();
  const monthOptions = getMonthOptions();
  const yearOptions = getYearOptions();

  const handleMonthChange = (month: number) => {
    const year = new Date(timeframe.start).getFullYear();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    onTimeframeChange({
      start: startDate,
      end: endDate,
      type: 'monthly'
    });
  };

  const handleYearChange = (year: number) => {
    const month = new Date(timeframe.start).getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    onTimeframeChange({
      start: startDate,
      end: endDate,
      type: 'monthly'
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <select
          value={new Date(timeframe.start).getFullYear()}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {yearOptions.map(year => (
            <option key={year} value={year}>{year} 年</option>
          ))}
        </select>

        <select
          value={new Date(timeframe.start).getMonth()}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {monthOptions.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="w-4 h-4 mr-2" />
        <span>
          {new Date(timeframe.start).toLocaleDateString('zh-TW')} - {new Date(timeframe.end).toLocaleDateString('zh-TW')}
        </span>
      </div>
    </div>
  );
}