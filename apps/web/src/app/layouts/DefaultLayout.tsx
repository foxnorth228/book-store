import { Page } from "@shared/ui";
import { Outlet } from "react-router";

import { Footer } from "./Footer";
import { Header } from "./Header/Header";

export const DefaultLayout = () => {
  return (
    <Page>
      <Header />
      <Page.Main>
        <Outlet />
      </Page.Main>
      <Footer />
    </Page>
  );
};
