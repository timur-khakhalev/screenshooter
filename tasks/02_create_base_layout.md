# Task 2: Create Base Application Layout

## 🎯 Objective

Create the main layout structure for the application, consisting of a sidebar for controls and a main content area for the screenshot preview. This task sets up the visual skeleton of the app.

## 📝 Description

Using the now-installed Tailwind CSS, you will replace the boilerplate content in `App.tsx` with a clean, two-column layout. The left column will serve as a sidebar to house all the editing controls, and the right column will be the main stage where the screenshot is displayed and edited.

## 📋 Requirements

1.  **Clean `App.tsx`**: Remove all existing JSX from the `App` component's return statement.
2.  **Create Main Container**:
    - Create a main container `div` that takes up the full screen height and uses a dark background color (e.g., `bg-background` from shadcn/ui's theme).
    - Use Flexbox or CSS Grid to create the two-column layout.
3.  **Sidebar (`aside`)**:
    - Create an `<aside>` element for the left column.
    - It should have a fixed width (e.g., `w-80` or `w-96`).
    - Give it a distinct background (e.g., `bg-card`) and a border on the right (`border-r`).
    - Add a title like "Editor Controls" at the top.
    - This sidebar should scroll independently if its content overflows.
4.  **Main Content Area (`main`)**:
    - Create a `<main>` element for the right column.
    - It should be flexible and take up the remaining width (`flex-1`).
    - Center its content both horizontally and vertically. This area will hold the screenshot preview.
    - Add a placeholder `div` with text like "Your screenshot will appear here."

## 🔗 Helpful Links

- **Tailwind Flexbox**: [https://tailwindcss.com/docs/flex](https://tailwindcss.com/docs/flex)
- **Tailwind Sizing**: [https://tailwindcss.com/docs/width](https://tailwindcss.com/docs/width)
- **shadcn/ui Theme Colors**: The colors like `background` and `card` are defined as CSS variables in `index.css` after you initialize shadcn. You can use them like `bg-background`, `text-foreground`, etc.

## ✅ Acceptance Criteria

- The `App.tsx` file contains a two-column layout.
- The left sidebar has a fixed width and is visually distinct from the main content area.
- The main content area fills the remaining space.
- The layout is responsive and maintains its structure on different screen sizes (though full mobile optimization is not required for this task).
- The default Vite/React logos and text are gone.

## 🧐 Check-up Questions

- Am I using semantic HTML tags like `<aside>` and `<main>` for the layout?
- Is the layout built with Flexbox or Grid as intended?
- Does the main content area correctly center its children?
- Have I used the theme-aware colors from `shadcn/ui` (e.g., `bg-background`) instead of hardcoding hex codes?
