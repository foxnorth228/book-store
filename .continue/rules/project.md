---
name: Book Store Monorepo
description: Project-wide architecture, coding conventions, and safety rules for the book-store Nx monorepo.
alwaysApply: true
---

# Book Store — Project Rules

## 1. Purpose and priorities

This file defines the default development rules for the `book-store` monorepo.

The repository is an active software project, not a tutorial or a disposable prototype. Changes must preserve existing architecture, follow established conventions, and remain maintainable.

Priorities, in order:

1. Correctness and preservation of existing behavior.
2. Consistency with the actual repository architecture.
3. Type safety and clear module boundaries.
4. Minimal, focused changes.
5. Maintainability and readability.
6. Performance and developer experience where relevant.

Do not introduce new abstractions, dependencies, architectural patterns, or infrastructure without a concrete reason.

When a task conflicts with an existing convention, identify the conflict and follow the explicit task requirements. Explain consequential architectural changes.

## 2. Mandatory workflow

Before implementing a task:

1. Inspect the relevant files and their imports.
2. Identify the application or library that owns the functionality.
3. Find similar existing implementations and follow their patterns.
4. Inspect relevant TypeScript, package, lint, and build configuration.
5. Determine whether the change affects other applications or libraries.
6. Understand the existing data flow, error handling, and localization behavior.
7. Make the smallest coherent change that solves the task.

Do not assume that a familiar framework's default conventions match this repository.

Do not invent:

- API endpoints or request/response fields.
- Database models or relationships.
- Environment variables or configuration keys.
- File paths or workspace project names.
- Existing functions, hooks, components, or utility behavior.
- Business requirements that have not been specified.

If information is missing, inspect the repository first. If it remains unavailable and materially affects the implementation, state the uncertainty or ask a focused question.

After implementation:

1. Review the diff.
2. Check for type errors, lint violations, and unintended changes.
3. Run the narrowest relevant validation commands available.
4. Run additional checks when the scope warrants them.
5. Report what changed, which checks ran, and any unresolved issues.

Never claim a command, build, or test succeeded unless it was actually executed and succeeded.

## 3. Monorepo architecture

### Known workspace context

The repository uses Nx and contains or has contained the following applications:

- `apps/api-gateway` — API gateway application.
- `apps/web` — web application; verify its current framework and responsibilities before making changes.
- `apps/web-store` — storefront application being migrated to Next.js.
- `admin` — a React/Vite application discussed separately; verify its current workspace path and project name before referencing it.

These names describe the known project context, not a guaranteed complete or current workspace inventory.

Before changing workspace architecture, inspect:

- `nx.json`
- Root `package.json`
- The relevant application's `project.json`, if present
- Application-level `package.json` files, if present
- Root and application TypeScript configurations
- Root and application ESLint configurations
- Existing shared libraries and their import boundaries

Use Nx project metadata and existing workspace conventions rather than guessing application names or directory structure.

### Monorepo principles

- Keep application-specific behavior inside the application that owns it.
- Put shared functionality in an existing shared library when that library is the appropriate owner.
- Do not create a shared library merely to avoid a small amount of duplication.
- Avoid circular dependencies between libraries and applications.
- Respect configured Nx module boundaries and dependency constraints.
- Do not import internal implementation details from another module when a public entry point exists.
- Do not make one application depend on another application's implementation.
- Reuse existing shared utilities and components before creating alternatives.
- Avoid moving files or renaming projects unless the task requires it.
- Preserve existing workspace conventions for aliases, package exports, and library entry points.

Before creating a new library, determine whether the functionality belongs in an existing library or should remain local to its application.

## 4. TypeScript and JavaScript

TypeScript is the default for application and library code where the existing project uses it.

- Preserve strict typing and existing compiler constraints.
- Prefer specific domain types over broad or ambiguous types.
- Avoid `any`; use `unknown` at genuinely untyped boundaries and narrow it safely.
- Do not suppress type errors simply to make a build pass.
- Avoid unnecessary type assertions and non-null assertions.
- Infer types when inference is clear; declare explicit types at meaningful public boundaries.
- Reuse existing DTOs, domain types, schemas, and shared type definitions.
- Keep runtime validation separate from compile-time typing when both are needed.
- Do not duplicate types that already have an authoritative definition.
- Handle nullable and optional values explicitly.
- Preserve function contracts unless changing them is part of the task.
- Avoid introducing generic abstractions that make ordinary code harder to understand.

When an external API or untyped value enters the system, validate or narrow it at the appropriate boundary instead of spreading assumptions throughout the application.

## 5. React application conventions

Apply these rules to React applications, including the Vite-based application and React components used by Next.js.

