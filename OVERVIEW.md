# Project Overview: PWA Screenshooter

## 🎯 Objective

To build a modern, browser-based Progressive Web App (PWA) that allows users to capture their screen, window, or a browser tab and enhance it with professional-looking styles using an intuitive editor. The final image can be easily copied or downloaded.

## ✨ Core Features

- **Cross-Platform Screen Capture**: Utilize the browser's native `getDisplayMedia` API to capture content on any operating system without needing a native app.
- **Real-time Editor**: A sidebar with simple controls to modify the screenshot's appearance instantly.
  - **Padding**: Control the amount of space between the screenshot and the background.
  - **Corner Radius**: Apply rounded corners to the screenshot container.
  - **Shadow**: Add a configurable drop shadow for depth.
- **Dynamic Backgrounds**: Users can choose from multiple background styles:
  - A solid color via a color picker.
  - A selection of pre-defined, beautiful gradients.
  - A selection of high-quality wallpapers (like macOS).
- **Live Preview**: A main stage area that reflects all edits in real-time, showing exactly what the final export will look like.
- **Easy Export**:
  - **Download**: Save the final composed image as a high-quality PNG file.
  - **Copy to Clipboard**: Copy the image directly to the clipboard for easy pasting into other applications.
- **PWA Functionality**: The application will be installable on desktop and mobile devices for quick access and an app-like experience.

## 🛠️ Technology Stack

- **Framework**: React 19 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (using the new Vite plugin)
- **Component Library**: shadcn/ui
- **Core APIs**:
  - Screen Capture API (`navigator.mediaDevices.getDisplayMedia`)
  - Clipboard API (`navigator.clipboard.write`)
- **Key Libraries**:
  - `html-to-image`: To convert the styled DOM preview into an image for export.
  - `vite-plugin-pwa`: To generate the service worker and manifest for PWA capabilities.

## 🚀 Execution Plan

The project will be developed incrementally through the following key phases:

1.  **Foundation**: Set up the project with Tailwind CSS v4 and shadcn/ui.
2.  **Layout**: Build the basic two-column UI structure (sidebar for controls, main area for preview).
3.  **Core Logic**: Implement the screen capture functionality.
4.  **Editor Implementation**: Create the state management and UI controls for editing the screenshot.
5.  **Dynamic Rendering**: Develop the preview component that applies styles in real-time.
6.  **Feature Expansion**: Add the background selection functionality.
7.  **Finalization**: Implement the "Download" and "Copy" export features.
8.  **Deployment**: Convert the application into an installable PWA.
