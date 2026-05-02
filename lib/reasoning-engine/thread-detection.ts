/**
 * REMEM Thread Detection Engine
 * Clusters cognitive fragments into coherent debugging threads
 */

import { Signal, SignalType } from './signal-extraction';

export interface CognitiveThread {
  id: string;
  name: string;
  type: ThreadType;
  signals: Signal[];
  files: string[];
  keywords: string[];
  subsystems: string[];
  confidence: number;
  priority: number;
  evidence: ThreadEvidence[];
}

export type ThreadType =
  | 'authentication_lifecycle'
  | 'database_connection'
  | 'deployment_pipeline'
  | 'error_handling'
  | 'performance_optimization'
  | 'state_management'
  | 'network_reliability'
  | 'memory_management'
  | 'race_condition'
  | 'migration'
  | 'refactoring'
  | 'bug_fix'
  | 'feature_development'
  | 'unknown';

export interface ThreadEvidence {
  type: 'file' | 'keyword' | 'signal' | 'temporal' | 'subsystem';
  value: string;
  weight: number;
}

export interface ThreadClusteringResult {
  threads: CognitiveThread[];
  primaryThread?: CognitiveThread;
  threadCount: number;
  averageConfidence: number;
}

/**
 * Subsystem patterns for grouping related signals
 */
const SUBSYSTEM_PATTERNS = {
  authentication: [
    /auth/gi,
    /login/gi,
    /token/gi,
    /jwt/gi,
    /session/gi,
    /oauth/gi,
    /credential/gi,
  ],
  database: [
    /database/gi,
    /db/gi,
    /sql/gi,
    /query/gi,
    /transaction/gi,
    /postgres/gi,
    /mysql/gi,
    /mongodb/gi,
  ],
  network: [
    /network/gi,
    /http/gi,
    /api/gi,
    /request/gi,
    /response/gi,
    /fetch/gi,
    /axios/gi,
  ],
  state: [
    /state/gi,
    /redux/gi,
    /zustand/gi,
    /context/gi,
    /store/gi,
    /cache/gi,
  ],
  deployment: [
    /deploy/gi,
    /build/gi,
    /ci\/cd/gi,
    /pipeline/gi,
    /docker/gi,
    /kubernetes/gi,
  ],
  memory: [
    /memory/gi,
    /heap/gi,
    /garbage/gi,
    /leak/gi,
    /allocation/gi,
  ],
};

/**
 * File patterns for extracting file paths
 */
const FILE_PATTERNS = [
  // Standard file paths
  /(?:^|\s)([a-zA-Z0-9_\-./]+\.[a-zA-Z0-9]+)(?:\s|$|:)/g,
  // Stack trace file paths
  /at\s+.+?\((.+?:\d+:\d+)\)/g,
  // Import/require statements
  /(?:import|require)\s*\(?['"](.+?)['"]/g,
];

/**
 * Extract file paths from text
 */
export function extractFiles(text: string): string[] {
  const files = new Set<string>();

  for (const pattern of FILE_PATTERNS) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const file = match[1];
      if (file && file.length > 0 && file.length < 200) {
        // Clean up file path
        const cleanFile = file.split(':')[0].trim();
        if (cleanFile.includes('.')) {
          files.add(cleanFile);
        }
      }
    }
  }

  return Array.from(files);
}

/**
 * Extract keywords from text (excluding common words)
 */
export function extractKeywords(text: string): string[] {
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
  ]);

  // Extract words (alphanumeric + underscore, 3+ chars)
  const words = text.toLowerCase().match(/\b[a-z_][a-z0-9_]{2,}\b/g) || [];
  
  // Count occurrences
  const wordCounts = new Map<string, number>();
  for (const word of words) {
    if (!commonWords.has(word)) {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  }

  // Return words that appear at least twice, sorted by frequency
  return Array.from(wordCounts.entries())
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 20); // Top 20 keywords
}

/**
 * Detect subsystems mentioned in text
 */
export function detectSubsystems(text: string): string[] {
  const subsystems = new Set<string>();

  for (const [subsystem, patterns] of Object.entries(SUBSYSTEM_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        subsystems.add(subsystem);
        break;
      }
    }
  }

  return Array.from(subsystems);
}

