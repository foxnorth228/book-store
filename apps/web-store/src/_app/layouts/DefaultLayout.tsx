import { Page } from "@shared/ui";

import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { PropsWithChildren } from "react";

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <Page>
      <Header />
      <Page.Main>{children}</Page.Main>
      <Footer />
    </Page>
  );
};
