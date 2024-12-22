import React from 'react';
import { Room } from '../types';

const mockRooms: Room[] = [
  { id: '1', number: '101', type: 'single', status: 'available', price: 100 },
  { id: '2', number: '102', type: 'double', status: 'occupied', price: 150 },
  { id: '3', number: '103', type: 'suite', status: 'maintenance', price: 300 },
  { id: '4', number: '104', type: 'single', status: 'available', price: 100 },
  { id: '5', number: '105', type: 'double', status: 'occupied', price: 150 },
  { id: '6', number: '106', type: 'suite', status: 'available', price: 300 },
];

const statusColors = {
  available: 'bg-green-100 text-green-800',
  occupied: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-red-100 text-red-800',
};

export function RoomGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockRooms.map((room) => (
        <div
          key={room.id}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Room {room.number}</h3>
              <p className="text-gray-600 capitalize">{room.type}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[room.status]
              }`}
            >
              {room.status}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">${room.price}</p>
            <p className="text-gray-600">per night</p>
          </div>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={room.status !== 'available'}
          >
            {room.status === 'available' ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      ))}
    </div>
  );
}