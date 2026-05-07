/**
 * Command Reference Utilities
 *
 * Utilities for transforming command references to tool-specific formats.
 */

/**
 * Transforms colon-based command references to hyphen-based format.
 * Converts `/rd:` patterns to `/rd-` for tools that use hyphen syntax.
 *
 * @param text - The text containing command references
 * @returns Text with command references transformed to hyphen format
 *
 * @example
 * transformToHyphenCommands('/rd:new') // returns '/rd-new'
 * transformToHyphenCommands('Use /rd:apply to implement') // returns 'Use /rd-apply to implement'
 */
export function transformToHyphenCommands(text: string): string {
  return text.replace(/\/rd:/g, '/rd-');
}
