import { cn } from "@shared/lib/styles";
import type { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">, PropsWithChildren {
  to: string;
}

function isExternalUrl(to: string) {
  return (
    to.startsWith("http://") ||
    to.startsWith("https://") ||
    to.startsWith("mailto:") ||
    to.startsWith("tel:")
  );
}

const linkClassName = cn(
  "text-primary-600 no-underline",
  "hover:underline",
  "focus-visible:outline-2",
  "focus-visible:outline-primary-400",
  "focus-visible:outline-offset-2",
);

export const Link: FC<LinkProps> = ({ to, children, target, rel, className, ...props }) => {
  const classes = cn(linkClassName, className);

  if (isExternalUrl(to)) {
    return (
      <a
        href={to}
        target={target}
        rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to} className={classes} {...props}>
      {children}
    </RouterLink>
  );
};
