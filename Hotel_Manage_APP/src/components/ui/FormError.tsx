import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormErrorProps {
  error?: string;
}

export function FormError({ error }: FormErrorProps) {
  if (!error) return null;

  return (
    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
      {error}
    </p>
  );
}