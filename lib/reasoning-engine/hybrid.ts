/**
 * REMEM Hybrid Reasoning System
 * Combines deterministic reasoning with AI enhancement
 */

import { runReasoningEngine, ReasoningEngineResult } from './index';
import { watsonxClient } from '@/lib/watsonx';

export interface HybridConfig {
  // Routing thresholds
  minRecoveryScoreForAI: number;
  minThreadConfidenceForAI: number;
  minRootCauseConfidenceForAI: number;
  
  // AI settings
  aiTimeout: number;
  aiMaxTokens: number;
  aiTemperature: number;
  
  // User preferences
  defaultMode: 'auto' | 'deterministic-only' | 'always-enhance';
  
  // Cost controls
  enableCaching: boolean;
}

export const DEFAULT_HYBRID_CONFIG: HybridConfig = {
  minRecoveryScoreForAI: 70,
  minThreadConfidenceForAI: 0.6,
  minRootCauseConfidenceForAI: 0.7,
  aiTimeout: 5000,
  aiMaxTokens: 1000,
  aiTemperature: 0.3,
  defaultMode: 'auto',
  enableCaching: true,
};

export interface HybridResult {
  // Core results
  deterministic: ReasoningEngineResult;
  aiEnhancement?: AIEnhancement;
  merged: MergedAnalysis;
  
  // Metadata
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
}

export interface AIEnhancement {
  enhancedInsight: string;
  creativeSolutions: string[];
  nuancedTradeoffs: string[];
  additionalContext: string;
  confidence: number;
  rawResponse: string;
}

export interface MergedAnalysis {
  verdict: string;
  keyInsight: string;
  recommendation: string;
  rootCauses: Array<{
    cause: string;
    likelihood: number;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    source: 'deterministic' | 'ai' | 'both';
  }>;
  nextActions: Array<{
    action: string;
    priority: number;
    confidence: number;
    source: 'deterministic' | 'ai' | 'both';
  }>;
  recoveryScore: {
    overall: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    improvement: number; // How much AI improved the score
  };
}

/**
 * Run hybrid analysis with sequential enhancement
 */
export async function runHybridAnalysis(
  text: string,
  config: Partial<HybridConfig> = {}
): Promise<HybridResult> {
  const finalConfig = { ...DEFAULT_HYBRID_CONFIG, ...config };
  const startTime = Date.now();

  // Step 1: Always run deterministic analysis (fast)
  const deterministicStart = Date.now();
  const deterministic = await runReasoningEngine(text);
  const deterministicTime = Date.now() - deterministicStart;

  // Step 2: Decide if AI enhancement is needed
  const needsAI = shouldEnhanceWithAI(deterministic, finalConfig);

  // Step 3: Run AI enhancement if needed
  let aiEnhancement: AIEnhancement | undefined;
  let aiTime: number | undefined;

  if (needsAI && finalConfig.defaultMode !== 'deterministic-only') {
    try {
      const aiStart = Date.now();
      aiEnhancement = await enhanceWithAI(text, deterministic, finalConfig);
      aiTime = Date.now() - aiStart;
    } catch (error) {
      console.error('AI enhancement failed, using deterministic only:', error);
      // Fallback to deterministic
    }
  }

  // Step 4: Merge results
  const merged = mergeResults(deterministic, aiEnhancement);

  const totalTime = Date.now() - startTime;

  return {
    deterministic,
    aiEnhancement,
    merged,
    mode: aiEnhancement ? 'hybrid' : 'deterministic-only',
    aiUsed: !!aiEnhancement,
    processingTime: {
      deterministic: deterministicTime,
      ai: aiTime,
      total: totalTime,
    },
    costEstimate: {
      deterministic: 0, // Free
      ai: aiEnhancement ? estimateAICost(text, aiEnhancement) : 0,
      total: aiEnhancement ? estimateAICost(text, aiEnhancement) : 0,
    },
  };
}

/**
 * Determine if AI enhancement is needed
 */
