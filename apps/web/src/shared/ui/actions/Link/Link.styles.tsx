import styled from "styled-components";

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.primary[600]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[400]};
    outline-offset: 2px;
  }
`;
