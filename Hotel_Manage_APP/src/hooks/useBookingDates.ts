import { useState } from 'react';
import { addDays, startOfDay, isBefore, isEqual } from 'date-fns';

export function useBookingDates(initialCheckIn?: Date, initialCheckOut?: Date) {
  const today = startOfDay(new Date());
  
  const [checkIn, setCheckIn] = useState<Date>(() => {
    if (initialCheckIn) {
      return isBefore(initialCheckIn, today) ? today : initialCheckIn;
    }
    return today;
  });
  
  const [checkOut, setCheckOut] = useState<Date>(() => {
    if (initialCheckOut) {
      return isBefore(initialCheckOut, checkIn) || isEqual(initialCheckOut, checkIn) 
        ? addDays(checkIn, 1) 
        : initialCheckOut;
    }
    return addDays(checkIn, 1);
  });

  const [dateError, setDateError] = useState<string | null>(null);
  const [dateWarning, setDateWarning] = useState<string | null>(null);

  const handleCheckInChange = (date: string | Date) => {
    // Create date without timezone conversion
    const newDate = typeof date === 'string' 
      ? new Date(date.replace(/-/g, '/')) 
      : date;
    
    if (isBefore(newDate, today)) {
      setDateError('Check-in date cannot be in the past');
      return;
    }

    setCheckIn(newDate);
    setDateError(null);

    // Update checkout if necessary
    if (isBefore(checkOut, newDate) || isEqual(checkOut, newDate)) {
      setCheckOut(addDays(newDate, 1));
    }

    if (isEqual(newDate, today)) {
      setDateWarning('Same-day check-in may not be available. Please consider booking for tomorrow.');
    } else {
      setDateWarning(null);
    }
  };

  const handleCheckOutChange = (date: string | Date) => {
    // Create date without timezone conversion
    const newDate = typeof date === 'string' 
      ? new Date(date.replace(/-/g, '/')) 
      : date;
    
    if (isBefore(newDate, checkIn) || isEqual(newDate, checkIn)) {
      setDateError('Check-out date must be after check-in date');
      return;
    }

    setCheckOut(newDate);
    setDateError(null);
  };

  return {
    checkIn,
    checkOut,
    dateError,
    dateWarning,
    handleCheckInChange,
    handleCheckOutChange,
    minCheckIn: today,
    minCheckOut: addDays(checkIn, 1)
  };
}