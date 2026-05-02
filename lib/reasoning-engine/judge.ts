/**
 * REMEM Judge Engine
 * Root cause synthesis and debugging direction prioritization
 */

import { ProsecutorAnalysis, ProsecutorIssue } from './prosecutor';
import { DefenseAnalysis, DefenseReason, EngineeringTradeoff } from './defense';
import { CognitiveThread } from './thread-detection';

export interface JudgeVerdict {
  verdict: string;
  keyInsight: string;
  recommendation: string;
  confidence: number;
  primaryThread?: CognitiveThread;
  rootCauses: RootCause[];
  nextActions: PrioritizedAction[];
  synthesisScore: number;
}

export interface RootCause {
  cause: string;
  likelihood: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidence: string[];
  relatedIssues: string[];
  relatedReasons: string[];
}

export interface PrioritizedAction {
  action: string;
  priority: number;
  confidence: number;
  rationale: string;
  estimatedImpact: 'LOW' | 'MEDIUM' | 'HIGH';
  dependencies: string[];
}

export interface JudgeContext {
  prosecutorAnalysis: ProsecutorAnalysis;
  defenseAnalysis: DefenseAnalysis;
  threads: CognitiveThread[];
  text: string;
}

/**
 * Run judge synthesis
 */
export function runJudgeSynthesis(context: JudgeContext): JudgeVerdict {
  // Identify root causes
  const rootCauses = identifyRootCauses(context);

  // Prioritize debugging actions
  const nextActions = prioritizeActions(context, rootCauses);

  // Select primary thread
  const primaryThread = selectPrimaryThread(context);

  // Generate verdict
  const verdict = generateVerdict(context, rootCauses);

  // Generate key insight
  const keyInsight = generateKeyInsight(context, rootCauses);

  // Generate recommendation
  const recommendation = generateRecommendation(context, nextActions);

  // Calculate confidence
  const confidence = calculateJudgeConfidence(context);

  // Calculate synthesis score
  const synthesisScore = calculateSynthesisScore(context, rootCauses, nextActions);

  return {
    verdict,
    keyInsight,
    recommendation,
    confidence,
    primaryThread,
    rootCauses,
    nextActions,
    synthesisScore,
  };
}

/**
 * Identify root causes by synthesizing prosecutor and defense
 */
