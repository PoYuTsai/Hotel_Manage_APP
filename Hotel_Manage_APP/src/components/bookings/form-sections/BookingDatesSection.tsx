import React from 'react';
import { Booking } from '../../../types/booking';
import { Calendar, AlertTriangle } from 'lucide-react';
import { formatDateForInput } from '../../../utils/dateUtils';
import { useBookingDates } from '../../../hooks/useBookingDates';

interface BookingDatesSectionProps {
  formData: Partial<Booking>;
  onChange: (field: keyof Booking, value: any) => void;
}

export function BookingDatesSection({ formData, onChange }: BookingDatesSectionProps) {
  const {
    checkIn,
    checkOut,
    dateError,
    dateWarning,
    handleCheckInChange,
    handleCheckOutChange,
    minCheckIn,
    minCheckOut
  } = useBookingDates(
    formData.checkIn ? new Date(formData.checkIn) : undefined,
    formData.checkOut ? new Date(formData.checkOut) : undefined
  );

  const handleDateChange = (field: 'checkIn' | 'checkOut', value: string) => {
    const date = new Date(value);
    if (field === 'checkIn') {
      handleCheckInChange(date);
      onChange('checkIn', date);
    } else {
      handleCheckOutChange(date);
      onChange('checkOut', date);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Booking Dates</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              required
              min={formatDateForInput(minCheckIn)}
              value={formatDateForInput(checkIn)}
              onChange={(e) => handleDateChange('checkIn', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              required
              min={formatDateForInput(minCheckOut)}
              value={formatDateForInput(checkOut)}
              onChange={(e) => handleDateChange('checkOut', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {dateError && (
        <p className="text-sm text-red-600 mt-1 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          {dateError}
        </p>
      )}
      
      {dateWarning && (
        <p className="text-sm text-amber-600 mt-1 flex items-center gap-2 bg-amber-50 p-2 rounded">
          <AlertTriangle className="h-4 w-4" />
          {dateWarning}
        </p>
      )}
    </div>
  );
}