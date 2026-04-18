# FluxArena — Stadium Intelligence Dashboard

FluxArena is a high-fidelity, premium stadium navigation and crowd intelligence platform designed for the modern sports fan. Built with **Next.js**, it delivers real-time occupancy insights through a futuristic, glassmorphic mobile dashboard.

![FluxArena v3 Dashboard](https://raw.githubusercontent.com/placeholder-path/flux-preview.png)

## 🔭 Key Features

- **Interactive Heatmap Engine**: Segmented stadium visualization with dynamic density animations and scan-line effects.
- **Smart Route Optimization**: Real-time "Fastest Route" tracking with visual directional cues to avoid bottlenecks.
- **Integrated AI Assistant**: Context-aware companion for wait-time recommendations, food searching, and venue navigation.
- **Surge Simulation**: Built-in logic to simulate crowd surge scenarios and test routing efficiency.
- **Premium Aesthetics**: High-contrast obsidian theme (`#0b101b`) with neon cyan/magenta accents and custom HD branding.
- **Responsive Mobile Frame**: Precision-engineered for 95vh viewports within a high-fidelity mobile device shell.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Library**: [React](https://reactjs.org/)
- **Styling**: Vanilla CSS (Custom Design System & Glassmorphism)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Custom CSS Keyframes & State-driven CSS-in-JS

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser. Use a mobile-scaled viewport for the best experience.

## 📂 Project Structure

- `src/app/page.tsx`: Core Dashboard Logic & Grid-based Layout.
- `src/components/`:
  - `MobileFrame.tsx`: High-fidelity iPhone shell with status bar and safe areas.
  - `StadiumMap.tsx`: Segmented Heatmap & SVG Navigation logic.
  - `QuickActions.tsx`: Interactive action cards grid.
  - `ChatAssistant.tsx`: Sliding bottom-sheet AI interface.
  - `TopStatus.tsx`: Real-time venue status header.
- `public/`: High-resolution custom branding assets (`logo-v27.png`, `text-v25.png`).

---

**FluxArena** — *Precision Navigation. Intelligence Redefined.*
