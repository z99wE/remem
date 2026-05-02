/**
 * REMEM Signal Extraction Engine
 * Deterministic signal detection using heuristics and pattern matching
 */

export interface Signal {
  type: SignalType;
  content: string;
  confidence: number;
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  metadata?: Record<string, any>;
}

export type SignalType =
  | 'failure'
  | 'urgency'
  | 'architecture'
  | 'intent'
  | 'dependency'
  | 'retry_loop'
  | 'deployment_risk'
  | 'race_condition'
  | 'memory_leak'
  | 'timeout'
  | 'authentication'
  | 'database'
  | 'network'
  | 'state_management';

export interface SignalExtractionResult {
  signals: Signal[];
  signalsByType: Map<SignalType, Signal[]>;
  totalConfidence: number;
}

/**
 * Signal patterns with weighted confidence scores
 */
const SIGNAL_PATTERNS = {
  failure: [
    { pattern: /\bERROR\b/gi, weight: 0.9, severity: 'HIGH' as const },
    { pattern: /\bFAILED\b/gi, weight: 0.85, severity: 'HIGH' as const },
    { pattern: /\bexception\b/gi, weight: 0.8, severity: 'MEDIUM' as const },
    { pattern: /\bcrash(ed|ing)?\b/gi, weight: 0.9, severity: 'CRITICAL' as const },
    { pattern: /\bfatal\b/gi, weight: 0.95, severity: 'CRITICAL' as const },
    { pattern: /\bpanic\b/gi, weight: 0.9, severity: 'CRITICAL' as const },
    { pattern: /\bsegfault\b/gi, weight: 0.95, severity: 'CRITICAL' as const },
  ],
  urgency: [
    { pattern: /\bhotfix\b/gi, weight: 0.9, severity: 'HIGH' as const },
    { pattern: /\brollback\b/gi, weight: 0.85, severity: 'HIGH' as const },
    { pattern: /\bproduction\s+down\b/gi, weight: 0.95, severity: 'CRITICAL' as const },
    { pattern: /\bASAP\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\burgent\b/gi, weight: 0.75, severity: 'HIGH' as const },
    { pattern: /\bcritical\s+bug\b/gi, weight: 0.9, severity: 'CRITICAL' as const },
    { pattern: /\bdeadline\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bdemo\b/gi, weight: 0.5, severity: 'MEDIUM' as const },
  ],
  retry_loop: [
    { pattern: /\bretry\b/gi, weight: 0.8, severity: 'MEDIUM' as const },
    { pattern: /\breconnect(ing)?\b/gi, weight: 0.85, severity: 'MEDIUM' as const },
    { pattern: /\bbackoff\b/gi, weight: 0.7, severity: 'LOW' as const },
    { pattern: /\bretrying\s+\d+\s+times?\b/gi, weight: 0.9, severity: 'HIGH' as const },
    { pattern: /\bmax\s+retries\s+exceeded\b/gi, weight: 0.95, severity: 'HIGH' as const },
    { pattern: /\binfinite\s+loop\b/gi, weight: 0.9, severity: 'CRITICAL' as const },
    { pattern: /\bretry\s+storm\b/gi, weight: 0.95, severity: 'CRITICAL' as const },
  ],
  timeout: [
    { pattern: /\btimeout\b/gi, weight: 0.85, severity: 'MEDIUM' as const },
    { pattern: /\btimed?\s+out\b/gi, weight: 0.85, severity: 'MEDIUM' as const },
    { pattern: /\bconnection\s+timeout\b/gi, weight: 0.9, severity: 'HIGH' as const },
    { pattern: /\brequest\s+timeout\b/gi, weight: 0.85, severity: 'MEDIUM' as const },
    { pattern: /\bdeadline\s+exceeded\b/gi, weight: 0.9, severity: 'HIGH' as const },
  ],
  race_condition: [
    { pattern: /\brace\s+condition\b/gi, weight: 0.9, severity: 'HIGH' as const },
    { pattern: /\bconcurrency\s+issue\b/gi, weight: 0.85, severity: 'HIGH' as const },
    { pattern: /\bdeadlock\b/gi, weight: 0.95, severity: 'CRITICAL' as const },
    { pattern: /\bmutex\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bsemaphore\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\batomic\b/gi, weight: 0.5, severity: 'LOW' as const },
  ],
  memory_leak: [
    { pattern: /\bmemory\s+leak\b/gi, weight: 0.95, severity: 'CRITICAL' as const },
    { pattern: /\bOOM\b/gi, weight: 0.9, severity: 'CRITICAL' as const },
    { pattern: /\bout\s+of\s+memory\b/gi, weight: 0.95, severity: 'CRITICAL' as const },
    { pattern: /\bheap\s+overflow\b/gi, weight: 0.9, severity: 'CRITICAL' as const },
    { pattern: /\bmemory\s+exhausted\b/gi, weight: 0.9, severity: 'CRITICAL' as const },
  ],
  architecture: [
    { pattern: /\bmigration\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\brefactor(ing)?\b/gi, weight: 0.6, severity: 'LOW' as const },
    { pattern: /\barchitecture\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\bdesign\s+pattern\b/gi, weight: 0.6, severity: 'LOW' as const },
    { pattern: /\blegacy\s+code\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\btechnical\s+debt\b/gi, weight: 0.75, severity: 'MEDIUM' as const },
    { pattern: /\bmonolith\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bmicroservice\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
  ],
  deployment_risk: [
    { pattern: /\bdeploy(ment|ing)?\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\brollback\b/gi, weight: 0.85, severity: 'HIGH' as const },
    { pattern: /\bcanary\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bblue[- ]green\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bproduction\b/gi, weight: 0.75, severity: 'HIGH' as const },
    { pattern: /\bstaging\b/gi, weight: 0.5, severity: 'LOW' as const },
  ],
  authentication: [
    { pattern: /\bauth(entication)?\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\blogin\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\btoken\b/gi, weight: 0.65, severity: 'MEDIUM' as const },
    { pattern: /\bJWT\b/g, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\bsession\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bunauthorized\b/gi, weight: 0.8, severity: 'HIGH' as const },
    { pattern: /\bforbidden\b/gi, weight: 0.75, severity: 'HIGH' as const },
  ],
  database: [
    { pattern: /\bdatabase\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\bSQL\b/g, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bquery\b/gi, weight: 0.5, severity: 'LOW' as const },
    { pattern: /\btransaction\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bconnection\s+pool\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\bdeadlock\b/gi, weight: 0.9, severity: 'HIGH' as const },
  ],
  network: [
    { pattern: /\bnetwork\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\bHTTP\b/g, weight: 0.5, severity: 'LOW' as const },
    { pattern: /\bAPI\b/g, weight: 0.5, severity: 'LOW' as const },
    { pattern: /\bconnection\s+refused\b/gi, weight: 0.85, severity: 'HIGH' as const },
    { pattern: /\bconnection\s+reset\b/gi, weight: 0.8, severity: 'HIGH' as const },
    { pattern: /\b5\d{2}\b/g, weight: 0.7, severity: 'MEDIUM' as const }, // 5xx errors
  ],
  state_management: [
    { pattern: /\bstate\b/gi, weight: 0.5, severity: 'LOW' as const },
    { pattern: /\bstale\s+state\b/gi, weight: 0.8, severity: 'MEDIUM' as const },
    { pattern: /\bcache\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\binvalidate\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bRedux\b/g, weight: 0.5, severity: 'LOW' as const },
    { pattern: /\bZustand\b/g, weight: 0.5, severity: 'LOW' as const },
  ],
  intent: [
    { pattern: /\bTODO\b/g, weight: 0.7, severity: 'LOW' as const },
    { pattern: /\bFIXME\b/g, weight: 0.8, severity: 'MEDIUM' as const },
    { pattern: /\bHACK\b/g, weight: 0.75, severity: 'MEDIUM' as const },
    { pattern: /\bWIP\b/g, weight: 0.6, severity: 'LOW' as const },
    { pattern: /\bneed\s+to\b/gi, weight: 0.6, severity: 'LOW' as const },
    { pattern: /\bshould\b/gi, weight: 0.5, severity: 'LOW' as const },
  ],
  dependency: [
    { pattern: /\bdependency\b/gi, weight: 0.6, severity: 'MEDIUM' as const },
    { pattern: /\bpackage\b/gi, weight: 0.5, severity: 'LOW' as const },
    { pattern: /\bversion\s+conflict\b/gi, weight: 0.8, severity: 'HIGH' as const },
    { pattern: /\bpeer\s+dependency\b/gi, weight: 0.7, severity: 'MEDIUM' as const },
    { pattern: /\bnpm\s+install\b/gi, weight: 0.5, severity: 'LOW' as const },
  ],
};

/**
 * Extract signals from text using pattern matching
 */
export function extractSignals(text: string): SignalExtractionResult {
  const signals: Signal[] = [];
  const signalsByType = new Map<SignalType, Signal[]>();

  // Process each signal type
  for (const [signalType, patterns] of Object.entries(SIGNAL_PATTERNS)) {
    const typeSignals: Signal[] = [];

    for (const { pattern, weight, severity } of patterns) {
      const matches = text.match(pattern);
      
      if (matches) {
        // Extract context around each match
        for (const match of matches) {
          const index = text.indexOf(match);
          const start = Math.max(0, index - 50);
          const end = Math.min(text.length, index + match.length + 50);
          const context = text.substring(start, end).trim();

          const signal: Signal = {
            type: signalType as SignalType,
            content: context,
            confidence: weight,
            severity,
            metadata: {
              matchedPattern: pattern.source,
              matchedText: match,
            },
          };

          signals.push(signal);
          typeSignals.push(signal);
        }
      }
    }

    if (typeSignals.length > 0) {
      signalsByType.set(signalType as SignalType, typeSignals);
    }
  }

  // Calculate total confidence (average of all signal confidences)
  const totalConfidence = signals.length > 0
    ? signals.reduce((sum, s) => sum + s.confidence, 0) / signals.length
    : 0;

  return {
    signals,
    signalsByType,
    totalConfidence,
  };
}

/**
 * Extract stack trace information
 */
export interface StackTraceInfo {
  hasStackTrace: boolean;
  errorType?: string;
  errorMessage?: string;
  frames: StackFrame[];
  confidence: number;
}

export interface StackFrame {
  file?: string;
  line?: number;
  column?: number;
  function?: string;
  raw: string;
}

export function extractStackTrace(text: string): StackTraceInfo {
  const frames: StackFrame[] = [];
  let errorType: string | undefined;
  let errorMessage: string | undefined;

  // Match common stack trace patterns
  const stackFramePatterns = [
    // JavaScript/TypeScript: at functionName (file:line:column)
    /at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?/g,
    // Python: File "file", line X, in function
    /File\s+"(.+?)",\s+line\s+(\d+),\s+in\s+(.+)/g,
    // Java: at package.Class.method(File.java:line)
    /at\s+(.+?)\((.+?):(\d+)\)/g,
  ];

  // Extract error type and message
  const errorPattern = /^(\w+Error|\w+Exception):\s*(.+)$/m;
  const errorMatch = text.match(errorPattern);
  if (errorMatch) {
    errorType = errorMatch[1];
    errorMessage = errorMatch[2];
  }

  // Extract stack frames
  for (const pattern of stackFramePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const frame: StackFrame = {
        raw: match[0],
      };

      if (pattern.source.includes('at\\s+(?:(.+?)\\s+\\()?')) {
        // JavaScript/TypeScript format
        frame.function = match[1];
        frame.file = match[2];
        frame.line = parseInt(match[3], 10);
        frame.column = parseInt(match[4], 10);
      } else if (pattern.source.includes('File\\s+"')) {
        // Python format
        frame.file = match[1];
        frame.line = parseInt(match[2], 10);
        frame.function = match[3];
      } else {
        // Java format
        frame.function = match[1];
        frame.file = match[2];
        frame.line = parseInt(match[3], 10);
      }

      frames.push(frame);
    }
  }

  const hasStackTrace = frames.length > 0 || !!errorType;
  const confidence = hasStackTrace ? 0.9 : 0;

  return {
    hasStackTrace,
    errorType,
    errorMessage,
    frames,
    confidence,
  };
}

