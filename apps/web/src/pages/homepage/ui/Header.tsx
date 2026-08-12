import { Page } from "@shared/ui";

export const Header = () => {
  return (
    <Page.Header>
      <div>
        <a href="/">BOOKSHELF</a>

        <nav>
          <a href="/books">Discover</a>
          <a href="/categories">Categories</a>
          <a href="/authors">Authors</a>
        </nav>

        <div>
          <a href="/login">Sign in</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </Page.Header>
  );
};
