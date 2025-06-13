# Task 5: Develop the Dynamic Preview Component

## 🎯 Objective

Create a preview component that takes the screenshot and editor state, and dynamically applies the selected styles (padding, radius, shadow, background) in real-time.

## 📝 Description

This is where the user sees their changes. You will create a component that wraps the screenshot `<img>` tag. This wrapper will be styled dynamically based on the `editorState` props passed down from `App.tsx`. The background, padding, and other effects will be applied to this wrapper, while the corner radius and shadow will be applied to the image container itself.

## 📋 Requirements

1.  **Create a `Preview` Component**:

    - Create a new component file, e.g., `src/components/Preview.tsx`.
    - This component will accept the `screenshot` URL and the `editorState` object as props.

2.  **Structure the Preview**:

    - The component's root element will be the **background container**. This `div` will be centered in the main layout area.
    - Inside the background container, create another `div` which will be the **screenshot container**. This is the element that will have padding applied.
    - Inside the screenshot container, render the `<img>` tag for the screenshot.

3.  **Apply Dynamic Styles**:

    - **Background**: For now, apply a simple background color to the outermost `div` (e.g., `bg-neutral-800`). We will make this dynamic in the next task.
    - **Padding**: Apply padding to the screenshot container `div` using an inline style, as Tailwind class names are generated at build time and cannot be fully dynamic with arbitrary values.
      ```jsx
      <div style={{ padding: `${editorState.padding}px` }}>
        {/* ... screenshot image ... */}
      </div>
      ```
    - **Corner Radius**: Apply the border radius to the `<img>` tag itself, also using an inline style.
      ```jsx
      <img style={{ borderRadius: `${editorState.cornerRadius}px` }} ... />
      ```
    - **Shadow**: This is trickier with dynamic values. A good approach is to map the slider value to a set of predefined Tailwind classes. Create a helper function for this.
      ```typescript
      const getShadowClass = (shadowValue: number): string => {
        if (shadowValue < 5) return 'shadow-md';
        if (shadowValue < 15) return 'shadow-lg';
        if (shadowValue < 30) return 'shadow-xl';
        return 'shadow-2xl';
      };
      // In JSX:
      <img className={getShadowClass(editorState.shadow)} ... />
      ```
      Apply the returned class to the `<img>` tag.

4.  **Integrate into `App.tsx`**:
    - In `App.tsx`, when a screenshot exists, render the `<Preview>` component instead of the plain `<img>` tag.
    - Pass the `screenshot` and `editorState` as props.

## 🔗 Helpful Links

- **React Components and Props**: [https://react.dev/learn/passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)
- **Tailwind CSS Shadow**: [https://tailwindcss.com/docs/box-shadow](https://tailwindcss.com/docs/box-shadow)
- **React Inline Styles**: [https://react.dev/learn/passing-props-to-a-component#passing-an-object-to-a-style-prop](https://react.dev/learn/passing-props-to-a-component#passing-an-object-to-a-style-prop)

## ✅ Acceptance Criteria

- The `Preview` component renders the screenshot.
- Moving the "Padding" slider changes the space between the screenshot and the edge of its background.
- Moving the "Corner Radius" slider changes the roundness of the screenshot's corners.
- Moving the "Shadow" slider changes the intensity of the drop shadow on the screenshot.
- All changes are reflected in the UI instantly.
- The aspect ratio of the original screenshot is preserved.

## 🧐 Check-up Questions

- Am I applying the styles to the correct elements (padding on the container, radius/shadow on the image)?
- Is the mapping from the shadow slider value to Tailwind classes logical and providing a good visual effect?
- Why am I using inline styles for padding and radius? (Answer: Because the values are fully dynamic and not known at build time, which is when Tailwind generates its utility classes).
- Does the preview area maintain its centered position within the main layout?
