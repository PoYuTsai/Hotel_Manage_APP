import React, { useState } from 'react';
import { addDays } from 'date-fns';
import { Booking } from '../../types/booking';
import { ClientInfoSection } from './form-sections/ClientInfoSection';
import { BookingDatesSection } from './form-sections/BookingDatesSection';
import { RoomDetailsSection } from './form-sections/RoomDetailsSection';
import { PaymentSection } from './form-sections/PaymentSection';
import { useFormValidation } from '../../hooks/useFormValidation';
import { AlertCircle } from 'lucide-react';

interface BookingFormProps {
  onSubmit: (booking: Partial<Booking>) => Promise<void>;
  initialData?: Partial<Booking>;
  onCancel: () => void;
}

export function BookingForm({ onSubmit, initialData, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState<Partial<Booking>>({
    guestName: initialData?.guestName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    checkIn: initialData?.checkIn || new Date(),
    checkOut: initialData?.checkOut || addDays(new Date(), 1),
    roomId: initialData?.roomId || '',
    specialRequests: initialData?.specialRequests || '',
    totalAmount: initialData?.totalAmount || 0,
    status: initialData?.status || 'pending',
    paymentStatus: initialData?.paymentStatus || 'pending',
    source: 'direct'
  });

  const { errors, validateForm } = useFormValidation();
  const [showErrors, setShowErrors] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    if (!validateForm(formData)) {
      // Scroll to the first error
      const firstError = document.querySelector('.text-red-600');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    await onSubmit(formData);
  };

  const updateFormData = (field: keyof Booking, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setShowErrors(false); // Reset errors when user makes changes
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {showErrors && Object.keys(errors).length > 0 && (
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Please correct the following errors:</p>
          </div>
          <ul className="mt-2 list-disc list-inside text-sm text-red-700">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <ClientInfoSection
        formData={formData}
        onChange={updateFormData}
        errors={showErrors ? errors : {}}
      />

      <BookingDatesSection
        formData={formData}
        onChange={updateFormData}
        errors={showErrors ? errors : {}}
      />

      <RoomDetailsSection
        formData={formData}
        onChange={updateFormData}
        errors={showErrors ? errors : {}}
      />

      <PaymentSection
        formData={formData}
        onChange={updateFormData}
        errors={showErrors ? errors : {}}
      />

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {initialData ? 'Update Booking' : 'Create Booking'}
        </button>
      </div>
    </form>
  );
}