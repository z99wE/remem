# REMEM Reasoning Engine

A deterministic, non-AI cognitive reconstruction system for debugging and engineering continuity.

## Overview

The REMEM Reasoning Engine is a **forensic cognition system** that uses:

- ✅ **Heuristics** - Pattern-based signal detection
- ✅ **Rule Systems** - Deterministic failure analysis
- ✅ **Signal Extraction** - Structured evidence gathering
- ✅ **Weighted Scoring** - Quantifiable confidence metrics
- ✅ **Thread Clustering** - Cognitive context grouping
- ✅ **Explainable Logic** - Transparent reasoning chains

**NOT** relying on:
- ❌ AI hallucination
- ❌ Random outputs
- ❌ Vague analysis
- ❌ Black-box reasoning

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    REASONING ENGINE                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   SIGNAL     │───▶│   THREAD     │───▶│  PROSECUTOR  │  │
│  │ EXTRACTION   │    │  DETECTION   │    │   ENGINE     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                    │                    │          │
│         │                    │                    │          │
│         ▼                    ▼                    ▼          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   DEFENSE    │◀───│    JUDGE     │───▶│   RECOVERY   │  │
│  │   ENGINE     │    │   ENGINE     │    │    SCORE     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. Signal Extraction (`signal-extraction.ts`)

Extracts engineering signals using regex and heuristics:

**Signal Types:**
- `failure` - Errors, exceptions, crashes
- `urgency` - Hotfixes, rollbacks, deadlines
- `retry_loop` - Retry patterns, reconnection attempts
- `timeout` - Connection timeouts, deadline exceeded
- `race_condition` - Concurrency issues
- `memory_leak` - Resource exhaustion
- `architecture` - Migrations, refactoring
- `deployment_risk` - Deployment activities
- `authentication` - Auth failures
- `database` - DB connection issues
- `network` - Network problems
- `state_management` - State synchronization

**Features:**
- Pattern matching with confidence scores
- Stack trace parsing
- Temporal pattern detection
- Evidence extraction

### 2. Thread Detection (`thread-detection.ts`)

Clusters signals into coherent debugging threads:

**Thread Types:**
- `authentication_lifecycle`
- `database_connection`
- `deployment_pipeline`
- `error_handling`
- `performance_optimization`
- `state_management`
- `network_reliability`
- `memory_management`
- `race_condition`
- `migration`

**Clustering Logic:**
- File similarity (40% weight)
- Keyword similarity (40% weight)
- Signal type similarity (20% weight)
- Subsystem grouping

### 3. Prosecutor Engine (`prosecutor.ts`)

Identifies engineering failures using deterministic rules:

**Rule Categories:**
- `retry_risk` - Retry loops without backoff
- `error_handling` - Missing error boundaries
- `race_condition` - Synchronization issues
- `resource_leak` - Memory/connection leaks
- `architectural_weakness` - Design limitations
- `deployment_risk` - Unsafe deployments
- `technical_debt` - Accumulated debt
- `missing_safeguard` - Missing protections
- `security_concern` - Security vulnerabilities

**Example Rules:**
```typescript
// Rule: Retry loop without backoff
IF: retry signals detected
AND: no backoff pattern found
THEN: flag "Retry Storm Risk" (HIGH severity)
```

### 4. Defense Engine (`defense.ts`)

Infers engineering tradeoffs and constraints:

**Defense Categories:**
- `deployment_pressure` - Time-critical deployments
- `hotfix_urgency` - Production emergencies
- `legacy_constraints` - Legacy system limitations
- `migration_complexity` - Migration challenges
- `scaling_pressure` - Performance demands
- `demo_deadline` - Demo/presentation pressure
- `compatibility_concern` - Backward compatibility
- `resource_limitation` - Budget/infrastructure limits

**Tradeoff Detection:**
- Speed vs Stability
- Compatibility vs Clean Architecture
- Feature Delivery vs Technical Debt
- Scalability vs Simplicity

### 5. Judge Engine (`judge.ts`)

Synthesizes prosecutor and defense into root cause analysis:

**Outputs:**
- Root causes with likelihood scores
- Prioritized debugging actions
- Primary thread identification
- Verdict and key insights
- Actionable recommendations

**Synthesis Logic:**
```
Root Cause Likelihood = 
  Prosecutor Confidence × (1 - Defense Confidence × 0.5)
```

### 6. Recovery Score (`recovery-score.ts`)

Calculates deterministic recovery quality scores:

**Metrics (0-100):**

