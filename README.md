# Hikari Ignition

Build a high-performance React + Vite hero section with a gated loading sequence for the industrial streetwear brand "Hikari".

COLOR PALETTE & STYLES:

- Primary Brand Red: Deep Crimson #730800 (Use EXACTLY this hex code for all logo fills, active glows, rim lights, and primary CTA elements).

- Background: Pitch Obsidian #080808.

- Surface/Panels: Dark Zinc #121215 with sharp zero-radius borders (rounded-none).

- Text: Off-White #E5E5E5 for headings, Steel Gray #707075 for technical subtext, font-mono for UI micro-copy.

1. INITIAL PRELOADER SEQUENCE (Gated Lifecycle):

   - Render a full-screen loader overlay (bg-[#080808], z-50, fixed inset-0) on app mount.

   - Centralized SVG Logo Animation (using the provided Hikari SVG):

     a) Animate the SVG path outlines using CSS stroke-dashoffset over 1.5 seconds (stroke color: #730800, stroke-width: 1.5px).

     b) Upon outline completion, trigger a smooth color fill transition to solid #730800 over 0.6 seconds.

   - Completion Handshake:

     a) Once filled, fade out the preloader (opacity-0 transition, 0.5s duration) and set a React state flag `isLoaded = true`.

     b) Unmount/hide the preloader overlay completely.

2. HERO BACKGROUND LAYERS:

   - Giant Watermark: Position oversized "HIKARI" background typography (text-[20vw], text-white/[0.03], font-black, pointer-events-none) centered on screen.

   - Tiled Japanese Cloud Pattern (Kumo):

     a) Implement a tileable Japanese traditional cloud line-art pattern inspired by the uploaded image.

     b) Render cloud outlines using ultra-thin 0.5px white/light-gray strokes (opacity: 0.08).

     c) Add a subtle CSS pulsing opacity animation (looping continuously between opacity 0.04 and 0.18 every 4 seconds).

3. FOREGROUND 3D VIEWPORT (Gated Ignition):

   - Render the React Three Fiber 3D Canvas in the center foreground.

   - Mount/Activate 3D render loops and model rotations ONLY when `isLoaded === true` (preventing background GPU rendering during the intro logo animation).

   - Rotating 3D Apparel:

     a) Display 3D clothing models (e.g., oversized hoodie, graphic tee, streetwear jacket).

     b) Automatically cycle through models every 3.5 seconds with a smooth scale/fade swap transition.

   - 3D Studio Lighting:

     * Dark ambient fill light (intensity 0.2).

     * Sharp neutral directional key light catching fabric folds.

     * Deep red rim/backlight using color #730800 casting an edge glow on the 3D mesh.

4. CALL TO ACTION & SCROLL PROMPT:

   - Fades into view alongside the 3D modelv once `isLoaded === true`:

     a) Primary Button: "SHOP NOW" (bg-[#730800], hover:bg-[#8f0a00], text-white, sharp 0px corners, font-mono tracking-widest, px-8 py-3, subtle #730800 shadow/glow).

     b) Scroll Prompt: Small monospaced label "[ SCROLL TO EXPLORvE ]" with an animated pulsing down-chevron beneath the CTA button.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hikari-ignite-intro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/025867cd-b372-4521-9111-ca8dd76681cb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