/**
 * Detect temporal patterns (retry loops, repeated errors)
 */
export interface TemporalPattern {
  type: 'retry_loop' | 'repeated_error' | 'escalating_severity';
  occurrences: number;
  timeSpan?: number; // in milliseconds
  confidence: number;
  evidence: string[];
}

export function detectTemporalPatterns(text: string): TemporalPattern[] {
  const patterns: TemporalPattern[] = [];

  // Detect retry loops
  const retryMatches = text.match(/retry|retrying|reconnect/gi);
  if (retryMatches && retryMatches.length >= 3) {
    patterns.push({
      type: 'retry_loop',
      occurrences: retryMatches.length,
      confidence: Math.min(0.9, 0.5 + (retryMatches.length * 0.1)),
      evidence: retryMatches.slice(0, 5),
    });
  }

  // Detect repeated errors
  const errorMatches = text.match(/error|exception|failed/gi);
  if (errorMatches && errorMatches.length >= 5) {
    patterns.push({
      type: 'repeated_error',
      occurrences: errorMatches.length,
      confidence: Math.min(0.85, 0.5 + (errorMatches.length * 0.05)),
      evidence: errorMatches.slice(0, 5),
    });
  }

  // Detect escalating severity
  const severityKeywords = ['warning', 'error', 'critical', 'fatal'];
  const severityOccurrences = severityKeywords.map(keyword => ({
    keyword,
    count: (text.match(new RegExp(keyword, 'gi')) || []).length,
  }));

  const hasSeverityEscalation = severityOccurrences.some(s => s.count > 0);
  if (hasSeverityEscalation) {
    patterns.push({
      type: 'escalating_severity',
      occurrences: severityOccurrences.reduce((sum, s) => sum + s.count, 0),
      confidence: 0.7,
      evidence: severityOccurrences
        .filter(s => s.count > 0)
        .map(s => `${s.keyword}: ${s.count}`),
    });
  }

  return patterns;
}

// Made with Bob