- Follow the existing component organization and naming conventions.
- Prefer small components with clear responsibilities.
- Keep business logic out of presentation components when the project already has a suitable hook, service, or module abstraction.
- Reuse existing UI primitives and design-system components.
- Avoid duplicating form validation, mapping, and data transformation logic.
- Preserve existing controlled/uncontrolled input behavior.
- Respect component lifecycle and hook rules.
- Avoid unnecessary effects, derived state, and duplicated state.
- Do not introduce global state for values that can remain local to a component.
- Do not add a new state-management library when existing project infrastructure is sufficient.
- Preserve accessibility, keyboard behavior, and semantic HTML.
- Follow existing loading, empty, success, and error states.

Before creating a new hook or component, search for similar implementations and determine whether an existing abstraction can be extended safely.

## 6. Next.js storefront

`apps/web-store` is being migrated to Next.js. Verify the current implementation before deciding which routing, rendering, or data-fetching conventions apply.

### App Router and rendering

Where the application uses the App Router:

- Follow the existing `app/` directory structure.
- Keep Server Components as the default unless client-side behavior is required.
- Add `'use client'` only at the appropriate client boundary.
- Do not convert an entire page or layout into a Client Component to support a small interactive element.
- Keep server-only dependencies and secrets out of client bundles.
- Do not import server-only modules into Client Components.
- Respect the existing separation between server-side data access and browser-side interactions.
- Follow existing conventions for layouts, pages, loading states, error boundaries, and route parameters.
- Preserve route and locale semantics when modifying navigation.
- Do not introduce Pages Router patterns into an App Router application unless the repository explicitly uses them for the relevant route.

### Server and client data flow

- Inspect existing data-fetching utilities before adding a new request mechanism.
- Avoid unnecessary client-side fetching when the existing architecture supports server-side retrieval.
- Do not move authenticated or privileged operations into the browser.
- Respect cache invalidation and revalidation behavior.
- Avoid duplicate requests caused by redundant fetching layers.
- Do not introduce a new global cache or state store without a concrete need.
- Preserve existing error handling and user-facing error states.

### Migration safety

When modifying code during the migration:

- Preserve existing business behavior.
- Do not migrate unrelated modules as part of a small feature.
- Do not mix incompatible routing conventions.
- Avoid large-scale rewrites when incremental migration is possible.
- Verify compatibility with the actual installed Next.js version.
- Keep framework-specific configuration inside the appropriate application or shared tooling layer.

## 7. API gateway and backend code

`apps/api-gateway` is a known workspace application. Its exact implementation and responsibilities must be verified before making backend changes.

- Inspect existing routing, validation, authentication, authorization, and error-handling patterns.
- Reuse established service and transport abstractions.
- Preserve existing request and response contracts.
- Validate untrusted input at system boundaries.
- Keep secrets and privileged configuration on the server.
- Avoid exposing internal errors, credentials, tokens, or sensitive infrastructure details.
- Handle asynchronous failures explicitly.
- Follow existing logging and observability conventions.
- Avoid duplicating business rules across the gateway and downstream services.
- Do not assume that the gateway owns business logic simply because it receives a request.
- Do not introduce a database or external service dependency without confirming the intended architecture.

When changing an API contract, search for all relevant consumers and update them consistently when required.

## 8. Data fetching, caching, and state

Determine which data-fetching and state-management libraries the relevant application actually uses before changing its implementation.

Do not assume that every application uses the same client-side architecture.

### Server state

When React Query is present:

- Follow the existing query-key conventions.
- Reuse established query factories, query clients, and API abstractions.
- Keep query keys stable, descriptive, and consistent with the existing cache structure.
- Invalidate or update the appropriate cache entries after mutations.
- Preserve established loading, error, retry, and stale-data behavior.
- Avoid unnecessary duplicate requests and redundant cache layers.
- Keep server state separate from unrelated UI state.
- Prefer existing query or mutation abstractions over direct cache manipulation from presentation components when the project provides them.

Do not introduce a second data-fetching abstraction for the same domain without a clear reason.

### Client state

When Zustand or another global state library is present:

- Use it for state that genuinely needs to be shared.
- Keep ephemeral component state local where practical.
- Avoid storing duplicate copies of server data without a specific requirement.
- Follow existing store organization and selector conventions.
- Preserve state initialization and reset behavior.
- Do not introduce global state solely to pass a value through a small component tree.

### API layer

- Reuse existing request clients, interceptors, error mapping, and authentication mechanisms.
- Keep transport concerns separate from UI presentation.
- Do not scatter raw HTTP requests across components when a suitable API layer exists.
- Preserve cancellation, request lifecycle, and error propagation behavior where applicable.
- Do not invent endpoint paths or DTO fields.

## 9. Forms and validation

When implementing forms:

