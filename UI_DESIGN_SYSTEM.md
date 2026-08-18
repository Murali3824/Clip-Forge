# ClipForge UI Design System Documentation

## Executive Summary

ClipForge uses a **Modern SaaS / Minimal Design Language** with strong influences from **Linear.app** and **Vercel** design principles. The system is built on:

- **Framework**: React 19 + Radix UI components + Tailwind CSS
- **Design Philosophy**: Clean, minimal, professional with micro-interactions
- **Component Library**: 43+ reusable UI components
- **Motion Library**: Framer Motion for animations + GSAP for advanced effects
- **Typography**: Geist (headings), Inter (body), Geist Mono (code)
- **Color System**: HSL-based semantic tokens with light mode + dark mode support

---

## 1. Design Language Overview

### Design System Classification
**Modern SaaS Design** with elements of:
- Minimalism
- Clean, content-first layouts
- Professional aesthetic
- Subtle animations and micro-interactions
- Linear.app/Vercel style polish

### Core Design Principles
1. **Clarity first** - Content hierarchy is explicit and visual weight is intentional
2. **Minimal ornamentation** - No unnecessary decorative elements
3. **Purposeful motion** - Every animation has a function and feels intentional
4. **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
5. **Responsive by default** - Mobile-first approach with progressive enhancement
6. **Polished interactions** - Hover states, focus states, loading states all considered

---

## 2. Layout Architecture

### Page Structure

The application uses a **scrollable landing page architecture** with the following sections:

```
┌─────────────────────────────┐
│  Navigation (Fixed Header)  │
├─────────────────────────────┤
│                             │
│  Hero Section               │
│  (Full viewport height)     │
│                             │
├─────────────────────────────┤
│  Product Pipeline Section   │
│  (Pinned scroll animation)  │
├─────────────────────────────┤
│  Exploded View Section      │
│  (Interactive 3D layers)    │
├─────────────────────────────┤
│  Showcase Section           │
│  (Mac window mockups)       │
├─────────────────────────────┤
│  Architecture Section       │
│  (Vertical flow diagram)    │
├─────────────────────────────┤
│  Storage Flow Section       │
│  (Horizontal carousel)      │
├─────────────────────────────┤
│  Features Grid Section      │
│  (3-column responsive grid) │
├─────────────────────────────┤
│  Footer                     │
└─────────────────────────────┘
```

### Key Layout Components

#### Header/Navigation
- **Type**: Fixed, sticky navigation bar
- **Height**: 64px (h-16)
- **Behavior**: Transparent initially, becomes glassmorphic on scroll
- **Content**: Logo on left, navigation links in center (hidden on mobile), CTA button on right
- **Z-index**: 50 (stays above most content)

#### Hero Section
- **Layout**: Full viewport minimum height (`min-h-[100vh]`)
- **Padding**: 32px (pt-32) top, 96px (pb-24) bottom
- **Content**: Centered text with background layers
- **Layers**:
  - Gradient background (white to light blue)
  - Radial gradient overlay
  - Dot grid pattern
  - 3D canvas (React Three Fiber)
  - Grain texture overlay

