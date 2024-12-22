import { useState } from 'react';
import { validatePhoneNumber } from '../utils/phoneValidation';

export function usePhoneValidation(initialValue: string = '') {
  const [phone, setPhone] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (value: string) => {
    const validation = validatePhoneNumber(value);
    setPhone(value);
    setError(validation.error);
    return validation;
  };

  return {
    phone,
    error,
    handlePhoneChange,
    isValid: !error
  };
}