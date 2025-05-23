import React from "react";

interface ButtonProps {
  label: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type,
  className,
  disabled,
  dataTestID,
}) => {
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestID}
    >
      {label}
    </button>
  );
};

export default Button;
