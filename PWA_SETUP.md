# PWA Setup Instructions

## Current Status

The PWA configuration has been added to `vite.config.ts` but needs to be completed with the following steps:

## Step 1: Install Dependencies

Run the following command to install the required PWA plugin:

```bash
npm install vite-plugin-pwa -D
```

## Step 2: Create PWA Icons

You need to create PNG icons from the existing `favicon.svg`. You have several options:

### Option A: Online Tools (Recommended)

1. Visit [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)
2. Upload the `public/favicon.svg` file
3. Download the generated icons
4. Place the following files in the `public/` directory:
   - `pwa-192x192.png`
   - `pwa-512x512.png`

### Option B: Using Sharp (Node.js)

```bash
npm install sharp --save-dev
```

Then create a script to generate icons:

```javascript
const sharp = require("sharp");

// Generate 192x192 icon
sharp("public/favicon.svg")
  .resize(192, 192)
  .png()
  .toFile("public/pwa-192x192.png");

// Generate 512x512 icon
sharp("public/favicon.svg")
  .resize(512, 512)
  .png()
  .toFile("public/pwa-512x512.png");
```

## Step 3: Update Vite Configuration

Once you have the PNG icons, update the `vite.config.ts` to use PNG icons instead of SVG:

```typescript
icons: [
  {
    src: "pwa-192x192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "pwa-512x512.png",
    sizes: "512x512",
    type: "image/png",
  },
  {
    src: "pwa-512x512.png",
    sizes: "512x512",
    type: "image/png",
    purpose: "any maskable",
  },
],
```

## Step 4: Test PWA Functionality

1. Build the application: `npm run build`
2. Preview the build: `npm run preview`
3. Open Chrome DevTools → Lighthouse
4. Run a PWA audit
5. Check for the install button in the browser address bar

## Step 5: Verify Files Generated

After building, check that these files are created in the `dist/` directory:

- `sw.js` (service worker)
- `manifest.webmanifest` (web app manifest)

## Current Configuration

The PWA is configured with:

- **Name**: PWA Screenshooter
- **Short Name**: Screenshooter
- **Theme Color**: #3b82f6 (blue)
- **Background Color**: #ffffff (white)
- **Display Mode**: standalone
- **Auto Update**: Enabled
- **Offline Caching**: Configured for fonts and static assets

## Troubleshooting

If you encounter TypeScript errors:

1. Make sure `vite-plugin-pwa` is installed
2. Restart your TypeScript server
3. Check that all icon files exist in the `public/` directory

The application will be installable as a PWA once these steps are completed!
