import { Page } from "@shared/ui";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { MainContent } from "./MainContent";

export const Homepage = () => {
  return (
    <Page>
      <Header />
      <MainContent />
      <Footer />
    </Page>
  );
};
