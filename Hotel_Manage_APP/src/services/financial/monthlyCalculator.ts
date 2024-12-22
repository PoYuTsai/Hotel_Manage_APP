import { Booking } from '../../types/booking';
import { ReportTimeframe, FinancialMetrics } from '../../types/financial';
import { RevenueCalculator } from './revenueCalculator';
import { ExpenseManager } from './expenseManager';
import { MetricsCalculator } from './metricsCalculator';

export class MonthlyCalculator {
  private static expenseManager = new ExpenseManager();

  static async calculateMonthlyMetrics(timeframe: ReportTimeframe): Promise<FinancialMetrics> {
    // Get all confirmed and paid bookings for the month
    const bookings = await this.getMonthlyBookings(timeframe);
    const expenses = this.expenseManager.getExpensesInTimeframe(timeframe);

    return MetricsCalculator.calculateMetrics(bookings, expenses, timeframe);
  }

  private static async getMonthlyBookings(timeframe: ReportTimeframe): Promise<Booking[]> {
    // In a real app, this would fetch from an API or database
    // For now, we'll use the mock data
    const mockBooking: Booking = {
      id: '123',
      guestName: 'Eric',
      email: 'eric19921204@gmail.com',
      phone: '+886 987591322',
      roomId: 'room-101',
      checkIn: new Date('2024-12-01'),
      checkOut: new Date('2024-12-07'),
      status: 'confirmed',
      source: 'direct',
      totalAmount: 1000,
      paymentStatus: 'paid',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return [mockBooking];
  }

  static isMonthEnd(): boolean {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return today.getDate() === lastDayOfMonth.getDate();
  }

  static getNextMonthTimeframe(): ReportTimeframe {
    const today = new Date();
    const firstDayNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    return {
      start: firstDayNextMonth,
      end: lastDayNextMonth,
      type: 'monthly'
    };
  }
}