# ReMem - Visual Design Mockups & Wireframes

## Design System Overview

### Color Palette
```
Primary Gradients:
- Coral to Gold: rgb(120, 18, 180) → #FFE66D
- Teal to Emerald: #4ECDC4 → #44A08D
- Rose to Cream: #F38181 → #FCE38A

Dark Mode Base:
- Background Primary: #0A0A0A
- Background Secondary: #141414
- Background Tertiary: #1E1E1E

Text:
- Primary: #FFFFFF
- Secondary: #A0A0A0
- Accent: #FFE66D

Glassmorphism:
- Background: rgba(255, 255, 255, 0.05)
- Border: rgba(255, 255, 255, 0.1)
- Backdrop Blur: 12px
```

---

## Page 1: Landing Page

```
┌─────────────────────────────────────────────────────────────────┐
│                         [ReMem Logo]                            │
│                                                                 │
│                                                                 │
│              ╔═══════════════════════════════════╗              │
│              ║                                   ║              │
│              ║         REMEMBER WHERE           ║              │
│              ║       YOUR MIND LEFT OFF         ║              │
│              ║                                   ║              │
│              ║   [Animated gradient background]  ║              │
│              ║   [Floating particles effect]     ║              │
│              ║                                   ║              │
│              ╚═══════════════════════════════════╝              │
│                                                                 │
│                  Cognitive Restoration Engine                   │
│                      for Developers                             │
│                                                                 │
│                  ┌─────────────────────┐                        │
│                  │  RESTORE CONTEXT →  │                        │
│                  └─────────────────────┘                        │
│                   [Glowing CTA Button]                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                  THE COGNITIVE INTERRUPTION                     │
│                          PROBLEM                                │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   🧠 LOST    │  │  ⚡ FRAGMENTED│  │  ⏰ WASTED   │         │
│  │   CONTEXT    │  │   REASONING   │  │    TIME      │         │
│  │              │  │               │  │              │         │
│  │ Switching    │  │ Different AI  │  │ Reconstructing│        │
│  │ between AI   │  │ models break  │  │ context after│         │
│  │ models loses │  │ your thought  │  │ interruptions│         │
│  │ debugging    │  │ threads       │  │ wastes hours │         │
│  │ context      │  │               │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  [Each card has glassmorphism effect with subtle hover scale]  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Hero text: Typewriter effect (0.8s)
- Gradient: Slow rotation (20s loop)
- Particles: Floating upward (3s stagger)
- CTA Button: Pulse glow (2s loop)
- Problem cards: Fade in from bottom (0.6s, stagger 0.15s)

---

## Page 2: Input Interface

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                    ReMem                    History →   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                  PASTE YOUR COGNITIVE FRAGMENTS                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  Paste debugging logs, terminal outputs, todos,          │ │
│  │  AI prompts, coding notes, or unfinished thoughts...     │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │                                                     │ │ │
│  │  │  [Large text area - 10+ lines visible]             │ │ │
│  │  │                                                     │ │ │
│  │  │  Smart detection will categorize your input        │ │ │
│  │  │  automatically as you paste                        │ │ │
│  │  │                                                     │ │ │
│  │  │                                                     │ │ │
│  │  │                                                     │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  Characters: 0 / 50,000                                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  🔗 OPTIONAL: Connect Git Repository                     │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Repository URL or local path...                     │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  [x] Include last 10 commits                             │ │
│  │  [x] Include current branch context                      │ │
│  │  [x] Include modified files                              │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│                  ┌──────────────────────────┐                  │
│                  │  🧠 RESTORE CONTEXT →   │                  │
│                  └──────────────────────────┘                  │
│                   [Glowing primary button]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Smart Detection Preview (appears after paste):**
```
┌─────────────────────────────────────────────────────────────────┐
│  DETECTED CONTENT:                                              │
│                                                                 │
│  ✓ 3 Terminal logs                                              │
│  ✓ 5 TODO items                                                 │
│  ✓ 2 Error stack traces                                         │
│  ✓ 1 AI conversation                                            │
│  ✓ 4 Code snippets                                              │
│                                                                 │
│  [Animated checkmarks appear sequentially]                      │
└─────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Text area: Subtle border glow on focus
- Character count: Color changes (green → yellow → red)
- Git section: Expand/collapse with smooth height transition
- Detection preview: Slide down from top (0.4s)
- Checkmarks: Appear with scale + fade (0.2s each, stagger 0.1s)

---

## Page 3: Loading State

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                                                                 │
│                    ╔═══════════════════╗                        │
│                    ║                   ║                        │
│                    ║    ⚡ ⚡ ⚡       ║                        │
│                    ║                   ║                        │
│                    ║  RECONSTRUCTING   ║                        │
│                    ║  YOUR COGNITIVE   ║                        │
│                    ║     CONTEXT       ║                        │
│                    ║                   ║                        │
│                    ║   [Progress bar]  ║                        │
│                    ║   ████████░░░░    ║                        │
│                    ║                   ║                        │
│                    ║   Analyzing...    ║                        │
│                    ║                   ║                        │
│                    ╚═══════════════════╝                        │
│                                                                 │
│                                                                 │
│              [Floating holographic particles]                   │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Loading Messages (rotate every 2s):**
- "Analyzing thought threads..."
- "Reconstructing debugging context..."
- "Identifying reasoning patterns..."
- "Synthesizing cognitive state..."
- "Almost there..."

**Animations:**
- Lightning bolts: Pulse and rotate (1s loop)
- Progress bar: Smooth fill animation
- Particles: Float and fade (3s loop)
- Card: Subtle breathing scale (2s loop)

---

