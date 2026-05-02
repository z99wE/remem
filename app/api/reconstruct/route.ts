/**
 * API Route for Cognitive Reconstruction
 * Hybrid system: Deterministic reasoning + AI enhancement
 */

import { NextRequest, NextResponse } from 'next/server';
import { runHybridAnalysis, DEFAULT_HYBRID_CONFIG } from '@/lib/reasoning-engine/hybrid';
import { GitContext, AnalysisResult } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface RequestBody {
  inputText: string;
  gitContext?: GitContext;
  mode?: 'auto' | 'deterministic-only' | 'always-enhance';
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { inputText, gitContext, mode } = body;

    // Validate input
    if (!inputText || inputText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Input text is required' },
        { status: 400 }
      );
    }

    if (inputText.length > 50000) {
      return NextResponse.json(
        { error: 'Input text exceeds maximum length of 50,000 characters' },
        { status: 400 }
      );
    }

    // Run hybrid analysis
    const hybridResult = await runHybridAnalysis(inputText, {
      ...DEFAULT_HYBRID_CONFIG,
      defaultMode: mode || 'auto',
    });

    // Detect content types (for UI display)
    const detectedContent = detectContentTypes(inputText);

    // Build analysis result compatible with existing UI
    const result: AnalysisResult = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      inputText,
      detectedContent,
      recoveryScore: {
        overall: hybridResult.merged.recoveryScore.overall,
        contextCompleteness: hybridResult.deterministic.recoveryScore.metrics.contextCompleteness,
        threadClarity: hybridResult.deterministic.recoveryScore.metrics.threadClarity,
        actionability: hybridResult.deterministic.recoveryScore.metrics.actionability,
      },
      prosecutorDefense: {
        prosecutor: {
          issues: hybridResult.deterministic.prosecutor.issues.map(i => i.title),
          severity: hybridResult.deterministic.prosecutor.overallSeverity,
        },
        defense: {
          reasons: hybridResult.deterministic.defense.reasons.map(r => r.title),
          context: hybridResult.deterministic.defense.overallContext,
        },
        judge: {
          verdict: hybridResult.merged.verdict,
          keyInsight: hybridResult.merged.keyInsight,
          recommendation: hybridResult.merged.recommendation,
        },
      },
      nextActions: hybridResult.merged.nextActions.map(a => ({
        action: a.action,
        confidence: Math.round(a.confidence * 100),
        priority: a.priority,
      })),
      gitTimeline: gitContext?.lastCommits,
      // Add hybrid metadata
      metadata: {
        mode: hybridResult.mode,
        aiUsed: hybridResult.aiUsed,
        processingTime: hybridResult.processingTime,
        costEstimate: hybridResult.costEstimate,
        deterministicScore: hybridResult.deterministic.recoveryScore.overall,
        scoreImprovement: hybridResult.merged.recoveryScore.improvement,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * Detect content types in the input text
 */
function detectContentTypes(text: string) {
  const lowerText = text.toLowerCase();
  
  return {
    terminalLogs: countOccurrences(text, [
      /\$ /g,
      /npm (run|install|start)/gi,
      /error:/gi,
      /warning:/gi,
    ]),
    todoItems: countOccurrences(text, [
      /\[ \]/g,
      /\[x\]/gi,
      /todo:/gi,
      /fixme:/gi,
    ]),
    errorTraces: countOccurrences(text, [
      /at .+:\d+:\d+/g,
      /stack trace/gi,
      /exception/gi,
      /traceback/gi,
    ]),
    aiConversations: countOccurrences(text, [
      /user:/gi,
      /assistant:/gi,
      /ai:/gi,
      /claude:/gi,
      /gpt:/gi,
    ]),
    codeSnippets: countOccurrences(text, [
      /function /g,
      /const /g,
      /import /g,
      /export /g,
      /class /g,
    ]),
  };
}

/**
 * Count occurrences of patterns in text
 */
function countOccurrences(text: string, patterns: RegExp[]): number {
  let count = 0;
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    if (matches) {
      count += matches.length;
    }
  }
  return Math.min(count, 10); // Cap at 10 for display purposes
}

// Made with Bob