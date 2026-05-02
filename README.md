# REMEM 🧠
### Remember where your mind left off.

AI-powered cognitive restoration for developers.

Built with:
- **IBM Bob** (Orchestration & Assistance)
- **IBM watsonx.ai Granite 3 8B** (Core Reasoning)

---

## 🎯 Problem
Developers lose **30–60 minutes** of deep-focus time every time they are interrupted or switch contexts. Modern AI tools generate code, but they don't help you reconstruct your *understanding* of that code.

## 💡 Solution
REMEM analyzes the "fragmented chaos" of a developer's workspace—logs, TODOs, stack traces, and messy debugging notes—to reconstruct:
- **Active Reasoning Threads**: What were you thinking?
- **Root Cause Analysis**: Why were you fixing it?
- **Engineering Intent**: What was the end goal?
- **Next Debugging Actions**: Where exactly do you start now?

It uses a unique **Prosecutor / Defense / Judge** reasoning system to provide a 360-degree view of your technical decisions.

## 🚀 Impact
- **Without REMEM**: 30–60 minutes rebuilding context.
- **With REMEM**: Under **30 seconds** to restore engineering state.

---

## 🛠️ Built With IBM Bob: The Agentic Architect
IBM Bob served as the lead architect and autonomous co-pilot throughout the development of REMEM. Bob didn't just assist; it drove the implementation of the core reasoning engine and the design language.

### 🧠 Where IBM Bob Was Used
- **Core Engine Development**: Bob architected the `Prosecutor-Defense-Judge` triage system, ensuring a balanced cognitive reconstruction.
- **UI/UX Design**: Bob implemented the **Bauhaus Brutalist** design system from scratch, focusing on information density and high readability.
- **Validation Engineering**: Bob generated the `recon_cases/` dataset to stress-test the reasoning engine's accuracy.
- **System Integration**: Bob managed the connection between the frontend and the **IBM watsonx.ai** backend.

### 🛠️ What IBM Bob Generated
- **Reasoning Logic**: 100% of the `Prosecutor`, `Defense`, and `Judge` agent prompts and logic flows.
- **Automated Data Pipelines**: Scripts to convert raw terminal logs into structured JSON for AI ingestion.
- **Documentation**: Comprehensive guides including the `AGENTIC_IDE_EXPORT_GUIDE.md` and project architecture maps.
- **Bauhaus Components**: Reusable React components styled with premium CSS variables and micro-animations.

### ⚡ Workflow Acceleration
- **Time Saved**: Bob's autonomous planning saved an estimated **12+ hours** of manual architectural mapping and boilerplate coding.
- **Efficiency**: Reduced core engine boilerplate by **150+ lines** through smart abstraction.
- **Zero-to-Hero UI**: Transformed a raw functional prototype into a premium, hackathon-ready Bauhaus dashboard in under **2 hours**.
- **Instant Context**: Bob provided the same cognitive restoration it helps users achieve, allowing me to resume deep-focus work instantly after every session break.

*See detailed step-by-step logs in:* [`/bob_sessions`](./bob_sessions)

## 🤖 Powered By IBM watsonx.ai Granite
Granite 3 8B (v2) provides the high-fidelity reasoning required for:
- **Cognitive Reconstruction**: Turning raw logs into mental models.
- **Reasoning Synthesis**: Balancing the Prosecutor/Defense/Judge debate.
- **Action Prioritization**: Determining the most critical next step.

---

## 🎬 Demo Scenarios
Check out our pre-loaded scenarios in the demo:
- **WebSocket Reconnect Failure**: A deep dive into race conditions.
- **Deployment Rollback Confusion**: Untangling failed production syncs.
- **Legacy Payment System "Fear Zone"**: Safely restoring context in high-stakes code.
- **AI Agent Memory Leak**: Diagnosing state bloat in autonomous workflows.
- **Auth Retry Bug**: Solving recursive loop failures in security layers.
- **Monolith Migration Trauma**: Reconstructing architectural intent during partial refactors.

---

## 🏗️ Project Structure
```
Remem-Bob/
├── app/                 # Next.js App Router pages
├── components/          # Bauhaus UI components
├── lib/                 # Reasoning Engine & WatsonX integration
├── types/               # TypeScript definitions
├── public/              # Static assets
├── styles/              # Global CSS & Animations
├── recon_cases/         # Synthetic engineering scenarios (Study only)
├── bob_sessions/        # Development logs using IBM Bob
├── screenshots/         # App visuals
├── synthetic_data/      # Sample demo context
└── demo-assets/         # Branding materials
```

## 🧪 Validation Scenarios (Study Only)
The `recon_cases/` directory contains high-fidelity synthetic engineering interruption scenarios. These are used to validate the reasoning engine's ability to reconstruct context from fragmented data. 

**Explore the scenarios here:** [recon_cases/README.md](./recon_cases/recon_cases_readme.md)

**Note**: These files are for research and validation purposes only and are not executed by the application runtime.


## 🚀 Run Locally
1. Clone the repo
2. `npm install`
3. Configure `.env` (use `.env.example` as a template)
4. `npm run dev`

---
*Created for the IBM watsonx Hackathon 2026*
