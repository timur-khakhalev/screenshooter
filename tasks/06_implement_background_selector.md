# Task 6: Implement Background Selector

## 🎯 Objective

Allow the user to choose a background for their screenshot from a set of options: a solid color, a predefined gradient, or a predefined wallpaper image.

## 📝 Description

You will expand the editor state and controls to include background selection. The `Preview` component will then be updated to dynamically render the chosen background style.

## 📋 Requirements

1.  **Update Editor State**:

    - Add new properties to the `editorState` in `App.tsx` to manage the background.

    ```typescript
    const [editorState, setEditorState] = useState({
      // ...existing properties
      backgroundType: "color", // 'color', 'gradient', 'image'
      backgroundColor: "#3b82f6",
      backgroundGradient:
        "linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
      backgroundImage: "url(/path/to/default-wallpaper.jpg)",
    });
    ```

2.  **Define Background Options**:

    - Create a constants file (e.g., `src/lib/constants.ts`) to store the predefined gradients and image URLs.
    - **Gradients**: Define an array of cool CSS gradients.
    - **Images**: Find 3-4 high-quality, royalty-free wallpapers (e.g., from Unsplash) and add them to the `public/wallpapers/` directory. Store their paths in the constants file.

3.  **Create Background Controls**:

    - Use the `shadcn-ui` CLI to add `RadioGroup` and `Tabs` components.
    - In the sidebar, use `Tabs` to switch between "Color", "Gradient", and "Image" background types.
    - **Color Tab**: Add a native `<input type="color">` to allow the user to pick any solid color. Its value should be bound to `editorState.backgroundColor`.
    - **Gradient Tab**: Display a list of predefined gradients (e.g., as small clickable `div`s). Clicking one should update `editorState.backgroundGradient`.
    - **Image Tab**: Display thumbnails of the predefined wallpapers. Clicking one should update `editorState.backgroundImage`.

4.  **Update the `Preview` Component**:

    - Modify the background container `div` in `Preview.tsx` to apply the background dynamically.
    - Use an inline `style` attribute on the background container.
    - Conditionally set the `background` property based on `editorState.backgroundType`.

    ```jsx
    const getBackgroundStyle = () => {
      switch (editorState.backgroundType) {
        case "gradient":
          return { background: editorState.backgroundGradient };
        case "image":
          return {
            backgroundImage: editorState.backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
          };
        case "color":
        default:
          return { backgroundColor: editorState.backgroundColor };
      }
    };

    <div style={getBackgroundStyle()}>{/* ... rest of the preview ... */}</div>;
    ```

## 🔗 Helpful Links

- **shadcn/ui Tabs**: [https://ui.shadcn.com/docs/components/tabs](https://ui.shadcn.com/docs/components/tabs)
- **CSS Gradients**: [https://cssgradient.io/](https://cssgradient.io/)
- **Royalty-Free Images**: [https://unsplash.com/](https://unsplash.com/)
- **Vite Public Directory**: [https://vitejs.dev/guide/assets.html#the-public-directory](https://vitejs.dev/guide/assets.html#the-public-directory)

## ✅ Acceptance Criteria

- The sidebar has a new section for background controls, likely using Tabs.
- The user can select a solid color, and the preview background updates.
- The user can select a predefined gradient, and the preview background updates.
- The user can select a predefined wallpaper image, and the preview background updates.
- The state management correctly handles switching between background types and values.

## 🧐 Check-up Questions

- Where should I place the wallpaper images so they are accessible at runtime? (Answer: The `public` directory).
- How do I represent the selectable gradients and images in the UI? (Answer: Small `div`s with the background applied, or `img` thumbnails).
- Is my state update logic correctly changing the `backgroundType` when the user switches tabs?
- Does the `Preview` component correctly apply all necessary background properties (e.g., `background-size: cover` for images)?
