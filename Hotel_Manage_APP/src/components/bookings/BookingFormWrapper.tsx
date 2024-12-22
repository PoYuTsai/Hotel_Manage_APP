import React from 'react';
import { useTranslation } from 'react-i18next';
import { Booking } from '../../types/booking';
import { BookingForm } from './BookingForm';

interface BookingFormWrapperProps {
  selectedBooking: Booking | null;
  onSubmit: (booking: Partial<Booking>) => Promise<void>;
  onCancel: () => void;
}

export function BookingFormWrapper({ 
  selectedBooking, 
  onSubmit, 
  onCancel 
}: BookingFormWrapperProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {selectedBooking ? t('bookings.editBooking') : t('bookings.newBooking')}
        </h2>
      </div>
      <BookingForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        initialData={selectedBooking || undefined}
      />
    </div>
  );
}