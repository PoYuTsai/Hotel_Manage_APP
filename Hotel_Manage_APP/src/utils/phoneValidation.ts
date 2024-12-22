export interface PhoneValidationResult {
  isValid: boolean;
  error: string | null;
  formattedNumber: string | null;
}

export function validatePhoneNumber(phone: string): PhoneValidationResult {
  // Remove all non-digit characters except + for international prefix
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Basic validation rules
  if (!cleaned) {
    return {
      isValid: true, // Phone is optional
      error: null,
      formattedNumber: null
    };
  }

  if (cleaned.length < 10) {
    return {
      isValid: false,
      error: 'Phone number must have at least 10 digits',
      formattedNumber: null
    };
  }

  if (cleaned.length > 15) {
    return {
      isValid: false,
      error: 'Phone number is too long',
      formattedNumber: null
    };
  }

  // Format the phone number
  let formatted = cleaned;
  if (cleaned.startsWith('+')) {
    // International format
    formatted = cleaned;
  } else if (cleaned.length === 10) {
    // US format
    formatted = `+1${cleaned}`;
  }

  return {
    isValid: true,
    error: null,
    formattedNumber: formatted
  };
}