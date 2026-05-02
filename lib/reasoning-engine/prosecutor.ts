/**
 * REMEM Prosecutor Engine
 * Deterministic failure analysis using rule-based reasoning
 */

import { Signal, StackTraceInfo, TemporalPattern } from './signal-extraction';
import { CognitiveThread } from './thread-detection';

export interface ProsecutorAnalysis {
  issues: ProsecutorIssue[];
  overallSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  riskScore: number;
  failurePatterns: FailurePattern[];
}

export interface ProsecutorIssue {
  title: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  evidence: string[];
  category: IssueCategory;
  ruleId: string;
}

export type IssueCategory =
  | 'architectural_weakness'
  | 'missing_safeguard'
  | 'technical_debt'
  | 'retry_risk'
  | 'race_condition'
  | 'resource_leak'
  | 'error_handling'
  | 'security_concern'
  | 'performance_issue'
  | 'deployment_risk';

export interface FailurePattern {
  pattern: string;
  occurrences: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
}

export interface ProsecutorRule {
  id: string;
  name: string;
  category: IssueCategory;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  condition: (context: ProsecutorContext) => boolean;
  generateIssue: (context: ProsecutorContext) => ProsecutorIssue;
}

export interface ProsecutorContext {
  signals: Signal[];
  threads: CognitiveThread[];
  stackTrace?: StackTraceInfo;
  temporalPatterns: TemporalPattern[];
  text: string;
}

/**
 * Prosecutor Rules - Deterministic failure detection
 */