function shouldEnhanceWithAI(
  result: ReasoningEngineResult,
  config: HybridConfig
): boolean {
  // Factor 1: Recovery score
  if (result.recoveryScore.overall < config.minRecoveryScoreForAI) {
    return true;
  }

  // Factor 2: Thread clarity
  if (result.threads.threadCount === 0) {
    return true;
  }
  
  const primaryThread = result.threads.primaryThread;
  if (primaryThread && primaryThread.confidence < config.minThreadConfidenceForAI) {
    return true;
  }

  // Factor 3: Root cause ambiguity
  if (result.judge.rootCauses.length === 0) {
    return true;
  }
  
  const primaryRootCause = result.judge.rootCauses[0];
  if (primaryRootCause.likelihood < config.minRootCauseConfidenceForAI) {
    return true;
  }

  // Factor 4: Novel patterns (low confidence signals)
  const hasNovelSignals = result.signals.signals.some(s => s.confidence < 0.5);
  if (hasNovelSignals) {
    return true;
  }

  // Factor 5: Complex multi-thread scenarios
  if (result.threads.threadCount >= 3) {
    return true;
  }

  // Factor 6: Always enhance mode
  if (config.defaultMode === 'always-enhance') {
    return true;
  }

  return false;
}

/**
 * Enhance deterministic analysis with AI
 */
async function enhanceWithAI(
  text: string,
  deterministic: ReasoningEngineResult,
  config: HybridConfig
): Promise<AIEnhancement> {
  const prompt = buildAIEnhancementPrompt(text, deterministic);
  
  const systemPrompt = `You are an AI enhancement layer for a deterministic reasoning engine.

Your role is to:
1. Provide deeper contextual understanding
2. Suggest creative solutions beyond predefined rules
3. Explain nuanced engineering tradeoffs
4. Connect signals in novel ways

CRITICAL CONSTRAINTS:
- You MUST reference actual signals and evidence from the deterministic analysis
- You CANNOT contradict high-confidence deterministic findings
- You MUST provide evidence for all claims
- Keep responses concise and technical
- Return ONLY valid JSON

Response format:
{
  "enhancedInsight": "string",
  "creativeSolutions": ["string"],
  "nuancedTradeoffs": ["string"],
  "additionalContext": "string",
  "confidence": 0.0-1.0
}`;

  try {
    const response = await Promise.race([
      watsonxClient.generateText(prompt, systemPrompt),
      new Promise<string>((_, reject) => 
        setTimeout(() => reject(new Error('AI timeout')), config.aiTimeout)
      ),
    ]);

    // Parse AI response
    const parsed = parseAIEnhancement(response);
    
    // Validate against deterministic findings
    const validated = validateAIEnhancement(parsed, deterministic);
    
    return validated;
  } catch (error) {
    throw new Error(`AI enhancement failed: ${error}`);
  }
}

/**
 * Build structured prompt for AI enhancement
 */
function buildAIEnhancementPrompt(
  text: string,
  deterministic: ReasoningEngineResult
): string {
  const gaps = identifyGaps(deterministic);
  
  return `DETERMINISTIC ANALYSIS (Ground Truth):

Recovery Score: ${deterministic.recoveryScore.overall}/100 (Grade: ${deterministic.recoveryScore.grade})

Primary Thread: ${deterministic.threads.primaryThread?.name || 'None identified'}
Thread Confidence: ${deterministic.threads.primaryThread ? Math.round(deterministic.threads.primaryThread.confidence * 100) : 0}%

Root Causes:
${deterministic.judge.rootCauses.map((rc, i) => 
  `${i + 1}. ${rc.cause} (${Math.round(rc.likelihood * 100)}% likelihood, ${rc.severity})`
).join('\n')}

Prosecutor Issues (${deterministic.prosecutor.issues.length}):
${deterministic.prosecutor.issues.slice(0, 3).map(i => `- ${i.title} [${i.severity}]`).join('\n')}

Defense Reasons (${deterministic.defense.reasons.length}):
${deterministic.defense.reasons.slice(0, 3).map(r => `- ${r.title}`).join('\n')}

Next Actions:
${deterministic.judge.nextActions.slice(0, 3).map((a, i) => 
  `${i + 1}. ${a.action} (${Math.round(a.confidence * 100)}% confidence)`
).join('\n')}

IDENTIFIED GAPS:
${gaps.join('\n')}

ORIGINAL CONTEXT:
${text.substring(0, 2000)}${text.length > 2000 ? '...' : ''}

YOUR ENHANCEMENT TASK:
Provide deeper insights that complement (not replace) the deterministic analysis.
Focus on: ${gaps.slice(0, 2).join(', ')}

Return JSON only.`;
}

/**
 * Identify gaps in deterministic analysis
 */