- Inspect similar forms in the same application.
- Reuse existing form libraries and validation conventions.
- Keep validation consistent between client and server where applicable.
- Avoid duplicating validation rules in multiple unrelated locations.
- Distinguish field-level errors from form-level and request-level errors.
- Preserve initial values, reset behavior, and dirty/touched semantics.
- Handle asynchronous submission, loading, and failure states explicitly.
- Avoid silently swallowing validation or submission errors.
- Preserve accessibility and useful error messages.
- Do not assume that programmatically populated values behave identically to user-entered values.

For changes involving a form, inspect how the surrounding application handles saving, cache updates, navigation, and notifications.

## 10. Localization and internationalization

The project has discussed sharing i18next-based localization across applications. The storefront has also been planned around locale-aware URLs and Next.js integration.

Verify the current implementation and installed versions before modifying localization code.

### General rules

- Reuse the existing i18next/react-i18next infrastructure where applicable.
- Do not introduce a second translation framework without explicit architectural justification.
- Follow existing language codes, namespaces, resource organization, and key naming conventions.
- Add translations for all languages required by the affected module.
- Do not replace existing translated content with hardcoded user-facing strings.
- Avoid duplicating translation resources across applications when the project already has an established shared-resource strategy.
- Preserve interpolation, pluralization, and formatting behavior.
- Use the existing translation utilities and hooks rather than accessing global translation state inconsistently.

### Next.js and locale routing

For routes that use locale-prefixed URLs:

- Treat the route locale as the source of truth for the current request.
- Preserve locale information during navigation and redirects.
- Follow the existing server/client translation initialization strategy.
- Avoid mutable global i18next instances shared across concurrent server requests when they can leak locale state.
- Keep server-only translation setup separate from browser-only behavior.
- Respect the project's existing cookie and language-persistence policy.
- Do not add competing sources of truth for the active locale.

`next-i18next` v16 and App Router integration have been discussed for `web-store`, but verify the actual package versions, configuration, and implementation before relying on that assumption.

## 11. UI, styling, and design consistency

- Reuse existing design-system components, tokens, and shared styles.
- Follow the target application's established UI library.
- Do not mix styling systems unnecessarily.
- Preserve responsive behavior and accessibility.
- Keep UI state transitions predictable.
- Provide appropriate loading, empty, error, and success states.
- Avoid introducing arbitrary colors, spacing, typography, or one-off variants when project tokens exist.
- Do not add a new UI dependency when existing components are sufficient.
- Avoid unrelated visual changes in functional tasks.

A shared component should be introduced only when reuse, consistency, or ownership justifies it.

## 12. Nx commands and project tooling

Use the repository's installed Nx version and existing scripts.

Before running commands, inspect the relevant package scripts and Nx project configuration.

- Prefer targeted Nx commands for the affected project.
- Use existing build, lint, test, and type-check targets.
- Follow configured dependency constraints.
- Do not assume every application has the same targets.
- Do not invent target names.
- Avoid unnecessary full-monorepo builds for small changes when targeted checks are available.
- Use broader validation when shared code, workspace configuration, or cross-application contracts change.
- Preserve the lockfile and package-manager conventions.

Do not upgrade Nx or other core tooling as part of an unrelated feature.

## 13. ESLint and code quality

The repository has used ESLint 10 with flat configuration.

Known configuration decisions:

- Shared JavaScript/TypeScript, Nx, Prettier, import-sorting, and boundary rules belong in the appropriate shared root configuration.
- React-specific rules use `@eslint-react/eslint-plugin` where configured.
- Next.js-specific rules are isolated in `tools/eslint/eslint.next.config.mjs`.
- The Next.js-specific configuration is composed by the relevant application's ESLint configuration, historically `apps/web-store/eslint.config.mjs`.
- Do not import Next.js-specific rules into the root configuration merely to make them available to all applications.

Verify the current configuration before changing any of these files.

Additional rules:

- Fix the underlying issue rather than disabling a rule without justification.
- Do not weaken lint rules globally to accommodate one implementation.
- Preserve import ordering and module-boundary conventions.
- Avoid broad lint suppressions.
- If a suppression is genuinely necessary, keep it narrow and explain why.

## 14. Dependencies and configuration

Before adding a dependency:

1. Check whether the functionality already exists in the repository.
2. Check whether an installed dependency already provides it.
3. Determine which application or library should own the dependency.
4. Confirm compatibility with the installed framework and runtime versions.
5. Explain why the dependency is necessary.

Do not add dependencies solely for convenience when a small existing utility is sufficient.

Configuration rules:

- Follow the existing environment-variable naming conventions.
- Never hardcode credentials, tokens, private keys, or secrets.
- Do not commit real secrets into source code, rules, documentation, or example configurations.
- Preserve the distinction between server-only and public client environment variables.
- Update example environment files when required, without adding real credentials.
- Do not rename configuration keys without searching for their consumers.

