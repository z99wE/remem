## recon_cases/

The `recon_cases/` directory contains realistic synthetic engineering interruption scenarios used to validate REMEM’s cognitive reconstruction engine.

Each case simulates fragmented developer context collected during high-pressure debugging sessions, including:
- terminal logs
- stack traces
- TODOs
- AI prompts
- coding notes
- modified files
- partial architectural reasoning

These scenarios are designed to demonstrate how REMEM restores engineering continuity by reconstructing:
- active thought threads
- debugging intent
- architectural context
- recovery actions
- cognitive state

Included scenarios:
- AI Agent Memory Leak
- Auth Retry Bug
- Deployment Rollback Confusion
- Legacy Payment Fear Zone
- Monolith Migration Trauma
- WebSocket Chaos

These files are static validation assets only and are not executed by the application runtime.