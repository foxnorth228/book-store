import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: "default" | "error";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ ...props }, ref) {
  return <input ref={ref} {...props} />;
});
