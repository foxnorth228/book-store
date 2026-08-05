import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  max-width: 420px;

  padding: 32px;

  background: white;
  border-radius: 16px;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  color: #64748b;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  padding: 12px;
  border-radius: 8px;

  cursor: pointer;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 14px;
`;
