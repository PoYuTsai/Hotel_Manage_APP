import { format, addDays, startOfDay, endOfMonth } from 'date-fns';

export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getMinCheckInDate(): Date {
  return startOfDay(new Date());
}

export function getMinCheckOutDate(checkIn: Date): Date {
  return addDays(checkIn, 1);
}

export function getMonthOptions(): string[] {
  return [
    '1 月',
    '2 月',
    '3 月',
    '4 月',
    '5 月',
    '6 月',
    '7 月',
    '8 月',
    '9 月',
    '10 月',
    '11 月',
    '12 月'
  ];
}

export function getYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  // Generate years from 2024 to currentYear + 30
  const startYear = 2024;
  const endYear = currentYear + 30;
  
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
}

export function getMonthDateRange(year: number, month: number) {
  const startDate = new Date(year, month, 1);
  const endDate = endOfMonth(startDate);
  return { startDate, endDate };
}