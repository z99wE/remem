import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
/**
 * Safely parse JSON responses from AI models
 * Handles malformed JSON and repairs minor formatting issues
 */
export function safeParseJSON<T = any>(jsonString: string, fallback?: T): T | null {
  if (!jsonString || typeof jsonString !== 'string') {
    return fallback ?? null;
  }

  try {
    // Try direct parsing first
    return JSON.parse(jsonString);
  } catch (error) {
    // Attempt to extract JSON from response
    const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e) {
        // Try to repair common JSON issues
        const repaired = jsonMatch[0]
          // Fix trailing commas
          .replace(/,(\s*[}\]])/g, '$1')
          // Fix missing quotes around keys
          .replace(/(\{|,)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
          // Fix single quotes to double quotes
          .replace(/'/g, '"')
          // Remove comments
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\/\/.*/g, '');

        try {
          return JSON.parse(repaired);
        } catch (finalError) {
          console.error('Failed to parse JSON after repair attempts:', finalError);
          return fallback ?? null;
        }
      }
    }

    console.error('No JSON found in response:', error);
    return fallback ?? null;
  }
}

/**
 * Validate that parsed JSON matches expected structure
 */
export function validateJSONStructure<T>(
  data: any,
  requiredKeys: string[]
): data is T {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return requiredKeys.every(key => key in data);
}


// Made with Bob