## Page 4: Output Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  ← New Session              ReMem           Export ⬇  Share 🔗  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  COGNITIVE RECOVERY SCORE                                 │ │
│  │                                                           │ │
│  │              ╭─────────────╮                              │ │
│  │              │             │                              │ │
│  │              │     87      │  [Circular gauge]            │ │
│  │              │             │  [Animated fill]             │ │
│  │              ╰─────────────╯                              │ │
│  │                                                           │ │
│  │  Context Completeness: ████████░░ 85%                     │ │
│  │  Thread Clarity:       █████████░ 90%                     │
│  │  Actionability:        ████████░░ 82%                     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐             │
│  │  ⚖️ PROSECUTOR      │  │  🛡️ DEFENSE         │             │
│  │  What Went Wrong    │  │  Why It Made Sense  │             │
│  │                     │  │                     │             │
│  │  • Memory leak in   │  │  • Rapid prototyping│             │
│  │    agent loop       │  │    required speed   │             │
│  │                     │  │                     │             │
│  │  • Retry logic      │  │  • Auth complexity  │             │
│  │    missing timeout  │  │    not documented   │             │
│  │                     │  │                     │             │
│  │  • No error bounds  │  │  • Time pressure    │             │
│  │    in React tree    │  │    from deadline    │             │
│  │                     │  │                     │             │
│  │  Severity: HIGH     │  │  Context: Valid     │             │
│  └─────────────────────┘  └─────────────────────┘             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  ⚖️ JUDGE SUMMARY                                         │ │
│  │                                                           │ │
│  │  Verdict: Technical debt accumulated under pressure      │ │
│  │                                                           │ │
│  │  Key Insight: The memory leak stems from unclosed        │ │
│  │  promises in the agent's event loop. The retry logic     │ │
│  │  was implemented correctly but lacks exponential         │ │
│  │  backoff and timeout handling.                           │ │
│  │                                                           │ │
│  │  Recommendation: Refactor agent cleanup, add timeout     │ │
│  │  middleware, and implement circuit breaker pattern.      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  🎯 MOST LIKELY NEXT ACTIONS                              │ │
│  │                                                           │ │
│  │  1. Add Promise.race() with timeout in agent loop        │ │
│  │     Confidence: 95%                                       │ │
│  │                                                           │ │
│  │  2. Implement exponential backoff in retry logic         │ │
│  │     Confidence: 88%                                       │ │
│  │                                                           │ │
│  │  3. Add error boundary around agent component            │ │
│  │     Confidence: 82%                                       │ │
│  │                                                           │ │
│  │  4. Write integration tests for auth flow                │ │
│  │     Confidence: 75%                                       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  📊 GIT TIMELINE                                          │ │
│  │                                                           │ │
│  │  ●─────●─────●─────●─────●                               │ │
│  │  │     │     │     │     │                               │ │
│  │  fix   feat  fix   docs  feat                            │ │
│  │  auth  agent bug   api   init                            │ │
│  │                                                           │ │
│  │  [Interactive timeline with commit details on hover]     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Recovery score: Count up animation (1.5s)
- Gauge: Circular fill with gradient (1.2s)
- Metric bars: Fill from left (0.8s, stagger 0.2s)
- Cards: Fade in + slide up (0.6s, stagger 0.15s)
- Text reveals: Character-by-character for key insights (0.05s per char)
- Timeline: Draw line then pop in commits (1s total)
- Hover effects: Scale 1.02 + glow (0.3s)

---

## Component Details

### Glassmorphism Card
```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
backdrop-filter: blur(12px);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
border-radius: 16px;
```

### Gradient Overlays
```css
/* Prosecutor Card */
background: linear-gradient(135deg, 
  rgba(255, 107, 107, 0.1) 0%, 
  rgba(255, 230, 109, 0.05) 100%);

/* Defense Card */
background: linear-gradient(135deg, 
  rgba(78, 205, 196, 0.1) 0%, 
  rgba(68, 160, 141, 0.05) 100%);

/* Judge Card */
background: linear-gradient(135deg, 
  rgba(243, 129, 129, 0.1) 0%, 
  rgba(252, 227, 138, 0.05) 100%);
```

### Button Styles
```css
/* Primary CTA */
background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
box-shadow: 0 0 20px rgba(255, 230, 109, 0.4);
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover */
transform: scale(1.05);
box-shadow: 0 0 30px rgba(255, 230, 109, 0.6);
```

---

## Responsive Breakpoints

### Desktop (1440px+)
- 3-column layout for problem cards
- Side-by-side prosecutor/defense
- Full-width judge summary

### Tablet (768px - 1439px)
- 2-column layout for problem cards
- Stacked prosecutor/defense
- Full-width judge summary

### Mobile (< 768px)
- Single column layout
- Stacked cards
- Simplified timeline
- Collapsible sections

---

## Interaction Patterns

### Hover States
- Cards: Scale 1.02 + subtle glow
- Buttons: Scale 1.05 + enhanced glow
- Timeline commits: Tooltip with details

### Click Actions
- Export button: Dropdown menu (JSON, MD, PDF)
- Share button: Copy link + toast notification
- Next actions: Copy to clipboard on click
- Timeline commits: Expand with full message

### Loading States
- Skeleton screens for cards
- Shimmer effect on placeholders
- Progress indicator for AI processing

---

## Accessibility

- WCAG AA contrast ratios
- Keyboard navigation support
- Screen reader labels
- Focus indicators
- Reduced motion support

---

## Animation Timing Reference

```javascript
const animations = {
  fast: "0.2s",
  normal: "0.4s",
  slow: "0.6s",
  verySlow: "1.2s",
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  stagger: "0.1s - 0.15s"
};
```

---

This design creates a premium, futuristic experience inspired by Arc Browser, Apple Vision Pro, and sci-fi interfaces while maintaining usability and clarity.