const PROSECUTOR_RULES: ProsecutorRule[] = [
  // Rule 1: Retry loop without backoff
  {
    id: 'RETRY_NO_BACKOFF',
    name: 'Retry Loop Without Backoff',
    category: 'retry_risk',
    severity: 'HIGH',
    condition: (ctx) => {
      const hasRetry = ctx.signals.some(s => s.type === 'retry_loop');
      const hasBackoff = /backoff|exponential|delay/gi.test(ctx.text);
      return hasRetry && !hasBackoff;
    },
    generateIssue: (ctx) => ({
      title: 'Retry Loop Without Backoff Detected',
      description: 'System is retrying operations without exponential backoff, risking reconnect storms and service degradation.',
      severity: 'HIGH',
      confidence: 0.85,
      evidence: ctx.signals
        .filter(s => s.type === 'retry_loop')
        .map(s => s.content)
        .slice(0, 3),
      category: 'retry_risk',
      ruleId: 'RETRY_NO_BACKOFF',
    }),
  },

  // Rule 2: Multiple critical errors
  {
    id: 'MULTIPLE_CRITICAL_ERRORS',
    name: 'Multiple Critical Errors',
    category: 'error_handling',
    severity: 'CRITICAL',
    condition: (ctx) => {
      const criticalSignals = ctx.signals.filter(s => s.severity === 'CRITICAL');
      return criticalSignals.length >= 3;
    },
    generateIssue: (ctx) => {
      const criticalSignals = ctx.signals.filter(s => s.severity === 'CRITICAL');
      return {
        title: 'Multiple Critical Errors Detected',
        description: `System experiencing ${criticalSignals.length} critical errors, indicating systemic failure or cascading issues.`,
        severity: 'CRITICAL',
        confidence: 0.95,
        evidence: criticalSignals.map(s => s.content).slice(0, 3),
        category: 'error_handling',
        ruleId: 'MULTIPLE_CRITICAL_ERRORS',
      };
    },
  },

  // Rule 3: Race condition indicators
  {
    id: 'RACE_CONDITION_DETECTED',
    name: 'Race Condition Detected',
    category: 'race_condition',
    severity: 'HIGH',
    condition: (ctx) => {
      return ctx.signals.some(s => s.type === 'race_condition');
    },
    generateIssue: (ctx) => ({
      title: 'Race Condition Detected',
      description: 'Concurrent access patterns detected without proper synchronization, risking data corruption and inconsistent state.',
      severity: 'HIGH',
      confidence: 0.8,
      evidence: ctx.signals
        .filter(s => s.type === 'race_condition')
        .map(s => s.content)
        .slice(0, 3),
      category: 'race_condition',
      ruleId: 'RACE_CONDITION_DETECTED',
    }),
  },

  // Rule 4: Memory leak indicators
  {
    id: 'MEMORY_LEAK_RISK',
    name: 'Memory Leak Risk',
    category: 'resource_leak',
    severity: 'CRITICAL',
    condition: (ctx) => {
      return ctx.signals.some(s => s.type === 'memory_leak');
    },
    generateIssue: (ctx) => ({
      title: 'Memory Leak Detected',
      description: 'Memory consumption patterns indicate potential leak, risking OOM crashes and service instability.',
      severity: 'CRITICAL',
      confidence: 0.9,
      evidence: ctx.signals
        .filter(s => s.type === 'memory_leak')
        .map(s => s.content)
        .slice(0, 3),
      category: 'resource_leak',
      ruleId: 'MEMORY_LEAK_RISK',
    }),
  },

  // Rule 5: Timeout without retry strategy
  {
    id: 'TIMEOUT_NO_STRATEGY',
    name: 'Timeout Without Retry Strategy',
    category: 'error_handling',
    severity: 'MEDIUM',
    condition: (ctx) => {
      const hasTimeout = ctx.signals.some(s => s.type === 'timeout');
      const hasRetryStrategy = /retry|fallback|circuit.*breaker/gi.test(ctx.text);
      return hasTimeout && !hasRetryStrategy;
    },
    generateIssue: (ctx) => ({
      title: 'Timeout Without Retry Strategy',
      description: 'Timeouts occurring without documented retry or fallback strategy, risking user-facing failures.',
      severity: 'MEDIUM',
      confidence: 0.75,
      evidence: ctx.signals
        .filter(s => s.type === 'timeout')
        .map(s => s.content)
        .slice(0, 3),
      category: 'error_handling',
      ruleId: 'TIMEOUT_NO_STRATEGY',
    }),
  },

  // Rule 6: Authentication failures
  {
    id: 'AUTH_FAILURE_PATTERN',
    name: 'Authentication Failure Pattern',
    category: 'security_concern',
    severity: 'HIGH',
    condition: (ctx) => {
      const authSignals = ctx.signals.filter(s => s.type === 'authentication');
      const failureSignals = ctx.signals.filter(s => s.type === 'failure');
      return authSignals.length >= 2 && failureSignals.length >= 2;
    },
    generateIssue: (ctx) => ({
      title: 'Authentication Failure Pattern',
      description: 'Multiple authentication failures detected, potentially indicating token expiry, session issues, or security problems.',
      severity: 'HIGH',
      confidence: 0.8,
      evidence: [
        ...ctx.signals.filter(s => s.type === 'authentication').map(s => s.content),
        ...ctx.signals.filter(s => s.type === 'failure').map(s => s.content),
      ].slice(0, 3),
      category: 'security_concern',
      ruleId: 'AUTH_FAILURE_PATTERN',
    }),
  },

  // Rule 7: Database connection issues
  {
    id: 'DB_CONNECTION_INSTABILITY',
    name: 'Database Connection Instability',
    category: 'architectural_weakness',
    severity: 'HIGH',
    condition: (ctx) => {
      const dbSignals = ctx.signals.filter(s => s.type === 'database');
      const hasConnectionIssue = /connection.*(?:refused|reset|timeout|pool)/gi.test(ctx.text);
      return dbSignals.length >= 2 && hasConnectionIssue;
    },
    generateIssue: (ctx) => ({
      title: 'Database Connection Instability',
      description: 'Database connection issues detected, potentially indicating connection pool exhaustion or network problems.',
      severity: 'HIGH',
      confidence: 0.85,
      evidence: ctx.signals
        .filter(s => s.type === 'database')
        .map(s => s.content)
        .slice(0, 3),
      category: 'architectural_weakness',
      ruleId: 'DB_CONNECTION_INSTABILITY',
    }),
  },

  // Rule 8: Deployment without rollback plan
  {
    id: 'DEPLOYMENT_NO_ROLLBACK',
    name: 'Deployment Without Rollback Plan',
    category: 'deployment_risk',
    severity: 'MEDIUM',
    condition: (ctx) => {
      const hasDeployment = ctx.signals.some(s => s.type === 'deployment_risk');
      const hasRollback = /rollback|revert|backup/gi.test(ctx.text);
      return hasDeployment && !hasRollback;
    },
    generateIssue: (ctx) => ({
      title: 'Deployment Without Rollback Plan',
      description: 'Deployment activity detected without clear rollback strategy, increasing risk of prolonged outages.',
      severity: 'MEDIUM',
      confidence: 0.7,
      evidence: ctx.signals
        .filter(s => s.type === 'deployment_risk')
        .map(s => s.content)
        .slice(0, 3),
      category: 'deployment_risk',
      ruleId: 'DEPLOYMENT_NO_ROLLBACK',
    }),
  },

  // Rule 9: Stale state issues
  {
    id: 'STALE_STATE_DETECTED',
    name: 'Stale State Detected',
    category: 'architectural_weakness',
    severity: 'MEDIUM',
    condition: (ctx) => {
      return /stale.*state|cache.*invalid|outdated.*data/gi.test(ctx.text);
    },
    generateIssue: (ctx) => ({
      title: 'Stale State Detected',
      description: 'State synchronization issues detected, potentially causing inconsistent user experience or data corruption.',
      severity: 'MEDIUM',
      confidence: 0.75,
      evidence: ctx.text.match(/stale.*state|cache.*invalid|outdated.*data/gi)?.slice(0, 3) || [],
      category: 'architectural_weakness',
      ruleId: 'STALE_STATE_DETECTED',
    }),
  },

  // Rule 10: Missing error boundaries
  {
    id: 'MISSING_ERROR_BOUNDARIES',
    name: 'Missing Error Boundaries',
    category: 'missing_safeguard',
    severity: 'MEDIUM',
    condition: (ctx) => {
      const hasErrors = ctx.signals.filter(s => s.type === 'failure').length >= 3;
      const hasErrorHandling = /try.*catch|error.*boundary|error.*handler/gi.test(ctx.text);
      return hasErrors && !hasErrorHandling;
    },
    generateIssue: (ctx) => ({
      title: 'Missing Error Boundaries',
      description: 'Multiple errors detected without evidence of error boundaries or comprehensive error handling.',
      severity: 'MEDIUM',
      confidence: 0.7,
      evidence: ctx.signals
        .filter(s => s.type === 'failure')
        .map(s => s.content)
        .slice(0, 3),
      category: 'missing_safeguard',
      ruleId: 'MISSING_ERROR_BOUNDARIES',
    }),
  },

  // Rule 11: Technical debt accumulation
  {
    id: 'TECHNICAL_DEBT_ACCUMULATION',
    name: 'Technical Debt Accumulation',
    category: 'technical_debt',
    severity: 'LOW',
    condition: (ctx) => {
      const debtIndicators = ctx.text.match(/TODO|FIXME|HACK|XXX|technical.*debt/gi);
      return (debtIndicators?.length || 0) >= 5;
    },
    generateIssue: (ctx) => {
      const debtIndicators = ctx.text.match(/TODO|FIXME|HACK|XXX|technical.*debt/gi) || [];
      return {
        title: 'Technical Debt Accumulation',
        description: `${debtIndicators.length} technical debt markers detected, indicating deferred maintenance and potential future issues.`,
        severity: 'LOW',
        confidence: 0.8,
        evidence: debtIndicators.slice(0, 5),
        category: 'technical_debt',
        ruleId: 'TECHNICAL_DEBT_ACCUMULATION',
      };
    },
  },

  // Rule 12: Network instability
  {
    id: 'NETWORK_INSTABILITY',
    name: 'Network Instability',
    category: 'architectural_weakness',
    severity: 'HIGH',
    condition: (ctx) => {
      const networkSignals = ctx.signals.filter(s => s.type === 'network');
      const timeoutSignals = ctx.signals.filter(s => s.type === 'timeout');
      return networkSignals.length + timeoutSignals.length >= 4;
    },
    generateIssue: (ctx) => {
      const relevantSignals = ctx.signals.filter(s => 
        s.type === 'network' || s.type === 'timeout'
      );
      return {
        title: 'Network Instability Detected',
        description: 'Multiple network-related issues detected, indicating connectivity problems or service degradation.',
        severity: 'HIGH',
        confidence: 0.85,
        evidence: relevantSignals.map(s => s.content).slice(0, 3),
        category: 'architectural_weakness',
        ruleId: 'NETWORK_INSTABILITY',
      };
    },
  },
];

