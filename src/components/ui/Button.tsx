import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive";
  size?: "icon" | "default";
}

export function Button({ variant = "default", size = "default", className, ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition";
  const variantStyles =
    variant === "destructive" ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-500 text-white hover:bg-blue-600";
  const sizeStyles = size === "icon" ? "p-2 flex items-center justify-center" : "";

  return <button className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`} {...props} />;
}