function identifyRootCauses(context: JudgeContext): RootCause[] {
  const rootCauses: RootCause[] = [];
  const { prosecutorAnalysis, defenseAnalysis } = context;

  // Group issues by category
  const issuesByCategory = new Map<string, ProsecutorIssue[]>();
  for (const issue of prosecutorAnalysis.issues) {
    const existing = issuesByCategory.get(issue.category) || [];
    existing.push(issue);
    issuesByCategory.set(issue.category, existing);
  }

  // Analyze each category
  for (const [category, issues] of issuesByCategory) {
    // Find related defense reasons
    const relatedReasons = defenseAnalysis.reasons.filter(r => 
      isRelatedToIssueCategory(r, category)
    );

    // Calculate likelihood based on prosecutor confidence and defense context
    const prosecutorConfidence = issues.reduce((sum, i) => sum + i.confidence, 0) / issues.length;
    const defenseConfidence = relatedReasons.length > 0
      ? relatedReasons.reduce((sum, r) => sum + r.confidence, 0) / relatedReasons.length
      : 0;

    // Likelihood is high if prosecutor is confident and defense is weak
    const likelihood = Math.min(0.95, prosecutorConfidence * (1 - defenseConfidence * 0.5));

    // Determine severity (use highest from issues)
    const severity = issues.reduce((max, issue) => {
      const severityMap = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
      const currentSeverity = severityMap[issue.severity];
      const maxSeverity = severityMap[max];
      return currentSeverity > maxSeverity ? issue.severity : max;
    }, 'LOW' as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL');

    // Generate root cause description
    const cause = generateRootCauseDescription(category, issues, relatedReasons);

    // Collect evidence
    const evidence = [
      ...issues.flatMap(i => i.evidence),
      ...relatedReasons.flatMap(r => r.evidence),
    ].slice(0, 5);

    rootCauses.push({
      cause,
      likelihood,
      severity,
      evidence,
      relatedIssues: issues.map(i => i.title),
      relatedReasons: relatedReasons.map(r => r.title),
    });
  }

  // Sort by likelihood * severity
  const severityWeights = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
  rootCauses.sort((a, b) => {
    const scoreA = a.likelihood * severityWeights[a.severity];
    const scoreB = b.likelihood * severityWeights[b.severity];
    return scoreB - scoreA;
  });

  return rootCauses.slice(0, 5); // Top 5 root causes
}

/**
 * Check if defense reason is related to issue category
 */
function isRelatedToIssueCategory(reason: DefenseReason, issueCategory: string): boolean {
  const relationMap: Record<string, string[]> = {
    retry_risk: ['hotfix_urgency', 'deployment_pressure', 'time_constraint'],
    error_handling: ['hotfix_urgency', 'legacy_constraints', 'technical_limitation'],
    race_condition: ['scaling_pressure', 'migration_complexity'],
    resource_leak: ['scaling_pressure', 'resource_limitation'],
    architectural_weakness: ['legacy_constraints', 'migration_complexity', 'technical_limitation'],
    deployment_risk: ['deployment_pressure', 'demo_deadline'],
    technical_debt: ['time_constraint', 'demo_deadline', 'resource_limitation'],
  };

  const relatedCategories = relationMap[issueCategory] || [];
  return relatedCategories.includes(reason.category);
}

/**
 * Generate root cause description
 */
function generateRootCauseDescription(
  category: string,
  issues: ProsecutorIssue[],
  reasons: DefenseReason[]
): string {
  const categoryDescriptions: Record<string, string> = {
    retry_risk: 'Retry mechanism lacking proper backoff strategy',
    error_handling: 'Insufficient error handling and recovery mechanisms',
    race_condition: 'Concurrent access without proper synchronization',
    resource_leak: 'Resource management issues causing memory or connection leaks',
    architectural_weakness: 'Architectural limitations constraining system reliability',
    deployment_risk: 'Deployment process lacking adequate safety measures',
    technical_debt: 'Accumulated technical debt impacting maintainability',
    missing_safeguard: 'Critical safeguards missing from system design',
    security_concern: 'Security vulnerabilities requiring immediate attention',
    performance_issue: 'Performance bottlenecks affecting user experience',
  };

  let description = categoryDescriptions[category] || 'System issue requiring investigation';

  // Add context from defense if available
  if (reasons.length > 0) {
    const primaryReason = reasons[0];
    description += ` (Context: ${primaryReason.category.replace(/_/g, ' ')})`;
  }

  return description;
}

/**
 * Prioritize debugging actions
 */
function prioritizeActions(context: JudgeContext, rootCauses: RootCause[]): PrioritizedAction[] {
  const actions: PrioritizedAction[] = [];

  // Generate actions for each root cause
  for (const rootCause of rootCauses) {
    const causeActions = generateActionsForRootCause(rootCause, context);
    actions.push(...causeActions);
  }

  // Add general actions based on threads
  if (context.threads.length > 0) {
    const primaryThread = context.threads[0];
    actions.push({
      action: `Investigate ${primaryThread.name}`,
      priority: 5,
      confidence: primaryThread.confidence,
      rationale: `Primary active thread with ${primaryThread.signals.length} related signals`,
      estimatedImpact: 'HIGH',
      dependencies: [],
    });
  }

  // Sort by priority (descending) and confidence (descending)
  actions.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return b.confidence - a.confidence;
  });

  // Assign final priorities
  actions.forEach((action, index) => {
    action.priority = index + 1;
  });

  return actions.slice(0, 5); // Top 5 actions
}

/**
 * Generate actions for a specific root cause
 */
function generateActionsForRootCause(rootCause: RootCause, context: JudgeContext): PrioritizedAction[] {
  const actions: PrioritizedAction[] = [];
  const severityWeights = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
  const basePriority = severityWeights[rootCause.severity] * 2;

  // Action templates based on root cause patterns
  if (rootCause.cause.includes('retry') || rootCause.cause.includes('backoff')) {
    actions.push({
      action: 'Implement exponential backoff in retry logic',
      priority: basePriority,
      confidence: rootCause.likelihood,
      rationale: 'Prevent retry storms and service degradation',
      estimatedImpact: 'HIGH',
      dependencies: ['Identify all retry locations', 'Test backoff strategy'],
    });
  }

  if (rootCause.cause.includes('error handling') || rootCause.cause.includes('recovery')) {
    actions.push({
      action: 'Add comprehensive error boundaries and fallback mechanisms',
      priority: basePriority,
      confidence: rootCause.likelihood,
      rationale: 'Improve system resilience and user experience',
      estimatedImpact: 'MEDIUM',
      dependencies: ['Map error propagation paths', 'Define fallback strategies'],
    });
  }

  if (rootCause.cause.includes('race condition') || rootCause.cause.includes('synchronization')) {
    actions.push({
      action: 'Add proper synchronization primitives (locks, mutexes)',
      priority: basePriority,
      confidence: rootCause.likelihood,
      rationale: 'Prevent data corruption and inconsistent state',
      estimatedImpact: 'HIGH',
      dependencies: ['Identify critical sections', 'Review concurrency patterns'],
    });
  }

  if (rootCause.cause.includes('memory') || rootCause.cause.includes('leak')) {
    actions.push({
      action: 'Profile memory usage and fix resource leaks',
      priority: basePriority,
      confidence: rootCause.likelihood,
      rationale: 'Prevent OOM crashes and service instability',
      estimatedImpact: 'HIGH',
      dependencies: ['Run memory profiler', 'Audit resource cleanup'],
    });
  }

  if (rootCause.cause.includes('deployment') || rootCause.cause.includes('rollback')) {
    actions.push({
      action: 'Establish rollback procedures and deployment safeguards',
      priority: basePriority,
      confidence: rootCause.likelihood,
      rationale: 'Reduce deployment risk and enable quick recovery',
      estimatedImpact: 'MEDIUM',
      dependencies: ['Document rollback steps', 'Test rollback process'],
    });
  }

  return actions;
}

