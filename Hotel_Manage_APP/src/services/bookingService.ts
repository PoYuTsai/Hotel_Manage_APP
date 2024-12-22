import { Booking } from '../types/booking';
import { bookingApi } from './api/bookingApi';
import { validateBooking } from '../utils/bookingValidation';
import { platformIntegration } from './api/platformIntegration';
import { addDays } from 'date-fns';

class BookingService {
  async getAllBookings(): Promise<Booking[]> {
    try {
      const bookings = await bookingApi.getAll();
      return this.enrichBookingsData(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('Failed to fetch bookings');
    }
  }

  async createDefaultBooking(): Promise<Booking> {
    const tomorrow = addDays(new Date(), 1);
    const checkOut = addDays(tomorrow, 7);

    const bookingData: Partial<Booking> = {
      guestName: 'Eric',
      email: 'eric19921204@gmail.com',
      phone: '+886 987591322',
      checkIn: tomorrow,
      checkOut: checkOut,
      roomId: 'room-101', // First room
      totalAmount: 1000,
      paymentStatus: 'paid',
      status: 'confirmed',
      source: 'direct'
    };

    return this.createBooking(bookingData);
  }

  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    try {
      validateBooking(bookingData);
      const booking = await bookingApi.create(bookingData);
      return this.enrichBookingData(booking);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create booking';
      console.error('Error creating booking:', message);
      throw new Error(message);
    }
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    try {
      const booking = await this.getBookingById(id);
      if (!booking) throw new Error('Booking not found');

      validateBooking({ ...booking, ...updates });
      const updatedBooking = await bookingApi.update(id, updates);
      return this.enrichBookingData(updatedBooking);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update booking';
      console.error('Error updating booking:', message);
      throw new Error(message);
    }
  }

  async deleteBooking(id: string): Promise<void> {
    try {
      await bookingApi.delete(id);
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw new Error('Failed to delete booking');
    }
  }

  async getBookingById(id: string): Promise<Booking | null> {
    try {
      const booking = await bookingApi.getById(id);
      return booking ? this.enrichBookingData(booking) : null;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw new Error('Failed to fetch booking');
    }
  }

  private async enrichBookingData(booking: Booking): Promise<Booking> {
    return {
      ...booking,
      leadTime: this.calculateLeadTime(booking),
      platformInfo: platformIntegration.isPlatformConnected(booking.source),
    };
  }

  private async enrichBookingsData(bookings: Booking[]): Promise<Booking[]> {
    return Promise.all(bookings.map(booking => this.enrichBookingData(booking)));
  }

  private calculateLeadTime(booking: Booking): number {
    const bookingDate = booking.createdAt;
    const checkInDate = booking.checkIn;
    return Math.floor((checkInDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24));
  }
}

export const bookingService = new BookingService();