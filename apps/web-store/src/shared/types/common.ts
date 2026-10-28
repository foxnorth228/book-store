import { PropsWithChildren } from "react";

export interface WithClassName {
  className?: string;
}

export type BaseComponentProps = PropsWithChildren<WithClassName>;
