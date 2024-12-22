import { Booking } from '../types/booking';

export function createBookingData(bookingData: Partial<Booking>): Booking {
  if (!bookingData.guestName || !bookingData.email || !bookingData.checkIn || !bookingData.checkOut) {
    throw new Error('Missing required booking data');
  }

  return {
    id: crypto.randomUUID(),
    guestName: bookingData.guestName,
    email: bookingData.email,
    phone: bookingData.phone || '',
    roomId: bookingData.roomId || '',
    checkIn: new Date(bookingData.checkIn),
    checkOut: new Date(bookingData.checkOut),
    status: 'confirmed',
    source: bookingData.source || 'direct',
    specialRequests: bookingData.specialRequests || '',
    totalAmount: bookingData.totalAmount || 0,
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}