import { FC, InputHTMLAttributes } from "react";

import { StyledInput } from "./Input.styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: "default" | "error";
}

export const Input: FC<InputProps> = ({ ...props }) => {
  return <StyledInput {...props} />;
};
