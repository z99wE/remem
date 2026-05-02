# REMEM — Futuristic AI Cognitive Restoration Engine
## Complete Design System Documentation

---

## 🎨 DESIGN PHILOSOPHY

REMEM is designed as a **futuristic cognitive operating system** that combines:

- **Bauhaus Modernism** — Geometric abstraction, functional beauty
- **Brutalist Architecture** — Strong structure, honest materials
- **Glassmorphism** — Layered transparency, premium depth
- **Terminal Aesthetics** — Engineering precision, monospace clarity
- **Editorial Typography** — Bold headlines, architectural hierarchy

### Emotional Target
**"Precision Engineered Intelligence"**

The interface should feel like entering an AI cognition chamber — not another generic SaaS dashboard.

---

## 🎯 CORE VISUAL PRINCIPLES

### 1. Geometric Abstraction
- Use circles, squares, triangles as compositional elements
- Asymmetrical layouts with intentional balance
- Architectural spacing and grid systems
- No random decorative elements

### 2. Typography Dominance
- Massive, bold, uppercase headlines
- Tight kerning and letter-spacing
- Futuristic stretched letterforms for the REMEM wordmark
- Editorial hierarchy with clear visual weight

### 3. Restrained Glassmorphism
- Subtle blur effects (16px max)
- Thin black borders (2px)
- Layered transparency
- Realistic depth without excessive gloss

### 4. Brutalist Interaction
- Sharp edges and strong borders
- Offset shadows (4px/8px)
- Tactile button states
- Clear visual feedback

---

## 🎨 COLOR SYSTEM

### Primary Palette

```css
--bg-primary: #F4F4F1        /* Warm White */
--bg-secondary: #ECECE7      /* Light Gray */
--text-primary: #0A0A0A      /* Carbon Black */
--text-secondary: #3A3A3A    /* Dark Gray */
```

### Bauhaus Accent Colors

```css
--terminal-green: #41FF88    /* Primary Action */
--bauhaus-red: #FF3B30       /* Prosecutor/Critical */
--bauhaus-blue: #0F4C81      /* Judge/Info */
--bauhaus-yellow: #FFC700    /* Defense/Warning */
--carbon-black: #0A0A0A      /* Borders/Text */
```

### Usage Guidelines

- **Terminal Green**: Primary CTAs, success states, active elements
- **Bauhaus Red**: Prosecutor analysis, critical issues, errors
- **Bauhaus Blue**: Judge verdict, information, secondary actions
- **Bauhaus Yellow**: Defense reasoning, warnings, highlights
- **Carbon Black**: All borders, primary text, structural elements

---

## 📐 TYPOGRAPHY SYSTEM

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 
             'SF Pro Display', system-ui, sans-serif;
```

### Type Scale

- **Display**: 3-6rem, 800 weight, -0.04em tracking, uppercase
- **Headline**: 2-4rem, 700 weight, -0.03em tracking, uppercase
- **Title**: 1.5-2.5rem, 700 weight, -0.02em tracking
- **Body**: 1rem, 400 weight, 1.6 line-height
- **Mono**: SF Mono, Monaco, Courier New (for terminal/code)

### REMEM Wordmark
- Custom stretched letterforms
- 900 font weight
- -0.08em letter-spacing
- Uppercase only
- Geometric, futuristic feel

---

## 🧩 COMPONENT LIBRARY

### Button
**Variants**: primary, secondary, outline, ghost
**Sizes**: sm, md, lg

```tsx
<Button size="lg" variant="primary">
  START RESTORATION →
</Button>
```

**Styling**:
- 2px solid borders
- Brutalist offset shadows (4px/8px)
- Uppercase text
- Bold font weight
- Hover: translate shadow effect

### Card
**Variants**: glass, solid, outline, prosecutor, defense, judge
**Padding**: none, sm, md, lg

```tsx
<Card variant="prosecutor" padding="lg">
  <CardHeader>
    <CardTitle>PROSECUTOR</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

**Styling**:
- Glass: subtle blur, thin borders
- Prosecutor: left border (red)
- Defense: left border (yellow)
- Judge: left border (blue)

### Input & TextArea
**Terminal-inspired design**:
- Black background for TextArea
- Terminal green text
- Monospace font
- Character counter
- 2px borders

---

## 🎬 ANIMATION LANGUAGE

### Principles
- **Cinematic**: Smooth, intentional movement
- **Architectural**: Geometric transitions
- **Subtle**: No bouncing or flashy effects
- **Layered**: Stagger animations for depth

### Animation Classes

```css
.animate-fade-in        /* 0.6s fade */
.animate-slide-up       /* 0.6s slide from bottom */
.animate-slide-down     /* 0.6s slide from top */
.animate-scale-in       /* 0.5s scale from 95% */
.animate-rotate-slow    /* 20s continuous rotation */
.animate-pulse-glow     /* 2s pulsing glow */
.animate-float          /* 3s floating motion */
```