/**
 * Run prosecutor analysis
 */
export function runProsecutorAnalysis(context: ProsecutorContext): ProsecutorAnalysis {
  const issues: ProsecutorIssue[] = [];

  // Apply all rules
  for (const rule of PROSECUTOR_RULES) {
    try {
      if (rule.condition(context)) {
        const issue = rule.generateIssue(context);
        issues.push(issue);
      }
    } catch (error) {
      console.error(`Error applying prosecutor rule ${rule.id}:`, error);
    }
  }

  // Detect failure patterns
  const failurePatterns = detectFailurePatterns(context);

  // Calculate overall severity
  const overallSeverity = calculateOverallSeverity(issues);

  // Calculate confidence (average of all issue confidences)
  const confidence = issues.length > 0
    ? issues.reduce((sum, i) => sum + i.confidence, 0) / issues.length
    : 0;

  // Calculate risk score (0-100)
  const riskScore = calculateRiskScore(issues, failurePatterns);

  return {
    issues,
    overallSeverity,
    confidence,
    riskScore,
    failurePatterns,
  };
}

/**
 * Calculate overall severity from issues
 */
function calculateOverallSeverity(issues: ProsecutorIssue[]): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  if (issues.length === 0) return 'LOW';

  const severityScores = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
  };

  const maxSeverity = Math.max(...issues.map(i => severityScores[i.severity]));

  if (maxSeverity >= 4) return 'CRITICAL';
  if (maxSeverity >= 3) return 'HIGH';
  if (maxSeverity >= 2) return 'MEDIUM';
  return 'LOW';
}

