import { Page } from "@org/ui";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@widgets/Header";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <Page>
      <Header />
      <Page.Main>
        <Page.Sidebar />
        <Page.Content className="flex items-center justify-center">
          <div className="p-2">
            <h3>Welcome Home!</h3>
          </div>
        </Page.Content>
      </Page.Main>
    </Page>
  );
}