#### Main Content Areas
- **Max-width**: 1280px (max-w-7xl)
- **Padding**: 24px (px-6) on mobile, 32px (md:px-8) on tablet/desktop
- **Sections**: 128px (py-32) to 192px (md:py-48) padding between sections
- **Background**: Alternates between white and light backgrounds (#F8F9FB)

#### Feature/Content Cards
- **Spacing**: Grid layout with 16px (gap-4) to 20px (md:gap-5) gaps
- **Responsive**: 1 column on mobile, 2 on tablet (sm:grid-cols-2), 3 on desktop (lg:grid-cols-3)
- **Card Dimensions**: Full width with aspect ratio constraints on some components

#### Modals & Overlays
- **Backdrop**: Semi-transparent black (bg-black/80)
- **Position**: Fixed, centered on screen
- **Max-width**: 32rem (max-w-lg)
- **Animation**: Fade + zoom on enter/exit
- **Z-index**: 50

---

## 3. Major Reusable UI Components

### Foundational Components (Built on Radix UI)

#### **Layout Components**
- `Card` - Container with border, shadow, and background
  - Variants: `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription`
  - Padding: 24px (p-6)
  - Border radius: xl (rounded-xl)
  - Shadow: Default drop shadow

- `Separator` - Horizontal/vertical divider
  - Height: 1px
  - Color: Subtle gray (rgba(9, 9, 11, 0.06))

#### **Form Components**
- `Input` - Text input field
  - Height: 36px (h-9)
  - Padding: 12px (px-3) horizontal, 4px (py-1) vertical
  - Border: 1px solid input color
  - Border radius: md (rounded-md)
  - States: focus, disabled, placeholder

- `Textarea` - Multi-line input
  - Min-height: 60px
  - Padding: 12px
  - Border: 1px
  - Border radius: md

- `Label` - Form field labels
  - Font size: 14px (text-sm)
  - Font weight: 500 (medium)
  - Line height: None
  - Color: Foreground color with error state support

- `Button` - Interactive button element
  - Variants:
    - `default` - Filled with primary color
    - `destructive` - Red/error color
    - `outline` - Border only
    - `secondary` - Secondary color
    - `ghost` - Transparent with hover effect
    - `link` - Text with underline on hover
  - Sizes:
    - `default` - 36px (h-9) height
    - `sm` - 32px (h-8) height, smaller text
    - `lg` - 40px (h-10) height
    - `icon` - Square 36px
  - Transitions: All property with ease
  - Focus: Ring outline
  - Icons: Inline SVGs with consistent sizing (size-4)

- `Form` - React Hook Form wrapper
  - Provider-based context system
  - Field validation support
  - Error state integration

- `Checkbox` - Boolean selection
  - Size: 16px (h-4 w-4)
  - Border radius: sm (rounded-sm)
  - Checked state: Primary background with white checkmark
  - Animation: Smooth transitions

- `Radio Group` - Mutually exclusive selection
  - Built on Radix radio group
  - Circular indicators
  - Group-based selection

- `Switch` - Toggle boolean state
  - Height: 20px (h-5)
  - Width: 36px (w-9)
  - Border radius: full (rounded-full)
  - Thumb animation: Smooth translate on toggle
  - States: Checked (primary color), unchecked (input color)

- `Select` - Dropdown selection
  - Trigger height: 36px (h-9)
  - Border: 1px
  - Chevron icon on right
  - Dropdown animation: Fade + zoom
  - Content width: min-w-[8rem]

- `Slider` - Range input
  - Track height: 6px (h-1.5)
  - Thumb: 16px circle (h-4 w-4)
  - Track background: Primary/20 (muted)
  - Range fill: Primary color

#### **Data Display Components**
- `Table` - Data presentation
  - Horizontal scroll on mobile
  - Header row styling
  - Striped rows optional
  - Compact cell padding

- `Tabs` - Content switching
  - Tab list background: Muted color
  - Tab padding: 12px (p-1)
  - Trigger height: 36px (h-9)
  - Active state: Background color change with shadow

- `Accordion` - Expandable content
  - Border: Bottom border between items
  - Animation: Smooth height expand/collapse
  - Chevron icon rotation on expand
  - Padding: 16px (py-4)

- `Progress` - Progress indication
  - Height: 8px (h-2)
  - Background: Primary/20
  - Fill: Primary color
  - Border radius: full

#### **Feedback Components**
- `Alert` - Message container
  - Variants: default, destructive
  - Padding: 12px
  - Icon positioning: Absolute left
  - Border radius: lg
  - Support for title and description

- `Badge` - Status/label indicator
  - Variants: default, secondary, destructive, outline
  - Padding: 10px (px-2.5) horizontal, 4px (py-0.5) vertical
  - Border radius: md
  - Font size: 12px (text-xs)
  - Font weight: 600 (semibold)

- `Toast` (Sonner) - Notification
  - Built with Sonner library
  - Customizable title, description, action
  - Auto-dismiss capability
  - Theme support (light/dark/system)

- `Skeleton` - Loading placeholder
  - Animated pulse effect
  - Background: Primary/10
  - Border radius: md
  - Customizable dimensions

#### **Dialog & Overlay Components**
- `Dialog` - Modal dialog
  - Fixed centered positioning
  - Overlay backdrop (bg-black/80)
  - Max width: 32rem
  - Animations: Fade + zoom
  - Close button: Top right corner

- `Drawer` - Bottom sheet (mobile-optimized)
  - Fixed bottom positioning
  - Rounded top corners (rounded-t-[10px])
  - Drag handle indicator
  - Scale background on open

- `Popover` - Floating content
  - Portal rendering
  - Positioning: Relative to trigger
  - Animations: Fade + zoom
  - Max width: 288px (w-72)

- `AlertDialog` - Confirmation dialog
  - High Z-index (50)
  - Two-button layout (Cancel, Confirm)
  - Emphasis on confirmation action

#### **Navigation Components**
- `Breadcrumb` - Path navigation
  - Item separators
  - Last item bold
  - Link styling

- `Pagination` - Page navigation
  - Previous/Next buttons
  - Number buttons with current highlight
  - Disabled states on boundaries

- `NavigationMenu` - Top navigation structure
  - Built on Radix Navigation Menu
  - Viewport-based sizing
  - Submenu support

- `Command Palette` - Search/command interface
  - Input field
  - Result list
  - Keyboard navigation (arrow keys, enter)

#### **Display Components**
- `Avatar` - User/profile image
  - Circular image container
  - Fallback text
  - Size variants
  - Border optional

- `Badge` - Already covered above

- `Tooltip` - Hover information
  - Portal rendering
  - Directional positioning
  - Auto-hide on mouse leave
  - Animation: Fade + zoom

- `HoverCard` - Rich hover preview
  - Portal rendering
  - Delay on hover
  - Positional awareness

- `ScrollArea` - Custom scrollbar styling
  - Thin custom scrollbars
  - Thumb styling
  - Viewport clipping

#### **Other Components**
- `Carousel` - Image/content carousel
  - Built on Embla Carousel
  - Auto-scroll capable
  - Touch support
  - Navigation buttons

- `Collapsible` - Expand/collapse content
  - Animated height transitions
  - Trigger-based toggle
  - State managed externally

- `ResizablePanel` - Draggable panel resizing
  - Used in editor layouts
  - Persistent state
  - Touch support

- `ContextMenu` - Right-click menu
  - Portal rendering
  - Keyboard navigation
  - Submenu nesting

- `Menubar` - Application menu bar
  - Built on Radix menubar
  - Keyboard navigation
  - Submenu support

- `AspectRatio` - Maintain aspect ratio container
  - Prevents layout shift
  - Custom aspect ratios

- `ToggleGroup` - Multi-select buttons
  - Button grouping
  - Single or multiple selection
  - Icon/text support

### Landing Page-Specific Components

#### **Navigation**
- Fixed sticky header
- Logo + brand
- Navigation links (Product, Technology, Features)
- CTA button
- Glassmorphic background on scroll

#### **Hero Section**
- Large heading (80px-96px)
- Subheading (16.5px-17.5px)
- Feature badge with status indicator
- Two CTA buttons (primary + secondary)
- 3D canvas background
- Grain overlay
- Gradient background layers

#### **Pipeline Section (Scroll-triggered)**
- Pinned animation layout
- Left sidebar with timeline
- Active step indicator with progress bar
- Scene content on right
- Smooth scroll animations with GSAP

#### **Architecture Section**
- Sequential node layout (vertical flow)
- Numbered nodes (01, 02, 03, 04)
- Stack badge tags for each layer
- Connecting lines with animations
- Staggered entrance animations

#### **Features Grid**
- 3-column layout (responsive 1-3)
- Feature cards with:
  - Lucide icon
  - Icon background container
  - Title (15.5px)
  - Description (13.5px)
  - Hover lift effect (-4px transform)
  - Shadow on hover

#### **Showcase Section (Mac Mockups)**
- Mac window frame styling
- Titlebar with red/yellow/green dots
- Window controls styling
- Content areas (timeline, editor, settings)
- Grid layout of mockups

#### **Storage Flow**
- Horizontal scrollable carousel
- Folder cards with
  - Folder icon styling
  - File count labels
  - Mini progress bars
- Animated connecting dots
- Pulsing animations

---

## 4. Color System

### HSL-based Semantic Color Tokens

The design system uses CSS custom properties (CSS variables) with HSL color space for flexibility and theme switching.

#### **Primary Colors**

```css
/* Light Mode */
--accent: #2e5bff (hsl(221, 100%, 50%))
--accent-hover: #1d4ed8 (hsl(222, 81%, 47%))

/* Dark Mode (implied) */
Primary adjustments for WCAG AA compliance
```

#### **Semantic Color Palette**

| Token | Light Value | Usage |
|-------|------------|-------|
| `--background` | `hsl(0, 0%, 100%)` | Page background, card backgrounds |
| `--foreground` | `hsl(240, 10%, 3.6%)` / #09090b | Primary text color |
| `--card` | `hsl(0, 0%, 100%)` | Card component backgrounds |
| `--card-foreground` | `hsl(240, 10%, 3.6%)` | Text on cards |
| `--popover` | `hsl(0, 0%, 100%)` | Popover/dropdown backgrounds |
| `--popover-foreground` | `hsl(240, 10%, 3.6%)` | Text in popovers |
| `--primary` | `hsl(221, 100%, 50%)` | Buttons, links, active states |
| `--primary-foreground` | `hsl(0, 0%, 100%)` | Text on primary buttons |
| `--secondary` | `hsl(220, 13%, 91%)` | Secondary button backgrounds |
| `--secondary-foreground` | `hsl(240, 10%, 3.6%)` | Text on secondary buttons |
| `--muted` | `hsl(220, 13%, 91%)` | Disabled state, faded text |
| `--muted-foreground` | `hsl(215, 16%, 47%)` / #71717a | Placeholder, secondary text |
| `--accent` | `hsl(221, 100%, 50%)` | Highlight, selected states |
| `--accent-foreground` | `hsl(0, 0%, 100%)` | Text on accent |
| `--destructive` | `hsl(0, 84%, 60%)` | Error/delete actions |
| `--destructive-foreground` | `hsl(0, 0%, 100%)` | Text on destructive |
| `--border` | `hsl(220, 13%, 91%)` / #e4e4e7 | Component borders |
| `--input` | `hsl(220, 13%, 91%)` | Input borders and backgrounds |
| `--ring` | `hsl(221, 100%, 50%)` | Focus ring color |

#### **Extended Color Palette (for design references)**

- **Neutral scale (zinc)**:
  - 50: #fafafa
  - 100: #f4f4f5
  - 200: #e4e4e7
  - 300: #d4d4d8
  - 400: #a1a1aa
  - 500: #71717a
  - 600: #52525b
  - 700: #3f3f46
  - 800: #27272a
  - 900: #18181b
  - 950: #09090b

- **Primary blue**:
  - #2E5BFF (accent color, primary)
  - #1d4ed8 (hover state)
  - #0047CC (dark state)

- **States**:
  - Success: #10b981 (emerald-500)
  - Warning: #f59e0b (amber-500)
  - Error: #ef4444 (red-500)
  - Info: #3b82f6 (blue-500)

#### **Background Gradients**

1. **Hero Section Gradient**:
   - Direction: to bottom
   - From: white
   - Via: white
   - To: #F8F9FB (light blue)

2. **Radial Gradient Overlay**:
   - Shape: 60% 40% at 50% 0%
   - From: rgba(46, 91, 255, 0.08)
   - To: rgba(255, 255, 255, 0)

3. **Section Backgrounds**:
   - White sections: #ffffff
   - Light sections: #F8F9FB
   - Alternating for visual hierarchy

#### **Special Effects Colors**

- **Grain overlay**: Black with 0.06 opacity, multiply blend mode
- **Dot grid**: rgba(9, 9, 11, 0.08)
- **Glassmorphic blur**: White/transparent with backdrop blur
- **Focus outline**: rgba(46, 91, 255, 0.45)
- **Selection background**: rgba(46, 91, 255, 0.15)

---

## 5. Typography System

### Font Family Stack

```css
/* Heading Font */
--font-heading: "Geist", -apple-system, BlinkMacSystemFont, 
                "SF Pro Display", "Segoe UI", sans-serif;

/* Body Font */
--font-body: "Inter", -apple-system, BlinkMacSystemFont, 
             "SF Pro Text", "Segoe UI", sans-serif;

/* Monospace Font */
--font-mono: "Geist Mono", "SF Mono", Menlo, monospace;
```

**Font Source**: Google Fonts
- Weights: 100-900 for all fonts

### Font Size Scale

| Usage | Size | Tailwind Class | Line Height |
|-------|------|-----------------|------------|
| Hero H1 | 44px-96px | text-[44px] to text-[96px] | 0.98 (98%) |
| Section H2 | 38px-56px | text-[38px] to text-[56px] | 1.02 (102%) |
| Subsection H3 | 34px-48px | text-[34px] to text-[48px] | 1.05 (105%) |
| Feature Title | 15.5px | text-[15.5px] | Auto |
| Body Large | 16.5px-17.5px | text-[16.5px] | Relaxed (1.625) |
| Body | 14px-15px | text-[14px] to text-[15px] | Relaxed |
| Body Small | 13px-13.5px | text-[13px] to text-[13.5px] | Relaxed |
| Label/Small | 10.5px-12.5px | text-[10.5px] | Relaxed |
| Label/Tiny | 10px-11px | text-[10px] | Auto |
| Mono/Code | 12.5px down | text-[12.5px] | Auto |

### Font Weight Scale

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Not used much |
| Regular | 400 | Body text |
| Normal | 500 | Medium weight text |
| Semibold | 600 | Headings, emphasis, strong labels |
| Bold | 700 | Strong emphasis |
| Extrabold | 800 | Not commonly used |

### Typography Hierarchy

```
H1 (Hero Heading)
├─ Font: Geist
├─ Size: 96px
├─ Weight: 600 (semibold)
├─ Letter-spacing: -0.04em
└─ Color: #09090b

H2 (Section Heading)
├─ Font: Geist
├─ Size: 56px
├─ Weight: 600
├─ Letter-spacing: -0.03em
└─ Color: #09090b
    └─ Italic span: Font-normal, color: muted

Body Text
├─ Font: Inter
├─ Size: 16px
├─ Weight: 400
├─ Line-height: 1.625
└─ Color: #71717a (muted)

Small Text / Labels
├─ Font: Inter
├─ Size: 12px-13.5px
├─ Weight: 500
├─ Text-transform: uppercase (tracking: 0.2em)
└─ Color: #a1a1aa (muted)
```

### Letter Spacing

- **Headlines**: -0.03em to -0.04em (tighter)
- **Large text**: -0.02em
- **Small caps/labels**: 0.2em (wider)
- **Default**: 0em (normal)

### Text Rendering

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

### Selection Styling

```css
::selection {
    background: rgba(46, 91, 255, 0.15);
    color: #09090b;
}
```

---

## 6. Spacing System

### Spacing Scale (Tailwind)

Based on 4px base unit:

| Value | px | Tailwind | Usage |
|-------|----|-----------|----|
| xs | 4px | gap-1 | Tight spacing |
| sm | 8px | gap-2 | Small gaps |
| md | 12px | gap-3 | Medium gaps |
| base | 16px | gap-4 | Standard gap |
| lg | 20px | gap-5 | Comfortable spacing |
| xl | 24px | gap-6 | Section spacing |
| 2xl | 32px | gap-8 | Large section spacing |
| 3xl | 48px | gap-12 | Very large gaps |
| 4xl | 64px | gap-16 | Extra-large gaps |

### Margin & Padding

#### **Component Padding**

| Component | Padding | Value |
|-----------|---------|-------|
| Card | p-6 | 24px all sides |
| Card Header | p-6 space-y-1.5 | 24px + gap |
| Card Content | p-6 pt-0 | 24px (0 top) |
| Button (default) | px-4 py-2 | 16px horizontal, 8px vertical |
| Button (lg) | px-8 | 32px horizontal |
| Input | px-3 py-1 | 12px horizontal, 4px vertical |
| Badge | px-2.5 py-0.5 | 10px horizontal, 2px vertical |
| Alert | px-4 py-3 | 16px horizontal, 12px vertical |

#### **Section Padding**

| Context | Padding | Value |
|---------|---------|-------|
| Hero | pt-32 pb-24 | 128px top, 96px bottom |
| Featured sections | py-32 md:py-48 | 128px mobile, 192px desktop |
| Feature grid gaps | gap-4 md:gap-5 | 16px mobile, 20px desktop |
| Container horizontal | px-6 md:px-8 | 24px mobile, 32px desktop |

### Border Radius Scale

| Value | Tailwind | Usage |
|-------|----------|-------|
| 4px | rounded-sm | Tight corners |
| 6px | rounded | Standard |
| 8px | rounded-md | Buttons, inputs |
| 12px | rounded-lg | Cards, larger components |
| 16px | rounded-xl | Feature cards, prominent elements |
| 20px | rounded-2xl | Large cards, sections |
| 24px | rounded-3xl | Extra large sections |
| 999px | rounded-full | Circles, pills |

### Shadows

#### **Component Shadows**

```css
/* Subtle shadow (default cards) */
shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);

/* Feature card on hover */
hover:shadow-[0_16px_40px_-16px_rgba(9,9,11,0.12)]

/* Mac window shadow */
shadow-[0_40px_80px_-20px_rgba(9,9,11,0.18),
        0_12px_24px_-8px_rgba(9,9,11,0.08),
        inset_0_1px_0_rgba(255,255,255,0.9)];

/* CTA button shadow */
shadow-[0_10px_30px_-10px_rgba(9,9,11,0.5)]

/* Small shadow (cards in grid) */
shadow-[0_8px_24px_-10px_rgba(9,9,11,0.08)]

/* Architecture node shadow */
shadow-[0_12px_40px_-16px_rgba(9,9,11,0.1)]

/* Timeline indicator glow */
box-shadow: 0_0_12px_rgba(46,91,255,0.5);
```

**Shadow Elevation Pattern**:
- Level 0: No shadow (flat)
- Level 1: Subtle shadow for depth
- Level 2: Medium shadow for interactive elements
- Level 3: Strong shadow for prominence

---

## 7. Animation System

### Motion Library Stack

- **Framer Motion** (v11.18.0) - React animations, entrance/exit
- **GSAP** (v3.15.0) - Complex scroll animations, timelines
- **Tailwind Animate** (v1.0.7) - CSS-based animations
- **Lenis** (v1.3.25) - Smooth scrolling

### Animation Easing

**Primary Easing Function**:
```javascript
[0.16, 1, 0.3, 1]  // Custom cubic-bezier - smooth, slightly bouncy
// Equivalent to: cubic-bezier(0.16, 1, 0.3, 1)
```

**Other Easing Functions**:
- `ease-out` - Framer Motion preset
- `ease-in-out` - Smooth symmetric
- `linear` - Constant speed

### Animation Timing

| Animation | Duration | Timing |
|-----------|----------|--------|
| Entrance animations | 0.6s - 0.8s | Staggered by 0.08-0.12s |
| Hover effects | 0.25s - 0.35s | Immediate, no delay |
| Transitions | 0.2s - 0.5s | Smooth property changes |
| Page transitions | 1s | Longer for main content |
| Scroll animations | Scrubbed | Tied to scroll position |

### Entrance Animations (Framer Motion)

```javascript
// Standard fade + slide up
initial={{ opacity: 0, y: 20-30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-60px" }}
transition={{ duration: 0.6-0.8, delay: i * 0.08-0.12, 
             ease: [0.16, 1, 0.3, 1] }}

// Hero section
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
```

### Hover Effects

#### **Button Hover**
- `hover:bg-primary/90` - Subtle darkening
- `transition-colors` - Smooth color change
- `magnetic` class - Transform on hover with 0.35s cubic-bezier

#### **Card Hover**
- `whileHover={{ y: -4 }}` - Lift effect (4px up)
- `transition-shadow` - Shadow expansion
- `hover:shadow-[...]` - Enhanced shadow

#### **Link Hover**
- Color change
- Underline effect
- No additional transforms

### Focus States

```css
focus-visible:outline-none
focus-visible:ring-1
focus-visible:ring-ring
focus-visible:ring-offset-2
focus-visible:ring-offset-background
```

### Active States

#### **Button Active**
```css
data-[state=active]:bg-accent
data-[state=active]:text-accent-foreground
```

#### **Toggle Active**
```css
data-[state=on]:bg-accent
data-[state=on]:text-accent-foreground
```

### Loading States

#### **Skeleton Loader**
```css
animate-pulse
bg-primary/10
rounded-md
```
- Opacity pulse from 0.5 to 1
- Continuous animation

#### **Progress Indicator**
```css
Animated bar with transform: translateX()
Smooth transition-all
```

### Keyframe Animations

#### **Accordion Expand/Collapse**
```javascript
'accordion-down': {
  from: { height: '0' },
  to: { height: 'var(--radix-accordion-content-height)' }
}
'accordion-up': {
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: '0' }
}
animation: 'accordion-down 0.2s ease-out'
```

#### **Wave Animation** (Audio waveform)
```javascript
@keyframes wave {
  0%, 100% { transform: scaleY(0.35); }
  50% { transform: scaleY(1); }
}
animation: 'wave 1.4s ease-in-out infinite'
```

#### **Marquee Animation** (Scrolling text)
```javascript
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
animation: 'marquee 40s linear infinite'
```

### Scroll-Triggered Animations (GSAP)

#### **Pipeline Section**
- Pinned element during scroll
- Timeline progress tied to scroll position
- Active step indicator animates based on scroll progress
- Smooth transitions between scenes

#### **Scroll Reveal**
- Elements fade and slide up as they enter viewport
- Margin: "-60px" to trigger slightly before visible
- Once: true to prevent re-triggering

### Special Animation Effects

#### **Magnetic Button Effect**
```css
.magnetic {
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
```
- Draws cursor toward button on hover
- Smooth easing function

#### **Cursor Blob**
```css
.cursor-blob {
    position: fixed;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: rgba(46, 91, 255, 0.2);
    border: 1px solid rgba(46, 91, 255, 0.35);
    z-index: 90;
    mix-blend-mode: multiply;
    transition: width 0.25s, height 0.25s, opacity 0.25s ease;
}
```
- Smooth tracking of mouse movement
- Easing function for natural motion
- Updates on mousemove event

#### **Backdrop Filter (Glass Morphism)**
```css
.glass {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid rgba(9, 9, 11, 0.06);
}
```
- Used in navigation on scroll
- Smooth 500ms transition

#### **Grain Overlay**
```css
.grain {
    position: absolute;
    inset: 0;
    opacity: 0.35;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml;...")
    background-size: 220px 220px;
}
```
- SVG-based noise pattern
- Multiply blend mode for subtle texture
- Added to sections for visual depth

---

## 8. Form Design

### Form Structure

#### **Basic Form Layout**
```html
<Form>
  <FormField>
    <FormLabel>Field Label</FormLabel>
    <FormControl>
      <Input />
    </FormControl>
    <FormDescription>Helper text</FormDescription>
    <FormMessage>Error message</FormMessage>
  </FormField>
</Form>
```

#### **Form Container**
- Spacing: `space-y-2` between label, control, description
- Max-width: Typically 100% in containers
- Responsive: Full width on mobile, constrained on desktop

### Input Fields

#### **Text Input**
- Height: 36px (h-9)
- Padding: 12px horizontal, 4px vertical
- Border: 1px solid input color
- Border radius: md (8px)
- Background: Transparent or subtle color
- Focus: Ring outline in primary color
- Disabled: Reduced opacity (50%)
- Placeholder: Muted color
- Transition: all 0.2s

#### **Textarea**
- Min-height: 60px
- Padding: 12px
- Same styling as input
- Supports multi-line text
- Resizable vertically

#### **Select Dropdown**
- Height: 36px
- Border: 1px solid input color
- Chevron icon on right (opacity-50)
- Dropdown animation: fade + zoom
- Content max-height: Scrollable
- Border radius: md
- Focus ring styling

#### **Checkboxes**
- Size: 16px square
- Border: 1px solid primary
- Border radius: sm (4px)
- Checked: Primary background with white checkmark
- Interaction: Click or keyboard (space)
- Disabled: Opacity 50%

#### **Radio Buttons**
- Size: 20px circle
- Circular indicators
- Selected: Primary background
- Grouped with RadioGroup component
- Mutually exclusive selection

#### **Toggle/Switch**
- Height: 20px
- Width: 36px
- Border radius: full (pill)
- Thumb: 16px circle
- Animation: Smooth translate (0.2s)
- Colors: Primary (checked), input (unchecked)

#### **Sliders**
- Track height: 6px
- Thumb: 16px circle
- Track background: Primary/20
- Range fill: Primary color
- Thumb transition: Smooth movement
- Focus: Ring outline

### Form Labels

- Font size: 14px (text-sm)
- Font weight: 500 (medium)
- Color: Foreground (or destructive if error)
- Margin bottom: 8px
- Optional indicator: "✱" or text label

### Form States

#### **Focus State**
```css
focus-visible:outline-none
focus-visible:ring-1
focus-visible:ring-ring
focus-visible:ring-offset-2
```

#### **Disabled State**
```css
disabled:cursor-not-allowed
disabled:opacity-50
```

#### **Error State**
```css
border-destructive
text-destructive
FormMessage shown
```

#### **Validation**
- Built-in React Hook Form integration
- Zod schema validation
- Error messages displayed below field

### Form Button Styling

#### **Primary Action** (Submit)
```css
bg-primary
text-primary-foreground
hover:bg-primary/90
```

#### **Secondary Action** (Cancel)
```css
bg-secondary
text-secondary-foreground
hover:bg-secondary/80
```

#### **Destructive Action** (Delete)
```css
bg-destructive
text-destructive-foreground
hover:bg-destructive/90
```

#### **Ghost/Link** (Close, Skip)
```css
hover:bg-accent
hover:text-accent-foreground
```

### Form Layout Patterns

#### **Single Column**
```
Label
Input
Helper/Error
```

#### **Two Column** (on desktop)
```
Label | Label
Input | Input
Error | Error
```

#### **Inline Labels** (toggle switch)
```
Label ─────────── [Toggle]
```

#### **Group Fields**
```
Section Header
├─ Field 1
├─ Field 2
└─ Field 3
```

### Validation & Error Handling

- **Required fields**: Marked with asterisk or "required" text
- **Error messages**: Displayed below field in destructive color
- **Success states**: Optional checkmark or green border
- **Field-level validation**: Real-time feedback
- **Form-level validation**: Submit button disabled until valid

---

## 9. Complete UI Style Guide for Recreation

### Quick Reference Constants

```typescript
// Colors
const COLORS = {
  primary: '#2e5bff',
  primaryHover: '#1d4ed8',
  background: '#ffffff',
  foreground: '#09090b',
  muted: '#71717a',
  border: '#e4e4e7',
  lightBg: '#F8F9FB',
}

// Typography
const FONTS = {
  heading: "'Geist', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'Geist Mono', monospace",
}

// Spacing
const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
}

// Border Radius
const RADIUS = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '999px',
}

// Shadow Elevation
const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
}

// Animation
const EASING = {
  smooth: [0.16, 1, 0.3, 1],
  easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.6, 1)',
}

// Z-index Scale
const ZINDEX = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  backdrop: 40,
  overlay: 50,
  popover: 50,
  toast: 60,
  tooltip: 70,
  menu: 80,
  cursorBlob: 90,
}
```

### Component Template Patterns

#### **Button**
```jsx
// Default button
<button className="inline-flex items-center justify-center gap-2 
  whitespace-nowrap rounded-md text-sm font-medium 
  bg-primary text-primary-foreground
  hover:bg-primary/90
  transition-colors
  disabled:opacity-50 disabled:cursor-not-allowed
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary
">
  Button Text
</button>

// Icon button
<button className="h-9 w-9 rounded-md flex items-center justify-center
  hover:bg-accent hover:text-accent-foreground
  transition-colors">
  <Icon size={16} />
</button>
```

#### **Input**
```jsx
<input type="text"
  className="h-9 w-full rounded-md border border-input
    bg-transparent px-3 py-1
    text-base shadow-sm
    transition-colors
    placeholder:text-muted-foreground
    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
    disabled:opacity-50 disabled:cursor-not-allowed"
  placeholder="Enter text..."
/>
```

#### **Card**
```jsx
<div className="rounded-xl border border-border bg-card text-card-foreground shadow">
  <div className="p-6">
    <h3 className="font-semibold text-lg">Title</h3>
    <p className="text-sm text-muted-foreground mt-2">Content</p>
  </div>
</div>
```

#### **Badge**
```jsx
<span className="inline-flex items-center rounded-md border
  px-2.5 py-0.5 text-xs font-semibold
  bg-primary text-primary-foreground
  shadow hover:bg-primary/80
  transition-colors">
  Badge
</span>
```

#### **Alert**
```jsx
<div className="rounded-lg border border-border bg-background p-4">
  <div className="flex gap-4">
    <AlertIcon />
    <div>
      <h5 className="font-medium">Alert Title</h5>
      <p className="text-sm text-muted-foreground mt-1">Alert description</p>
    </div>
  </div>
</div>
```

#### **Modal/Dialog**
```jsx
<dialog className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black/80" /> {/* Backdrop */}
  <div className="relative bg-background border border-border rounded-lg
    shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto">
    <div className="p-6">
      <h2 className="text-lg font-semibold">Dialog Title</h2>
      <p className="text-sm text-muted-foreground mt-2">Content</p>
    </div>
    <div className="flex gap-2 justify-end p-6 border-t border-border">
      <button className="..secondary..">Cancel</button>
      <button className="..primary..">Confirm</button>
    </div>
  </div>
</dialog>
```

#### **Feature Card** (Landing page)
```jsx
<div className="group rounded-2xl border border-border bg-white p-7
  transition-shadow hover:shadow-[0_16px_40px_-16px_rgba(9,9,11,0.12)]">
  <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100
    flex items-center justify-center
    group-hover:border-primary/30 group-hover:bg-primary/5
    transition-colors">
    <Icon className="w-4 h-4 text-zinc-700 group-hover:text-primary
      transition-colors" />
  </div>
  <h3 className="text-[15.5px] font-semibold text-zinc-950 tracking-tight mt-5">
    Feature Title
  </h3>
  <p className="text-[13.5px] text-zinc-500 leading-relaxed mt-1.5">
    Feature description
  </p>
</div>
```

#### **Heading Styles**
```jsx
// Hero H1
<h1 className="font-heading font-semibold tracking-[-0.04em]
  text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px]
  leading-[0.98] text-zinc-950 max-w-5xl">
  Hero Headline
</h1>

// Section H2
<h2 className="font-heading font-semibold tracking-[-0.03em]
  text-[38px] md:text-[56px] text-zinc-950
  leading-[1.02]">
  Section Heading
  <br />
  <span className="italic font-normal text-zinc-500">Emphasis part</span>
</h2>

// Small label
<div className="text-[10.5px] uppercase tracking-[0.2em]
  text-zinc-400 font-medium mb-3">
  LABEL
</div>
```

#### **Section Container**
```jsx
<section className="relative py-32 md:py-48 bg-white">
  <div className="relative max-w-7xl mx-auto px-6 md:px-10">
    {/* Content */}
  </div>
</section>
```

#### **Animation Entry**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.6, delay: index * 0.08, 
              ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>
```

### Common Tailwind Class Combinations

```jsx
// Button primary
"inline-flex items-center justify-center gap-2 rounded-md px-6 py-3
  bg-primary text-primary-foreground font-medium
  hover:bg-primary/90 transition-colors"

// Button ghost
"inline-flex items-center justify-center gap-2 rounded-md px-6 py-3
  hover:bg-accent hover:text-accent-foreground
  transition-colors"

// Small label badge
"inline-flex items-center gap-2 px-3 py-1 rounded-full
  border border-border bg-white text-[11.5px] font-medium
  tracking-wide text-foreground"

// Feature grid gap responsive
"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"

// Subtitle text muted
"text-[13.5px] text-muted-foreground leading-relaxed font-normal"

// Card with hover
"rounded-2xl border border-border bg-white p-6 md:p-7
  transition-shadow hover:shadow-[0_16px_40px_-16px_rgba(9,9,11,0.12)]"

// Focus ring
"focus-visible:outline-none focus-visible:ring-1
  focus-visible:ring-ring focus-visible:ring-offset-2
  focus-visible:ring-offset-background"

// Disabled state
"disabled:pointer-events-none disabled:opacity-50"

// Responsive text size
"text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px]"

// Section header spacing
"mb-14 md:mb-16 max-w-2xl"

// Container responsive padding
"px-6 md:px-8 max-w-7xl mx-auto"
```

### Responsive Breakpoints

```
Mobile first approach:
- Default (mobile): No prefix
- Tablet: sm: (640px)
- Desktop: md: (768px)
- Large desktop: lg: (1024px)
- Extra large: xl: (1280px)
- XXL: 2xl: (1536px)
```

---

## 10. Design Token Export Reference

### CSS Variables (Root)

```css
:root {
  /* Typography */
  --font-heading: "Geist", -apple-system, BlinkMacSystemFont, 
                  "SF Pro Display", "Segoe UI", sans-serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, 
               "SF Pro Text", "Segoe UI", sans-serif;
  --font-mono: "Geist Mono", "SF Mono", Menlo, monospace;

  /* Colors (HSL) */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.6%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.6%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.6%;
  --primary: 221 100% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 220 13% 91%;
  --secondary-foreground: 240 10% 3.6%;
  --muted: 220 13% 91%;
  --muted-foreground: 215 16% 47%;
  --accent: 221 100% 50%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 220 13% 91%;
  --input: 220 13% 91%;
  --ring: 221 100% 50%;

  /* Accent colors */
  --accent: #2e5bff;
  --accent-hover: #1d4ed8;

  /* Radius */
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Adjust for dark mode */
  }
}
```

### Tailwind Config Export

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... more colors
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
    },
  },
}
```

