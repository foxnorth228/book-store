import { cn } from "#lib/utils";
import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "lead"
  | "large"
  | "small"
  | "muted";

const variantStyles: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  lead: "text-muted-foreground text-xl",
  large: "text-lg font-semibold",
  small: "text-sm leading-none font-medium",
  muted: "text-muted-foreground text-sm",
};

const defaultElements: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
};

type TypographyOwnProps = {
  variant?: TypographyVariant;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

export type TypographyProps<T extends ElementType = "p"> = TypographyOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof TypographyOwnProps>;

export function Typography<T extends ElementType = "p">({
  variant = "p",
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Component = as ?? defaultElements[variant];

  return (
    <Component className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Component>
  );
}
