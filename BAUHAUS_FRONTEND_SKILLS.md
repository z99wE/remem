# REMEM — Frontend Skills & Design System

## Overview

REMEM is a futuristic AI cognitive restoration platform for developers.
The frontend should feel like a cinematic operating system instead of a generic SaaS dashboard.

This document defines:
- frontend engineering standards
- visual design philosophy
- animation language
- typography system
- layout logic
- UI interaction principles
- component architecture
- accessibility rules
- implementation expectations

---

# Core Frontend Philosophy

The REMEM frontend should feel:
- futuristic
- intelligent
- architectural
- editorial
- premium
- geometric
- cinematic
- emotionally immersive

The UI should combine:
- Bauhaus modernism
- brutalist structure
- glassmorphism layering
- terminal aesthetics
- editorial typography
- futuristic operating systems

---

# Primary Frontend Stack

## Framework
- Next.js 14 App Router
- TypeScript
- React Server Components

## Styling
- Tailwind CSS
- CSS Variables
- Utility-first architecture

## Animation
- Framer Motion (ready for integration)
- CSS Animations (currently implemented)

## UI Foundation
- Custom glassmorphism components
- Brutalist design system
- Terminal-inspired interfaces

---

# Design System

## Color Palette

```css
:root {
  --bg-primary: #F4F4F1;
  --bg-secondary: #ECECE7;

  --text-primary: #0A0A0A;
  --text-secondary: #3A3A3A;

  --terminal-green: #41FF88;
  --bauhaus-red: #FF3B30;
  --bauhaus-blue: #0F4C81;
  --bauhaus-yellow: #FFC700;

  --border-black: #0A0A0A;
}
```

### Color Usage Guidelines