---

## 11. Accessibility Features

### ARIA & Semantic HTML
- Proper heading hierarchy (h1 > h2 > h3)
- Semantic buttons and links
- ARIA labels on icon-only buttons
- ARIA descriptions for complex regions
- Form labels properly associated with inputs

### Keyboard Navigation
- Tab order logical and visible
- Escape key closes modals/dialogs
- Arrow keys for sliders, dropdowns, menus
- Enter/Space to activate buttons
- Focus visible indicators (ring outline)

### Color Contrast
- WCAG AA compliance (4.5:1 for text)
- WCAG AAA compliance where possible (7:1)
- Not relying on color alone for information

### Motion
- Reduced motion support via `prefers-reduced-motion`
- Animations disabled for users who prefer no motion
- Focus trap in modals

### Screen Reader Support
- Descriptive alt text for images
- Hidden decorative elements (`aria-hidden="true"`)
- Live regions for dynamic content
- Proper form field associations

---

## 12. Implementation Checklist for Recreation

### Core Setup
- [ ] Install React 19, Radix UI, Tailwind CSS
- [ ] Configure Tailwind with HSL color system
- [ ] Import Google Fonts (Geist, Inter, Geist Mono)
- [ ] Set up CSS custom properties for colors
- [ ] Install Framer Motion, GSAP, Lenis