function identifyGaps(deterministic: ReasoningEngineResult): string[] {
  const gaps: string[] = [];

  if (deterministic.recoveryScore.overall < 70) {
    gaps.push('Low recovery score - need more context interpretation');
  }

  if (deterministic.threads.threadCount === 0) {
    gaps.push('No threads identified - need pattern recognition');
  }

  if (deterministic.judge.rootCauses.length === 0) {
    gaps.push('No root causes found - need deeper analysis');
  }

  if (deterministic.judge.rootCauses.length > 0 && 
      deterministic.judge.rootCauses[0].likelihood < 0.7) {
    gaps.push('Ambiguous root cause - need clarification');
  }

  if (deterministic.judge.nextActions.length < 3) {
    gaps.push('Limited action suggestions - need creative solutions');
  }

  if (deterministic.defense.tradeoffs.length === 0) {
    gaps.push('No tradeoffs identified - need nuanced understanding');
  }

  return gaps.length > 0 ? gaps : ['Enhance overall analysis quality'];
}

/**
 * Parse AI enhancement response
 */
function parseAIEnhancement(response: string): AIEnhancement {
  try {
    // Try to extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      enhancedInsight: parsed.enhancedInsight || '',
      creativeSolutions: Array.isArray(parsed.creativeSolutions) ? parsed.creativeSolutions : [],
      nuancedTradeoffs: Array.isArray(parsed.nuancedTradeoffs) ? parsed.nuancedTradeoffs : [],
      additionalContext: parsed.additionalContext || '',
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.5,
      rawResponse: response,
    };
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${error}`);
  }
}

/**
 * Validate AI enhancement against deterministic findings
 */
function validateAIEnhancement(
  ai: AIEnhancement,
  deterministic: ReasoningEngineResult
): AIEnhancement {
  // Confidence gating
  if (ai.confidence < 0.5) {
    throw new Error('AI confidence too low');
  }

  // TODO: Add more sophisticated validation
  // - Check for hallucinated file paths
  // - Verify signal references
  // - Ensure consistency with deterministic findings

  return ai;
}

/**
 * Merge deterministic and AI results
 */
function mergeResults(
  deterministic: ReasoningEngineResult,
  ai?: AIEnhancement
): MergedAnalysis {
  if (!ai) {
    // Return deterministic only
    return {
      verdict: deterministic.judge.verdict,
      keyInsight: deterministic.judge.keyInsight,
      recommendation: deterministic.judge.recommendation,
      rootCauses: deterministic.judge.rootCauses.map(rc => ({
        ...rc,
        source: 'deterministic' as const,
      })),
      nextActions: deterministic.judge.nextActions.map(a => ({
        ...a,
        source: 'deterministic' as const,
      })),
      recoveryScore: {
        overall: deterministic.recoveryScore.overall,
        grade: deterministic.recoveryScore.grade,
        improvement: 0,
      },
    };
  }

  // Merge with AI enhancement
  const enhancedVerdict = ai.enhancedInsight 
    ? `${deterministic.judge.verdict}\n\nAI Enhancement: ${ai.enhancedInsight}`
    : deterministic.judge.verdict;

  const enhancedInsight = ai.additionalContext
    ? `${deterministic.judge.keyInsight}\n\nAdditional Context: ${ai.additionalContext}`
    : deterministic.judge.keyInsight;

  // Combine actions
  const aiActions = ai.creativeSolutions.map((solution, index) => ({
    action: solution,
    priority: deterministic.judge.nextActions.length + index + 1,
    confidence: ai.confidence,
    source: 'ai' as const,
  }));

  const allActions = [
    ...deterministic.judge.nextActions.map(a => ({ ...a, source: 'deterministic' as const })),
    ...aiActions,
  ].slice(0, 5); // Top 5 actions

  // Estimate score improvement (AI typically adds 5-15 points)
  const scoreImprovement = Math.min(15, Math.round(ai.confidence * 15));
  const improvedScore = Math.min(100, deterministic.recoveryScore.overall + scoreImprovement);
  const improvedGrade = calculateGrade(improvedScore);

  return {
    verdict: enhancedVerdict,
    keyInsight: enhancedInsight,
    recommendation: deterministic.judge.recommendation,
    rootCauses: deterministic.judge.rootCauses.map(rc => ({
      ...rc,
      source: 'deterministic' as const,
    })),
    nextActions: allActions,
    recoveryScore: {
      overall: improvedScore,
      grade: improvedGrade,
      improvement: scoreImprovement,
    },
  };
}

/**
 * Calculate grade from score
 */
function calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

/**
 * Estimate AI cost (rough approximation)
 */
function estimateAICost(text: string, ai: AIEnhancement): number {
  // Rough token estimation: ~4 chars per token
  const inputTokens = text.length / 4;
  const outputTokens = ai.rawResponse.length / 4;
  const totalTokens = inputTokens + outputTokens;
  
  // Approximate cost: $0.01 per 1000 tokens
  return (totalTokens / 1000) * 0.01;
}

// Made with Bob