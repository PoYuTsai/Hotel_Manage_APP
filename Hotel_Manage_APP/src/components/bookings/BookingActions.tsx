import React from 'react';
import { Booking } from '../../types/booking';
import { Edit2, Trash2 } from 'lucide-react';

interface BookingActionsProps {
  booking: Booking;
  onEdit: (booking: Booking) => void;
  onDelete: (id: string) => void;
}

export function BookingActions({ booking, onEdit, onDelete }: BookingActionsProps) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      onDelete(booking.id);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onEdit(booking)}
        className="p-1 text-blue-600 hover:text-blue-800"
        title="Edit booking"
      >
        <Edit2 className="w-5 h-5" />
      </button>
      <button
        onClick={handleDelete}
        className="p-1 text-red-600 hover:text-red-800"
        title="Delete booking"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}