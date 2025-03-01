import React from "react";

interface labelProps {
  htmlFor?: string;
  className?: string;
  labelName: string;
}

const Label: React.FC<labelProps> = ({ htmlFor, labelName, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-base font-semibold m-2 ${className}`}
    >
      {labelName}
    </label>
  );
};

export default Label;
