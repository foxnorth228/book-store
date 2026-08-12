import { cn } from "@shared/lib";
import { BaseComponentProps } from "@shared/types";
import { FC } from "react";

export const PageHeader: FC<BaseComponentProps> = ({ children, className }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 w-full border-b border-neutral-300 bg-neutral-100",
        className,
      )}
    >
      {children}
    </header>
  );
};

export const PageMain: FC<BaseComponentProps> = ({ children, className }) => {
  return <main className={cn("w-full flex-1", className)}>{children}</main>;
};

export const PageFooter: FC<BaseComponentProps> = ({ children, className }) => {
  return (
    <footer className={cn("bg-primary-900 w-full text-neutral-50", className)}>{children}</footer>
  );
};

export const PageContent: FC<BaseComponentProps> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto w-[calc(100%-48px)] max-w-[1280px]", className)}>{children}</div>
  );
};

export const Page: FC<BaseComponentProps> & {
  Header: typeof PageHeader;
  Main: typeof PageMain;
  Content: typeof PageContent;
  Footer: typeof PageFooter;
} = Object.assign(
  ({ children, className }: BaseComponentProps) => {
    return <div className={cn("flex min-h-screen flex-col", className)}>{children}</div>;
  },
  {
    Header: PageHeader,
    Main: PageMain,
    Content: PageContent,
    Footer: PageFooter,
  },
);
