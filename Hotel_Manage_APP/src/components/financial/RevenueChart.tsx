import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ReportTimeframe } from '../../types/financial';
import { financialService } from '../../services/financialService';
import { formatCurrency } from '../../utils/currencyUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueChartProps {
  timeframe: ReportTimeframe;
}

export function RevenueChart({ timeframe }: RevenueChartProps) {
  const { t, i18n } = useTranslation();
  const [metrics, setMetrics] = React.useState(() => financialService.getFinancialMetrics(timeframe));

  React.useEffect(() => {
    const loadMetrics = async () => {
      const data = await financialService.getFinancialMetrics(timeframe);
      setMetrics(data);
    };
    loadMetrics();
  }, [timeframe]);

  // Get month name in current language
  const getMonthName = (date: Date) => {
    return date.toLocaleString(i18n.language, { month: 'long' });
  };

  // Format the date range for the label
  const formatDateRange = () => {
    const startMonth = getMonthName(timeframe.start);
    const endMonth = getMonthName(timeframe.end);
    const startYear = timeframe.start.getFullYear();
    const endYear = timeframe.end.getFullYear();

    if (startYear === endYear && startMonth === endMonth) {
      return `${startMonth} ${startYear}`;
    }
    return `${startMonth} - ${endMonth} ${startYear}`;
  };

  const data = {
    labels: [formatDateRange()],
    datasets: [
      {
        label: t('financial.metrics.revenue'),
        data: [metrics.totalRevenue],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      },
      {
        label: t('financial.metrics.expenses'),
        data: [metrics.totalExpenses],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => formatCurrency(value, i18n.language)
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${formatCurrency(value, i18n.language)}`;
          }
        }
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 12
          },
          padding: 20
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">{t('financial.metrics.revenue')}</h2>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}