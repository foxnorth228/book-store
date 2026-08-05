import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  height: 44px;

  margin-top: 8px;

  border: none;
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.primary[600]};

  color: ${({ theme }) => theme.colors.neutral[50]};

  font-size: 15px;
  font-weight: 500;

  cursor: pointer;

  transition:
    background ${({ theme }) => theme.transitions.fast},
    opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary[700]};
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;
