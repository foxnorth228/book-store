import { cn } from "#lib/utils";
import { FC, PropsWithChildren } from "react";

export interface WithClassName {
  className?: string;
}

export type BaseComponentProps = PropsWithChildren<WithClassName>;

export const PageHeader: FC<BaseComponentProps> = ({ children, className }) => {
  return (
    <header
      className={cn(
        "border-border bg-header sticky top-0 z-10 flex w-full items-center border-b transition-colors",
        className,
      )}
    >
      {children}
    </header>
  );
};

export const PageHeaderContent: FC<BaseComponentProps> = ({ children, className }) => {
  return (
    <div
      className={cn("mx-auto flex h-16 w-full max-w-7xl items-center gap-8 px-6 py-4", className)}
    >
      {children}
    </div>
  );
};

export const PageMain: FC<BaseComponentProps> = ({ children, className }) => {
  return <main className={cn("flex w-full flex-1", className)}>{children}</main>;
};

export const PageSidebar: FC<BaseComponentProps> = ({ children, className }) => {
  return (
    <aside className={cn("border-border w-64 shrink-0 border-r", className)}>{children}</aside>
  );
};

export const PageFooter: FC<BaseComponentProps> = ({ children, className }) => {
  return (
    <footer className={cn("bg-primary-900 w-full text-neutral-50", className)}>{children}</footer>
  );
};

export const PageContent: FC<BaseComponentProps> = ({ children, className }) => {
  return <div className={cn("mx-auto w-[calc(100%-48px)] max-w-7xl", className)}>{children}</div>;
};

export const Page: FC<BaseComponentProps> & {
  Header: typeof PageHeader;
  HeaderContent: typeof PageHeaderContent;
  Main: typeof PageMain;
  Sidebar: typeof PageSidebar;
  Content: typeof PageContent;
  Footer: typeof PageFooter;
} = Object.assign(
  ({ children, className }: BaseComponentProps) => {
    return (
      <div className={cn("bg-background flex min-h-screen flex-col", className)}>{children}</div>
    );
  },
  {
    Header: PageHeader,
    HeaderContent: PageHeaderContent,
    Main: PageMain,
    Sidebar: PageSidebar,
    Content: PageContent,
    Footer: PageFooter,
  },
);
