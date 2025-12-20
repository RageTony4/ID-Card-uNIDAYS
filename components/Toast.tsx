
import React, { useEffect } from 'react';
import { ToastType } from '../types';

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

const typeClasses = {
  info: 'border-blue-500 text-blue-500',
  success: 'border-green-500 text-green-500',
  error: 'border-red-500 text-red-500',
};

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onDismiss]);

  return (
    <div
      className={`fixed top-5 right-5 bg-white p-4 rounded-lg shadow-lg z-50 border-2 transition-transform transform translate-x-0 ${typeClasses[type]}`}
      role="alert"
    >
      <p className="font-semibold">{message}</p>
    </div>
  );
};

export default Toast;