/**
 * Calculate risk score (0-100)
 */
function calculateRiskScore(issues: ProsecutorIssue[], patterns: FailurePattern[]): number {
  const severityWeights = {
    LOW: 10,
    MEDIUM: 25,
    HIGH: 50,
    CRITICAL: 100,
  };

  // Base score from issues
  const issueScore = issues.reduce((sum, issue) => {
    return sum + (severityWeights[issue.severity] * issue.confidence);
  }, 0);

  // Pattern multiplier
  const patternMultiplier = 1 + (patterns.length * 0.1);

  // Calculate final score (capped at 100)
  const rawScore = issueScore * patternMultiplier;
  return Math.min(100, Math.round(rawScore / 10));
}

/**
 * Detect failure patterns
 */
function detectFailurePatterns(context: ProsecutorContext): FailurePattern[] {
  const patterns: FailurePattern[] = [];

  // Pattern 1: Cascading failures
  const failureSignals = context.signals.filter(s => s.type === 'failure');
  if (failureSignals.length >= 5) {
    patterns.push({
      pattern: 'Cascading Failures',
      occurrences: failureSignals.length,
      severity: 'CRITICAL',
      description: 'Multiple failures detected in sequence, indicating cascading system degradation.',
    });
  }

  // Pattern 2: Retry storms
  const retryPattern = context.temporalPatterns.find(p => p.type === 'retry_loop');
  if (retryPattern && retryPattern.occurrences >= 5) {
    patterns.push({
      pattern: 'Retry Storm',
      occurrences: retryPattern.occurrences,
      severity: 'HIGH',
      description: 'Excessive retry attempts detected, potentially overwhelming downstream services.',
    });
  }

  // Pattern 3: Resource exhaustion
  const resourceSignals = context.signals.filter(s => 
    s.type === 'memory_leak' || s.content.toLowerCase().includes('exhausted')
  );
  if (resourceSignals.length >= 2) {
    patterns.push({
      pattern: 'Resource Exhaustion',
      occurrences: resourceSignals.length,
      severity: 'CRITICAL',
      description: 'System resources being exhausted, risking complete service failure.',
    });
  }

  return patterns;
}

// Made with Bob