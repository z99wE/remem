/**
 * REMEM Reasoning Engine - Example Usage
 * Demonstrates how to use the deterministic reasoning engine
 */

import { runReasoningEngine, formatReasoningResult } from './index';

/**
 * Example 1: Authentication retry loop
 */
const example1 = `
ERROR: Authentication failed
Retrying connection...
ERROR: Authentication failed
Retrying connection...
ERROR: Authentication failed
Retrying connection...
ERROR: Authentication failed
Max retries exceeded

Modified files:
- src/auth/authManager.ts
- src/services/apiClient.ts

TODO: Fix reconnect loop
FIXME: Add exponential backoff
`;

/**
 * Example 2: Database connection issues
 */
const example2 = `
$ npm run dev
Starting server...
ERROR: Connection refused - postgres://localhost:5432
Retrying database connection...
ERROR: Connection timeout
ERROR: Connection pool exhausted

Stack trace:
  at DatabaseClient.connect (src/db/client.ts:45:12)
  at Server.start (src/server.ts:23:8)

Recent changes:
- Migrated to new database schema
- Updated connection pool settings
- Deployed to staging environment

URGENT: Production deployment scheduled for tomorrow
Need to rollback if not fixed by EOD
`;

/**
 * Example 3: Race condition in state management
 */
const example3 = `
BUG: Stale state in user dashboard
Race condition detected in Redux store
Multiple components updating same state simultaneously

Error: Cannot read property 'user' of undefined
  at UserProfile.render (src/components/UserProfile.tsx:67:23)
  at Dashboard.render (src/components/Dashboard.tsx:45:15)

Modified files:
- src/store/userSlice.ts
- src/components/UserProfile.tsx
- src/components/Dashboard.tsx

Context:
- Refactoring state management
- Moving from Context API to Redux
- Demo scheduled for Friday
- Technical debt from legacy code

TODO: Add proper synchronization
TODO: Implement optimistic updates
HACK: Using setTimeout as workaround
`;

/**
 * Example 4: Memory leak in production
 */
const example4 = `
CRITICAL: Memory leak detected in production
OOM crashes every 6 hours
Heap size growing continuously

Error: JavaScript heap out of memory
  at Array.push (native)
  at EventEmitter.addListener (src/events/emitter.ts:89:15)
  at WebSocketManager.connect (src/websocket/manager.ts:123:8)

Monitoring data:
- Memory usage: 2.1GB -> 4.5GB over 4 hours
- Event listeners: 15,000+ registered
- WebSocket connections: 500+ active

Recent deployments:
- Added real-time notifications
- Implemented WebSocket reconnection
- Scaled to 10,000 concurrent users

URGENT: Hotfix needed
Production down
Rollback in progress
`;

/**
 * Run examples
 */
async function runExamples() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('REMEM REASONING ENGINE - EXAMPLES');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');

  // Example 1
  console.log('EXAMPLE 1: Authentication Retry Loop');
  console.log('───────────────────────────────────────────────────────');
  const result1 = await runReasoningEngine(example1);
  console.log(formatReasoningResult(result1));
  console.log('');

  // Example 2
  console.log('EXAMPLE 2: Database Connection Issues');
  console.log('───────────────────────────────────────────────────────');
  const result2 = await runReasoningEngine(example2);
  console.log(formatReasoningResult(result2));
  console.log('');

  // Example 3
  console.log('EXAMPLE 3: Race Condition in State Management');
  console.log('───────────────────────────────────────────────────────');
  const result3 = await runReasoningEngine(example3);
  console.log(formatReasoningResult(result3));
  console.log('');

  // Example 4
  console.log('EXAMPLE 4: Memory Leak in Production');
  console.log('───────────────────────────────────────────────────────');
  const result4 = await runReasoningEngine(example4);
  console.log(formatReasoningResult(result4));
  console.log('');
}

/**
 * Validation tests
 */
async function runValidationTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('REASONING ENGINE VALIDATION TESTS');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');

  const tests = [
    {
      name: 'Signal Extraction',
      input: 'ERROR: Connection timeout\nRetrying...\nERROR: Failed',
      validate: (result: any) => result.signals.signals.length > 0,
    },
    {
      name: 'Thread Detection',
      input: 'auth/manager.ts\nlogin failed\ntoken expired\nretry authentication',
      validate: (result: any) => result.threads.threads.length > 0,
    },
    {
      name: 'Prosecutor Analysis',
      input: 'ERROR: retry loop\nno backoff\nmax retries exceeded',
      validate: (result: any) => result.prosecutor.issues.length > 0,
    },
    {
      name: 'Defense Analysis',
      input: 'hotfix deployed\nurgent production issue\ndeadline pressure',
      validate: (result: any) => result.defense.reasons.length > 0,
    },
    {
      name: 'Judge Synthesis',
      input: 'ERROR: critical bug\nhotfix needed\nrollback planned',
      validate: (result: any) => result.judge.rootCauses.length > 0,
    },
    {
      name: 'Recovery Score',
      input: 'ERROR at file.ts:45\nstack trace\nTODO: fix\nretry logic',
      validate: (result: any) => result.recoveryScore.overall > 0,
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await runReasoningEngine(test.input);
      const isValid = test.validate(result);

      if (isValid) {
        console.log(`✓ ${test.name}: PASSED`);
        passed++;
      } else {
        console.log(`✗ ${test.name}: FAILED (validation failed)`);
        failed++;
      }
    } catch (error) {
      console.log(`✗ ${test.name}: FAILED (${error})`);
      failed++;
    }
  }

  console.log('');
  console.log('───────────────────────────────────────────────────────');
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('═══════════════════════════════════════════════════════');
}

/**
 * Performance benchmark
 */
async function runBenchmark() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('REASONING ENGINE PERFORMANCE BENCHMARK');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');

  const testCases = [
    { name: 'Small input (100 chars)', text: 'ERROR: test\n'.repeat(10) },
    { name: 'Medium input (1000 chars)', text: 'ERROR: test\nRetrying...\n'.repeat(50) },
    { name: 'Large input (5000 chars)', text: 'ERROR: test\nStack trace\nRetrying...\n'.repeat(150) },
  ];

  for (const testCase of testCases) {
    const iterations = 10;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const result = await runReasoningEngine(testCase.text);
      times.push(result.processingTime);
    }

    const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    console.log(`${testCase.name}:`);
    console.log(`  Average: ${avgTime.toFixed(2)}ms`);
    console.log(`  Min: ${minTime}ms | Max: ${maxTime}ms`);
    console.log('');
  }

  console.log('═══════════════════════════════════════════════════════');
}

/**
 * Main execution
 */
if (require.main === module) {
  (async () => {
    // Run examples
    await runExamples();

    // Run validation tests
    await runValidationTests();

    // Run benchmark
    await runBenchmark();
  })();
}

export {
  runExamples,
  runValidationTests,
  runBenchmark,
  example1,
  example2,
  example3,
  example4,
};

// Made with Bob