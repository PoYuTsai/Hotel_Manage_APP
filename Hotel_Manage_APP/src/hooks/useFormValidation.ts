import { useState } from 'react';
import { Booking } from '../types/booking';

interface FormErrors {
  guestName?: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  roomId?: string;
  totalAmount?: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (formData: Partial<Booking>): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.guestName?.trim()) {
      newErrors.guestName = 'Guest name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.roomId) {
      newErrors.roomId = 'Please select a room';
    }

    if (!formData.totalAmount || formData.totalAmount <= 0) {
      newErrors.totalAmount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    validateForm,
    setErrors
  };
}