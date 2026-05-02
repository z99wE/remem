# 🤖 Agentic IDE Export Feature Guide

## Overview

The **Agentic IDE Export** feature generates a comprehensive, single-prompt output containing all error messages, stack traces, debugging suggestions, context information, and proposed solutions in a structured format optimized for direct input into agentic IDEs like **Cursor**, **Windsurf**, or **GitHub Copilot**.

## Features

✅ **One-Click Copy to Clipboard** - Instantly copy formatted context  
✅ **Comprehensive Context** - Includes all errors, stack traces, and debugging data  
✅ **Structured Format** - Markdown with clear sections for AI parsing  
✅ **No Follow-up Questions Needed** - Complete context in a single prompt  
✅ **Visual Feedback** - Success/error notifications  
✅ **Download Option** - Save as `.md` file for later use  
✅ **Universal Format** - Works with all major agentic IDEs  

## How to Use

### 1. From the Output Dashboard

After analyzing your cognitive fragments:

1. Click the **"Copy for AI Agent"** button (purple button with copy icon)
2. Wait for the success confirmation (button turns green with checkmark)
3. Paste the content directly into your agentic IDE
4. The AI agent will have complete context to resolve your issue

### 2. Download Option

Click the **"Download"** button (blue button with download icon) to save the export as a Markdown file for:
- Sharing with team members
- Documentation purposes
- Future reference
- Offline analysis

## Export Format Structure

The export includes the following sections:

### 📋 Executive Summary
- Analysis ID and timestamp
- Recovery score breakdown
- Context completeness metrics

### 🎯 Problem Summary
- Judge's verdict
- Key insights
- Recommended actions

### ⚠️ Identified Issues
- Severity level (CRITICAL, HIGH, MEDIUM, LOW)
- Detailed list of problems found
- Prosecutor's analysis

### 🛡️ Contextual Reasoning
- Why the issue occurred
- Context validity assessment
- Defense analysis

### 🔍 Error Details & Stack Traces
- Complete stack traces
- Error messages
- Exception details
- Line numbers and file paths

### 📊 Detected Content Analysis
- Terminal logs count
- TODO items
- Error traces
- AI conversations
- Code snippets

### 💡 Recommended Next Actions
- Prioritized action items
- Confidence scores
- Priority levels

### 📁 File References & Code Context
- All mentioned files
- Line numbers
- Function/method references

### 📜 Git Timeline Context (if available)
- Recent commits
- Commit types (fix, feat, refactor, etc.)
- Authors and dates

### 🧠 Original Cognitive Fragments
- Complete raw input
- Preserves all context

### 🔧 Debugging Suggestions
- Immediate focus areas
- Code review priorities
- Testing strategy
- Documentation needs

### 📝 Metadata for AI Processing
- JSON-formatted metadata
- Processing statistics
- Confidence scores

### 🎯 Prompt for AI Agent
- Pre-formatted prompt
- Clear instructions for the AI
- Priority indicators

## Example Use Cases

### 1. Debugging Production Issues

```markdown
Scenario: Production error with incomplete logs
Action: Paste cognitive fragments → Analyze → Copy for AI Agent
Result: AI agent receives complete context including:
- Error messages
- Stack traces
- Recent changes (git history)
- System state
- Proposed solutions
```

### 2. Context Switching

```markdown
Scenario: Returning to a project after interruption
Action: Load previous session → Copy for AI Agent
Result: AI agent understands:
- What you were working on
- Where you left off
- Next steps to take
- Potential blockers
```

### 3. Cross-IDE Collaboration

```markdown
Scenario: Working with multiple AI assistants
Action: Export from ReMem → Paste into different IDEs
Result: Consistent context across:
- Cursor
- Windsurf
- GitHub Copilot
- Any other agentic IDE
```

## Technical Details

### Format Specifications

- **File Format**: Markdown (.md)
- **Encoding**: UTF-8
- **Line Endings**: LF (Unix-style)
- **Code Blocks**: Triple backticks with language hints
- **Metadata**: JSON embedded in code blocks

### Clipboard API

The feature uses the modern Clipboard API:
```typescript
await navigator.clipboard.writeText(exportContent);
```

**Browser Support**:
- ✅ Chrome 66+
- ✅ Firefox 63+
- ✅ Safari 13.1+
- ✅ Edge 79+

### File Size Considerations

