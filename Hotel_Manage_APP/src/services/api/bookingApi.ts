import { Booking } from '../../types/booking';
import { createBookingData } from '../../utils/bookingDataTransform';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for demo purposes
let bookings: Booking[] = [];

export const bookingApi = {
  async create(bookingData: Partial<Booking>): Promise<Booking> {
    await delay(500);
    
    try {
      const newBooking = createBookingData(bookingData);
      bookings.push(newBooking);
      return newBooking;
    } catch (error) {
      throw new Error(`Failed to create booking: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async getAll(): Promise<Booking[]> {
    await delay(300);
    return [...bookings];
  },

  async getById(id: string): Promise<Booking | null> {
    await delay(300);
    return bookings.find(booking => booking.id === id) || null;
  },

  async update(id: string, updates: Partial<Booking>): Promise<Booking> {
    await delay(500);
    
    const index = bookings.findIndex(booking => booking.id === id);
    if (index === -1) throw new Error('Booking not found');

    const updatedBooking = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date()
    };

    bookings[index] = updatedBooking;
    return updatedBooking;
  },

  async delete(id: string): Promise<void> {
    await delay(500);
    bookings = bookings.filter(booking => booking.id !== id);
  }
};