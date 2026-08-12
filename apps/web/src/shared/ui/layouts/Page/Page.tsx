import styled from "styled-components";

export const PageHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;

  width: 100%;

  background: ${({ theme }) => theme.colors.neutral[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[300]};
`;

export const PageMain = styled.main`
  flex: 1;
  width: 100%;
`;

export const PageFooter = styled.footer`
  width: 100%;

  background: ${({ theme }) => theme.colors.primary[900]};
  color: ${({ theme }) => theme.colors.neutral[50]};
`;

export const PageContent = styled.div`
  width: min(calc(100% - 48px), 1280px);
  margin: 0 auto;
`;

export const Page = Object.assign(
  styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  {
    Header: PageHeader,
    Main: PageMain,
    Content: PageContent,
    Footer: PageFooter,
  },
);