- **Typical Export Size**: 5-50 KB
- **Maximum Recommended**: 100 KB
- **Large Exports**: Automatically truncated with warnings

## Best Practices

### 1. When to Use

✅ **Use when**:
- Debugging complex issues
- Switching between AI assistants
- Sharing context with team
- Documenting incidents
- Creating reproducible bug reports

❌ **Avoid when**:
- Simple, single-line errors
- Sensitive data is present (sanitize first)
- Context is already clear

### 2. Optimizing Exports

**For Better Results**:
1. Include relevant error logs
2. Add TODO comments in code
3. Provide git context when available
4. Include recent terminal output
5. Add any AI conversation history

**Avoid**:
1. Sensitive credentials or API keys
2. Personal information
3. Proprietary code (if sharing externally)
4. Excessive log spam (filter first)

### 3. Working with AI Agents

**Cursor**:
```
1. Copy export from ReMem
2. Open Cursor
3. Press Cmd+K (Mac) or Ctrl+K (Windows)
4. Paste the export
5. AI has full context
```

**Windsurf**:
```
1. Copy export from ReMem
2. Open Windsurf chat
3. Paste the export
4. Ask specific questions
```

**GitHub Copilot**:
```
1. Copy export from ReMem
2. Create a new comment block
3. Paste the export
4. Copilot suggestions will be context-aware
```

## Troubleshooting

### Copy Failed

**Problem**: "Copy failed. Please try again."

**Solutions**:
1. Check browser permissions for clipboard access
2. Try the Download button instead
3. Manually select and copy the text
4. Update your browser to the latest version

### Export Too Large

**Problem**: Export exceeds IDE input limits

**Solutions**:
1. Focus on specific error sections
2. Remove git timeline if not needed
3. Truncate original input to key parts
4. Use multiple smaller exports

### Formatting Issues

**Problem**: Markdown not rendering correctly

**Solutions**:
1. Ensure IDE supports Markdown
2. Check for special characters in input
3. Try downloading and opening in a Markdown editor
4. Verify UTF-8 encoding

## API Reference

### Functions

#### `exportForAgenticIDE(result: AnalysisResult): string`

Generates the comprehensive export string.

**Parameters**:
- `result`: Complete analysis result from ReMem

**Returns**: Formatted Markdown string

**Example**:
```typescript
import { exportForAgenticIDE } from '@/lib/export';

const exportContent = exportForAgenticIDE(analysisResult);
console.log(exportContent);
```

#### `copyAgenticIDEExport(result: AnalysisResult): Promise<boolean>`

Copies export to clipboard.

**Parameters**:
- `result`: Complete analysis result

**Returns**: Promise resolving to `true` on success, `false` on failure

**Example**:
```typescript
import { copyAgenticIDEExport } from '@/lib/export';

const success = await copyAgenticIDEExport(analysisResult);
if (success) {
  console.log('Copied to clipboard!');
}
```

#### `downloadAgenticIDEExport(result: AnalysisResult): void`

Downloads export as Markdown file.

**Parameters**:
- `result`: Complete analysis result

**Example**:
```typescript
import { downloadAgenticIDEExport } from '@/lib/export';

downloadAgenticIDEExport(analysisResult);
// File downloads as: remem-agentic-export-{id}.md
```

## Future Enhancements

### Planned Features

- [ ] Custom template editor
- [ ] IDE-specific optimizations
- [ ] Export history and versioning
- [ ] Collaborative sharing links
- [ ] Integration with issue trackers
- [ ] Automated sanitization of sensitive data
- [ ] Export analytics and insights
- [ ] Multi-language support

### Community Contributions

We welcome contributions! Areas for improvement:

1. **Template System**: Add IDE-specific templates
2. **Sanitization**: Better PII/credential detection
3. **Compression**: Smart truncation algorithms
4. **Integrations**: Direct API connections to IDEs
5. **Analytics**: Track export effectiveness

## Support

### Getting Help

- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@remem.dev (if available)

### Reporting Bugs

When reporting issues with the export feature:

1. Describe the problem
2. Include browser/OS information
3. Provide sample export (sanitized)
4. Note any error messages
5. Describe expected vs actual behavior

## License

This feature is part of ReMem-Bob and follows the same license terms.

---

**Generated by ReMem - Cognitive Restoration Engine**  
*Remember where your mind left off.* 🧠✨