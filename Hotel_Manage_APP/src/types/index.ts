export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite';
  status: 'available' | 'occupied' | 'maintenance';
  price: number;
}

export interface Booking {
  id: string;
  guestName: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  source: 'direct' | 'booking.com' | 'airbnb' | 'agoda';
}