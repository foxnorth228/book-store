import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 320px;
`;

export const Title = styled.h1`
  margin-bottom: 8px;
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
