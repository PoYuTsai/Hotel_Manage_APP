import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color: string;
}

export function Badge({ children, color }: BadgeProps) {
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
      {children}
    </span>
  );
}