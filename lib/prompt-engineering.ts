/**
 * Prompt Engineering for Cognitive Reconstruction
 * Optimized for IBM WatsonX Granite 3 8B Instruct
 */

import { GitContext } from '@/types';

export interface PromptInput {
  userInput: string;
  gitContext?: GitContext;
}

/**
 * REMEM System Prompt - Defines AI behavior and response format
 */
export const REMEM_SYSTEM_PROMPT = `You are REMEM, an AI cognitive restoration engine for developers.

Your purpose is to reconstruct developer reasoning after interruptions.

Developers often lose cognitive continuity because they switch between:

* AI tools
* terminals
* IDEs
* debugging sessions
* repositories
* browser tabs
* engineering discussions

You receive fragmented engineering context such as:

* debugging logs
* stack traces
* TODOs
* terminal outputs
* coding notes
* unfinished prompts
* modified file paths
* architecture comments
* developer thoughts

Your task is to:

1. Reconstruct the developer's active reasoning state
2. Identify unresolved cognitive threads
3. Infer debugging hypotheses
4. Explain likely architectural tradeoffs
5. Suggest the most likely next actions
6. Estimate cognitive recovery quality

Tone:

* analytical
* concise
* emotionally intelligent
* futuristic
* cinematic but professional

Avoid:

* generic assistant phrasing
* motivational filler
* unnecessary explanations
* markdown formatting

IMPORTANT:
Return ONLY valid JSON.
Do not include prose outside JSON.

Use EXACTLY this schema:

{
  "prosecutor_analysis": {
    "title": "What Went Wrong",
    "points": [
      "string"
    ],
    "severity": "high"
  },
  "defense_reasoning": {
    "title": "Why It Made Sense",
    "points": [
      "string"
    ],
    "context": "string"
  },
  "judge_summary": {
    "verdict": "string",
    "key_insight": "string",
    "recommendation": "string"
  },
  "active_threads": [
    "string"
  ],
  "next_actions": [
    {
      "action": "string",
      "confidence": 85,
      "priority": 1
    }
  ],
  "recovery_score": {
    "overall": 85,
    "metrics": {
      "context_completeness": 90,
      "thread_clarity": 80,
      "actionability": 85
    }
  }
}`;

/**
 * Build the user prompt with context
 */
export function buildCognitiveReconstructionPrompt(input: PromptInput): string {
  const { userInput, gitContext } = input;

  let prompt = `DEVELOPER CONTEXT FRAGMENTS:

${userInput}
`;

  // Add Git context if available
  if (gitContext?.repositoryUrl) {
    prompt += `\n\nGIT REPOSITORY CONTEXT:
Repository: ${gitContext.repositoryUrl}
`;
    
    if (gitContext.lastCommits && gitContext.lastCommits.length > 0) {
      prompt += `\nRecent Commits:
${gitContext.lastCommits.map(commit => 
  `- [${commit.type}] ${commit.message} (${commit.author}, ${commit.date.toLocaleDateString()})`
).join('\n')}
`;
    }
  }

  prompt += `

ANALYSIS INSTRUCTIONS:

Analyze the above context and reconstruct the developer's cognitive state.

Return a JSON response following the exact schema provided in the system prompt.

Focus on:
- Technical specifics (not generic observations)
- Actual code patterns and architectural decisions
- Pragmatic constraints (time, deadlines, complexity)
- Actionable next steps with confidence scores
- Recovery quality metrics

Remember: Return ONLY valid JSON, no additional text.`;

  return prompt;
}

/**
 * Parse AI response using safe JSON parsing
 */
export function parseAIResponse(response: string): any {
  // Import safeParseJSON at runtime to avoid circular dependencies
  const { safeParseJSON } = require('./utils');
  
  const fallbackStructure = {
    prosecutor_analysis: {
      title: "What Went Wrong",
      points: ["Unable to parse AI response"],
      severity: "medium"
    },
    defense_reasoning: {
      title: "Why It Made Sense",
      points: ["Context analysis in progress"],
      context: "Questionable"
    },
    judge_summary: {
      verdict: "Analysis incomplete",
      key_insight: "The AI response could not be properly parsed. Please try again.",
      recommendation: "Resubmit your context with more structured information."
    },
    active_threads: ["Analysis pending"],
    next_actions: [
      {
        action: "Retry analysis with more context",
        confidence: 75,
        priority: 1
      }
    ],
    recovery_score: {
      overall: 50,
      metrics: {
        context_completeness: 50,
        thread_clarity: 50,
        actionability: 50
      }
    }
  };

  return safeParseJSON(response, fallbackStructure);
}

// Made with Bob