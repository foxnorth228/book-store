import { Button, Input, Link } from "@shared/ui";
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
  margin: 0;

  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;

  color: ${({ theme }) => theme.colors.neutral[900]};
`;

export const Description = styled.p`
  margin: 0 0 24px;

  color: ${({ theme }) => theme.colors.neutral[500]};

  font-size: 15px;
  line-height: 1.5;
`;

export const FormInput = styled(Input)`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  margin-top: 24px;

  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: 14px;
`;

export const FooterLink = styled(Link)`
  font-weight: 500;
`;

export const SuccessMessage = styled.div`
  padding: 12px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.success};

  color: white;

  font-size: 14px;
`;
