import { describe, it, expect } from 'vitest';
import { CommandAdapterRegistry } from '../../../src/core/command-generation/registry.js';

describe('command-generation/registry', () => {
  describe('get', () => {
    it('should return Claude adapter for "claude"', () => {
      const adapter = CommandAdapterRegistry.get('claude');
      expect(adapter).toBeDefined();
      expect(adapter?.toolId).toBe('claude');
    });

    it('should return undefined for unregistered tool', () => {
      const adapter = CommandAdapterRegistry.get('unknown-tool');
      expect(adapter).toBeUndefined();
    });

    it('should return undefined for removed tools (cursor, windsurf, etc.)', () => {
      expect(CommandAdapterRegistry.get('cursor')).toBeUndefined();
      expect(CommandAdapterRegistry.get('windsurf')).toBeUndefined();
      expect(CommandAdapterRegistry.get('junie')).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      const adapter = CommandAdapterRegistry.get('');
      expect(adapter).toBeUndefined();
    });
  });

  describe('getAll', () => {
    it('should return array with only Claude adapter', () => {
      const adapters = CommandAdapterRegistry.getAll();
      expect(Array.isArray(adapters)).toBe(true);
      expect(adapters).toHaveLength(1);
      expect(adapters[0].toolId).toBe('claude');
    });
  });

  describe('has', () => {
    it('should return true for claude', () => {
      expect(CommandAdapterRegistry.has('claude')).toBe(true);
    });

    it('should return false for removed tools', () => {
      expect(CommandAdapterRegistry.has('cursor')).toBe(false);
      expect(CommandAdapterRegistry.has('windsurf')).toBe(false);
      expect(CommandAdapterRegistry.has('junie')).toBe(false);
    });

    it('should return false for unregistered tools', () => {
      expect(CommandAdapterRegistry.has('unknown')).toBe(false);
      expect(CommandAdapterRegistry.has('')).toBe(false);
    });
  });

  describe('adapter functionality', () => {
    it('registered adapter should have working getFilePath', () => {
      const claudeAdapter = CommandAdapterRegistry.get('claude');
      expect(claudeAdapter?.getFilePath('test')).toContain('.claude');
      expect(claudeAdapter?.getFilePath('test')).toContain('rd');
    });

    it('registered adapter should have working formatFile', () => {
      const content = {
        id: 'test',
        name: 'Test',
        description: 'Test desc',
        category: 'Test',
        tags: ['tag1'],
        body: 'Body content',
      };

      const adapter = CommandAdapterRegistry.get('claude');
      const output = adapter!.formatFile(content);
      expect(output).toContain('Body content');
      expect(output).toContain('---');
    });
  });
});
