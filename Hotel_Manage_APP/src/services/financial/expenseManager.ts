import { Expense, ReportTimeframe } from '../../types/financial';
import { ExpenseStorage } from './storage';

export class ExpenseManager {
  private expenses: Expense[];

  constructor() {
    this.expenses = ExpenseStorage.getExpenses();
  }

  addExpense(expenseData: Omit<Expense, 'id'>): Expense {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID()
    };
    this.expenses.push(newExpense);
    ExpenseStorage.saveExpenses(this.expenses);
    return newExpense;
  }

  updateExpense(id: string, expenseData: Expense): Expense {
    const index = this.expenses.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error('Expense not found');
    }

    this.expenses[index] = expenseData;
    ExpenseStorage.saveExpenses(this.expenses);
    return expenseData;
  }

  deleteExpense(id: string): void {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    ExpenseStorage.saveExpenses(this.expenses);
  }

  getExpensesInTimeframe(timeframe: ReportTimeframe): Expense[] {
    return this.expenses.filter(expense => 
      expense.date >= timeframe.start && expense.date <= timeframe.end
    );
  }

  calculateTotalExpenses(expenses: Expense[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  getExpensesByCategory(): Record<string, number> {
    return this.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
  }
}