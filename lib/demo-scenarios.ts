export interface Scenario {
  id: string;
  title: string;
  description: string;
  inputContent: string;
  output: {
    prosecutor: string[];
    defense: string[];
    judge: {
      verdict: string;
      recommendation: string;
    };
    activeThreads: string[];
    nextActions: string[];
    recoveryScore: number;
  };
}

export const scenarios: Scenario[] = [
  {
    id: 'websocket-reconnect',
    title: 'WebSocket Reconnect Failure',
    description: 'Auth reconnect loops causing production instability.',
    inputContent: `[ERROR] WebSocket reconnect failed after token refresh
[WARN] stale auth state detected in reconnect manager
TODO: investigate duplicate refresh requests
TODO: add exponential backoff
Prompt: could reconnect happen before auth resolves?

Stack trace:
  src/lib/socket/reconnect.ts:84
  src/lib/auth/refresh.ts:122

Terminal:
  Retrying websocket connection...
  Retrying websocket connection...
  Retrying websocket connection...

Note:
  Might be race condition between auth refresh and socket reconnect

Modified files:
  - reconnect.ts
  - authManager.ts
  - refresh.ts`,
    output: {
      prosecutor: [
        'stale auth state',
        'missing reconnect guards',
        'infinite retry loop',
        'poor error handling'
      ],
      defense: [
        'deployment pressure',
        'fast patch before demo',
        'auth assumptions seemed valid',
        'websocket complexity'
      ],
      judge: {
        verdict: 'reconnect loop caused by token refresh race condition',
        recommendation: 'make auth refresh idempotent and gate reconnect timing'
      },
      activeThreads: [
        'reconnect instability',
        'token refresh sequencing',
        'retry explosion'
      ],
      nextActions: [
        'add reconnect backoff',
        'gate reconnect after auth resolution',
        'improve socket logging'
      ],
      recoveryScore: 87
    }
  },
  {
    id: 'legacy-payment',
    title: 'Legacy Payment System Fear Zone',
    description: 'Nobody understands billingEngine.ts anymore.',
    inputContent: `TODO:
  Do NOT touch billingEngine.ts before release

Prompt:
  Why does partial refund trigger duplicate ledger writes?

Slack note:
  Only Ravi understands invoice reconciliation flow

Error:
  invoice settlement mismatch detected

Stack trace:
  billingEngine.ts:982
  ledgerSync.ts:311

Terminal:
  Running nightly settlement sync...
  Settlement divergence detected

Modified files:
  - billingEngine.ts
  - refundFlow.ts
  - invoiceSync.ts

Notes:
  Fear of breaking reconciliation logic
  No documentation exists
  Architecture drift over 4 years`,
    output: {
      prosecutor: [
        'undocumented legacy architecture',
        'dangerous implicit dependencies',
        'unclear reconciliation flow',
        'billing logic entropy'
      ],
      defense: [
        'legacy constraints',
        'historical patches',
        'business continuity pressure',
        'financial system caution'
      ],
      judge: {
        verdict: 'system complexity is organizational, not just technical',
        recommendation: 'create reconciliation map before modifying settlement flow'
      },
      activeThreads: [
        'invoice mismatch',
        'refund duplication',
        'undocumented dependencies'
      ],
      nextActions: [
        'map billing architecture',
        'isolate refund flow',
        'create reconciliation logging'
      ],
      recoveryScore: 81
    }
  },
  {
    id: 'deployment-rollback',
    title: 'Deployment Rollback Confusion',
    description: 'CI/CD rollback failure causing release paralysis.',
    inputContent: `[ERROR] rollback deployment failed

TODO:
  confirm which environment contains hotfix

Prompt:
  Did staging accidentally deploy production env vars?

Terminal:
  Rolling back release...
  Rollback failed
  Rebuilding containers...

Slack:
  Who merged hotfix-v2-final-final?

Stack trace:
  deployPipeline.ts:203
  rollbackManager.ts:91

Modified files:
  - deploy.yml
  - rollback.ts
  - envLoader.ts

Notes:
  No one knows current deployment state`,
    output: {
      prosecutor: [
        'environment confusion',
        'unsafe deployment practices',
        'rollback inconsistency',
        'undocumented hotfixes'
      ],
      defense: [
        'emergency production fixes',
        'time pressure',
        'CI/CD complexity',
        'fragmented ownership'
      ],
      judge: {
        verdict: 'deployment state became operationally ambiguous',
        recommendation: 'introduce deployment snapshots and environment verification'
      },
      activeThreads: [
        'rollback mismatch',
        'env variable confusion',
        'release inconsistency'
      ],
      nextActions: [
        'add deployment snapshots',
        'validate environments before release',
        'improve rollback observability'
      ],
      recoveryScore: 84
    }
  }
];

// Made with Bob
