# Task 8: Convert the Application to a PWA

## 🎯 Objective

Make the web application a Progressive Web App (PWA), allowing it to be "installed" on the user's device for an app-like experience and potential offline access.

## 📝 Description

You will use the `vite-plugin-pwa` package to automate the process of generating a service worker and a web manifest file. This will make the application meet the core criteria for being a PWA.

## 📋 Requirements

1.  **Install `vite-plugin-pwa`**:

    - Add the dev dependency: `npm install vite-plugin-pwa -D`.

2.  **Configure the Plugin**:

    - In `vite.config.ts`, import the plugin and add it to the `plugins` array.
    - Provide a configuration object to the `VitePWA` plugin. This object should define the `manifest` details.

3.  **Create the Web Manifest**:

    - In the plugin configuration, specify the `manifest` object. It should include:
      - `name`: "PWA Screenshooter"
      - `short_name`: "Screenshooter"
      - `description`: "A simple tool to capture and beautify screenshots."
      - `theme_color`: A hex code matching your app's theme.
      - `icons`: An array of icon objects. You'll need to create icons of various sizes (e.g., 192x192, 512x512) and place them in the `public` directory. The `vite.svg` can be used as a placeholder initially.

4.  **Configure the Service Worker**:

    - In the plugin configuration, you can specify the service worker strategy. For this app, `generateSW` (the default) is fine. It will automatically cache your application's assets (JS, CSS, etc.).

5.  **Update `index.html`**:

    - Add the `theme-color` meta tag to the `<head>` of `index.html`.
    - The PWA plugin will automatically inject the link to the manifest file, so you don't need to add it manually.

6.  **Verify PWA Functionality**:
    - Build the application for production (`npm run build`).
    - Serve the `dist` directory (`npm run preview`).
    - Open the app in a Chromium-based browser and use the Lighthouse tab in DevTools to run a PWA audit. The app should pass the "Installable" check.
    - An "Install" icon should appear in the browser's address bar.

## 🔗 Helpful Links

- **`vite-plugin-pwa`**: [https://vite-pwa-org.netlify.app/](https://vite-pwa-org.netlify.app/)
- **Web App Manifest**: [https://developer.mozilla.org/en-US/docs/Web/Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- **PWA Icons**: You can use a generator like [https://www.pwabuilder.com/imageGenerator](https://www.pwabuilder.com/imageGenerator) to create the necessary icon sizes from a single source image.

## ✅ Acceptance Criteria

- `vite-plugin-pwa` is installed and configured in `vite.config.ts`.
- The production build generates a `sw.js` file and a `manifest.webmanifest` file.
- The application is installable on desktop and mobile devices.
- The Lighthouse PWA audit shows a green checkmark for "Installable".
- The app has a custom name and icon when installed.

## 🧐 Check-up Questions

- Did I configure the manifest with all the required fields (`name`, `short_name`, `icons`, `start_url`, `display`)? The plugin handles some defaults, but it's good to be explicit.
- Are the icon paths in the manifest correct and are the icons located in the `public` directory?
- Am I testing the PWA features on the production build (`npm run preview`), not the dev server? Service workers are typically only registered in production builds.
- Does the app load when offline after the first visit? (This is a key benefit of the service worker caching).