/**
 * Calculate similarity between two sets of strings
 */
function calculateSetSimilarity(set1: string[], set2: string[]): number {
  if (set1.length === 0 || set2.length === 0) return 0;

  const s1 = new Set(set1.map(s => s.toLowerCase()));
  const s2 = new Set(set2.map(s => s.toLowerCase()));

  const intersection = new Set([...s1].filter(x => s2.has(x)));
  const union = new Set([...s1, ...s2]);

  return intersection.size / union.size;
}

/**
 * Infer thread type from signals and context
 */
function inferThreadType(
  signals: Signal[],
  files: string[],
  keywords: string[],
  subsystems: string[]
): ThreadType {
  const signalTypes = signals.map(s => s.type);
  const signalTypeSet = new Set(signalTypes);

  // Authentication thread
  if (subsystems.includes('authentication') || 
      keywords.some(k => /auth|login|token|session/.test(k))) {
    return 'authentication_lifecycle';
  }

  // Database thread
  if (subsystems.includes('database') ||
      signalTypeSet.has('database')) {
    return 'database_connection';
  }

  // Deployment thread
  if (subsystems.includes('deployment') ||
      signalTypeSet.has('deployment_risk') ||
      keywords.some(k => /deploy|build|pipeline/.test(k))) {
    return 'deployment_pipeline';
  }

  // Race condition thread
  if (signalTypeSet.has('race_condition')) {
    return 'race_condition';
  }

  // Memory management thread
  if (subsystems.includes('memory') ||
      signalTypeSet.has('memory_leak')) {
    return 'memory_management';
  }

  // Network reliability thread
  if (subsystems.includes('network') ||
      signalTypeSet.has('timeout') ||
      signalTypeSet.has('retry_loop')) {
    return 'network_reliability';
  }

  // State management thread
  if (subsystems.includes('state') ||
      signalTypeSet.has('state_management')) {
    return 'state_management';
  }

  // Migration thread
  if (keywords.some(k => /migration|migrate/.test(k))) {
    return 'migration';
  }

  // Refactoring thread
  if (keywords.some(k => /refactor|cleanup|technical.*debt/.test(k))) {
    return 'refactoring';
  }

  // Error handling thread
  if (signalTypeSet.has('failure') && signals.length >= 3) {
    return 'error_handling';
  }

  // Bug fix thread
  if (keywords.some(k => /bug|fix|issue/.test(k))) {
    return 'bug_fix';
  }

  // Feature development thread
  if (keywords.some(k => /feature|implement|add/.test(k))) {
    return 'feature_development';
  }

  return 'unknown';
}

/**
 * Generate thread name based on type and context
 */
function generateThreadName(
  type: ThreadType,
  signals: Signal[],
  files: string[],
  keywords: string[]
): string {
  const typeNames: Record<ThreadType, string> = {
    authentication_lifecycle: 'Authentication Lifecycle',
    database_connection: 'Database Connection',
    deployment_pipeline: 'Deployment Pipeline',
    error_handling: 'Error Handling',
    performance_optimization: 'Performance Optimization',
    state_management: 'State Management',
    network_reliability: 'Network Reliability',
    memory_management: 'Memory Management',
    race_condition: 'Race Condition',
    migration: 'Migration',
    refactoring: 'Refactoring',
    bug_fix: 'Bug Fix',
    feature_development: 'Feature Development',
    unknown: 'Unknown Thread',
  };

  let name = typeNames[type];

  // Add specific context if available
  if (files.length > 0) {
    const primaryFile = files[0].split('/').pop() || files[0];
    name += ` (${primaryFile})`;
  } else if (keywords.length > 0) {
    name += ` (${keywords[0]})`;
  }

  return name;
}

/**
 * Cluster signals into cognitive threads
 */