1. **Context Completeness** (35% weight)
   - Signal diversity (25 points)
   - Signal quantity (20 points)
   - Evidence strength (25 points)
   - Stack trace presence (15 points)
   - File references (15 points)

2. **Thread Clarity** (35% weight)
   - Thread identification (30 points)
   - Primary thread confidence (25 points)
   - Thread coherence (20 points)
   - Root cause clarity (25 points)

3. **Actionability** (30% weight)
   - Next actions identified (30 points)
   - Action confidence (25 points)
   - Recommendation clarity (20 points)
   - Synthesis quality (25 points)

**Grading:**
- A: 90-100 (Excellent recovery)
- B: 80-89 (Good recovery)
- C: 70-79 (Moderate recovery)
- D: 60-69 (Limited recovery)
- F: 0-59 (Poor recovery)

## Usage

### Basic Usage

```typescript
import { runReasoningEngine } from '@/lib/reasoning-engine';

const text = `
ERROR: Connection timeout
Retrying connection...
ERROR: Max retries exceeded

Modified files:
- src/auth/authManager.ts

TODO: Add exponential backoff
`;

const result = await runReasoningEngine(text);

console.log(`Recovery Score: ${result.recoveryScore.overall}/100`);
console.log(`Verdict: ${result.judge.verdict}`);
console.log(`Recommendation: ${result.judge.recommendation}`);
```

### Formatted Output

```typescript
import { runReasoningEngine, formatReasoningResult } from '@/lib/reasoning-engine';

const result = await runReasoningEngine(text);
console.log(formatReasoningResult(result));
```

### Individual Components

```typescript
import {
  extractSignals,
  clusterThreads,
  runProsecutorAnalysis,
  runDefenseAnalysis,
  runJudgeSynthesis,
  calculateRecoveryScore,
} from '@/lib/reasoning-engine';

// Extract signals
const signals = extractSignals(text);

// Cluster threads
const threads = clusterThreads(signals.signals, text);

// Run prosecutor
const prosecutor = runProsecutorAnalysis({
  signals: signals.signals,
  threads: threads.threads,
  text,
});

// And so on...
```

## Examples

See `example.ts` for complete examples:

1. **Authentication Retry Loop** - Retry storm detection
2. **Database Connection Issues** - Connection pool exhaustion
3. **Race Condition** - State management concurrency
4. **Memory Leak** - Resource leak in production

Run examples:
```bash
npx ts-node src/lib/reasoning-engine/example.ts
```

## Testing

### Validation Tests

```typescript
import { runValidationTests } from '@/lib/reasoning-engine/example';
await runValidationTests();
```

### Performance Benchmark

```typescript
import { runBenchmark } from '@/lib/reasoning-engine/example';
await runBenchmark();
```

## Design Principles

### 1. Deterministic
Every output is reproducible. Same input → Same output.

### 2. Explainable
Every decision has a clear rule or heuristic behind it.

### 3. Weighted
Confidence scores are calculated using explicit formulas.

### 4. Modular
Each component can be used independently.

### 5. Enterprise-Grade
Production-ready with error handling and performance optimization.

## Performance

Typical processing times:
- Small input (100 chars): ~5-10ms
- Medium input (1000 chars): ~15-25ms
- Large input (5000 chars): ~40-60ms

## Integration with REMEM

The reasoning engine can work:

1. **Standalone** - Pure deterministic analysis
2. **Hybrid** - Combined with AI for enhanced insights
3. **Fallback** - When AI is unavailable or unreliable

### Hybrid Mode

```typescript
// Use reasoning engine first
const deterministicResult = await runReasoningEngine(text);

// Enhance with AI if needed
if (deterministicResult.recoveryScore.overall < 70) {
  const aiResult = await enhanceWithAI(text, deterministicResult);
  return mergeResults(deterministicResult, aiResult);
}

return deterministicResult;
```

## Future Enhancements

- [ ] Machine learning for pattern refinement (while keeping explainability)
- [ ] Custom rule definitions via configuration
- [ ] Real-time streaming analysis
- [ ] Multi-language support (Python, Java, etc.)
- [ ] Integration with IDE debugging tools
- [ ] Historical pattern learning
- [ ] Team-specific heuristic tuning

## Philosophy

> "This should feel like a forensic engineering engine, not an AI wrapper."

The reasoning engine embodies:
- **Transparency** over black-box magic
- **Reliability** over impressive but inconsistent results
- **Explainability** over complex neural networks
- **Determinism** over probabilistic guessing

## License

Made with Bob 🤖

---

**Version:** 1.0.0  
**Last Updated:** 2026-05-02