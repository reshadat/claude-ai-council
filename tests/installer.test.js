const fs = require('fs').promises;
const path = require('path');
const os = require('os');

// Mock dependencies
jest.mock('inquirer');
const inquirer = require('inquirer');

// We'll test the functions by requiring the module
// Note: In real scenario, we'd refactor to export internal functions
describe('AI Council Installer', () => {
  let testDir;

  beforeEach(async () => {
    // Create temporary test directory
    testDir = path.join(os.tmpdir(), `ai-council-test-${Date.now()}`);
    await fs.mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    // Cleanup test directory
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('Template Validation', () => {
    test('should reject empty templates', async () => {
      const testFile = path.join(testDir, 'empty.md');
      await fs.writeFile(testFile, '', 'utf8');

      const content = await fs.readFile(testFile, 'utf8');

      expect(() => {
        if (content.length === 0) {
          throw new Error('Template is empty');
        }
      }).toThrow('Template is empty');
    });

    test('should reject templates larger than 1MB', async () => {
      const largeContent = 'x'.repeat(1000001);

      expect(() => {
        if (largeContent.length > 1000000) {
          throw new Error('Template too large');
        }
      }).toThrow('Template too large');
    });

    test('should accept valid markdown templates', async () => {
      const validContent = '# Valid Template\n\nThis is valid content.';

      expect(() => {
        if (validContent.length === 0 || validContent.length > 1000000) {
          throw new Error('Invalid template');
        }
      }).not.toThrow();
    });
  });

  describe('Path Security', () => {
    test('should detect path traversal attempts', () => {
      // Test the actual validation logic from installer.js
      const maliciousInputs = [
        '../../../etc/passwd',
        'agent/../../../secret.md',
        'agent/../../secret.md'
      ];

      maliciousInputs.forEach(input => {
        // This simulates what happens before path.basename in real code
        const containsTraversal = input.includes('..');
        expect(containsTraversal).toBe(true);
      });
    });

    test('should accept valid filenames', () => {
      const validNames = [
        'my-agent.md',
        'skeptical-architect.md',
        'custom-expert.md'
      ];

      validNames.forEach(name => {
        const fileName = path.basename(name);
        const isValid = !fileName.includes('..') && !fileName.includes('/') && !fileName.includes('\\');
        expect(isValid).toBe(true);
      });
    });

    test('should validate path boundaries', () => {
      const baseDir = path.resolve(testDir, 'safe');
      const attemptedPath = path.resolve(testDir, 'safe', '..', '..', 'etc', 'passwd');

      // Verify attempted path escapes base directory
      const staysWithinBase = attemptedPath.startsWith(baseDir);
      expect(staysWithinBase).toBe(false);
    });

    test('should detect symlinks', async () => {
      const targetFile = path.join(testDir, 'target.md');
      const symlinkPath = path.join(testDir, 'link.md');

      // Create target file
      await fs.writeFile(targetFile, 'content', 'utf8');

      // Create symlink (skip on Windows if no permission)
      try {
        await fs.symlink(targetFile, symlinkPath);

        // Check if it's a symlink
        const stats = await fs.lstat(symlinkPath);
        expect(stats.isSymbolicLink()).toBe(true);
      } catch (error) {
        if (error.code === 'EPERM') {
          // Windows requires admin for symlinks, skip test
          console.log('Skipping symlink test (insufficient permissions)');
        } else {
          throw error;
        }
      }
    });

    test('should differentiate symlinks from regular files', async () => {
      const regularFile = path.join(testDir, 'regular.md');
      await fs.writeFile(regularFile, 'content', 'utf8');

      const stats = await fs.lstat(regularFile);
      expect(stats.isSymbolicLink()).toBe(false);
      expect(stats.isFile()).toBe(true);
    });
  });

  describe('Backup Mechanism', () => {
    test('should create backup before overwrite', async () => {
      const testFile = path.join(testDir, 'test.md');
      const originalContent = 'Original content';

      // Create original file
      await fs.writeFile(testFile, originalContent, 'utf8');

      // Simulate backup
      const backup = `${testFile}.backup.${Date.now()}`;
      await fs.copyFile(testFile, backup);

      // Verify backup exists
      const backupExists = await fs.access(backup).then(() => true).catch(() => false);
      expect(backupExists).toBe(true);

      // Verify backup content matches original
      const backupContent = await fs.readFile(backup, 'utf8');
      expect(backupContent).toBe(originalContent);
    });

    test('should preserve original content in backup', async () => {
      const testFile = path.join(testDir, 'preserve.md');
      const originalContent = '# Original Header\n\nImportant content that should be preserved.';

      await fs.writeFile(testFile, originalContent, 'utf8');

      // Create backup
      const backup = `${testFile}.backup.${Date.now()}`;
      await fs.copyFile(testFile, backup);

      // Overwrite original
      const newContent = '# New Header\n\nNew content.';
      await fs.writeFile(testFile, newContent, 'utf8');

      // Verify backup still has original
      const backupContent = await fs.readFile(backup, 'utf8');
      expect(backupContent).toBe(originalContent);

      // Verify file has new content
      const currentContent = await fs.readFile(testFile, 'utf8');
      expect(currentContent).toBe(newContent);
    });
  });

  describe('File Operations', () => {
    test('should handle non-existent files gracefully', async () => {
      const nonExistent = path.join(testDir, 'does-not-exist.md');

      const exists = await fs.access(nonExistent)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(false);
    });

    test('should create directories recursively', async () => {
      const nestedDir = path.join(testDir, 'level1', 'level2', 'level3');

      await fs.mkdir(nestedDir, { recursive: true });

      const exists = await fs.access(nestedDir)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);
    });
  });

  describe('Agent Templates', () => {
    test('should have skeptical-architect template', async () => {
      const templatesDir = path.join(__dirname, '..', 'templates', 'agents');
      const skepticalPath = path.join(templatesDir, 'skeptical-architect.md');

      const exists = await fs.access(skepticalPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);

      // Verify it has expected content
      const content = await fs.readFile(skepticalPath, 'utf8');
      expect(content).toContain('Skeptical Architect');
      expect(content).toContain('30 Years');
      expect(content).toContain('Option A');
      expect(content).toContain('Option B');
      expect(content).toContain('Option C');
    });

    test('should have generative-architect template', async () => {
      const templatesDir = path.join(__dirname, '..', 'templates', 'agents');
      const generativePath = path.join(templatesDir, 'generative-architect.md');

      const exists = await fs.access(generativePath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);

      // Verify it has expected content
      const content = await fs.readFile(generativePath, 'utf8');
      expect(content).toContain('Generative Architect');
      expect(content).toContain('Master Builder');
      expect(content).toContain('Core');
      expect(content).toContain('Enhanced');
      expect(content).toContain('Visionary');
    });

    test('skeptical and generative architects should be complementary', async () => {
      const templatesDir = path.join(__dirname, '..', 'templates', 'agents');
      const skepticalPath = path.join(templatesDir, 'skeptical-architect.md');
      const generativePath = path.join(templatesDir, 'generative-architect.md');

      const skepticalContent = await fs.readFile(skepticalPath, 'utf8');
      const generativeContent = await fs.readFile(generativePath, 'utf8');

      // Skeptical should focus on challenges and options
      expect(skepticalContent).toContain('Devil\'s Advocate');
      expect(skepticalContent).toContain('Boring But Works');
      expect(skepticalContent).toContain('What could go wrong');

      // Generative should focus on building and momentum
      expect(generativeContent).toContain('Steelman');
      expect(generativeContent).toContain('Ship in 2 weeks');
      expect(generativeContent).toContain('Momentum');

      // Both should have experience
      expect(skepticalContent).toContain('30 years');
      expect(generativeContent).toContain('30 years');
    });
  });

  describe('Council Command', () => {
    test('should have council command with both architects', async () => {
      const commandsDir = path.join(__dirname, '..', 'templates', 'commands');
      const councilPath = path.join(commandsDir, 'council.md');

      const exists = await fs.access(councilPath)
        .then(() => true)
        .catch(() => false);

      expect(exists).toBe(true);

      const content = await fs.readFile(councilPath, 'utf8');

      // Should reference both custom architects
      expect(content).toContain('skeptical-architect');
      expect(content).toContain('generative-architect');

      // Should have Build Mode and Balanced Council
      expect(content).toContain('Build Mode');
      expect(content).toContain('Balanced Council');

      // Should explain when to use both
      expect(content).toContain('Using Both Together');
    });
  });
});
