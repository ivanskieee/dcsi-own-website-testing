import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string; // add className as optional
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md bg-black text-white hover:bg-white hover:text-black border-2 border-black transition ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};