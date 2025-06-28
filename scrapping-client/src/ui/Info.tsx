import React from 'react';

interface InfoProps {
  message: string;
  type?: 'info' | 'error';
}

export function Info({ message, type = 'info' }: InfoProps) {
  const baseClasses = 'text-center mt-8 p-4 border rounded-lg';
  const typeClasses =
    type === 'error'
      ? 'bg-red-50 border-red-200 text-red-600'
      : 'bg-gray-50 border-gray-200 text-gray-600';

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <p>{message}</p>
    </div>
  );
}
