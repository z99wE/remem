/**
 * REMEM Reasoning Engine
 * Main integration point for deterministic cognitive reconstruction
 */

import {
  extractSignals,
  extractStackTrace,
  detectTemporalPatterns,
  SignalExtractionResult,
  StackTraceInfo,
  TemporalPattern,
} from './signal-extraction';

import {
  clusterThreads,
  ThreadClusteringResult,
} from './thread-detection';

import {
  runProsecutorAnalysis,
  ProsecutorAnalysis,
  ProsecutorContext,
} from './prosecutor';

import {
  runDefenseAnalysis,
  DefenseAnalysis,
  DefenseContext,
} from './defense';

import {
  runJudgeSynthesis,
  JudgeVerdict,
  JudgeContext,
} from './judge';

import {
  calculateRecoveryScore,
  interpretScore,
  identifyImprovements,
  RecoveryScore,
  RecoveryScoreContext,
} from './recovery-score';

/**
 * Complete reasoning engine result
 */
export interface ReasoningEngineResult {
  // Signal extraction
  signals: SignalExtractionResult;
  stackTrace: StackTraceInfo;
  temporalPatterns: TemporalPattern[];

  // Thread detection
  threads: ThreadClusteringResult;

  // Prosecutor analysis
  prosecutor: ProsecutorAnalysis;

  // Defense analysis
  defense: DefenseAnalysis;

  // Judge verdict
  judge: JudgeVerdict;

  // Recovery score
  recoveryScore: RecoveryScore;
  scoreInterpretation: string;
  improvements: string[];

  // Metadata
  processingTime: number;
  engineVersion: string;
}

/**
 * Run complete reasoning engine analysis
 */
export async function runReasoningEngine(text: string): Promise<ReasoningEngineResult> {
  const startTime = Date.now();

  // Step 1: Extract signals
  const signalExtraction = extractSignals(text);
  const stackTrace = extractStackTrace(text);
  const temporalPatterns = detectTemporalPatterns(text);

  // Step 2: Cluster threads
  const threadClustering = clusterThreads(signalExtraction.signals, text);

  // Step 3: Run prosecutor analysis
  const prosecutorContext: ProsecutorContext = {
    signals: signalExtraction.signals,
    threads: threadClustering.threads,
    stackTrace,
    temporalPatterns,
    text,
  };
  const prosecutorAnalysis = runProsecutorAnalysis(prosecutorContext);

  // Step 4: Run defense analysis
  const defenseContext: DefenseContext = {
    signals: signalExtraction.signals,
    threads: threadClustering.threads,
    prosecutorIssues: prosecutorAnalysis.issues,
    text,
  };
  const defenseAnalysis = runDefenseAnalysis(defenseContext);

  // Step 5: Run judge synthesis
  const judgeContext: JudgeContext = {
    prosecutorAnalysis,
    defenseAnalysis,
    threads: threadClustering.threads,
    text,
  };
  const judgeVerdict = runJudgeSynthesis(judgeContext);

  // Step 6: Calculate recovery score
  const recoveryScoreContext: RecoveryScoreContext = {
    signals: signalExtraction.signals,
    threads: threadClustering.threads,
    prosecutorAnalysis,
    defenseAnalysis,
    judgeVerdict,
    text,
  };
  const recoveryScore = calculateRecoveryScore(recoveryScoreContext);
  const scoreInterpretation = interpretScore(recoveryScore);
  const improvements = identifyImprovements(recoveryScore);

  const processingTime = Date.now() - startTime;

  return {
    signals: signalExtraction,
    stackTrace,
    temporalPatterns,
    threads: threadClustering,
    prosecutor: prosecutorAnalysis,
    defense: defenseAnalysis,
    judge: judgeVerdict,
    recoveryScore,
    scoreInterpretation,
    improvements,
    processingTime,
    engineVersion: '1.0.0',
  };
}

/**
 * Format reasoning engine result for display
 */
