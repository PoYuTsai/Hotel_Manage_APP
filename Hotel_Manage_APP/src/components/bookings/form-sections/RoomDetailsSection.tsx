import React from 'react';
import { Booking } from '../../../types/booking';
import { Hotel, MessageSquare } from 'lucide-react';

interface RoomDetailsSectionProps {
  formData: Partial<Booking>;
  onChange: (field: keyof Booking, value: any) => void;
}

export function RoomDetailsSection({ formData, onChange }: RoomDetailsSectionProps) {
  // Mock room data - in a real app, this would come from your backend
  const rooms = [
    { id: 'room-101', number: '101', type: 'Standard' },
    { id: 'room-102', number: '102', type: 'Deluxe' },
    { id: 'room-103', number: '103', type: 'Suite' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Room Details</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Room</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Hotel className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={formData.roomId || ''}
              onChange={(e) => onChange('roomId', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a room</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>
                  Room {room.number} - {room.type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Special Requests</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              value={formData.specialRequests || ''}
              onChange={(e) => onChange('specialRequests', e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Any special requests or notes..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}