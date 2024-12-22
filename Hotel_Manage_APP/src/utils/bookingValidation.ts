import { Booking } from '../types/booking';

export function validateBooking(bookingData: Partial<Booking>): void {
  const requiredFields = ['guestName', 'email', 'checkIn', 'checkOut'];
  const missingFields = requiredFields.filter(
    field => !bookingData[field as keyof Partial<Booking>]
  );

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  if (bookingData.checkIn && bookingData.checkOut) {
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    
    if (checkIn >= checkOut) {
      throw new Error('Check-out date must be after check-in date');
    }

    if (checkIn < new Date()) {
      throw new Error('Check-in date cannot be in the past');
    }
  }

  if (bookingData.email && !isValidEmail(bookingData.email)) {
    throw new Error('Invalid email address');
  }

  if (bookingData.phone && !isValidPhone(bookingData.phone)) {
    throw new Error('Invalid phone number');
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
}