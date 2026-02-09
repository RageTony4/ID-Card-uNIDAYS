
import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDark?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, isDark }) => {
  return (
    <div>
      <label htmlFor={name} className={`block text-sm font-medium transition-colors duration-300 ${isDark ? 'text-zinc-400' : 'text-gray-700'}`}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-300 ${isDark ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500' : 'bg-white border-gray-300 text-black'}`}
      />
    </div>
  );
};

export default InputField;
