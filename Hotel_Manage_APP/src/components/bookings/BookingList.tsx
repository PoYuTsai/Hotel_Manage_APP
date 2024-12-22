import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { Trash2, Edit } from 'lucide-react';
import { Booking } from '../../types/booking';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/currencyUtils';

interface BookingListProps {
  bookings: Booking[];
  onViewDetails: (booking: Booking) => void;
  onDeleteBooking: (id: string) => void;
}

export function BookingList({ bookings, onViewDetails, onDeleteBooking }: BookingListProps) {
  const { t, i18n } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('bookings.confirmDelete'))) {
      onDeleteBooking(id);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t('bookings.noBookings')}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('bookings.guestInfo')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('bookings.dates')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('bookings.status')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('bookings.source')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('bookings.amount')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('common.actions')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {booking.guestName}
                </div>
                <div className="text-sm text-gray-500">{booking.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(booking.checkIn, 'yyyy/MM/dd')}
                </div>
                <div className="text-sm text-gray-500">
                  {format(booking.checkOut, 'yyyy/MM/dd')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge color={getStatusColor(booking.status)}>
                  {t(`bookings.statuses.${booking.status}`)}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {t(`bookings.sources.${booking.source}`)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatCurrency(booking.totalAmount, i18n.language)}
                </div>
                <div className="text-sm text-gray-500">
                  {t(`bookings.paymentStatuses.${booking.paymentStatus}`)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onViewDetails(booking)}
                    className="text-blue-600 hover:text-blue-900"
                    title={t('common.edit')}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="text-red-600 hover:text-red-900"
                    title={t('common.delete')}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}