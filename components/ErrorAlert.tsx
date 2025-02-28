// components/ErrorAlert.tsx
import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
    <p>{message}</p>
  </div>
);

export default ErrorAlert;
