import React, { useState, useEffect, useRef } from 'react';
import './DocsPage.css';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      className="docs-copy-btn" 
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const CodeBlock = ({ language, children }) => {
  return (
    <div className="docs-code-wrapper">
      <div className="docs-code-header">
        <span className="docs-code-lang">{language}</span>
        <CopyButton text={children} />
      </div>
      <pre className="docs-code-block">
        <code>{children}</code>
      </pre>
    </div>
  );
};

const SIDEBAR_NAV = [
  {
    title: 'GETTING STARTED',
    links: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'requirements', label: 'Requirements' },
      { id: 'installation', label: 'Installation' }
    ]
  },
  {
    title: 'ARCHITECTURE',
    links: [
      { id: 'architecture-overview', label: 'System Overview' },
      { id: 'architecture-frontend', label: 'Frontend' },
      { id: 'architecture-backend', label: 'Backend' },
      { id: 'architecture-pipeline', label: 'AI Pipeline' },
      { id: 'architecture-dataflow', label: 'Data Flow' }
    ]
  },
  {
    title: 'AI PIPELINE',
    links: [
      { id: 'pipeline-overview', label: 'Pipeline Overview' },
      { id: 'pipeline-audio', label: 'Audio Extraction' },
      { id: 'pipeline-vad', label: 'Voice Activity Detection' },
      { id: 'pipeline-transcription', label: 'Transcription' },
      { id: 'pipeline-speaker-diarization', label: 'Speaker Diarization' },
      { id: 'pipeline-highlights', label: 'Highlight Detection' },
      { id: 'pipeline-scene-detection', label: 'Scene Detection' },
      { id: 'pipeline-face-detection', label: 'Face Detection' },
      { id: 'pipeline-face-tracking', label: 'Face Tracking' },
      { id: 'pipeline-camera', label: 'Camera System' },
      { id: 'pipeline-cut-crop', label: 'Cut & Crop' },
      { id: 'pipeline-captions', label: 'Captions' },
      { id: 'pipeline-metadata', label: 'Metadata Generation' },
      { id: 'pipeline-export', label: 'Export' },
      { id: 'pipeline-thumbnails', label: 'Thumbnails' },
      { id: 'pipeline-music', label: 'Background Music' },
      { id: 'pipeline-translation', label: 'Translation' }
    ]
  },
  {
    title: 'AI MODELS',
    links: [
      { id: 'models-whisper', label: 'Faster Whisper' },
      { id: 'models-vad', label: 'Silero VAD' },
      { id: 'models-pyannote', label: 'Pyannote Audio' },
      { id: 'models-yolov8', label: 'YOLOv8' },
      { id: 'models-llama', label: 'LLaMA 3' },
      { id: 'models-scenedetect', label: 'PySceneDetect' },
      { id: 'models-libretranslate', label: 'LibreTranslate' }
    ]
  },
  {
    title: 'EDITOR',
    links: [
      { id: 'editor-overview', label: 'Editor Overview' },
      { id: 'editor-general', label: 'General Tab' },
      { id: 'editor-captions', label: 'Captions Tab' },
      { id: 'editor-hook', label: 'Hook Tab' },
      { id: 'editor-layout', label: 'Layout Tab' },
      { id: 'editor-music', label: 'Music Tab' },
      { id: 'editor-export', label: 'Export Tab' }
    ]
  },
  {
    title: 'VIDEO PROCESSING',
    links: [
      { id: 'video-rendering', label: 'Rendering Pipeline' },
      { id: 'video-layouts', label: 'Layout Modes' },
      { id: 'video-cropping', label: 'Smart Cropping' },
      { id: 'video-hook', label: 'Hook Overlay' },
      { id: 'video-retrimming', label: 'Retrimming' }
    ]
  },
  {
    title: 'DATA ARCHITECTURE',
    links: [
      { id: 'data-clips', label: 'clips.json' },
      { id: 'data-metadata', label: 'Metadata Files' },
      { id: 'data-structure', label: 'Project Structure' }
    ]
  },
  {
    title: 'BACKEND API',
    links: [
      { id: 'api-overview', label: 'API Overview' },
      { id: 'api-upload', label: 'Upload Endpoints' },
      { id: 'api-processing', label: 'Processing Endpoints' },
      { id: 'api-results', label: 'Results Endpoints' },
      { id: 'api-settings', label: 'Settings Endpoints' },
      { id: 'api-projects', label: 'Projects Endpoints' },
      { id: 'api-storage', label: 'Storage Endpoints' },
      { id: 'api-export', label: 'Export Endpoints' }
    ]
  },
  {
    title: 'CONFIGURATION',
    links: [
      { id: 'config-env', label: 'Environment Variables' },
      { id: 'config-ai', label: 'AI Configuration' },
      { id: 'config-settings', label: 'User Settings' }
    ]
  },
  {
    title: 'TROUBLESHOOTING',
    links: [
      { id: 'troubleshoot-common', label: 'Common Issues' },
      { id: 'troubleshoot-pipeline', label: 'Pipeline Errors' },
      { id: 'troubleshoot-rendering', label: 'Rendering Issues' }
    ]
  },
  {
    title: 'DEPLOYMENT',
    links: [
      { id: 'deploy-local', label: 'Local Development' },
      { id: 'deploy-production', label: 'Production Build' }
    ]
  }
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState(
    SIDEBAR_NAV.reduce((acc, group) => ({ ...acc, [group.title]: true }), {})
  );

  const toggleGroup = (title) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to find the most visible one
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px', // Offset for the fixed header
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Get header offset
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setSidebarOpen(false);
      setActiveSection(id);
    }
  };

  return (
    <div className="docs-layout">
      <header className="docs-header">
        <div className="docs-header-left">
          <button 
            className="docs-mobile-menu-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <div className="docs-logo">
            <div className="docs-logo-icon"></div>
            <span className="docs-logo-text">ClipForge Docs</span>
          </div>
        </div>
        <div className="docs-header-right">
          <a href="/" className="docs-header-link">← Back to site</a>
          <a href="https://github.com/Murali3824/Al-Clips-Studio" target="_blank" rel="noopener noreferrer" className="docs-header-icon" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </header>

      <div className="docs-body">
        <div className={`docs-sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)}></div>
        
        <aside className={`docs-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="docs-nav">
            {SIDEBAR_NAV.map((group, idx) => (
              <div key={idx} className="docs-nav-group">
                <button 
                  className="docs-nav-group-title" 
                  onClick={() => toggleGroup(group.title)}
                >
                  {group.title}
                  <svg 
                    className={`docs-nav-group-chevron ${openGroups[group.title] ? 'open' : ''}`}
                    viewBox="0 0 16 16" 
                    fill="currentColor"
                  >
                    <path d="M6 4l5 4-5 4V4z" />
                  </svg>
                </button>
                {openGroups[group.title] && (
                  <ul className="docs-nav-links">
                    {group.links.map((link) => (
                      <li key={link.id}>
                        <button
                          className={`docs-nav-link ${activeSection === link.id ? 'active' : ''}`}
                          onClick={() => scrollToSection(link.id)}
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="docs-main">
          <div className="docs-content">
            
            {/* GETTING STARTED */}
            <section id="introduction">
              <h1 className="docs-h1">Introduction</h1>
              <p className="docs-lead">
                ClipForge (powered by AI Clips Studio) is an offline-capable desktop web application that transforms long-form videos into short, viral clips for YouTube Shorts, TikTok, and Instagram Reels.
              </p>
              <p className="docs-p">
                <strong>How it works:</strong> Upload a long video → AI analyzes it through 20 processing stages → generates multiple optimized 9:16 short clips with captions, hooks, thumbnails, and metadata → edit and export.
              </p>
              <p className="docs-p">
                <strong>Target Audience:</strong> Content creators, marketers, educators, and podcast hosts looking to scale their short-form content production.
              </p>
              <h3 className="docs-h3">Key Capabilities</h3>
              <ul className="docs-list">
                <li>AI highlight detection identifying engaging moments</li>
                <li>Smart 9:16 cropping with face tracking and continuity</li>
                <li>14+ caption styles with customizable containers and animations</li>
                <li>AI-generated hooks & metadata (titles, descriptions, tags)</li>
                <li>Background music mixing with adjustable volume</li>
                <li>Multi-language translation support</li>
                <li>Full clip editor with a 7-tab interface for granular control</li>
              </ul>
            </section>
            
            <hr className="docs-divider" />

            <section id="requirements">
              <h2 className="docs-h2">Requirements</h2>
              <div className="docs-info">
                <strong>System Requirements</strong>
                <ul className="docs-list" style={{marginTop: '10px', marginBottom: 0}}>
                  <li>Node.js v20+</li>
                  <li>Python 3.10+</li>
                  <li>FFmpeg (must be in PATH)</li>
                  <li>Ollama (running locally, with <code>llama3:8b</code> model pulled)</li>
                  <li>~10GB disk space for AI models</li>
                  <li><em>Optional:</em> LibreTranslate server for translation</li>
                  <li><em>Optional:</em> HuggingFace token for speaker diarization (pyannote)</li>
                </ul>
              </div>
              <p className="docs-p">
                <strong>Python Packages (from ai/requirements.txt):</strong><br/>
                <code className="docs-code-inline">faster-whisper</code>, <code className="docs-code-inline">stable-ts</code>, <code className="docs-code-inline">silero-vad</code>, <code className="docs-code-inline">opencv-python</code>, <code className="docs-code-inline">numpy</code>, <code className="docs-code-inline">scenedetect</code>, <code className="docs-code-inline">ffmpeg-python</code>, <code className="docs-code-inline">requests</code>, <code className="docs-code-inline">ollama</code>, <code className="docs-code-inline">ultralytics</code>, <code className="docs-code-inline">pyannote.audio</code>
              </p>
              <p className="docs-p">
                <strong>Node Packages:</strong><br/>
                <em>Backend:</em> Express, Socket.IO, Multer, Winston, Archiver, UUID, CORS.<br/>
                <em>Frontend:</em> React 18, Vite, Tailwind CSS, Zustand, Socket.IO Client, React Player.
              </p>
            </section>

            <hr className="docs-divider" />

            <section id="installation">
              <h2 className="docs-h2">Installation</h2>
              <p className="docs-p">Follow these steps to set up the development environment.</p>
              
              <ol className="docs-list">
                <li>Clone the repository:
                  <CodeBlock language="bash">
{`git clone https://github.com/Murali3824/Al-Clips-Studio.git
cd Al-Clips-Studio`}
                  </CodeBlock>
                </li>
                <li>Install backend dependencies:
                  <CodeBlock language="bash">
{`cd backend
npm install`}
                  </CodeBlock>
                </li>
                <li>Install frontend dependencies:
                  <CodeBlock language="bash">
{`cd frontend
npm install`}
                  </CodeBlock>
                </li>
                <li>Create Python virtual environment and install AI dependencies:
                  <CodeBlock language="bash">
{`cd ai
python -m venv venv
# Windows: venv\\Scripts\\activate
# Linux/Mac: source venv/bin/activate
pip install -r requirements.txt`}
                  </CodeBlock>
                </li>
                <li>Download AI models:
                  <CodeBlock language="bash">
{`python download_models.py`}
                  </CodeBlock>
                  <p className="docs-p"><small>This downloads: Silero VAD, YOLOv8n, YuNet Face Detector, Whisper (tiny/medium/large-v3)</small></p>
                </li>
                <li>Install and configure Ollama:
                  <CodeBlock language="bash">
{`ollama pull llama3:8b`}
                  </CodeBlock>
                </li>
                <li>Install FFmpeg (must be accessible in PATH)</li>
                <li>Configure environment: Copy <code className="docs-code-inline">backend/.env.example</code> to <code className="docs-code-inline">backend/.env</code></li>
                <li>Start the application:
                  <CodeBlock language="bash">
{`# Terminal 1 - Backend
cd backend
npm run dev    # Starts on http://localhost:3001

# Terminal 2 - Frontend  
cd frontend
npm run dev    # Starts on http://localhost:5173

# Terminal 3 - Ollama (if not running as service)
ollama serve`}
                  </CodeBlock>
                </li>
              </ol>
            </section>

            <hr className="docs-divider" />

            {/* ARCHITECTURE */}
            <section id="architecture-overview">
              <h2 className="docs-h2">System Overview</h2>
              <p className="docs-p">ClipForge is built on a decoupled architecture, using React for the interface, Node.js for API and orchestration, and Python for the heavy AI processing.</p>
              
              <div className="docs-arch-flow">
                <div className="docs-arch-node">
                  <strong>User</strong>
                </div>
                <div className="docs-arch-arrow">↓</div>
                <div className="docs-arch-node" style={{backgroundColor: '#e6f7ff', borderColor: '#1890ff'}}>
                  <strong>React Frontend</strong><br/>
                  <small>Vite, TypeScript, Zustand, Tailwind CSS (Port 5173)</small>
                </div>
                <div className="docs-arch-arrow">↓ <em>REST API + Socket.IO</em></div>
                <div className="docs-arch-node" style={{backgroundColor: '#f6ffed', borderColor: '#52c41a'}}>
                  <strong>Express Backend</strong><br/>
                  <small>TypeScript, Socket.IO, Multer (Port 3001)</small>
                </div>
                <div className="docs-arch-arrow">↓ <em>Spawns Python process</em></div>
                <div className="docs-arch-node" style={{backgroundColor: '#fffbe6', borderColor: '#faad14'}}>
                  <strong>Python AI Pipeline</strong><br/>
                  <small>20 stages, checkpoint-based</small>
                </div>
                <div className="docs-arch-arrow">↓ <em>Uses</em></div>
                <div className="docs-arch-node" style={{backgroundColor: '#f9f0ff', borderColor: '#722ed1'}}>
                  <strong>AI Models</strong><br/>
                  <small>Whisper, Silero VAD, YOLOv8, LLaMA3, Pyannote</small>
                </div>
                <div className="docs-arch-arrow">↓ <em>Produces</em></div>
                <div className="docs-arch-node" style={{backgroundColor: '#fff0f6', borderColor: '#eb2f96'}}>
                  <strong>Storage</strong><br/>
                  <small>uploads/ → temp/ → outputs/</small>
                </div>
                <div className="docs-arch-arrow">↓ <em>Served via</em></div>
                <div className="docs-arch-node">
                  <strong>Results API → Frontend Results UI</strong>
                </div>
              </div>
            </section>

            <section id="architecture-frontend">
              <h2 className="docs-h2">Frontend Architecture</h2>
              <p className="docs-p">
                The frontend is a single-page application built with React 18, TypeScript, Vite, and Tailwind CSS. State management is handled by Zustand, and real-time updates are driven by Socket.IO.
              </p>
              <h3 className="docs-h3">State Stores (Zustand)</h3>
              <ul className="docs-list">
                <li><code className="docs-code-inline">uploadStore</code>: Manages file selection and upload progress.</li>
                <li><code className="docs-code-inline">settingsStore</code>: Persists user configuration for pipeline runs.</li>
                <li><code className="docs-code-inline">processingStore</code>: Tracks pipeline stages and logs via WebSocket.</li>
                <li><code className="docs-code-inline">resultsStore</code>: Manages generated clips and editor state.</li>
              </ul>
              <h3 className="docs-h3">Application Flow</h3>
              <p className="docs-p">The UI operates as a state machine rather than relying on strict routing paths:</p>
              <p className="docs-p" style={{textAlign: 'center', background: '#f8f9fa', padding: '10px', borderRadius: '4px'}}>
                Dashboard → Upload → Settings → Processing → Results → Editor
              </p>
              <h3 className="docs-h3">Key Components</h3>
              <ul className="docs-list">
                <li><strong>ProjectsDashboard.tsx</strong> - Project management and selection</li>
                <li><strong>UploadSection.tsx</strong> - Drag-drop area and YouTube URL import</li>
                <li><strong>ProcessingSettings.tsx</strong> - Clip count, duration targets, whisper model selection</li>
                <li><strong>CaptionSettings.tsx</strong> - 14+ caption styles, fonts, colors, animations configuration</li>
                <li><strong>ProgressPanel.tsx</strong> - Real-time 20-stage progress visualization</li>
                <li><strong>ResultsPage.tsx</strong> - Clip grid, video player, and generated scores</li>
                <li><strong>EditorLayout.tsx</strong> - Comprehensive 7-tab clip editor interface</li>
              </ul>
            </section>

            <section id="architecture-backend">
              <h2 className="docs-h2">Backend Architecture</h2>
              <p className="docs-p">
                The backend acts as an orchestrator, API server, and WebSocket host. It runs on Express + TypeScript (Port 3001) and manages the lifecycle of the Python pipeline.
              </p>
              <h3 className="docs-h3">Service Layer</h3>
              <ul className="docs-list">
                <li><code className="docs-code-inline">job.service.ts</code> - UUID job creation and management.</li>
                <li><code className="docs-code-inline">python.service.ts</code> - Core service for spawning and tracking Python processes.</li>
                <li><code className="docs-code-inline">results.service.ts</code> - Handles clip results, trimming, and editing operations.</li>
                <li><code className="docs-code-inline">settings.service.ts</code> - User settings persistence.</li>
                <li><code className="docs-code-inline">project.service.ts</code> - Project CRUD with lifecycle management.</li>
                <li><code className="docs-code-inline">export.service.ts</code> - ZIP export creation for final downloads.</li>
                <li><code className="docs-code-inline">storage.service.ts</code> - Storage metrics and cleanup routines.</li>
                <li><code className="docs-code-inline">youtube.service.ts</code> - YouTube video importing functionality.</li>
              </ul>
              <h3 className="docs-h3">Socket.IO Events (Backend → Frontend)</h3>
              <ul className="docs-list">
                <li><code className="docs-code-inline">pipeline:event</code> - Stage progress updates</li>
                <li><code className="docs-code-inline">pipeline:log</code> - Standard processing log lines</li>
                <li><code className="docs-code-inline">pipeline:error</code> - Error messages from the pipeline</li>
                <li><code className="docs-code-inline">pipeline:exit</code> - Emitted on pipeline completion</li>
                <li><code className="docs-code-inline">pipeline:cancelled</code> - Emitted if user cancels processing</li>
                <li><code className="docs-code-inline">retrim:progress</code> - Re-render progress updates from editor changes</li>
              </ul>
            </section>

            <section id="architecture-pipeline">
              <h2 className="docs-h2">AI Pipeline Architecture</h2>
              <p className="docs-p">
                The Python pipeline (<code className="docs-code-inline">ai/pipeline/pipeline.py</code>) is a linear, checkpoint-based orchestrator (Version 2.4.0).
              </p>
              <ul className="docs-list">
                <li>Each of the 20 stages runs sequentially.</li>
                <li>Completed stages are saved to <code className="docs-code-inline">checkpoint.json</code>, enabling automatic resume on failure.</li>
                <li>Progress events are printed as JSON to stdout, parsed by Node.js, and forwarded to the frontend via Socket.IO.</li>
                <li>A Context object is passed to every stage, containing: <code className="docs-code-inline">job_id, settings, root, upload_dir, temp_dir, output_dir</code>.</li>
              </ul>
            </section>

            <section id="architecture-dataflow">
              <h2 className="docs-h2">Data Flow</h2>
              <p className="docs-p">The lifecycle of data through the system:</p>
              <ol className="docs-list">
                <li><strong>Upload:</strong> User uploads video → <code className="docs-code-inline">storage/uploads/&#123;jobId&#125;/input.mp4</code></li>
                <li><strong>Intermediate:</strong> Pipeline creates temp files → <code className="docs-code-inline">storage/temp/&#123;jobId&#125;/</code> (audio.wav, transcript.json, highlights.json, etc.)</li>
                <li><strong>Outputs:</strong> Pipeline produces final output → <code className="docs-code-inline">storage/outputs/&#123;jobId&#125;/</code> (clips.json, clips/, thumbnails/, metadata/, translations/)</li>
                <li><strong>Serve:</strong> Backend reads outputs and serves them via Results API</li>
                <li><strong>Display:</strong> Frontend fetches and displays results</li>
                <li><strong>Edit:</strong> User edits a clip → Backend saves changes to metadata JSON → Retrim module re-renders the clip</li>
              </ol>
            </section>

            <hr className="docs-divider" />

            {/* AI PIPELINE */}
            <section id="pipeline-overview">
              <h2 className="docs-h2">Pipeline Overview</h2>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Stage</th>
                      <th>Technology</th>
                      <th>Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>Audio Extraction</td><td>FFmpeg</td><td>audio.wav</td></tr>
                    <tr><td>2</td><td>Voice Activity Detection</td><td>Silero VAD (ONNX)</td><td>speech_timestamps.json</td></tr>
                    <tr><td>3</td><td>Transcription</td><td>Whisper (faster-whisper + stable-ts)</td><td>transcript.json</td></tr>
                    <tr><td>4</td><td>Speaker Diarization</td><td>Pyannote Audio 3.1</td><td>speaker_diarization.json</td></tr>
                    <tr><td>5</td><td>Highlight Detection</td><td>LLaMA3 8B (via Ollama)</td><td>highlights.json</td></tr>
                    <tr><td>6</td><td>Scene Detection</td><td>PySceneDetect ContentDetector</td><td>scene_cuts.json</td></tr>
                    <tr><td>7</td><td>Face Detection</td><td>YOLOv8 Nano</td><td>face_detections.json</td></tr>
                    <tr><td>8</td><td>Face Tracking</td><td>ByteTrack (via YOLOv8)</td><td>face_tracks.json</td></tr>
                    <tr><td>9</td><td>Subject Identity</td><td>Custom continuity logic</td><td>(internal state)</td></tr>
                    <tr><td>10</td><td>Shot Selection</td><td>Custom editorial algorithms</td><td>(internal state)</td></tr>
                    <tr><td>11</td><td>Anchor Stream</td><td>Per-frame anchor points</td><td>(internal state)</td></tr>
                    <tr><td>12</td><td>Camera Operator</td><td>Spring-damped physics simulation</td><td>camera_curve.json</td></tr>
                    <tr><td>13</td><td>Transition Planner</td><td>Smooth editorial transitions</td><td>(internal state)</td></tr>
                    <tr><td>14</td><td>Cut & Crop</td><td>FFmpeg + render_engine.py</td><td>clips.json, clip MP4s</td></tr>
                    <tr><td>15</td><td>Metadata Generation</td><td>metadata_engine.py (2-pass)</td><td>metadata/&#123;clipId&#125;.json</td></tr>
                    <tr><td>16</td><td>Caption Generation</td><td>SSA/ASS subtitle engine</td><td>captioned clips</td></tr>
                    <tr><td>17</td><td>Export Preparation</td><td>File organization</td><td>final clips in clips/</td></tr>
                    <tr><td>18</td><td>Translation</td><td>LibreTranslate API</td><td>translations/&#123;lang&#125;/</td></tr>
                    <tr><td>19</td><td>Background Music</td><td>FFmpeg audio mixing</td><td>music-mixed clips</td></tr>
                    <tr><td>20</td><td>Thumbnail Generation</td><td>OpenCV Laplacian sharpness</td><td>thumbnails/&#123;clipId&#125;.png</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="pipeline-audio">
              <h3 className="docs-h3">1. Audio Extraction</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_01_audio.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> FFmpeg</p>
                  <p><strong>Input:</strong> Source video MP4</p>
                  <p><strong>Processing:</strong> Extracts audio from video at 16kHz for optimal speech recognition compatibility.</p>
                  <p><strong>Output:</strong> audio.wav (16kHz mono WAV)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-vad">
              <h3 className="docs-h3">2. Voice Activity Detection</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_02_vad.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> Silero VAD (ONNX)</p>
                  <p><strong>Input:</strong> audio.wav</p>
                  <p><strong>Processing:</strong> Filters out silence, background music, and non-speech noise.</p>
                  <p><strong>Output:</strong> speech_timestamps.json (start/end times of speech segments)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-transcription">
              <h3 className="docs-h3">3. Transcription</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_03_transcription.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> Whisper (faster-whisper + stable-ts)</p>
                  <p><strong>Input:</strong> audio.wav + speech_timestamps.json</p>
                  <p><strong>Processing:</strong> Transcribes audio into text with high accuracy. Configurable model size (tiny: ~140MB, medium: ~1.5GB, large-v3: ~2.9GB). Uses compute type: int8.</p>
                  <p><strong>Output:</strong> transcript.json (text, word-level timestamps, confidence scores)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-speaker-diarization">
              <h3 className="docs-h3">4. Speaker Diarization</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_03_speaker_diarization.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> Pyannote Audio 3.1</p>
                  <p><strong>Input:</strong> audio.wav</p>
                  <p><strong>Processing:</strong> Identifies who speaks when. Requires HuggingFace token.</p>
                  <p><strong>Output:</strong> speaker_diarization.json (speaker labels and time segments)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-highlights">
              <h3 className="docs-h3">5. Highlight Detection</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_04_highlights.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> LLaMA3 8B (via Ollama) + Heuristic Fallbacks</p>
                  <p><strong>Input:</strong> transcript.json + speaker data</p>
                  <p><strong>Processing:</strong> Intent detection, semantic segmentation, conversation block analysis, clip candidate building, candidate ranking, diversity enforcement, boundary refinement, editorial QA, production scoring. Sub-modules in <code className="docs-code-inline">highlights/</code> directory.</p>
                  <p><strong>Output:</strong> highlights.json (scored clip candidates)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-scene-detection">
              <h3 className="docs-h3">6. Scene Detection</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_05_scene_detection.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> PySceneDetect ContentDetector</p>
                  <p><strong>Input:</strong> Source video</p>
                  <p><strong>Processing:</strong> Analyzes video for visual scene changes to aid camera planning.</p>
                  <p><strong>Output:</strong> scene_cuts.json (frame-level scene change timestamps)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-face-detection">
              <h3 className="docs-h3">7. Face Detection</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_06_face_detection.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> YOLOv8 Nano</p>
                  <p><strong>Input:</strong> Source video frames</p>
                  <p><strong>Processing:</strong> Detects faces/persons with a confidence threshold of 0.40.</p>
                  <p><strong>Output:</strong> face_detections.json (bounding boxes, confidence scores per frame)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-face-tracking">
              <h3 className="docs-h3">8. Face Tracking</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_07_face_tracking.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> ByteTrack (via YOLOv8)</p>
                  <p><strong>Input:</strong> face_detections.json</p>
                  <p><strong>Processing:</strong> Maintains identity consistency by assigning persistent track IDs across frames.</p>
                  <p><strong>Output:</strong> face_tracks.json</p>
                </div>
              </div>
            </section>

            <section id="pipeline-camera">
              <h3 className="docs-h3">9-13. Camera System</h3>
              <p className="docs-p">A sophisticated 4-part camera planning system ensuring smooth continuity:</p>
              <ul className="docs-list">
                <li><strong>stage_08_shot_selection.py:</strong> Editorial shot selection decisions.</li>
                <li><strong>stage_08b_anchor_stream.py:</strong> Generates per-frame anchor points based on face tracks.</li>
                <li><strong>stage_08c_camera_operator.py:</strong> Spring-damped physics simulation for smooth, natural camera movement. Uses spring constant and damping parameters.</li>
                <li><strong>stage_08d_transition_planner.py:</strong> Plans smooth editorial transitions between different camera positions.</li>
              </ul>
              <p className="docs-p"><strong>Output:</strong> camera_curve.json (per-frame crop coordinates)</p>
            </section>

            <section id="pipeline-cut-crop">
              <h3 className="docs-h3">14. Cut & Crop</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_09_cut_crop.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> FFmpeg via render_engine.py</p>
                  <p><strong>Input:</strong> Source video + camera_curve.json + clip boundaries</p>
                  <p><strong>Processing:</strong> Cuts video segments, applies 9:16 crop with camera movement, generates layout transitions. Supports full-crop, blur-pad, and auto layout modes.</p>
                  <p><strong>Output:</strong> clips.json + individual clip MP4 files (1080×1920)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-captions">
              <h3 className="docs-h3">16. Captions</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_10_captions.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> SSA/ASS Subtitle Engine + FFmpeg</p>
                  <p><strong>Input:</strong> Cut clips + transcript.json</p>
                  <p><strong>Processing:</strong> Generates SSA/ASS files. 14+ styles (classic-white, boxed, outline, bold-pop, karaoke-bounce, etc.). Modes: word-by-word, phrase (3-words), sentence. Supports font presets, container types, and animations (fade, pop, bounce, scale, zoom, elastic). Burns subtitles via FFmpeg <code className="docs-code-inline">ass</code> filter.</p>
                  <p><strong>Output:</strong> Captioned clip MP4s</p>
                </div>
              </div>
            </section>

            <section id="pipeline-metadata">
              <h3 className="docs-h3">15. Metadata Generation</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_11_metadata.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> LLaMA3 via Ollama + metadata_engine.py</p>
                  <p><strong>Input:</strong> Clip data + transcript</p>
                  <p><strong>Processing:</strong> Uses a 2-pass quality review to generate title, description, tags, SEO metadata, and scores (CTR, hook, retention, viral, production).</p>
                  <p><strong>Output:</strong> metadata/&#123;clipId&#125;.json</p>
                </div>
              </div>
            </section>

            <section id="pipeline-export">
              <h3 className="docs-h3">17. Export Preparation</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_12_export.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> File System Operations</p>
                  <p><strong>Processing:</strong> Organizes and moves final clips to the <code className="docs-code-inline">output/&#123;jobId&#125;/clips/</code> directory.</p>
                </div>
              </div>
            </section>
            
            <section id="pipeline-translation">
              <h3 className="docs-h3">18. Translation</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_15_translation.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> LibreTranslate API</p>
                  <p><strong>Input:</strong> Transcript + target languages</p>
                  <p><strong>Processing:</strong> Translates subtitles into Spanish, Hindi, French, German, Portuguese, etc.</p>
                  <p><strong>Output:</strong> translations/&#123;lang&#125;/ (translated clips)</p>
                </div>
              </div>
            </section>

            <section id="pipeline-music">
              <h3 className="docs-h3">19. Background Music</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_14_music.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> FFmpeg Audio Mixing</p>
                  <p><strong>Input:</strong> Clip + music track from storage/music/</p>
                  <p><strong>Processing:</strong> Mixes background music at a configurable volume (default 20%).</p>
                  <p><strong>Output:</strong> Music-mixed clip MP4s</p>
                </div>
              </div>
            </section>

            <section id="pipeline-thumbnails">
              <h3 className="docs-h3">20. Thumbnails</h3>
              <div className="docs-stage-card">
                <div className="docs-stage-header"><strong>File:</strong> stages/stage_13_thumbnails.py</div>
                <div className="docs-stage-body">
                  <p><strong>Technology:</strong> OpenCV Laplacian Sharpness</p>
                  <p><strong>Input:</strong> Clip video</p>
                  <p><strong>Processing:</strong> Samples frames, scores sharpness, and selects the best frame.</p>
                  <p><strong>Output:</strong> thumbnails/&#123;clipId&#125;.png</p>
                </div>
              </div>
            </section>

            <hr className="docs-divider" />

            {/* AI MODELS */}
            <section id="models-whisper">
              <h2 className="docs-h2">AI Models</h2>
              <h3 className="docs-h3">Faster Whisper</h3>
              <div className="docs-model-card">
                <p><strong>Purpose:</strong> Speech-to-text transcription (Stage 3).</p>
                <p><strong>Details:</strong> CTranslate2 backend for 4x faster inference. Uses stable-ts for word-level timestamps.</p>
                <p><strong>Sizes:</strong> tiny (~140MB), medium (~1.5GB), large-v3 (~2.9GB).</p>
                <p><strong>Config:</strong> computeType=int8, beamSize=5.</p>
              </div>
            </section>

            <section id="models-vad">
              <h3 className="docs-h3">Silero VAD</h3>
              <div className="docs-model-card">
                <p><strong>Purpose:</strong> Voice Activity Detection (Stage 2).</p>
                <p><strong>Details:</strong> ONNX model from Silero. Detects speech vs silence/noise. Lightweight, runs efficiently on CPU.</p>
              </div>
            </section>

            <section id="models-pyannote">
              <h3 className="docs-h3">Pyannote Audio</h3>
              <div className="docs-model-card">
                <p><strong>Purpose:</strong> Speaker Diarization (Stage 4).</p>
                <p><strong>Details:</strong> Pyannote Audio 3.1. Identifies different speakers. Requires a HuggingFace token and is GPU-accelerated.</p>
              </div>
            </section>

            <section id="models-yolov8">
              <h3 className="docs-h3">YOLOv8</h3>
              <div className="docs-model-card">
                <p><strong>Purpose:</strong> Person/Face Detection & Tracking (Stages 7-8).</p>
                <p><strong>Details:</strong> YOLOv8 Nano model (6.5MB). Real-time object detection paired with ByteTrack for multi-object tracking. Face confidence threshold: 0.40.</p>
              </div>
            </section>

            <section id="models-llama">
              <h3 className="docs-h3">LLaMA 3</h3>
              <div className="docs-model-card">
                <p><strong>Purpose:</strong> Highlight Detection + Metadata Generation (Stages 5, 15).</p>
                <p><strong>Details:</strong> LLaMA3 8B via Ollama for local inference. Used for identifying engaging moments, generating titles/hooks/descriptions/tags, and scoring clip quality.</p>
                <p><strong>Config:</strong> Temperature: 0.7, timeout: 5s.</p>
              </div>
            </section>

            <section id="models-scenedetect">
              <h3 className="docs-h3">PySceneDetect</h3>
              <div className="docs-model-card">
                <p><strong>Purpose:</strong> Scene Boundary Detection (Stage 6).</p>
                <p><strong>Details:</strong> Uses the ContentDetector algorithm to detect visual scene changes with frame-level precision.</p>
              </div>
            </section>

            <section id="models-libretranslate">
              <h3 className="docs-h3">LibreTranslate</h3>
              <div className="docs-model-card">
                <p><strong>Purpose:</strong> Text Translation (Stage 18).</p>
                <p><strong>Details:</strong> Open-source, self-hosted translation API. Optional service supporting multiple languages.</p>
              </div>
            </section>

            <hr className="docs-divider" />

            {/* EDITOR */}
            <section id="editor-overview">
              <h2 className="docs-h2">Editor</h2>
              <p className="docs-p">The Editor (<strong>EditorLayout.tsx</strong>) provides a comprehensive clip editing experience featuring 7 specialized tabs. It is accessible from the Results page by selecting a clip.</p>
              <p className="docs-p"><strong>Edit Flow:</strong> User edits → local overlay in <code className="docs-code-inline">resultsStore</code> → Save → POST to backend API → Backend updates metadata JSON → <code className="docs-code-inline">retrim.py</code> re-renders → Socket.IO events → UI updates.</p>
            </section>

            <section id="editor-general">
              <h3 className="docs-h3">General Tab</h3>
              <p className="docs-p">Edit title, description, and tags/hashtags. Changes are saved directly to <code className="docs-code-inline">metadata/&#123;clipId&#125;.json</code>.</p>
            </section>

            <section id="editor-captions">
              <h3 className="docs-h3">Captions Tab</h3>
              <p className="docs-p">Customize styling:</p>
              <ul className="docs-list">
                <li><strong>Styles:</strong> 14+ options (classic, tiktok, podcast, etc.)</li>
                <li><strong>Fonts:</strong> Family and size</li>
                <li><strong>Display mode:</strong> Word, phrase (3-words), sentence</li>
                <li><strong>Formatting:</strong> Position, highlight colors</li>
                <li><strong>Containers:</strong> Solid, transparent-box, outline, shadow, glow, gradient</li>
                <li><strong>Animations:</strong> Fade, pop, bounce, scale, zoom, elastic</li>
              </ul>
            </section>

            <section id="editor-hook">
              <h3 className="docs-h3">Hook Tab</h3>
              <p className="docs-p">Enable and style a custom hook overlay. Options include text content, font styling, background colors, positioning (top, top-center, middle), duration, padding, border radius, and fade timings.</p>
            </section>

            <section id="editor-layout">
              <h3 className="docs-h3">Layout Tab</h3>
              <p className="docs-p">Choose layout modes (auto, full-crop, blur-pad) and adjust the blur strength for blur-pad mode.</p>
            </section>

            <section id="editor-music">
              <h3 className="docs-h3">Music Tab</h3>
              <p className="docs-p">Toggle background music, adjust volume slider (0-100%, default 20%), and select tracks from the local music library.</p>
            </section>

            <section id="editor-export">
              <h3 className="docs-h3">Export Tab</h3>
              <p className="docs-p">Download the clip MP4, thumbnail PNG, view quality scores, and trigger a manual re-render button.</p>
            </section>

            <hr className="docs-divider" />

            {/* VIDEO PROCESSING */}
            <section id="video-rendering">
              <h2 className="docs-h2">Video Processing</h2>
              <h3 className="docs-h3">Rendering Pipeline</h3>
              <p className="docs-p">Managed by <code className="docs-code-inline">render_engine.py</code>.</p>
              <ul className="docs-list">
                <li><strong>Output:</strong> 1080×1920 (9:16 portrait)</li>
                <li><strong>Encoding:</strong> H.264 (libx264), preset veryfast, CRF 23, AAC audio, +faststart flag</li>
                <li><strong>Features:</strong> Supports per-frame camera crop filter for smooth camera movement via <code className="docs-code-inline">encode_clip_with_layout_transitions()</code>.</li>
              </ul>
            </section>

            <section id="video-layouts">
              <h3 className="docs-h3">Layout Modes</h3>
              <ul className="docs-list">
                <li><strong>full-crop:</strong> Smart crop to 9:16 following detected person via the camera curve.</li>
                <li><strong>blur-pad:</strong> Original video centered with gaussian-blurred background padding (configurable blur strength, default 25).</li>
                <li><strong>auto:</strong> System intelligently decides based on source aspect ratio and face detection results.</li>
              </ul>
            </section>

            <section id="video-cropping">
              <h3 className="docs-h3">Smart Cropping</h3>
              <p className="docs-p">The camera system creates smooth movement to avoid jerky cuts:</p>
              <ol className="docs-list">
                <li><strong>Shot Selection:</strong> Editorial framing decisions.</li>
                <li><strong>Anchor Stream:</strong> Per-frame anchor points from face tracks.</li>
                <li><strong>Camera Operator:</strong> Spring-damped physics for natural motion.</li>
                <li><strong>Transition Planner:</strong> Smooth transitions between positions.</li>
              </ol>
              <p className="docs-p"><em>Config: smoothingAlpha=0.35, targetRatio=9:16, shortsWidth=1080, shortsHeight=1920.</em></p>
            </section>

            <section id="video-hook">
              <h3 className="docs-h3">Hook Overlay</h3>
              <p className="docs-p">Handled by <code className="docs-code-inline">hook_renderer.py</code> using Pillow (PIL).</p>
              <ul className="docs-list">
                <li>Creates a transparent PNG overlay with a rounded rectangle card and multi-line text wrapping.</li>
                <li>Scale factor: canvas_w / 430.0.</li>
                <li>Positions: top (140px), top-center (220px), middle (centered).</li>
                <li>Checks Windows system fonts. Composited via FFmpeg overlay filter.</li>
              </ul>
              <p className="docs-p"><strong>Text precedence:</strong> userHookText → hookText → autoHookText → hook → settings.autoHookText → clip.hook</p>
            </section>

            <section id="video-retrimming">
              <h3 className="docs-h3">Retrimming</h3>
              <p className="docs-p">Handled by <code className="docs-code-inline">retrim.py</code>.</p>
              <p className="docs-p">A full re-rendering engine invoked after user edits via <code className="docs-code-inline">POST /api/results/:jobId/clips/:clipId/render</code>. It applies trim changes, layout adjustments, caption re-rendering, hook overlays, and music re-mixing. Includes a concurrent retrim guard with a 5-minute timeout. Emits <code className="docs-code-inline">retrim:progress</code> events.</p>
            </section>

            <hr className="docs-divider" />

            {/* DATA ARCHITECTURE */}
            <section id="data-clips">
              <h2 className="docs-h2">Data Architecture</h2>
              <h3 className="docs-h3">clips.json</h3>
              <p className="docs-p">Located at <code className="docs-code-inline">output/&#123;jobId&#125;/clips.json</code>. Contains an array of clip objects.</p>
              <CodeBlock language="json">
{`{
  "id": "uuid-v4-string",
  "path": "path/to/clip.mp4",
  "start": 10.5,
  "end": 25.0,
  "duration": 14.5,
  "aiStart": 10.5,
  "aiEnd": 25.0,
  "userStart": null,
  "userEnd": null,
  "width": 1080,
  "height": 1920,
  "aspectRatio": "9:16",
  "layoutMode": "auto",
  "resolvedLayout": "full-crop",
  "score": 85.5,
  "hook": "Wait until you see this...",
  "reason": "High engagement topic detected.",
  "source": "ollama",
  "model": "llama3:8b",
  "thumbnailPath": "path/to/thumb.png"
}`}
              </CodeBlock>
            </section>

            <section id="data-metadata">
              <h3 className="docs-h3">Metadata Files</h3>
              <p className="docs-p">Located at <code className="docs-code-inline">output/&#123;jobId&#125;/metadata/&#123;clipId&#125;.json</code>. Contains editorial and AI-generated metadata.</p>
              <CodeBlock language="json">
{`{
  "pipelineVersion": "2.4.0",
  "title": "The Secret to Viral Hooks",
  "description": "Learn the #1 trick to keeping viewers engaged... #creator #tips",
  "tags": ["content creation", "viral", "tips"],
  "channel": "Marketing",
  "niche": "Social Media",
  "targetAudience": "Content Creators",
  "hookScore": 92,
  "retentionScore": 88,
  "viralScore": 90,
  "sourceDuration": 14.5
}`}
              </CodeBlock>
            </section>

            <section id="data-structure">
              <h3 className="docs-h3">Project Structure</h3>
              <CodeBlock language="text">
{`ai-clip/
├── frontend/          # React + Vite frontend
├── backend/           # Express + TypeScript backend
├── ai/                # Python AI pipeline
│   ├── pipeline/      # Pipeline orchestrator + stages
│   │   ├── stages/    # 20 processing stages
│   │   ├── highlights/ # Highlight detection sub-modules
│   │   └── translation/ # Translation providers
│   └── config/        # AI configuration
├── config/            # User settings
├── models/            # AI model files
├── storage/
│   ├── uploads/       # Source videos (per job)
│   ├── temp/          # Processing intermediates (per job)
│   ├── outputs/       # Final results (per job)
│   ├── music/         # Background music tracks
│   └── assets/        # Custom assets (memes, gameplay)
└── logs/              # Application logs`}
              </CodeBlock>
            </section>

            <hr className="docs-divider" />

            {/* BACKEND API */}
            <section id="api-overview">
              <h2 className="docs-h2">Backend API</h2>
              <p className="docs-p">Base URL: <code className="docs-code-inline">http://localhost:3001/api</code>. All endpoints return JSON. File uploads use multipart/form-data. Real-time updates occur via Socket.IO on the same port.</p>
            </section>

            <section id="api-upload">
              <h3 className="docs-h3">Upload Endpoints</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                  <tbody>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/upload</code></td><td>Upload video file (max 10GB, accepts MP4/MOV/AVI/MKV/WEBM)</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/upload/youtube</code></td><td>Import from YouTube URL</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/upload/youtube/status</code></td><td>Check YouTube downloader health</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/upload/:jobId/video</code></td><td>Stream original video</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="api-processing">
              <h3 className="docs-h3">Processing Endpoints</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                  <tbody>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/process</code></td><td>Start pipeline (validates job, checks disk space, spawns Python, returns 202)</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/process/:jobId/cancel</code></td><td>Kill active pipeline</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/process/:jobId/status</code></td><td>Get stages progress, logs, errors (reads checkpoint.json)</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/process/:jobId/resume</code></td><td>Resume interrupted pipeline</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="api-results">
              <h3 className="docs-h3">Results Endpoints</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                  <tbody>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/results/:jobId</code></td><td>Get all clips with metadata, scores, word timestamps, translations</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/results/:jobId/clips/:clipId/trim</code></td><td>Save trim points</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/results/:jobId/clips/:clipId/edit</code></td><td>Save editorial/rendering edits</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/results/:jobId/clips/:clipId/render</code></td><td>Force re-render via retrim.py</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/results/:jobId/clips/:clipId</code></td><td>Serve clip MP4</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/results/:jobId/clips/:clipId/download</code></td><td>Download clip</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/results/:jobId/thumbnails/:clipId</code></td><td>Serve thumbnail</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/results/:jobId/clips/:clipId/end-thumbnail</code></td><td>Upload end thumbnail</td></tr>
                    <tr><td><span className="docs-method-delete">DELETE</span></td><td><code className="docs-endpoint">/api/results/:jobId/clips/:clipId/end-thumbnail</code></td><td>Remove end thumbnail</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/results/:jobId/translations/:language/:clipId</code></td><td>Serve translated clip</td></tr>
                    <tr><td><span className="docs-method-get">GET/POST</span></td><td><code className="docs-endpoint">/api/results/assets/:type</code></td><td>Browse/upload custom assets</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="api-settings">
              <h3 className="docs-h3">Settings Endpoints</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                  <tbody>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/settings</code></td><td>Get all user settings</td></tr>
                    <tr><td><span className="docs-method-put">PUT</span></td><td><code className="docs-endpoint">/api/settings</code></td><td>Save user settings</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/settings/music-status</code></td><td>Check music tracks availability</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/settings/download-music</code></td><td>Download music tracks</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/settings/temp-size</code></td><td>Get temp directory size</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/settings/clean-temp</code></td><td>Clear temp files</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="api-projects">
              <h3 className="docs-h3">Projects Endpoints</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                  <tbody>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/projects</code></td><td>List all projects (sorted by updatedAt)</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/projects/:jobId</code></td><td>Get single project</td></tr>
                    <tr><td><span className="docs-method-patch">PATCH</span></td><td><code className="docs-endpoint">/api/projects/:jobId</code></td><td>Update project (rename, settings)</td></tr>
                    <tr><td><span className="docs-method-delete">DELETE</span></td><td><code className="docs-endpoint">/api/projects/:jobId</code></td><td>Delete project and ALL files</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="api-storage">
              <h3 className="docs-h3">Storage Endpoints</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                  <tbody>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/storage/breakdown</code></td><td>Storage metrics (uploads/clips/temp sizes)</td></tr>
                    <tr><td><span className="docs-method-post">POST</span></td><td><code className="docs-endpoint">/api/storage/clean</code></td><td>Cleanup by category (temp/clips/uploads/everything)</td></tr>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/storage/check-source/:jobId</code></td><td>Check if source video exists</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="api-export">
              <h3 className="docs-h3">Export Endpoints</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                  <tbody>
                    <tr><td><span className="docs-method-get">GET</span></td><td><code className="docs-endpoint">/api/export/:jobId/download</code></td><td>Download ZIP of clips, metadata, thumbnails, translations</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="docs-divider" />

            {/* CONFIGURATION */}
            <section id="config-env">
              <h2 className="docs-h2">Configuration</h2>
              <h3 className="docs-h3">Environment Variables</h3>
              <CodeBlock language="env">
{`NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
STORAGE_PATH=../storage
CONFIG_PATH=../config
MODELS_PATH=../models
LOG_LEVEL=info
OLLAMA_URL=http://localhost:11434
LIBRETRANSLATE_URL=http://localhost:5000
MAX_FILE_SIZE_GB=10
MIN_DISK_SPACE_GB=5
TEMP_CLEANUP_HOURS=24`}
              </CodeBlock>
            </section>

            <section id="config-ai">
              <h3 className="docs-h3">AI Configuration</h3>
              <p className="docs-p"><code className="docs-code-inline">ai/config/ai_config.json</code> configures core pipeline behavior:</p>
              <ul className="docs-list">
                <li><strong>pipelineVersion:</strong> "2.4.0"</li>
                <li><strong>whisper:</strong> defaultModel=medium, computeType=int8, beamSize=5</li>
                <li><strong>crop:</strong> smoothingAlpha=0.35, targetRatio=9:16, 1080x1920, faceConfidenceThreshold=0.40</li>
                <li><strong>render:</strong> preset=veryfast, crf=23, audioCodec=aac, videoCodec=libx264, blurStrength=25, musicVolumeDefault=20</li>
                <li><strong>ollama:</strong> model=llama3:8b, temperature=0.7, timeoutSeconds=5.0</li>
              </ul>
            </section>

            <section id="config-settings">
              <h3 className="docs-h3">User Settings</h3>
              <p className="docs-p"><code className="docs-code-inline">config/user.settings.json</code> stores over 55+ configurable fields covering:</p>
              <ul className="docs-list">
                <li>Clip generation (mode, count, duration)</li>
                <li>Whisper model, speaker diarization toggles</li>
                <li>Background music and thumbnails preferences</li>
                <li>Silence removal and translation languages</li>
                <li>Caption styling (style, display, font, position, colors, container, animation)</li>
                <li>Layout mode and highlight colors</li>
                <li>Auto-hook configuration (text, font, size, colors, position, duration, padding, radius, fade)</li>
              </ul>
            </section>

            <hr className="docs-divider" />

            {/* TROUBLESHOOTING */}
            <section id="troubleshoot-common">
              <h2 className="docs-h2">Troubleshooting</h2>
              
              <h3 className="docs-h3">Common Issues</h3>
              <div className="docs-warning">
                <strong>"FFmpeg not found"</strong>
                <p><em>Cause:</em> FFmpeg is not in your system PATH.</p>
                <p><em>Solution:</em> Install FFmpeg and add the executable directory to your system's PATH environment variable.</p>
              </div>
              <div className="docs-warning">
                <strong>"Ollama connection refused"</strong>
                <p><em>Cause:</em> Ollama service is not running.</p>
                <p><em>Solution:</em> Start the service with <code className="docs-code-inline">ollama serve</code> and ensure the <code className="docs-code-inline">llama3:8b</code> model is pulled.</p>
              </div>
              <div className="docs-warning">
                <strong>"Module not found: faster-whisper"</strong>
                <p><em>Cause:</em> Python virtual environment is not activated or dependencies are not installed.</p>
                <p><em>Solution:</em> Activate the venv and run <code className="docs-code-inline">pip install -r requirements.txt</code>.</p>
              </div>
              <div className="docs-warning">
                <strong>"CUDA not available"</strong>
                <p><em>Cause:</em> No GPU present or CUDA toolkit not installed.</p>
                <p><em>Solution:</em> The pipeline will fallback to CPU (which is slower). For GPU acceleration, install the CUDA toolkit and PyTorch with CUDA support.</p>
              </div>
              <div className="docs-warning">
                <strong>"Disk space insufficient"</strong>
                <p><em>Cause:</em> The pipeline checks for at least 2x the source video size in available disk space.</p>
                <p><em>Solution:</em> Free up disk space or clean temporary files via the Settings menu.</p>
              </div>
            </section>

            <section id="troubleshoot-pipeline">
              <h3 className="docs-h3">Pipeline Errors</h3>
              <div className="docs-warning">
                <strong>"Transcription timeout"</strong>
                <p><em>Cause:</em> Processing a very large video with a large Whisper model.</p>
                <p><em>Solution:</em> Switch to <code className="docs-code-inline">whisper-tiny</code> or <code className="docs-code-inline">whisper-medium</code> for faster processing.</p>
              </div>
              <div className="docs-warning">
                <strong>"Highlight detection failed"</strong>
                <p><em>Cause:</em> Ollama or the LLaMA3 model is unavailable.</p>
                <p><em>Solution:</em> Verify Ollama is running. The system will automatically fallback to heuristic scoring.</p>
              </div>
              <div className="docs-warning">
                <strong>"Speaker diarization error"</strong>
                <p><em>Cause:</em> Missing HuggingFace authentication token.</p>
                <p><em>Solution:</em> Set the <code className="docs-code-inline">HF_TOKEN</code> environment variable or disable diarization in settings.</p>
              </div>
              <div className="docs-warning">
                <strong>"Pipeline interrupted"</strong>
                <p><em>Cause:</em> The Python process crashed or was killed.</p>
                <p><em>Solution:</em> Use the "Resume" button — the checkpoint system will skip already completed stages.</p>
              </div>
            </section>

            <section id="troubleshoot-rendering">
              <h3 className="docs-h3">Rendering Issues</h3>
              <div className="docs-warning">
                <strong>"Captions not appearing"</strong>
                <p><em>Cause:</em> ASS subtitle file generation failed.</p>
                <p><em>Solution:</em> Check if <code className="docs-code-inline">transcript.json</code> exists and contains word-level timestamps.</p>
              </div>
              <div className="docs-warning">
                <strong>"Hook overlay missing"</strong>
                <p><em>Cause:</em> The designated font for the hook renderer was not found.</p>
                <p><em>Solution:</em> Ensure your system fonts directory is accessible to the Python process.</p>
              </div>
              <div className="docs-warning">
                <strong>"Retrim hanging"</strong>
                <p><em>Cause:</em> Encountered the concurrent retrim guard (5-minute timeout).</p>
                <p><em>Solution:</em> Wait for any existing retrim operations to complete.</p>
              </div>
              <div className="docs-warning">
                <strong>"Black frames in output"</strong>
                <p><em>Cause:</em> The calculated camera crop fell outside the source video boundaries.</p>
                <p><em>Solution:</em> Re-process the video with an updated face detection confidence threshold.</p>
              </div>
            </section>

            <hr className="docs-divider" />

            {/* DEPLOYMENT */}
            <section id="deploy-local">
              <h2 className="docs-h2">Deployment</h2>
              <h3 className="docs-h3">Local Development</h3>
              <p className="docs-p">Run these three services concurrently:</p>
              <ol className="docs-list">
                <li><strong>Frontend:</strong> <code className="docs-code-inline">cd frontend && npm run dev</code> (Starts Vite on port 5173)</li>
                <li><strong>Backend:</strong> <code className="docs-code-inline">cd backend && npm run dev</code> (Starts Express on port 3001)</li>
                <li><strong>Ollama:</strong> <code className="docs-code-inline">ollama serve</code> (Starts service on port 11434)</li>
              </ol>
              <p className="docs-p"><em>Optional:</em> Start LibreTranslate for translation features.</p>
            </section>

            <section id="deploy-production">
              <h3 className="docs-h3">Production Build</h3>
              <CodeBlock language="bash">
{`# Build frontend
cd frontend
npm run build    # Outputs to frontend/dist/

# Build backend
cd backend
npm run build    # Compiles TypeScript
npm start        # Runs compiled JS`}
              </CodeBlock>
              
              <div className="docs-info">
                <strong>Deployment Note:</strong>
                <p style={{marginTop: '10px', marginBottom: 0}}>
                  ClipForge is designed as a desktop-style local web application. There is currently no containerization (Docker) implemented, and cloud deployment configurations are not available at this time.
                </p>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
