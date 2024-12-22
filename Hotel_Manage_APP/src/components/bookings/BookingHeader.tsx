import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

interface BookingHeaderProps {
  onNewBooking: () => void;
}

export function BookingHeader({ onNewBooking }: BookingHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{t('bookings.title')}</h1>
      <button
        onClick={onNewBooking}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-4 h-4" />
        {t('bookings.newBooking')}
      </button>
    </div>
  );
}