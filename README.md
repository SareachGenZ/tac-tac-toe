# Tic-Tac-Toe Pro

A modern, responsive, accessible browser-based Tic-Tac-Toe application built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

---

## Features

- **Two Game Modes:**
  - **Player vs Player (PvP):** Local multiplayer on the same device with customizable Player X and Player O display names.
  - **Player vs Computer (PvC):** Single-player mode against an AI opponent with an animated thinking indicator.
- **Three AI Difficulty Levels:**
  - **Easy:** Random valid move selection.
  - **Medium:** Tactical AI that takes immediate winning moves, blocks opponent winning threats, and prioritizes center/corners.
  - **Hard:** Optimal **Minimax** algorithm with alpha-beta pruning — never loses against any human line of play.
- **Statistics Dashboard & Match History:**
  - Tracks total games, Player X wins, Player O wins, Computer wins, total draws, and win percentage.
  - Automatically logs recent matches with game number, mode, player names, winner, result badge, and timestamp.
  - Persisted in `localStorage` with confirmation-protected reset actions.
- **Theme, Sound & Motion Controls:**
  - **Dark Mode** (default) and **Light Mode** with cohesive CSS design tokens.
  - Synthesized **Web Audio API** sound effects (click, X move, O move, win fanfare, draw cadence) with instant mute toggle.
  - **Framer Motion** animations with both an in-app toggle and automatic `prefers-reduced-motion` support.
- **Accessibility & Responsive Design:**
  - Semantic landmarks (`<header>`, `<nav>`, `<main>`), native `<dialog>` modals, `aria-live` turn/result announcements, arrow-key board navigation, `:focus-visible` outlines, and mobile-friendly touch targets.

---

## Tech Stack

- **Frontend:** React 18 (Functional Components & Hooks)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3 + CSS Custom Properties
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Persistence:** Browser `localStorage`
- **Audio:** Native Web Audio API
- **Testing:** Node.js Built-in Test Runner (`node --test`) + Vitest & React Testing Library

---

## Project Structure

```text
Tic_Tac_Toe_Pro/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── DifficultySelector.jsx
│   │   ├── GameBoard.jsx
│   │   ├── GameCell.jsx
│   │   ├── GameModeSelector.jsx
│   │   ├── GameResultModal.jsx
│   │   ├── Header.jsx
│   │   ├── HistoryPanel.jsx
│   │   ├── HowToPlayModal.jsx
│   │   ├── Modal.jsx
│   │   ├── ScoreBoard.jsx
│   │   ├── SettingsPanel.jsx
│   │   └── StatisticsPanel.jsx
│   ├── hooks/
│   │   ├── useAI.js
│   │   ├── useGame.js
│   │   ├── useLocalStorage.js
│   │   ├── useSound.js
│   │   └── useTheme.js
│   ├── pages/
│   │   ├── Game.jsx
│   │   ├── Home.jsx
│   │   └── Statistics.jsx
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   ├── gameLogic.js
│   │   ├── minimax.js
│   │   ├── statistics.js
│   │   └── storage.js
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   ├── accessibility.test.js
│   ├── app.ui.test.jsx
│   ├── gameLogic.test.js
│   ├── minimax.test.js
│   ├── phase1.setup.test.js
│   ├── phase2.layout.test.js
│   ├── setupVitest.js
│   └── statistics.test.js
├── CHECKLIST.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Installation & Local Development

### Prerequisites
- Node.js `v18+` (tested on Node `v26.3.1`)
- npm `v9+`

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open the local URL printed by Vite (typically `http://localhost:5173`).

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## Testing Instructions

- **Run pure Node unit, AI (exhaustive Minimax), storage, and accessibility tests (no `node_modules` required):**
  ```bash
  npm run test:node
  ```

- **Run UI integration tests with Vitest + React Testing Library (after `npm install`):**
  ```bash
  npm run test:ui
  ```

- **Run the complete test suite (Node + Vitest):**
  ```bash
  npm test
  ```

---

## GitHub Setup & Deployment

### Push to GitHub

```bash
git init
git add .
git commit -m "feat: complete Tic-Tac-Toe Pro application"
git branch -M main
git remote add origin https://github.com/<your-username>/tic-tac-toe-pro.git
git push -u origin main
```

### Deploy

The production build outputs static assets to `dist/`:

```bash
npm run build
```

You can deploy `dist/` directly to **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages**:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