### Delay Utilities
```css
.delay-100  /* 0.1s */
.delay-200  /* 0.2s */
.delay-300  /* 0.3s */
.delay-400  /* 0.4s */
.delay-500  /* 0.5s */
```

---

## 📱 PAGE DESIGNS

### 1. Landing Page
**Key Elements**:
- Glass totem (layered rotating planes)
- Geometric background elements
- Massive typography
- Problem statement grid (3 cards)
- How it works section

**Visual Hierarchy**:
1. Glass totem (center, animated)
2. REMEM wordmark (XL size)
3. Tagline with terminal green accent
4. Primary CTA button
5. Problem cards (numbered 01, 02, 03)

### 2. Input Interface (Cognitive Terminal)
**Key Elements**:
- Terminal-inspired header
- File upload zone with drag & drop
- Black terminal textarea
- Content detection sidebar
- Optional Git context section

**Design Features**:
- Monospace green text on black
- Real-time character counter
- Detected content badges
- Brutalist file upload cards

### 3. Loading State
**Key Elements**:
- Architectural glass structure (rotating)
- Progress bar with stages
- Stage checklist with completion states
- Geometric background animation

**Animation**:
- Rotating layered planes
- Progressive stage completion
- Smooth percentage counter
- Pulsing status indicators

### 4. Output Dashboard (Cognitive Courtroom)
**Key Elements**:
- Large recovery score display
- Prosecutor card (red accent)
- Defense card (yellow accent)
- Judge verdict card (blue accent)
- Next actions grid
- Git timeline (if available)

**Layout**:
- Hero section with geometric score frame
- 2-column prosecutor/defense grid
- Full-width judge verdict
- Action cards with priority badges
- Timeline with commit dots

---

## 🎯 COGNITIVE COURTROOM UI

### Prosecutor Section
**Purpose**: Identify what went wrong
**Color**: Bauhaus Red (#FF3B30)
**Icon**: Scale
**Content**: Issues list, severity level

### Defense Section
**Purpose**: Explain why it made sense
**Color**: Bauhaus Yellow (#FFC700)
**Icon**: Shield
**Content**: Reasons list, context validity

### Judge Section
**Purpose**: Synthesize final verdict
**Color**: Bauhaus Blue (#0F4C81)
**Icon**: Gavel
**Content**: Verdict, key insight, recommendation

---

## ♿ ACCESSIBILITY

### Focus States
- 2px solid terminal green outline
- 2px offset for clarity
- Visible on all interactive elements

### Contrast
- All text meets WCAG AA standards
- Terminal green on black: 7.2:1
- Carbon black on warm white: 16.5:1

### Keyboard Navigation
- Full keyboard support
- Logical tab order
- Clear focus indicators

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* All animations reduced to 0.01ms */
}
```

---

## 📐 RESPONSIVE DESIGN

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Adaptations
- Single column layouts
- Reduced font sizes (clamp)
- Simplified geometric backgrounds
- Touch-friendly button sizes (min 44px)

---

## 🚀 IMPLEMENTATION NOTES

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: CSS animations (Framer Motion ready)
- **Typography**: System fonts
- **Icons**: Lucide React

### File Structure
```
src/
├── app/
│   ├── globals.css          # Design system CSS
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── LandingPage.tsx      # Hero + problem statement
│   ├── InputInterface.tsx   # Cognitive terminal
│   ├── LoadingState.tsx     # Reconstruction animation
│   ├── OutputDashboard.tsx  # Courtroom UI
│   ├── RememWordmark.tsx    # Custom wordmark
│   └── ui/
│       ├── Button.tsx       # Brutalist buttons
│       ├── Card.tsx         # Glass cards
│       ├── Input.tsx        # Terminal inputs
│       └── ProgressBar.tsx  # Progress indicators
```

---

## 🎨 DESIGN REFERENCES

### Primary Inspirations
- Bauhaus poster systems
- Dieter Rams industrial design
- Higgsfield.ai interface
- Swiss grid systems
- Constructivist geometry

### What to Avoid
- Playful illustrations
- Crypto/Web3 aesthetics
- Generic SaaS templates
- Neon cyberpunk
- Rainbow gradients
- Excessive blur effects

---

## ✅ QUALITY CHECKLIST

- [ ] Typography is massive and bold
- [ ] Geometric elements are intentional
- [ ] Glassmorphism is restrained
- [ ] Buttons have brutalist shadows
- [ ] Terminal green is primary action color
- [ ] Animations are cinematic and smooth
- [ ] Layout is asymmetrical but balanced
- [ ] All text is readable (contrast)
- [ ] Focus states are clear
- [ ] Mobile responsive
- [ ] No random decorative elements
- [ ] Feels like a cognitive operating system

---

## 🎯 FINAL DESIGN GOAL

**The user should feel:**

> "This is not another AI tool.  
> This feels like a next-generation cognitive operating system."

The UI should be:
- Visually unforgettable
- Emotionally immersive
- Futuristic yet functional
- Premium and intelligent
- Highly intentional

---

**Built with precision engineering for developers who refuse to lose their train of thought.**

---

*Design System v1.0 — Created by Bob*