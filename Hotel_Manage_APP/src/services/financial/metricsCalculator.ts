import { Booking } from '../../types/booking';
import { FinancialMetrics, Expense, ReportTimeframe } from '../../types/financial';
import { RevenueCalculator } from './revenueCalculator';

export class MetricsCalculator {
  private static readonly TOTAL_ROOMS = 20;

  static calculateMetrics(bookings: Booking[], expenses: Expense[], timeframe: ReportTimeframe): FinancialMetrics {
    const totalRevenue = RevenueCalculator.calculateTotalRevenue(bookings, timeframe);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate expenses by category
    const expensesByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {
      maintenance: 0,
      salary: 0,
      utilities: 0,
      supplies: 0,
      other: 0
    });

    // Calculate occupancy rate for the selected timeframe
    const occupancyRate = this.calculateOccupancyRate(bookings, timeframe);
    
    // Calculate ADR (Average Daily Rate)
    const adr = this.calculateADR(bookings, timeframe);
    
    // Calculate RevPAR (Revenue Per Available Room)
    const revPAR = this.calculateRevPAR(totalRevenue, timeframe);
    
    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      occupancyRate,
      adr,
      revPAR,
      expensesByCategory
    };
  }

  private static calculateOccupancyRate(bookings: Booking[], timeframe: ReportTimeframe): number {
    const confirmedBookings = bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return (
        booking.status === 'confirmed' &&
        booking.paymentStatus === 'paid' &&
        checkIn <= timeframe.end &&
        checkOut >= timeframe.start
      );
    });

    const daysInPeriod = Math.ceil((timeframe.end.getTime() - timeframe.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const totalAvailableRoomDays = this.TOTAL_ROOMS * daysInPeriod;
    const occupiedRoomDays = confirmedBookings.length;

    return occupiedRoomDays / totalAvailableRoomDays;
  }

  private static calculateADR(bookings: Booking[], timeframe: ReportTimeframe): number {
    const confirmedBookings = bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn);
      return (
        booking.status === 'confirmed' &&
        booking.paymentStatus === 'paid' &&
        checkIn >= timeframe.start &&
        checkIn <= timeframe.end
      );
    });

    if (confirmedBookings.length === 0) return 0;

    const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    return totalRevenue / confirmedBookings.length;
  }

  private static calculateRevPAR(totalRevenue: number, timeframe: ReportTimeframe): number {
    const daysInPeriod = Math.ceil((timeframe.end.getTime() - timeframe.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const totalAvailableRooms = this.TOTAL_ROOMS * daysInPeriod;
    return totalRevenue / totalAvailableRooms;
  }
}