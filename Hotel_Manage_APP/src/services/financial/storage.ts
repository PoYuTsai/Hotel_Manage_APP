import { Expense } from '../../types/financial';

const STORAGE_KEY = 'hotel_expenses';

export class ExpenseStorage {
  static getExpenses(): Expense[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    try {
      const expenses = JSON.parse(stored);
      return expenses.map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      }));
    } catch {
      return [];
    }
  }

  static saveExpenses(expenses: Expense[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
}