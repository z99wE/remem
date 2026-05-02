export interface CognitiveFragment {
  id: string;
  content: string;
  type: 'terminal' | 'todo' | 'error' | 'conversation' | 'code' | 'note';
  timestamp: Date;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  content: string;
  parsedAt: Date;
}

export interface GitContext {
  repositoryUrl?: string;
  includeCommits: boolean;
  includeBranch: boolean;
  includeModifiedFiles: boolean;
  lastCommits?: GitCommit[];
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: Date;
  type: 'fix' | 'feat' | 'docs' | 'refactor' | 'test' | 'chore';
}

export interface DetectedContent {
  terminalLogs: number;
  todoItems: number;
  errorTraces: number;
  aiConversations: number;
  codeSnippets: number;
}

export interface CognitiveRecoveryScore {
  overall: number;
  contextCompleteness: number;
  threadClarity: number;
  actionability: number;
}

export interface ProsecutorDefense {
  prosecutor: {
    issues: string[];
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  };
  defense: {
    reasons: string[];
    context: 'Valid' | 'Questionable' | 'Invalid';
  };
  judge: {
    verdict: string;
    keyInsight: string;
    recommendation: string;
  };
}

export interface NextAction {
  action: string;
  confidence: number;
  priority: number;
}

export interface AnalysisResult {
  id: string;
  timestamp: Date;
  inputText: string;
  detectedContent: DetectedContent;
  recoveryScore: CognitiveRecoveryScore;
  prosecutorDefense: ProsecutorDefense;
  nextActions: NextAction[];
  gitTimeline?: GitCommit[];
  metadata?: HybridMetadata;
}

export interface HybridMetadata {
  mode: 'deterministic-only' | 'hybrid';
  aiUsed: boolean;
  processingTime: {
    deterministic: number;
    ai?: number;
    total: number;
  };
  costEstimate: {
    deterministic: number;
    ai: number;
    total: number;
  };
  deterministicScore: number;
  scoreImprovement: number;
}

// Made with Bob
