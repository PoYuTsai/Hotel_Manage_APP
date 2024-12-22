import React from 'react';

interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
      {message}
    </div>
  );
}