/**
 * Select primary thread
 */
function selectPrimaryThread(context: JudgeContext): CognitiveThread | undefined {
  if (context.threads.length === 0) return undefined;

  // Primary thread is the one with highest priority
  return context.threads[0];
}

/**
 * Generate verdict
 */
function generateVerdict(context: JudgeContext, rootCauses: RootCause[]): string {
  const { prosecutorAnalysis, defenseAnalysis } = context;

  if (rootCauses.length === 0) {
    return 'Insufficient evidence for definitive analysis. More context needed.';
  }

  const primaryCause = rootCauses[0];
  const hasValidDefense = defenseAnalysis.overallContext === 'Valid';

  if (hasValidDefense) {
    return `${primaryCause.cause} - justified by ${defenseAnalysis.reasons[0]?.category.replace(/_/g, ' ') || 'operational constraints'}, but requires attention.`;
  } else if (defenseAnalysis.overallContext === 'Questionable') {
    return `${primaryCause.cause} - partially justified but represents significant technical risk.`;
  } else {
    return `${primaryCause.cause} - critical issue requiring immediate remediation.`;
  }
}

/**
 * Generate key insight
 */
function generateKeyInsight(context: JudgeContext, rootCauses: RootCause[]): string {
  const { prosecutorAnalysis, defenseAnalysis } = context;

  if (rootCauses.length === 0) {
    return 'Unable to extract clear debugging direction from available context.';
  }

  const primaryCause = rootCauses[0];
  const tradeoffs = defenseAnalysis.tradeoffs;

  if (tradeoffs.length > 0) {
    const primaryTradeoff = tradeoffs[0];
    return `System prioritized ${primaryTradeoff.chosen} over ${primaryTradeoff.sacrificed}, resulting in ${primaryCause.cause.toLowerCase()}.`;
  }

  if (prosecutorAnalysis.failurePatterns.length > 0) {
    const pattern = prosecutorAnalysis.failurePatterns[0];
    return `${pattern.pattern} detected with ${pattern.occurrences} occurrences, indicating ${primaryCause.cause.toLowerCase()}.`;
  }

  return `Primary issue: ${primaryCause.cause} with ${Math.round(primaryCause.likelihood * 100)}% likelihood.`;
}

/**
 * Generate recommendation
 */
function generateRecommendation(context: JudgeContext, actions: PrioritizedAction[]): string {
  if (actions.length === 0) {
    return 'Gather more context about the system state and recent changes.';
  }

  const primaryAction = actions[0];
  const secondaryAction = actions[1];

  let recommendation = `Start with: ${primaryAction.action}.`;

  if (secondaryAction) {
    recommendation += ` Then: ${secondaryAction.action}.`;
  }

  // Add urgency based on severity
  const hasCriticalIssues = context.prosecutorAnalysis.overallSeverity === 'CRITICAL';
  if (hasCriticalIssues) {
    recommendation += ' URGENT: Critical issues detected requiring immediate attention.';
  }

  return recommendation;
}

/**
 * Calculate judge confidence
 */
function calculateJudgeConfidence(context: JudgeContext): number {
  const { prosecutorAnalysis, defenseAnalysis, threads } = context;

  // Factors affecting confidence
  const prosecutorConfidence = prosecutorAnalysis.confidence;
  const defenseConfidence = defenseAnalysis.confidence;
  const threadConfidence = threads.length > 0 ? threads[0].confidence : 0;

  // Weighted average
  const weights = {
    prosecutor: 0.4,
    defense: 0.3,
    thread: 0.3,
  };

  const confidence = 
    (prosecutorConfidence * weights.prosecutor) +
    (defenseConfidence * weights.defense) +
    (threadConfidence * weights.thread);

  return Math.min(0.95, confidence);
}

/**
 * Calculate synthesis score (0-100)
 */
function calculateSynthesisScore(
  context: JudgeContext,
  rootCauses: RootCause[],
  actions: PrioritizedAction[]
): number {
  // Factors:
  // 1. Root cause clarity (0-30 points)
  const rootCauseScore = rootCauses.length > 0
    ? Math.min(30, rootCauses[0].likelihood * 30)
    : 0;

  // 2. Action clarity (0-30 points)
  const actionScore = actions.length > 0
    ? Math.min(30, actions[0].confidence * 30)
    : 0;

  // 3. Thread coherence (0-20 points)
  const threadScore = context.threads.length > 0
    ? Math.min(20, context.threads[0].confidence * 20)
    : 0;

  // 4. Evidence strength (0-20 points)
  const evidenceScore = Math.min(20, 
    (context.prosecutorAnalysis.issues.length + context.defenseAnalysis.reasons.length) * 2
  );

  return Math.round(rootCauseScore + actionScore + threadScore + evidenceScore);
}

// Made with Bob
