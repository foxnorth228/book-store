import { DefaultLayout } from "@app/layouts/DefaultLayout";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
