import React, { useState } from 'react';
import { Booking, BookingSource } from '../../types/booking';
import { BookingForm } from './BookingForm';

interface ManualBookingFormProps {
  onSubmit: (booking: Partial<Booking>) => Promise<void>;
  onCancel: () => void;
}

export function ManualBookingForm({ onSubmit, onCancel }: ManualBookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (bookingData: Partial<Booking>) => {
    try {
      setIsSubmitting(true);
      await onSubmit({
        ...bookingData,
        source: 'direct' as BookingSource,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">New Manual Booking</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
      <BookingForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}