import { FinancialMetrics, ReportTimeframe, Revenue, Expense } from '../types/financial';
import { bookingService } from './bookingService';
import { RevenueCalculator } from './financial/revenueCalculator';
import { ExpenseManager } from './financial/expenseManager';
import { MetricsCalculator } from './financial/metricsCalculator';
import { MonthlyCalculator } from './financial/monthlyCalculator';

class FinancialService {
  private expenseManager = new ExpenseManager();

  async getFinancialMetrics(timeframe: ReportTimeframe): Promise<FinancialMetrics> {
    const bookings = await bookingService.getAllBookings();
    const expenses = this.expenseManager.getExpensesInTimeframe(timeframe);
    
    // Check if it's month-end
    if (MonthlyCalculator.isMonthEnd()) {
      // Calculate next month's metrics
      const nextMonthTimeframe = MonthlyCalculator.getNextMonthTimeframe();
      await MonthlyCalculator.calculateMonthlyMetrics(nextMonthTimeframe);
    }

    return MetricsCalculator.calculateMetrics(bookings, expenses, timeframe);
  }

  async getRevenue(timeframe: ReportTimeframe): Promise<Revenue[]> {
    const bookings = await bookingService.getAllBookings();
    return RevenueCalculator.getRevenueDetails(bookings, timeframe);
  }

  async getExpenses(timeframe: ReportTimeframe): Promise<Expense[]> {
    return this.expenseManager.getExpensesInTimeframe(timeframe);
  }

  async addExpense(expenseData: Omit<Expense, 'id'>): Promise<Expense> {
    return this.expenseManager.addExpense(expenseData);
  }

  async updateExpense(id: string, expenseData: Expense): Promise<Expense> {
    return this.expenseManager.updateExpense(id, expenseData);
  }

  async deleteExpense(id: string): Promise<void> {
    return this.expenseManager.deleteExpense(id);
  }
}

export const financialService = new FinancialService();