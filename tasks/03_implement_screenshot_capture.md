# Task 3: Implement Screenshot Capture Functionality

## 🎯 Objective

Add a button that allows the user to capture a portion of their screen, a specific application window, or a browser tab using the Web API. The captured image should then be displayed in the main content area.

## 📝 Description

This task involves using the `getDisplayMedia` API, which is the standard for screen capturing on the web. You will create a button that, when clicked, prompts the user to select a screen/window/tab. Once a source is selected and sharing starts, you will capture a single frame from the resulting video stream and render it as an image.

## 📋 Requirements

1.  **State for Screenshot**:

    - In `App.tsx`, create a state variable to hold the screenshot's data URL, e.g., `const [screenshot, setScreenshot] = useState<string | null>(null);`.

2.  **"Take Screenshot" Button**:

    - Add a `Button` component (from `shadcn/ui`) to the sidebar. Label it "Take Screenshot" or similar.

3.  **Implement `getDisplayMedia` Logic**:

    - Create an `async` function that will be called when the button is clicked.
    - Inside this function, call `navigator.mediaDevices.getDisplayMedia({ video: true })`. This returns a promise that resolves to a `MediaStream`.
    - Wrap this call in a `try...catch` block to handle cases where the user denies permission.
    - Create a temporary `<video>` element in memory. Set its `srcObject` to the obtained `MediaStream` and wait for it to load metadata.
    - Once the video is playing, create a `<canvas>` element in memory. Set its dimensions to match the video's dimensions.
    - Draw the current frame of the video onto the canvas using `canvas.getContext('2d').drawImage(video, 0, 0, ...)`
    - Get the data URL from the canvas using `canvas.toDataURL('image/png')`.
    - Update the `screenshot` state with this data URL.
    - Stop the video stream tracks (`stream.getTracks().forEach(track => track.stop());`) to turn off the "sharing" indicator.

4.  **Display the Screenshot**:
    - In the main content area, conditionally render the screenshot.
    - If the `screenshot` state is `null`, show the placeholder text from the previous task.
    - If the `screenshot` state has a data URL, render an `<img>` tag with its `src` set to that URL.

## 🔗 Helpful Links

- **`getDisplayMedia` API**: [https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_the_Screen_Capture_API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_the_Screen_Capture_API)
- **Drawing video to canvas**: [https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas)
- **shadcn/ui Button**: [https://ui.shadcn.com/docs/components/button](https://ui.shadcn.com/docs/components/button)

## ✅ Acceptance Criteria

- A "Take Screenshot" button exists in the sidebar.
- Clicking the button opens the browser's native screen sharing dialog.
- After selecting a source and confirming, the captured image appears in the main content area.
- The placeholder text is hidden once a screenshot is taken.
- The screen sharing stream is stopped immediately after the frame is captured.
- If the user cancels the dialog or denies permission, the app handles the error gracefully and does not crash.

## 🧐 Check-up Questions

- Have I properly cleaned up the `MediaStream` to avoid leaving the screen sharing active?
- Does my logic correctly handle the asynchronous nature of `getDisplayMedia` and video loading?
- Is the captured image clear and does it have the correct dimensions?
- What happens if the user takes a new screenshot? Does it correctly replace the old one?
