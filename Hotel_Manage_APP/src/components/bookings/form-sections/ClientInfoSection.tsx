import React from 'react';
import { Booking } from '../../../types/booking';
import { User, Mail, Phone, AlertTriangle } from 'lucide-react';
import { usePhoneValidation } from '../../../hooks/usePhoneValidation';

interface ClientInfoSectionProps {
  formData: Partial<Booking>;
  onChange: (field: keyof Booking, value: any) => void;
}

export function ClientInfoSection({ formData, onChange }: ClientInfoSectionProps) {
  const { error: phoneError, handlePhoneChange } = usePhoneValidation(formData.phone);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validation = handlePhoneChange(e.target.value);
    onChange('phone', validation.formattedNumber || e.target.value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Client Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Guest Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              value={formData.guestName || ''}
              onChange={(e) => onChange('guestName', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={formData.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={handlePhoneInput}
              className={`pl-10 block w-full rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                phoneError ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          {phoneError && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              {phoneError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}