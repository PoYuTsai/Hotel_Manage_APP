import { startOfDay, isToday, addDays } from 'date-fns';

export interface DateValidationResult {
  isValid: boolean;
  error: string | null;
  warning: string | null;
}

export function validateBookingDate(date: Date): DateValidationResult {
  const today = startOfDay(new Date());
  const checkInDate = startOfDay(date);

  if (checkInDate < today) {
    return {
      isValid: false,
      error: 'Check-in date cannot be in the past',
      warning: null
    };
  }

  if (isToday(checkInDate)) {
    return {
      isValid: true,
      error: null,
      warning: 'Same-day check-in may not be available. Please consider booking for tomorrow.'
    };
  }

  return {
    isValid: true,
    error: null,
    warning: null
  };
}