import React from "react";

interface InputProps {
  type?: string;
  htmlFor?: string;
  id?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  value,
  placeholder,
  className = "",
  disabled = false,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${className}`}
        disabled={disabled}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