export function clusterThreads(
  signals: Signal[],
  text: string
): ThreadClusteringResult {
  if (signals.length === 0) {
    return {
      threads: [],
      threadCount: 0,
      averageConfidence: 0,
    };
  }

  // Extract global context
  const allFiles = extractFiles(text);
  const allKeywords = extractKeywords(text);
  const allSubsystems = detectSubsystems(text);

  // Group signals by similarity
  const threads: CognitiveThread[] = [];
  const processedSignals = new Set<Signal>();

  for (const signal of signals) {
    if (processedSignals.has(signal)) continue;

    // Start a new thread with this signal
    const threadSignals: Signal[] = [signal];
    processedSignals.add(signal);

    // Extract context from signal
    const signalFiles = extractFiles(signal.content);
    const signalKeywords = extractKeywords(signal.content);

    // Find related signals
    for (const otherSignal of signals) {
      if (processedSignals.has(otherSignal)) continue;

      const otherFiles = extractFiles(otherSignal.content);
      const otherKeywords = extractKeywords(otherSignal.content);

      // Calculate similarity
      const fileSimilarity = calculateSetSimilarity(signalFiles, otherFiles);
      const keywordSimilarity = calculateSetSimilarity(signalKeywords, otherKeywords);
      const typeSimilarity = signal.type === otherSignal.type ? 1 : 0;

      const overallSimilarity = (fileSimilarity * 0.4) + (keywordSimilarity * 0.4) + (typeSimilarity * 0.2);

      // Group if similarity is high enough
      if (overallSimilarity >= 0.3) {
        threadSignals.push(otherSignal);
        processedSignals.add(otherSignal);
      }
    }

    // Build thread
    const threadFiles = Array.from(new Set([
      ...signalFiles,
      ...threadSignals.flatMap(s => extractFiles(s.content)),
    ]));

    const threadKeywords = Array.from(new Set([
      ...signalKeywords,
      ...threadSignals.flatMap(s => extractKeywords(s.content)),
    ]));

    const threadSubsystems = Array.from(new Set([
      ...allSubsystems.filter(sub => 
        threadSignals.some(s => s.content.toLowerCase().includes(sub))
      ),
    ]));

    const threadType = inferThreadType(threadSignals, threadFiles, threadKeywords, threadSubsystems);
    const threadName = generateThreadName(threadType, threadSignals, threadFiles, threadKeywords);

    // Calculate thread confidence
    const avgSignalConfidence = threadSignals.reduce((sum, s) => sum + s.confidence, 0) / threadSignals.length;
    const signalCountBonus = Math.min(0.2, threadSignals.length * 0.05);
    const threadConfidence = Math.min(0.95, avgSignalConfidence + signalCountBonus);

    // Calculate priority based on severity and signal count
    const maxSeverity = Math.max(
      ...threadSignals.map(s => {
        const severityMap = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
        return severityMap[s.severity || 'LOW'];
      })
    );
    const priority = maxSeverity * 10 + threadSignals.length;

    // Build evidence
    const evidence: ThreadEvidence[] = [
      ...threadFiles.map(f => ({ type: 'file' as const, value: f, weight: 0.8 })),
      ...threadKeywords.slice(0, 5).map(k => ({ type: 'keyword' as const, value: k, weight: 0.6 })),
      ...threadSubsystems.map(s => ({ type: 'subsystem' as const, value: s, weight: 0.7 })),
      ...threadSignals.slice(0, 3).map(s => ({ type: 'signal' as const, value: s.type, weight: s.confidence })),
    ];

    threads.push({
      id: `thread-${threads.length + 1}`,
      name: threadName,
      type: threadType,
      signals: threadSignals,
      files: threadFiles,
      keywords: threadKeywords,
      subsystems: threadSubsystems,
      confidence: threadConfidence,
      priority,
      evidence,
    });
  }

  // Sort threads by priority (descending)
  threads.sort((a, b) => b.priority - a.priority);

  // Identify primary thread (highest priority)
  const primaryThread = threads.length > 0 ? threads[0] : undefined;

  // Calculate average confidence
  const averageConfidence = threads.length > 0
    ? threads.reduce((sum, t) => sum + t.confidence, 0) / threads.length
    : 0;

  return {
    threads,
    primaryThread,
    threadCount: threads.length,
    averageConfidence,
  };
}

/**
 * Calculate temporal proximity between signals
 */
export function calculateTemporalProximity(signals: Signal[]): number {
  if (signals.length < 2) return 0;

  // For now, we don't have timestamps on signals
  // This would be enhanced with actual timestamp data
  // Return a heuristic based on signal order in text
  return 0.5;
}

// Made with Bob