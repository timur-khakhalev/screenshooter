# Task 7: Implement Image Export Functionality

## 🎯 Objective

Add "Download" and "Copy to Clipboard" buttons that convert the styled preview area into a PNG image and allow the user to save it or copy it.

## 📝 Description

To export the final image, we can't just save the screenshot `<img>`. We need to render the entire preview DOM node—including the background, padding, and styles—onto a canvas. We will use the `html-to-image` library for this conversion.

## 📋 Requirements

1.  **Install `html-to-image`**:

    - Add the library to the project: `npm install html-to-image`.

2.  **Add Export Buttons**:

    - In the sidebar, below the other controls, add two `shadcn/ui` `Button` components: "Copy Image" and "Download".

3.  **Reference the Preview DOM Node**:

    - In `App.tsx`, create a `useRef` to hold a reference to the root DOM node of the `Preview` component.
    - Pass this ref to the `Preview` component and attach it to the main background container `div`.

4.  **Implement Download Logic**:

    - Create an `onDownload` function.
    - Inside the function, check if the ref to the preview node is valid.
    - Use `htmlToImage.toPng(previewNodeRef.current)` to get a data URL of the rendered element.
    - Create a temporary `<a>` element, set its `href` to the data URL, set the `download` attribute (e.g., `screenshot.png`), and programmatically click it to trigger the download.
    - Clean up the temporary `<a>` element.

5.  **Implement Copy Logic**:
    - Create an `onCopy` function.
    - Use `htmlToImage.toBlob(previewNodeRef.current)` to get the image data as a `Blob`.
    - Use the `navigator.clipboard.write()` API with a `ClipboardItem` to copy the blob to the user's clipboard.
    - This API is more robust for copying images than trying to copy the data URL.
    - Provide user feedback (e.g., changing the button text to "Copied!" for a few seconds) upon success.

## 🔗 Helpful Links

- **`html-to-image` library**: [https://github.com/bubkoo/html-to-image](https://github.com/bubkoo/html-to-image)
- **React `useRef` Hook**: [https://react.dev/reference/react/useRef](https://react.dev/reference/react/useRef)
- **Clipboard API (`navigator.clipboard.write`)**: [https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write)

## ✅ Acceptance Criteria

- "Download" and "Copy Image" buttons are present in the UI, probably disabled until a screenshot is taken.
- Clicking "Download" saves a PNG file of the entire preview area (background + styled screenshot) to the user's computer.
- Clicking "Copy Image" copies the same image to the clipboard, which can then be pasted into other applications.
- The exported image is a pixel-perfect representation of what is shown in the preview area.
- The functions handle potential errors gracefully (e.g., if the DOM node isn't available).

## 🧐 Check-up Questions

- Why is `html-to-image` necessary? (Answer: To capture the DOM element with all its CSS styles applied, which isn't possible by just saving the source image).
- Am I using `toPng` for download and `toBlob` for copy? Why? (Answer: `toPng` gives a data URL perfect for a download link. `toBlob` is the format required by the modern Clipboard API for rich content).
- Does the copy functionality work across different browsers that support the Clipboard API? It's a modern API, so it's good to be aware of compatibility.
- Have I added user feedback for the copy action, since it's not as obvious as a download?
