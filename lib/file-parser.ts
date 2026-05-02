/**
 * File Parser Utility
 * Handles parsing of various file types for instant context extraction
 */

export interface ParsedFileContent {
  text: string;
  metadata: {
    fileName: string;
    fileType: string;
    fileSize: number;
    lineCount: number;
    detectedFormat?: string;
  };
}

/**
 * Parse uploaded file and extract text content
 */
export async function parseFile(file: File): Promise<ParsedFileContent> {
  const fileName = file.name;
  const fileType = file.type;
  const fileSize = file.size;

  // Read file content
  const text = await readFileAsText(file);
  const lineCount = text.split('\n').length;

  // Detect format
  const detectedFormat = detectFileFormat(fileName, text);

  return {
    text,
    metadata: {
      fileName,
      fileType,
      fileSize,
      lineCount,
      detectedFormat,
    },
  };
}

/**
 * Read file as text
 */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as text'));
      }
    };
    
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsText(file);
  });
}

/**
 * Detect file format based on extension and content
 */
function detectFileFormat(fileName: string, content: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  // Check by extension
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

/**
 * Validate file for upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    'text/plain',
    'text/markdown',
    'text/x-log',
    'application/json',
    'text/javascript',
    'text/typescript',
    'text/x-python',
    'text/x-java',
    'text/x-c',
    'text/x-c++',
    'text/x-go',
    'text/x-rust',
    'text/x-sh',
    'text/yaml',
    'text/xml',
    'text/html',
    'text/css',
    'application/x-sql',
  ];

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 10MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
    };
  }

  // Check file type (allow any text-based file or no type specified)
  if (file.type && !ALLOWED_TYPES.includes(file.type) && !file.type.startsWith('text/')) {
    // Check by extension as fallback
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const textExtensions = ['log', 'txt', 'md', 'json', 'js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'go', 'rs', 'sh', 'bash', 'yml', 'yaml', 'xml', 'html', 'css', 'sql'];
    
    if (!textExtensions.includes(extension)) {
      return {
        valid: false,
        error: 'Only text-based files are supported',
      };
    }
  }

  return { valid: true };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Made with Bob