# Task 4: Create Editor State and UI Controls

## 🎯 Objective

Create a centralized state object to manage all screenshot styling options and build the corresponding UI controls (sliders) in the sidebar using `shadcn/ui` components.

## 📝 Description

The user needs to control the padding, corner radius, and shadow of the screenshot. You will create a single state object to hold these values. Then, you will add `Slider` components from `shadcn/ui` to the sidebar, allowing the user to modify these state values.

## 📋 Requirements

1.  **Define Editor State**:

    - In `App.tsx`, create a state object to manage all editor settings.

    ```typescript
    const [editorState, setEditorState] = useState({
      padding: 64,
      cornerRadius: 16,
      shadow: 8,
    });
    ```

    - These initial values are suggestions; feel free to adjust them.

2.  **Install `shadcn/ui` Components**:

    - Use the `shadcn-ui` CLI to add the `Slider` and `Label` components to your project:

    ```bash
    npx shadcn-ui@latest add slider
    npx shadcn-ui@latest add label
    ```

3.  **Build UI Controls in Sidebar**:

    - For each property in `editorState` (`padding`, `cornerRadius`, `shadow`), create a control group in the sidebar.
    - Each group should contain:
      - A `Label` describing the control (e.g., "Padding").
      - A `Slider` component.
    - **Padding Slider**:
      - `defaultValue`: `[editorState.padding]`
      - `max`: 128
      - `step`: 1
      - `onValueChange`: A handler function that updates the `padding` property in `editorState`.
    - **Corner Radius Slider**:
      - `defaultValue`: `[editorState.cornerRadius]`
      - `max`: 64
      - `step`: 1
      - `onValueChange`: A handler function that updates the `cornerRadius` property in `editorState`.
    - **Shadow Slider**:
      - `defaultValue`: `[editorState.shadow]`
      - `max`: 40
      - `step`: 1
      - `onValueChange`: A handler function that updates the `shadow` property in `editorState`.
      - Note: The shadow value will be mapped to Tailwind's shadow classes later (e.g., `sm`, `md`, `lg`, `xl`, `2xl`). This slider will control the "intensity".

4.  **State Update Logic**:
    - Create a single handler function that can update any property in the `editorState` object to avoid repetitive code.
    ```typescript
    const handleStateChange = (
      key: keyof typeof editorState,
      value: number
    ) => {
      setEditorState((prevState) => ({ ...prevState, [key]: value }));
    };
    ```
    - The `onValueChange` prop for sliders returns an array (e.g., `[50]`), so remember to extract the first element `value[0]`.

## 🔗 Helpful Links

- **React `useState` Hook**: [https://react.dev/reference/react/useState](https://react.dev/reference/react/useState)
- **shadcn/ui Slider**: [https://ui.shadcn.com/docs/components/slider](https://ui.shadcn.com/docs/components/slider)
- **shadcn/ui Label**: [https://ui.shadcn.com/docs/components/label](https://ui.shadcn.com/docs/components/label)

## ✅ Acceptance Criteria

- The sidebar contains three sliders: one for padding, one for corner radius, and one for shadow.
- Each slider has a corresponding label.
- Moving a slider updates the central `editorState` object in `App.tsx`.
- The sliders are initialized with the default values from the state.
- The controls are only visible or active when a screenshot has been taken.

## 🧐 Check-up Questions

- Is my state update handler correctly preserving the other state values when updating a single one? (i.e., using the spread operator `...prevState`).
- Are the `max` and `step` values for the sliders providing a good user experience?
- Am I correctly extracting the value from the `onValueChange` callback array?
