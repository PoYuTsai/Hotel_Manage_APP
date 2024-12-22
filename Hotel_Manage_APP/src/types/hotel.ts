export interface Hotel {
  id: string;
  name: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  totalRooms: number;
}

export interface HotelManager {
  id: string;
  email: string;
  name: string;
  hotelId: string;
  role: 'owner' | 'manager';
}