**Terminal Green (#41FF88)**
- Primary action buttons
- Success states
- Active elements
- Terminal text
- Progress indicators

**Bauhaus Red (#FF3B30)**
- Prosecutor analysis
- Critical issues
- Error states
- High priority items

**Bauhaus Blue (#0F4C81)**
- Judge verdict
- Information states
- Secondary actions
- Informational badges

**Bauhaus Yellow (#FFC700)**
- Defense reasoning
- Warning states
- Highlights
- Medium priority items

**Carbon Black (#0A0A0A)**
- All borders (2px)
- Primary text
- Structural elements
- Terminal backgrounds

---

# Typography System

Typography must feel:
- engineered
- editorial
- futuristic
- geometric

## Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 
             'SF Pro Display', system-ui, sans-serif;
```

## Recommended Fonts (for future enhancement)
- Space Grotesk
- Monument Extended
- Satoshi
- Eurostile-inspired fonts
- OCR-inspired futuristic fonts

## Type Scale

```css
/* Display - Hero Headlines */
.text-display {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

/* Headline - Section Titles */
.text-headline {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

/* Title - Card Headers */
.text-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Body - Content Text */
.text-body {
  font-size: 1rem;
  line-height: 1.6;
}

/* Mono - Terminal/Code */
.text-mono {
  font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
  letter-spacing: -0.01em;
}
```

## REMEM Wordmark

The REMEM wordmark should:
- be typography-only
- use futuristic stretched geometry
- avoid icons or mascots
- be 900 font weight
- have -0.08em letter-spacing
- always be uppercase

Implementation:
```tsx
<RememWordmark size="xl" className="text-carbon-black" />
```

---

# Layout Principles

## Use:
- Strong grid systems
- Asymmetrical composition
- Geometric shapes (circles, squares, triangles)
- Architectural spacing
- Intentional white space
- Editorial hierarchy

## Avoid:
- Generic centered SaaS layouts
- Floating random cards
- Cluttered dashboards
- Symmetrical boring layouts
- Random decorative elements

## Spacing System

```css
--space-unit: 8px;

/* Multiples of 8px */
padding: 8px;   /* sm */
padding: 16px;  /* md */
padding: 24px;  /* lg */
padding: 32px;  /* xl */
padding: 48px;  /* 2xl */
```

---

# Glassmorphism Rules

Glass effects should feel:
- restrained
- cinematic
- premium
- layered

## Implementation

```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(10, 10, 10, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```

## Rules:
- Use subtle blur (16-20px max)
- Thin borders (1-2px)
- Transparent layering
- Realistic reflections

## Avoid:
- Excessive blur (>20px)
- Fake dribbble-style gloss
- Over-saturated backgrounds

---

# Landing Page Rules

The landing page should explain:
- Context switching pain
- Cognitive overload
- Interruption recovery
- AI reasoning reconstruction

## Key Elements:

### Glass Totem
- Layered rotating planes
- Architectural sculpture
- Center focal point
- Animated with CSS

### Typography
- Massive display headlines
- Terminal green accents
- Editorial spacing
- Uppercase titles

### Problem Cards
- Numbered (01, 02, 03)
- Bauhaus color accents
- Glass backgrounds
- Hover lift effects

## Do NOT use:
- Stock photos
- Random illustrations
- Meaningless charts
- Generic hero images

---

# Dashboard Rules

The dashboard should feel like:
- Mission control
- AI cognition chamber
- Forensic reasoning engine

## Layout Structure:

```
┌─────────────────────────────────────┐
│ Header (sticky)                     │
├─────────────────────────────────────┤
│ Hero Score Display                  │
├─────────────────────────────────────┤
│ Prosecutor    │    Defense          │
├─────────────────────────────────────┤
│ Judge Verdict (full width)          │
├─────────────────────────────────────┤
│ Next Actions Grid                   │
├─────────────────────────────────────┤
│ Git Timeline (if available)         │
└─────────────────────────────────────┘
```

## Use:
- Structured panels
- Editorial spacing
- Geometric accents
- Clear hierarchy

## Avoid:
- Fake KPIs
- Crypto dashboard visuals
- Clutter
- Random metrics

---

# Cognitive Courtroom UI

## Prosecutor
**Purpose**: Identify what went wrong

**Color**: Bauhaus Red (#FF3B30)

**Icon**: Scale

**Content**:
- Issues list
- Severity level badge
- Left border accent

**Explains**:
- What went wrong
- Failure patterns
- Risky assumptions

## Defense
**Purpose**: Explain why it made sense

**Color**: Bauhaus Yellow (#FFC700)

**Icon**: Shield

**Content**:
- Reasons list
- Context validity badge
- Left border accent

**Explains**:
- Tradeoffs
- Engineering rationale
- Constraints

## Judge
**Purpose**: Synthesize final verdict

**Color**: Bauhaus Blue (#0F4C81)

**Icon**: Gavel

**Content**:
- Verdict statement
- Key insight
- Recommendation

**Explains**:
- Synthesis
- Recommendations
- Core insight

---

# Input Interface Rules

The input area should feel like:
- A futuristic terminal
- An AI engineering console
- A forensic cognition system

## Design Elements:

### Terminal Textarea
```css
background: #0A0A0A;
color: #41FF88;
font-family: monospace;
border: 2px solid #0A0A0A;
```

### Features:
- Monospace fonts
- Green terminal text
- Dark console backgrounds
- Structured parsing UI
- Character counter
- File upload zone

### File Upload
- Drag & drop support
- Brutalist card design
- File type badges
- Size display
- Remove functionality

---

# Motion Design Principles

Animations should feel:
- Cinematic
- Smooth
- Architectural
- Immersive

## Animation Library

```css
/* Fade Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Animations */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale Animations */
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Rotation */
@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Glow Effects */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(65, 255, 136, 0.3); }
  50% { box-shadow: 0 0 40px rgba(65, 255, 136, 0.6); }
}
```

## Usage:
- Fade reveals
- Stagger transitions
- Geometric motion
- Layered movement

## Avoid:
- Bouncing effects
- Flashy interactions
- Excessive motion
- Distracting animations

---

# Component Architecture

## Button Component

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

**Styling**:
- 2px solid borders
- Brutalist offset shadows
- Uppercase text
- Bold font weight
- Hover translate effects

## Card Component

```tsx
interface CardProps {
  variant?: 'glass' | 'solid' | 'outline' | 'prosecutor' | 'defense' | 'judge';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

**Features**:
- Glass background
- Colored left borders
- Rounded corners (12px)
- Hover lift effects

## Input Components

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  characterCount?: number;
  maxCharacters?: number;
}
```

**Terminal Style**:
- Black background (TextArea)
- Terminal green text
- Monospace font
- Character counter
- 2px borders

---

# Accessibility Rules

The interface must:
- Maintain readability (WCAG AA)
- Support keyboard navigation
- Preserve contrast ratios
- Remain responsive
- Use semantic HTML

## Focus States

```css
*:focus-visible {
  outline: 2px solid var(--terminal-green);
  outline-offset: 2px;
}
```

## Contrast Requirements

- Terminal green on black: 7.2:1 ✅
- Carbon black on warm white: 16.5:1 ✅
- All text meets WCAG AA standards

## Keyboard Navigation
- Full keyboard support
- Logical tab order
- Clear focus indicators
- Skip links where needed

**The futuristic aesthetic should NEVER reduce usability.**

---

# Responsive Design

## Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  .text-display { font-size: 2.5rem; }
  .text-headline { font-size: 2rem; }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Tablet-specific styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Desktop-specific styles */
}
```

## Design Adaptations

**Desktop should feel**:
- Cinematic
- Editorial
- Expansive

**Mobile should feel**:
- Minimal
- Immersive
- Readable

## Mobile Considerations:
- Single column layouts
- Touch-friendly buttons (min 44px)
- Reduced font sizes (clamp)
- Simplified animations
- Optimized glassmorphism

---

# Frontend Engineering Standards

Code should be:
- **Modular**: Reusable components
- **Scalable**: Easy to extend
- **Typed**: Full TypeScript coverage
- **Tested**: Unit and integration tests
- **Production-ready**: Optimized and performant

## File Structure

```
src/
├── app/
│   ├── globals.css          # Design system
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── LandingPage.tsx      # Hero + problems
│   ├── InputInterface.tsx   # Terminal input
│   ├── LoadingState.tsx     # Reconstruction
│   ├── OutputDashboard.tsx  # Courtroom UI
│   ├── RememWordmark.tsx    # Custom wordmark
│   └── ui/
│       ├── Button.tsx       # Brutalist buttons
│       ├── Card.tsx         # Glass cards
│       ├── Input.tsx        # Terminal inputs
│       └── index.ts         # Exports
├── lib/
│   ├── utils.ts             # Utilities
│   └── types.ts             # TypeScript types
└── types/
    └── index.ts             # Global types
```

## Code Quality

- ESLint + Prettier
- TypeScript strict mode
- Component prop validation
- Error boundaries
- Performance optimization

---

# UX Philosophy

REMEM should feel:

**"Like entering an AI cognition chamber."**

Every interaction should communicate:
- **Intelligence**: Smart, thoughtful responses
- **Calmness**: Smooth, predictable behavior
- **Structure**: Clear hierarchy and flow
- **Restoration**: Healing, rebuilding context
- **Clarity**: Obvious next steps

## Interaction Principles

1. **Immediate Feedback**: Every action has visual response
2. **Progressive Disclosure**: Information revealed as needed
3. **Consistent Patterns**: Same interactions work the same way
4. **Error Prevention**: Guide users to success
5. **Cognitive Load**: Minimize mental effort required

---

# Performance Standards

## Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

## Optimization Techniques
- Image optimization (Next.js Image)
- Code splitting (dynamic imports)
- CSS optimization (critical path)
- Font loading (font-display: swap)
- Bundle analysis (webpack-bundle-analyzer)

---

# Final Design Goal

The user should feel:

**"This is not another AI tool. This feels like a next-generation cognitive operating system."**

The UI should be:
- **Visually unforgettable**: Unique, memorable design
- **Emotionally immersive**: Engaging, captivating experience
- **Futuristic**: Advanced, cutting-edge feel
- **Premium**: High-quality, polished execution
- **Highly intentional**: Every element has purpose

---

# Development Workflow

## Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev -- --port 3003`
4. Open browser: `http://localhost:3003`

## Development Commands
```bash
npm run dev -- --port 3003    # Development server
npm run build                  # Production build
npm run start                  # Production server
npm run lint                   # Code linting
npm run type-check            # TypeScript checking
```

## Git Workflow
1. Feature branches from `main`
2. Descriptive commit messages
3. Pull request reviews
4. Automated testing
5. Deployment pipeline

---

**Built with precision engineering for developers who refuse to lose their train of thought.**

---

*Frontend Skills & Design System v1.0 — Created by Bob*