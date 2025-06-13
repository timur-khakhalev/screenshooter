# Task 1: Setup Tailwind CSS v4 and shadcn/ui

## 🎯 Objective

Configure the Vite + React project to use Tailwind CSS v4 and initialize `shadcn/ui` for our component library. This is the foundational step for all subsequent UI work.

## 📝 Description

The current project is a standard Vite + React template. You need to remove the default styling and integrate Tailwind CSS v4 and the `shadcn/ui` library. Tailwind CSS v4 has a different setup process than v3, primarily using a Vite plugin, which simplifies configuration.

## 📋 Requirements

1.  **Install Dependencies**:

    - Install Tailwind CSS v4 and its peer dependencies: `tailwindcss @tailwindcss/vite`.
    - Install `shadcn-ui` and its dependencies. The `shadcn-ui` CLI will handle its own dependencies like `class-variance-authority` and `clsx`.

2.  **Configure Tailwind CSS**:

    - Update `vite.config.ts` to include the `@tailwindcss/vite` plugin.
    - Create a `tailwind.config.js` file. The v4 config is much simpler; it can be nearly empty as it works in a JIT-by-default manner.
    - Update `src/index.css` to include the core Tailwind layers (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`).

3.  **Initialize shadcn/ui**:

    - Run the `shadcn-ui` init command: `npx shadcn-ui@latest init`.
    - When prompted by the CLI, make the following selections:
      - **Styling**: Default
      - **Base color**: Slate
      - **CSS variables**: Yes
      - **`tailwind.config.js` location**: `tailwind.config.js`
      - **Components alias**: `~/components`
      - **Utils alias**: `~/lib/utils`
      - **React Server Components**: No

4.  **Verify Installation**:
    - Add a simple Tailwind class to `src/App.tsx` (e.g., `className="bg-red-500"`) to confirm that Tailwind is working correctly.
    - Install one `shadcn/ui` component (e.g., `Button`) using its CLI command and use it in `App.tsx` to confirm it's correctly configured.

## 🔗 Helpful Links

- **Tailwind CSS v4 Docs**: [https://v4.tailwindcss.com/docs/installation/vite](https://v4.tailwindcss.com/docs/installation/vite)
- **shadcn/ui Introduction**: [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs)
- **shadcn/ui Installation (Vite)**: [https://ui.shadcn.com/docs/installation/vite](https://ui.shadcn.com/docs/installation/vite)

## ✅ Acceptance Criteria

- The project successfully compiles with Tailwind CSS v4 and `shadcn/ui` installed.
- The `tailwind.config.js`, `vite.config.ts`, and `src/index.css` files are correctly configured for Tailwind v4.
- The `components.json` file is present from the `shadcn/ui` initialization.
- A test `shadcn/ui` Button component renders correctly in the app.
- The default Vite styling from `App.css` is removed and the file can be deleted.

## 🧐 Check-up Questions

- Did I install `@tailwindcss/vite` and not the old `postcss` and `autoprefixer` packages required for v3?
- Is the `tailwind.config.js` configured according to `shadcn/ui`'s requirements (e.g., container settings, keyframes)? The CLI should do this automatically, but it's good to check.
- Have I correctly configured the path aliases (`~/components`, `~/lib/utils`) in `tsconfig.json` as part of the `shadcn-ui` init?
