import { Booking } from '../../types/booking';
import { Revenue, ReportTimeframe } from '../../types/financial';

export class RevenueCalculator {
  static calculateTotalRevenue(bookings: Booking[], timeframe: ReportTimeframe): number {
    return bookings.reduce((total, booking) => {
      const checkInDate = new Date(booking.checkIn);
      const checkOutDate = new Date(booking.checkOut);
      
      // Only include confirmed and paid bookings
      if (booking.status !== 'confirmed' || booking.paymentStatus !== 'paid') {
        return total;
      }

      // Check if booking falls within timeframe
      const isInTimeframe = (
        (checkInDate >= timeframe.start && checkInDate <= timeframe.end) ||
        (checkOutDate >= timeframe.start && checkOutDate <= timeframe.end) ||
        (checkInDate <= timeframe.start && checkOutDate >= timeframe.end)
      );
      
      if (!isInTimeframe) {
        return total;
      }

      // Calculate revenue for days within timeframe
      const startDate = new Date(Math.max(checkInDate.getTime(), timeframe.start.getTime()));
      const endDate = new Date(Math.min(checkOutDate.getTime(), timeframe.end.getTime()));
      const daysInTimeframe = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const dailyRate = booking.totalAmount / Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      
      return total + (dailyRate * daysInTimeframe);
    }, 0);
  }

  static getRevenueDetails(bookings: Booking[], timeframe: ReportTimeframe): Revenue[] {
    return bookings
      .filter(booking => {
        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);
        
        return (
          booking.status === 'confirmed' &&
          booking.paymentStatus === 'paid' &&
          ((checkInDate >= timeframe.start && checkInDate <= timeframe.end) ||
           (checkOutDate >= timeframe.start && checkOutDate <= timeframe.end) ||
           (checkInDate <= timeframe.start && checkOutDate >= timeframe.end))
        );
      })
      .map(booking => ({
        id: booking.id,
        date: new Date(booking.checkIn),
        amount: booking.totalAmount,
        source: booking.source,
        bookingId: booking.id,
        description: `Booking for ${booking.guestName}`
      }));
  }
}