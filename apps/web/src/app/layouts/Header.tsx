import { Page } from "@shared/ui";

import { HeaderAccount } from "./HeaderAccount";

export const Header = () => {
  return (
    <Page.Header>
      <Page.HeaderContent>
        <HeaderAccount />
      </Page.HeaderContent>
    </Page.Header>
  );
};
