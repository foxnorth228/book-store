import type { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router";

import { StyledLink } from "./Link.styles";

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

export const Link: FC<LinkProps> = ({ to, children, target, rel, ...props }) => {
  if (isExternalUrl(to)) {
    return (
      <StyledLink
        href={to}
        target={target}
        rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
        {...props}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledLink as={RouterLink} to={to} {...props}>
      {children}
    </StyledLink>
  );
};
