# 🎬 ClipForge

> **The Official Announcement & Showcase Web Platform for [AI Shorts Generator](file:///C:/Users/mural/.gemini/antigravity/scratch/ai-clip)**

---

## 📌 Project Overview

**ClipForge** is the high-performance, interactive announcement website and product landing experience built for **[AI Shorts Generator](file:///C:/Users/mural/.gemini/antigravity/scratch/ai-clip)**. 

While **`ai-clip`** serves as the offline-capable desktop web engine executing complex media analysis and video compilation, **ClipForge** is designed to showcase the platform's vision, demonstrate its 3D interactive capabilities, visually explain its 14-stage AI processing pipeline, and present the product to creators, content teams, and marketers.

---

## 🔗 Connection to the Core Engine (`ai-clip`)

The underlying system—located at [`C:\Users\mural\.gemini\antigravity\scratch\ai-clip`](file:///C:/Users/mural/.gemini/antigravity/scratch/ai-clip)—is an automated AI media production studio that converts long-form videos (podcasts, streams, lectures, interviews) into viral 9:16 vertical short-form content (YouTube Shorts, TikToks, Instagram Reels).

**ClipForge** serves as the public-facing announcement site for `ai-clip` by providing:
1. **Interactive Product Announcement**: Explains what `ai-clip` does, why it saves editing time, and how it automates viral clip creation.
2. **Visual AI Pipeline Walkthrough**: Interactive step-by-step breakdown of how `ai-clip` processes raw video files into polished short clips.
3. **Architecture & Infrastructure Exploration**: Exploded view diagrams showing the relationship between the React frontend, Node.js/Express backend server, and the Python AI pipeline.
4. **Caption & Style Presets Showcase**: Live previews of caption animation styles (Karaoke, Pop, Boxed, Bold Highlight) and auto-crop settings.

---

## ✨ Key Features of ClipForge

### 🔮 1. 3D Interactive Hero Canvas
- Built with **React Three Fiber** and **Drei**.
- Features real-time responsive 3D glassmorphic spheres, particle systems, and mouse-reactive lighting that create an immediate visual impact.

### ⚙️ 2. Interactive AI Pipeline Inspector
- Visualizes the 14 automated processing stages performed by `ai-clip`:
  - 🎙️ **Audio Extraction & VAD**: Isolates speech from background noise.
  - 📝 **Whisper Transcription**: Generates word-level timestamps.
  - 🗣️ **Speaker Diarization**: Identifies who is speaking and when.
  - 🎯 **Highlight Detection & Quality Scoring**: Ranks engaging moments.
  - 👁️ **YOLOv8 Face Detection & Tracking**: Tracks active speakers across frames.
  - 📐 **Smart 9:16 Smooth Cropping**: Dynamically adjusts camera framing.
  - 💬 **Dynamic Captioning & Karaoke Styling**: Animates captions word-by-word.
  - 🎵 **Background Music & B-Roll Overlay**: Integrates soundscapes and asset overlays.
  - 🌐 **Multi-Language Translation**: Translates captions into Spanish, Hindi, French, German, etc.
  - 🖼️ **Thumbnail & Hook Generation**: Prepares eye-catching cover graphics.

### 🏛️ 3. Exploded Architecture View
- Interactive visual breakdown illustrating how requests flow from user input -> Express API -> Python AI Runner -> Socket.IO real-time progress events -> Client UI.

### 🎨 4. Caption & Layout Showcase
- Live preview interface allowing users to test viral caption styles, color palettes, hook placements, and layout modes before launching the main app.

### 📁 5. Storage & Isolation Visualization
- Explains the job-isolated storage hierarchy used by `ai-clip` (`storage/uploads/`, `storage/temp/`, `storage/outputs/`, `storage/assets/`).

### 🌊 6. Smooth Scroll & Resilience Layer
- Integrated **Lenis** smooth scrolling with GSAP ScrollTrigger.
- Features graceful fallbacks and error boundaries preventing worker blob URL issues in development environments.

---

## 🛠️ Technology Stack

### ClipForge (Announcement Website)
- **Frontend Framework**: React 19, JavaScript (ES6+)
- **Styling & Design System**: Tailwind CSS v3, PostCSS, Custom CSS Variables
- **3D Graphics & Animations**: `@react-three/fiber`, `@react-three/drei`, `three.js`, Framer Motion, GSAP
- **Build Tooling & Bundling**: CRACO (`@craco/craco`), Webpack 5
- **UI Components & Icons**: Radix UI Primitives, Lucide React Icons, Sonner Toasts

### Core Engine Stack (`ai-clip`)
- **Frontend**: React, TypeScript, Vite, Zustand, Socket.IO Client
- **Backend**: Node.js, Express, TypeScript, Socket.IO, Multer
- **AI Processing Pipeline**: Python 3, PyTorch, OpenCV, YOLOv8, OpenAI Whisper, FFmpeg

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22.x recommended)
- **npm**: v9.x or higher

### Installation & Local Setup

1. **Clone / Navigate to ClipForge**:
   ```bash
   cd C:\Users\mural\.gemini\antigravity\scratch\ClipForge
   ```

2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```
   The application will launch automatically at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

4. **Build for Production**:
   ```bash
   npm run build
   ```
   Generates optimized static assets inside the `build/` directory ready for deployment.

---

## ⚙️ Environment Variables

ClipForge uses `.env` and `.env.development` for runtime configuration:

```env
REACT_APP_BACKEND_URL=http://localhost:3000
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
GENERATE_SOURCEMAP=true
FAST_REFRESH=true
SKIP_PREFLIGHT_CHECK=true
```

---

## 📁 Repository Structure

```
ClipForge/
├── public/                  # HTML template, favicons, worker fallbacks
├── src/
│   ├── components/
│   │   ├── landing/         # Announcement sections (Hero, Pipeline, ExplodedView, Showcase, etc.)
│   │   ├── ui/              # Radix UI primitive components
│   │   └── ErrorBoundary.jsx# Global error boundary for worker safety
│   ├── lib/
│   │   ├── lenis.js         # Smooth scrolling & GSAP integration
│   │   └── utils.js         # Tailwind class merging utility (clsx + tailwind-merge)
│   ├── App.js               # Main landing application composition
│   ├── index.js             # React DOM entry point & React Query setup
│   └── index.css            # Global CSS tokens & Tailwind directives
├── craco.config.js          # Webpack & Web Worker build configuration
├── package.json             # Dependencies & scripts
└── README.md                # Project documentation
```

---

## 🤝 Project Alignment

- **Announcement Portal**: [ClipForge](file:///C:/Users/mural/.gemini/antigravity/scratch/ClipForge)
- **Core Processing Engine**: [AI Shorts Generator (`ai-clip`)](file:///C:/Users/mural/.gemini/antigravity/scratch/ai-clip)

*Designed & developed for automated short-form video creation.*
