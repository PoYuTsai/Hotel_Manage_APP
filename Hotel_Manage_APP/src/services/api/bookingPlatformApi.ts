import { Booking, BookingSource } from '../../types/booking';

interface BookingComReservation {
  reservation_id: string;
  guest: {
    name: string;
    email: string;
    phone?: string;
  };
  dates: {
    checkin: string;
    checkout: string;
  };
  room_id: string;
  special_requests?: string;
  price: number;
}

export class BookingPlatformApi {
  private apiKey: string = '';
  private platformId: string = '';

  setCredentials(apiKey: string, platformId: string) {
    this.apiKey = apiKey;
    this.platformId = platformId;
  }

  async fetchNewReservations(): Promise<Booking[]> {
    try {
      // In production, this would make a real API call to Booking.com
      const mockResponse: BookingComReservation[] = [
        {
          reservation_id: '123',
          guest: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890'
          },
          dates: {
            checkin: '2024-03-20',
            checkout: '2024-03-25'
          },
          room_id: 'room_123',
          special_requests: 'Late check-in',
          price: 500
        }
      ];

      return mockResponse.map(this.transformBookingComReservation);
    } catch (error) {
      console.error('Error fetching Booking.com reservations:', error);
      throw new Error('Failed to fetch reservations from Booking.com');
    }
  }

  private transformBookingComReservation(reservation: BookingComReservation): Booking {
    return {
      id: reservation.reservation_id,
      guestName: reservation.guest.name,
      email: reservation.guest.email,
      phone: reservation.guest.phone || '',
      roomId: reservation.room_id,
      checkIn: new Date(reservation.dates.checkin),
      checkOut: new Date(reservation.dates.checkout),
      status: 'confirmed',
      source: 'booking.com',
      specialRequests: reservation.special_requests,
      totalAmount: reservation.price,
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

export const bookingPlatformApi = new BookingPlatformApi();