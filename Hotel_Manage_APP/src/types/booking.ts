export type BookingSource = 'direct' | 'booking.com' | 'airbnb' | 'agoda' | 'expedia';
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  source: BookingSource;
  specialRequests?: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  leadTime?: number;
  platformInfo?: boolean;
}

export interface BookingFilters {
  status?: BookingStatus;
  source?: BookingSource;
  dateRange?: {
    start: Date;
    end: Date;
  };
}