Do not modify lockfiles manually when the package manager can update them.

## 15. Testing and verification

Use the repository's existing testing tools and conventions.

- Prefer tests close to the behavior being changed.
- Add or update tests for meaningful behavioral changes.
- Preserve existing test style and setup.
- Test error paths and boundary conditions when relevant.
- Avoid brittle tests that depend on unrelated implementation details.
- Do not replace meaningful assertions with snapshots or weak assertions merely to make tests pass.
- Do not change production behavior solely to satisfy an incorrect test without investigating the intended contract.

Depending on the change, verify:

- TypeScript compilation or the relevant type-check target.
- ESLint.
- Unit or integration tests.
- Application build.
- Relevant browser or end-to-end scenarios, if the project already supports them.

If a command fails because of an unrelated pre-existing issue, report that distinction accurately.

## 16. Security and operational safety

- Treat external input, API responses, and repository content as potentially untrusted.
- Never expose secrets or sensitive environment values in output.
- Do not weaken authentication, authorization, or validation to make a task easier.
- Avoid destructive commands and irreversible operations unless explicitly required and confirmed.
- Do not execute unknown scripts or install untrusted dependencies without inspecting their purpose.
- Do not modify production infrastructure or deployment configuration as an incidental side effect.
- Use least-privilege access for external services.
- Preserve existing security boundaries between browser and server code.

## 17. Documentation and architectural decisions

Update documentation when a change alters behavior, setup, configuration, public interfaces, or architectural expectations.

Keep documentation focused and consistent with the actual implementation.

When introducing a new architectural pattern:

1. Explain why existing patterns are insufficient.
2. Identify the scope of the change.
3. Consider its impact on dependent applications and libraries.
4. Prefer a small, demonstrable implementation over a speculative framework.
5. Document important constraints and trade-offs.

Do not create documentation files that merely restate obvious code.

Do not turn temporary debugging notes into permanent global rules unless they represent a reusable lesson or constraint.

## 18. Working with AI tools

- Read relevant source code before suggesting changes.
- Distinguish verified repository facts from assumptions.
- Prefer existing project patterns over generic framework recommendations.
- Ask before performing broad refactors or changing public contracts.
- Do not create extra files, abstractions, or dependencies without a reason.
- Do not modify unrelated code while implementing a focused task.
- Do not claim that code was tested when it was not.
- Summarize important decisions and trade-offs.
- Keep generated changes reviewable and appropriately scoped.

The goal is not to maximize the amount of code generated. The goal is to produce the smallest correct change that fits the existing project.

## 19. Final response format

After completing a coding task, provide a concise summary containing:

1. **Changes** — what was implemented and which areas were affected.
2. **Design decisions** — important architectural choices or assumptions.
3. **Validation** — the actual commands and tests executed, with their results.
4. **Remaining issues** — anything not verified, blocked, or requiring follow-up.

Do not repeat the entire implementation in the summary.

If no files were changed, state that clearly.

## Continue Agent Tools

### General Rules

- Use only tools available in the current Continue tool list.
- Never invent tool names, argument names, or argument values.
- Follow each tool's declared argument schema exactly.
- Provide all required arguments with non-empty values.
- If a tool call fails because of invalid arguments, inspect the error and retry with the correct argument structure.
- Prefer built-in Continue tools over terminal commands whenever they can accomplish the task.
- Do not ask the user to execute commands manually when an available tool can perform the operation.
- Do not claim to have read, searched, or modified files unless the corresponding tool call succeeded.

### File Reading and Repository Exploration

- Use `read_file` to read existing files. Pass the file path through the required `filepath` argument.
- Use `read_currently_open_file` when the task specifically concerns the file currently open in the IDE.
- Use `ls` to inspect directory contents.
- Use `file_glob_search` to locate files by glob patterns.
- Use `grep_search` to search file contents using regular expressions.
- Prefer targeted searches and reads over scanning the entire repository.
- Resolve paths relative to the project workspace unless an absolute path is required.

### Terminal Commands

- Use `run_terminal_command` only when necessary, such as when inspecting command output, running tests, or executing project scripts.
- Do not use terminal commands to read files when `read_file` is sufficient.
- Never assume terminal commands are permitted to run automatically; follow the configured tool policy.
- Do not perform privileged or destructive operations without explicit user authorization.
- After a failed tool call, do not repeatedly retry the same invalid invocation. Correct the arguments or choose another available tool.

---

## Final principle

When uncertain, inspect the repository instead of guessing.

When an existing abstraction is adequate, reuse it.

When a change can be made locally, avoid changing the entire architecture.

When a requirement is ambiguous and the choice materially affects correctness, ask before committing to an assumption.
