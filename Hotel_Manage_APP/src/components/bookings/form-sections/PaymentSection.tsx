import React from 'react';
import { Booking } from '../../../types/booking';
import { DollarSign } from 'lucide-react';

interface PaymentSectionProps {
  formData: Partial<Booking>;
  onChange: (field: keyof Booking, value: any) => void;
}

export function PaymentSection({ formData, onChange }: PaymentSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={formData.totalAmount || ''}
              onChange={(e) => onChange('totalAmount', parseFloat(e.target.value))}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Status</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <select
              value={formData.paymentStatus || 'pending'}
              onChange={(e) => onChange('paymentStatus', e.target.value)}
              className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}