# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

No test suite is configured.

## Architecture

**Skinstric** is a skin analysis app built with Next.js 15 (Pages Router), React 19, and Tailwind CSS. The app is frontend-only — all backend logic runs on Google Cloud Functions.

### User Flow

Sequential wizard: `/ → /testing → /analysis → /camera → /demographics → /select`

- `/` — Landing/intro
- `/testing` — Collects user name and location
- `/analysis` — Lets user choose camera or gallery upload
- `/camera` — Captures/uploads a skin photo (base64-encoded)
- `/demographics` — Skin type survey
- `/select` — Final selection/filtering

### Data Persistence

No state management library. Data flows across pages via `localStorage` / `sessionStorage`. API calls use `fetch()` directly to Google Cloud Functions endpoints with JSON POST bodies. Images are base64-encoded before upload.

### Styling

Tailwind CSS with a custom "Roobert TRIAL" font (`src/styles/globals.css`). Animation keyframes (rotating diamond borders, slow spins) live in `src/styles/animations.css`. Path alias `@/*` resolves to `src/*`.

### Shared Components

Only three reusable components exist in `src/components/`: `Header`, `LeftButton`, `RightButton`. Most UI is page-specific.
