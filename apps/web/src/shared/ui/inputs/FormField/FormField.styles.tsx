import styled from "styled-components";

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.neutral[700]};
`;

export const ErrorText = styled.span`
  font-size: 13px;

  color: ${({ theme }) => theme.colors.error};
`;

export const HelperText = styled.span`
  font-size: 13px;

  color: ${({ theme }) => theme.colors.neutral[500]};
`;
