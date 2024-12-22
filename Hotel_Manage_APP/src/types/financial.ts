export interface Revenue {
  id: string;
  date: Date;
  amount: number;
  source: 'direct' | 'booking.com' | 'airbnb' | 'expedia';
  bookingId?: string;
  description?: string;
}

export interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: 'maintenance' | 'salary' | 'utilities' | 'supplies' | 'other';
  description: string;
  recurring: boolean;
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  occupancyRate: number;
  adr: number; // Average Daily Rate
  revPAR: number; // Revenue Per Available Room
  expensesByCategory: {
    maintenance: number;
    salary: number;
    utilities: number;
    supplies: number;
    other: number;
  };
}

export interface ReportTimeframe {
  start: Date;
  end: Date;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
}