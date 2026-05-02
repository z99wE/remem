/**
 * API Route for File Parsing
 * Handles file upload and parsing for instant context extraction
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ParsedFileResponse {
  success: boolean;
  fileName: string;
  fileSize: number;
  detectedFormat: string;
  lineCount: number;
  content: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds 10MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
        },
        { status: 400 }
      );
    }

    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const content = new TextDecoder().decode(arrayBuffer);

    // Detect format
    const detectedFormat = detectFileFormat(file.name, content);
    const lineCount = content.split('\n').length;

    const response: ParsedFileResponse = {
      success: true,
      fileName: file.name,
      fileSize: file.size,
      detectedFormat,
      lineCount,
      content,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('File parsing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to parse file. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * Detect file format based on extension and content
 */
function detectFileFormat(fileName: string, content: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  const extensionMap: Record<string, string> = {
    'log': 'Terminal Log',
    'txt': 'Text File',
    'md': 'Markdown',
    'json': 'JSON Data',
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'jsx': 'React JSX',
    'tsx': 'React TSX',
    'py': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'go': 'Go',
    'rs': 'Rust',
    'sh': 'Shell Script',
    'bash': 'Bash Script',
    'yml': 'YAML',
    'yaml': 'YAML',
    'xml': 'XML',
    'html': 'HTML',
    'css': 'CSS',
    'sql': 'SQL',
  };

  if (extensionMap[extension]) {
    return extensionMap[extension];
  }

  // Detect by content patterns
  if (content.includes('npm ERR!') || content.includes('$ ')) {
    return 'Terminal Output';
  }
  if (content.match(/\[\s*\]|\[x\]/i)) {
    return 'TODO List';
  }
  if (content.includes('Error:') || content.includes('Exception')) {
    return 'Error Log';
  }
  if (content.includes('function') || content.includes('const ') || content.includes('import ')) {
    return 'Code File';
  }

  return 'Text Document';
}

// Made with Bob