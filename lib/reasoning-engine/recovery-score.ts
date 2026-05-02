/**
 * REMEM Recovery Score Engine
 * Deterministic scoring for context completeness, thread clarity, and actionability
 */

import { Signal } from './signal-extraction';
import { CognitiveThread } from './thread-detection';
import { ProsecutorAnalysis } from './prosecutor';
import { DefenseAnalysis } from './defense';
import { JudgeVerdict } from './judge';

export interface RecoveryScore {
  overall: number;
  metrics: RecoveryMetrics;
  breakdown: ScoreBreakdown;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

export interface RecoveryMetrics {
  contextCompleteness: number;
  threadClarity: number;
  actionability: number;
}

export interface ScoreBreakdown {
  contextCompleteness: MetricBreakdown;
  threadClarity: MetricBreakdown;
  actionability: MetricBreakdown;
}

export interface MetricBreakdown {
  score: number;
  factors: ScoringFactor[];
  maxPossible: number;
}

export interface ScoringFactor {
  name: string;
  points: number;
  maxPoints: number;
  weight: number;
}

export interface RecoveryScoreContext {
  signals: Signal[];
  threads: CognitiveThread[];
  prosecutorAnalysis: ProsecutorAnalysis;
  defenseAnalysis: DefenseAnalysis;
  judgeVerdict: JudgeVerdict;
  text: string;
}

/**
 * Calculate comprehensive recovery score
 */
export function calculateRecoveryScore(context: RecoveryScoreContext): RecoveryScore {
  // Calculate individual metrics
  const contextCompleteness = calculateContextCompleteness(context);
  const threadClarity = calculateThreadClarity(context);
  const actionability = calculateActionability(context);

  // Calculate overall score (weighted average)
  const weights = {
    contextCompleteness: 0.35,
    threadClarity: 0.35,
    actionability: 0.30,
  };

  const overall = Math.round(
    (contextCompleteness.score * weights.contextCompleteness) +
    (threadClarity.score * weights.threadClarity) +
    (actionability.score * weights.actionability)
  );

  // Determine grade
  const grade = calculateGrade(overall);

  return {
    overall,
    metrics: {
      contextCompleteness: contextCompleteness.score,
      threadClarity: threadClarity.score,
      actionability: actionability.score,
    },
    breakdown: {
      contextCompleteness,
      threadClarity,
      actionability,
    },
    grade,
  };
}

/**
 * Calculate context completeness score (0-100)
 */
function calculateContextCompleteness(context: RecoveryScoreContext): MetricBreakdown {
  const factors: ScoringFactor[] = [];
  let totalScore = 0;
  const maxPossible = 100;

  // Factor 1: Signal diversity (0-25 points)
  const signalTypes = new Set(context.signals.map(s => s.type));
  const signalDiversityScore = Math.min(25, signalTypes.size * 3);
  factors.push({
    name: 'Signal Diversity',
    points: signalDiversityScore,
    maxPoints: 25,
    weight: 0.25,
  });
  totalScore += signalDiversityScore;

  // Factor 2: Signal quantity (0-20 points)
  const signalQuantityScore = Math.min(20, context.signals.length * 2);
  factors.push({
    name: 'Signal Quantity',
    points: signalQuantityScore,
    maxPoints: 20,
    weight: 0.20,
  });
  totalScore += signalQuantityScore;

  // Factor 3: Evidence strength (0-25 points)
  const evidenceCount = 
    context.prosecutorAnalysis.issues.reduce((sum, i) => sum + i.evidence.length, 0) +
    context.defenseAnalysis.reasons.reduce((sum, r) => sum + r.evidence.length, 0);
  const evidenceScore = Math.min(25, evidenceCount * 2);
  factors.push({
    name: 'Evidence Strength',
    points: evidenceScore,
    maxPoints: 25,
    weight: 0.25,
  });
  totalScore += evidenceScore;

  // Factor 4: Stack trace presence (0-15 points)
  const hasStackTrace = /at\s+.+?:\d+:\d+|File\s+".+?",\s+line\s+\d+/gi.test(context.text);
  const stackTraceScore = hasStackTrace ? 15 : 0;
  factors.push({
    name: 'Stack Trace Presence',
    points: stackTraceScore,
    maxPoints: 15,
    weight: 0.15,
  });
  totalScore += stackTraceScore;

  // Factor 5: File references (0-15 points)
  const fileCount = context.threads.reduce((sum, t) => sum + t.files.length, 0);
  const fileScore = Math.min(15, fileCount * 3);
  factors.push({
    name: 'File References',
    points: fileScore,
    maxPoints: 15,
    weight: 0.15,
  });
  totalScore += fileScore;

  return {
    score: Math.min(100, totalScore),
    factors,
    maxPossible,
  };
}

/**
 * Calculate thread clarity score (0-100)
 */
function calculateThreadClarity(context: RecoveryScoreContext): MetricBreakdown {
  const factors: ScoringFactor[] = [];
  let totalScore = 0;
  const maxPossible = 100;

  // Factor 1: Thread identification (0-30 points)
  const threadScore = context.threads.length > 0 ? 30 : 0;
  factors.push({
    name: 'Thread Identification',
    points: threadScore,
    maxPoints: 30,
    weight: 0.30,
  });
  totalScore += threadScore;

  // Factor 2: Primary thread confidence (0-25 points)
  const primaryThreadConfidence = context.threads.length > 0
    ? Math.round(context.threads[0].confidence * 25)
    : 0;
  factors.push({
    name: 'Primary Thread Confidence',
    points: primaryThreadConfidence,
    maxPoints: 25,
    weight: 0.25,
  });
  totalScore += primaryThreadConfidence;

  // Factor 3: Thread coherence (0-20 points)
  const avgThreadConfidence = context.threads.length > 0
    ? context.threads.reduce((sum, t) => sum + t.confidence, 0) / context.threads.length
    : 0;
  const coherenceScore = Math.round(avgThreadConfidence * 20);
  factors.push({
    name: 'Thread Coherence',
    points: coherenceScore,
    maxPoints: 20,
    weight: 0.20,
  });
  totalScore += coherenceScore;

  // Factor 4: Root cause clarity (0-25 points)
  const rootCauseScore = context.judgeVerdict.rootCauses.length > 0
    ? Math.round(context.judgeVerdict.rootCauses[0].likelihood * 25)
    : 0;
  factors.push({
    name: 'Root Cause Clarity',
    points: rootCauseScore,
    maxPoints: 25,
    weight: 0.25,
  });
  totalScore += rootCauseScore;

  return {
    score: Math.min(100, totalScore),
    factors,
    maxPossible,
  };
}

/**
 * Calculate actionability score (0-100)
 */
function calculateActionability(context: RecoveryScoreContext): MetricBreakdown {
  const factors: ScoringFactor[] = [];
  let totalScore = 0;
  const maxPossible = 100;

  // Factor 1: Next actions identified (0-30 points)
  const actionsScore = Math.min(30, context.judgeVerdict.nextActions.length * 10);
  factors.push({
    name: 'Next Actions Identified',
    points: actionsScore,
    maxPoints: 30,
    weight: 0.30,
  });
  totalScore += actionsScore;

  // Factor 2: Action confidence (0-25 points)
  const actionConfidence = context.judgeVerdict.nextActions.length > 0
    ? Math.round(context.judgeVerdict.nextActions[0].confidence * 25)
    : 0;
  factors.push({
    name: 'Action Confidence',
    points: actionConfidence,
    maxPoints: 25,
    weight: 0.25,
  });
  totalScore += actionConfidence;

  // Factor 3: Recommendation clarity (0-20 points)
  const hasRecommendation = context.judgeVerdict.recommendation.length > 20;
  const recommendationScore = hasRecommendation ? 20 : 10;
  factors.push({
    name: 'Recommendation Clarity',
    points: recommendationScore,
    maxPoints: 20,
    weight: 0.20,
  });
  totalScore += recommendationScore;

  // Factor 4: Synthesis quality (0-25 points)
  const synthesisScore = Math.round(context.judgeVerdict.synthesisScore / 4);
  factors.push({
    name: 'Synthesis Quality',
    points: synthesisScore,
    maxPoints: 25,
    weight: 0.25,
  });
  totalScore += synthesisScore;

  return {
    score: Math.min(100, totalScore),
    factors,
    maxPossible,
  };
}

/**
 * Calculate letter grade from score
 */
function calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

/**
 * Generate score interpretation
 */
export function interpretScore(score: RecoveryScore): string {
  const { overall, grade } = score;

  const interpretations: Record<typeof grade, string> = {
    A: 'Excellent cognitive recovery. Clear debugging direction with high confidence.',
    B: 'Good cognitive recovery. Actionable insights with reasonable confidence.',
    C: 'Moderate cognitive recovery. Some direction available but may need more context.',
    D: 'Limited cognitive recovery. Significant gaps in understanding remain.',
    F: 'Poor cognitive recovery. Insufficient context for meaningful analysis.',
  };

  return interpretations[grade];
}

/**
 * Identify score improvement opportunities
 */
export function identifyImprovements(score: RecoveryScore): string[] {
  const improvements: string[] = [];
  const { breakdown } = score;

  // Check context completeness
  if (breakdown.contextCompleteness.score < 70) {
    const weakFactors = breakdown.contextCompleteness.factors
      .filter(f => f.points < f.maxPoints * 0.7)
      .map(f => f.name);

    if (weakFactors.includes('Signal Diversity')) {
      improvements.push('Include more diverse context: logs, errors, stack traces, and code snippets');
    }
    if (weakFactors.includes('Evidence Strength')) {
      improvements.push('Provide more detailed error messages and debugging output');
    }
    if (weakFactors.includes('Stack Trace Presence')) {
      improvements.push('Include complete stack traces for errors');
    }
    if (weakFactors.includes('File References')) {
      improvements.push('Mention specific files and line numbers being debugged');
    }
  }

  // Check thread clarity
  if (breakdown.threadClarity.score < 70) {
    improvements.push('Provide more context about what you were working on');
    improvements.push('Include recent changes or modifications made to the codebase');
  }

  // Check actionability
  if (breakdown.actionability.score < 70) {
    improvements.push('Describe what you\'ve already tried to fix the issue');
    improvements.push('Include your current hypotheses about the problem');
  }

  return improvements;
}

// Made with Bob