### Color System
- [ ] Define all HSL tokens in :root
- [ ] Create Tailwind color configuration
- [ ] Set up dark mode variant support
- [ ] Test color contrast ratios

### Typography
- [ ] Apply font families to elements
- [ ] Set up font size scale
- [ ] Configure letter-spacing for headings
- [ ] Test rendering optimization

### Component Library
- [ ] Implement all 43 UI components
- [ ] Use CVA (class-variance-authority) for variants
- [ ] Ensure proper ref forwarding
- [ ] Add display names for debugging

### Spacing & Layout
- [ ] Define spacing scale
- [ ] Create responsive padding/margin utilities
- [ ] Set up container queries where needed
- [ ] Test responsive breakpoints

### Animations
- [ ] Configure Framer Motion defaults
- [ ] Set up GSAP ScrollTrigger
- [ ] Create reusable animation variants
- [ ] Implement reduced motion support

### Forms
- [ ] Integrate React Hook Form
- [ ] Set up Zod validation
- [ ] Create form wrapper components
- [ ] Add error state handling

### Accessibility
- [ ] Add ARIA labels
- [ ] Test keyboard navigation
- [ ] Verify color contrast
- [ ] Test with screen readers

### Testing
- [ ] Component unit tests
- [ ] Integration tests for interactions
- [ ] Responsive design tests
- [ ] Accessibility audit (axe, Lighthouse)

---

## 13. Component Import Reference

```javascript
// UI Components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Select, SelectTrigger, SelectContent } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Toast, Toaster, useToast } from '@/components/ui/toaster'

// Motion & Animation
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/lib/lenis'
```

---

## Summary

ClipForge's UI design system is a **modern, minimal SaaS design** emphasizing clean aesthetics, purposeful interactions, and professional polish. Built with industry-standard tools (React, Radix UI, Tailwind CSS), it provides a comprehensive, scalable component system with sophisticated animations and excellent accessibility support. The design language is inspired by Linear.app and Vercel, prioritizing clarity, consistency, and user experience throughout.