export function formatReasoningResult(result: ReasoningEngineResult): string {
  const lines: string[] = [];

  lines.push('═══════════════════════════════════════════════════════');
  lines.push('REMEM REASONING ENGINE ANALYSIS');
  lines.push('═══════════════════════════════════════════════════════');
  lines.push('');

  // Recovery Score
  lines.push(`RECOVERY SCORE: ${result.recoveryScore.overall}/100 (Grade: ${result.recoveryScore.grade})`);
  lines.push(`${result.scoreInterpretation}`);
  lines.push('');

  // Metrics
  lines.push('METRICS:');
  lines.push(`  Context Completeness: ${result.recoveryScore.metrics.contextCompleteness}/100`);
  lines.push(`  Thread Clarity: ${result.recoveryScore.metrics.threadClarity}/100`);
  lines.push(`  Actionability: ${result.recoveryScore.metrics.actionability}/100`);
  lines.push('');

  // Judge Verdict
  lines.push('JUDGE VERDICT:');
  lines.push(`  ${result.judge.verdict}`);
  lines.push('');
  lines.push('KEY INSIGHT:');
  lines.push(`  ${result.judge.keyInsight}`);
  lines.push('');
  lines.push('RECOMMENDATION:');
  lines.push(`  ${result.judge.recommendation}`);
  lines.push('');

  // Root Causes
  if (result.judge.rootCauses.length > 0) {
    lines.push('ROOT CAUSES:');
    result.judge.rootCauses.forEach((cause, index) => {
      lines.push(`  ${index + 1}. ${cause.cause}`);
      lines.push(`     Likelihood: ${Math.round(cause.likelihood * 100)}% | Severity: ${cause.severity}`);
    });
    lines.push('');
  }

  // Next Actions
  if (result.judge.nextActions.length > 0) {
    lines.push('NEXT ACTIONS:');
    result.judge.nextActions.forEach((action, index) => {
      lines.push(`  ${index + 1}. ${action.action}`);
      lines.push(`     Confidence: ${Math.round(action.confidence * 100)}% | Impact: ${action.estimatedImpact}`);
    });
    lines.push('');
  }

  // Threads
  if (result.threads.threads.length > 0) {
    lines.push('ACTIVE THREADS:');
    result.threads.threads.forEach((thread, index) => {
      lines.push(`  ${index + 1}. ${thread.name}`);
      lines.push(`     Type: ${thread.type} | Confidence: ${Math.round(thread.confidence * 100)}%`);
      lines.push(`     Signals: ${thread.signals.length} | Files: ${thread.files.length}`);
    });
    lines.push('');
  }

  // Prosecutor Issues
  if (result.prosecutor.issues.length > 0) {
    lines.push('PROSECUTOR ISSUES:');
    result.prosecutor.issues.forEach((issue, index) => {
      lines.push(`  ${index + 1}. ${issue.title} [${issue.severity}]`);
      lines.push(`     ${issue.description}`);
    });
    lines.push('');
  }

  // Defense Reasons
  if (result.defense.reasons.length > 0) {
    lines.push('DEFENSE REASONING:');
    result.defense.reasons.forEach((reason, index) => {
      lines.push(`  ${index + 1}. ${reason.title}`);
      lines.push(`     ${reason.description}`);
    });
    lines.push('');
  }

  // Improvements
  if (result.improvements.length > 0) {
    lines.push('IMPROVEMENT SUGGESTIONS:');
    result.improvements.forEach((improvement, index) => {
      lines.push(`  ${index + 1}. ${improvement}`);
    });
    lines.push('');
  }

  // Metadata
  lines.push('───────────────────────────────────────────────────────');
  lines.push(`Processing Time: ${result.processingTime}ms | Engine Version: ${result.engineVersion}`);
  lines.push(`Signals: ${result.signals.signals.length} | Threads: ${result.threads.threadCount}`);
  lines.push('═══════════════════════════════════════════════════════');

  return lines.join('\n');
}

/**
 * Export all types and functions
 */
export * from './signal-extraction';
export * from './thread-detection';
export * from './prosecutor';
export * from './defense';
export * from './judge';
export * from './recovery-score';

// Made with Bob