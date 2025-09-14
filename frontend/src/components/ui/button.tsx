import React from "react";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseStyles = "rounded-md font-medium transition border-2 flex items-center justify-center";

  const variants: Record<Variant, string> = {
    default: "bg-black text-white border-black hover:bg-white hover:text-black",
    outline: "bg-white text-black border-black hover:bg-black hover:text-white",
    ghost: "bg-transparent text-black border-transparent hover:bg-black hover:text-white",
  };

  const sizes: Record<Size, string> = {
    default: "px-4 py-2 h-10",
    sm: "px-3 py-1 h-8",
    lg: "px-6 py-3 h-12",
    icon: "h-10 w-10 p-0",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
