import React from 'react';
import { format } from 'date-fns';
import { Booking } from '../../types/booking';
import { Badge } from '../ui/Badge';

interface BookingDetailsProps {
  booking: Booking;
}

export function BookingDetails({ booking }: BookingDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Guest Information</h3>
          <p className="mt-1">{booking.guestName}</p>
          <p className="text-sm text-gray-600">{booking.email}</p>
          {booking.phone && <p className="text-sm text-gray-600">{booking.phone}</p>}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Dates</h3>
          <p className="mt-1">
            Check-in: {format(booking.checkIn, 'MMM dd, yyyy')}
          </p>
          <p>Check-out: {format(booking.checkOut, 'MMM dd, yyyy')}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Status</h3>
          <div className="mt-1">
            <Badge color={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Payment</h3>
          <p className="mt-1">Total: ${booking.totalAmount}</p>
          <Badge color={getPaymentStatusColor(booking.paymentStatus)}>
            {booking.paymentStatus}
          </Badge>
        </div>

        {booking.specialRequests && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Special Requests</h3>
            <p className="mt-1 text-sm">{booking.specialRequests}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusColor(status: Booking['status']): string {
  const colors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colors[status];
}

function getPaymentStatusColor(status: Booking['paymentStatus']): string {
  const colors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    refunded: 'bg-gray-100 text-gray-800',
  };
  return colors[status];
}