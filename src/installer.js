const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const inquirer = require('inquirer');

const CLAUDE_DIR = path.join(os.homedir(), '.claude');
const AGENTS_DIR = path.join(CLAUDE_DIR, 'agents');
const COMMANDS_DIR = path.join(CLAUDE_DIR, 'commands');
const CUSTOM_AGENTS_DIR = path.join(AGENTS_DIR, 'custom');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function validateTemplate(content, filePath) {
  // Check file size (should be reasonable, < 1MB)
  if (content.length === 0) {
    throw new Error(`Template is empty: ${filePath}`);
  }
  if (content.length > 1000000) {
    throw new Error(`Template too large (>1MB): ${filePath}`);
  }

  // Validate UTF-8 encoding by checking for replacement characters
  if (content.includes('\ufffd')) {
    throw new Error(`Template has invalid UTF-8 encoding: ${filePath}`);
  }

  return true;
}

async function copyTemplate(src, dest, name, force = false) {
  const exists = await fileExists(dest);

  if (exists && !force) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `${name} already exists. Overwrite?`,
        default: true // Default to yes for updates
      }
    ]);

    if (!overwrite) {
      console.log(chalk.gray(`  ⏭️  Skipped ${name}`));
      return;
    }
  }

  // Backup existing file before overwrite
  if (exists) {
    const timestamp = Date.now();
    const backup = `${dest}.backup.${timestamp}`;
    await fs.copyFile(dest, backup);
    console.log(chalk.gray(`  💾 Backup created: ${path.basename(backup)}`));
  }

  // Read and validate template content
  const content = await fs.readFile(src, 'utf8');
  await validateTemplate(content, src);

  // Write new content
  await fs.writeFile(dest, content, 'utf8');

  if (exists) {
    console.log(chalk.green(`  ✓ Updated ${name}`));
  } else {
    console.log(chalk.green(`  ✓ Installed ${name}`));
  }
}

async function install(options = {}) {
  // Auto-detect if this is an update (files already exist)
  const skepticalExists = await fileExists(path.join(AGENTS_DIR, 'skeptical-architect.md'));
  const councilExists = await fileExists(path.join(COMMANDS_DIR, 'council.md'));
  const isUpdate = skepticalExists || councilExists;

  // Force only if explicitly requested (safety first)
  const force = options.force === true;

  if (isUpdate && force) {
    console.log(chalk.yellow('🔄 Force updating existing installation...'));
  } else if (isUpdate && !force) {
    console.log(chalk.yellow('🔄 Updating (will prompt for changes, backups created)...'));
  } else if (!isUpdate) {
    console.log(chalk.green('🎉 Fresh installation...'));
  }

  // Ensure directories exist
  console.log(chalk.gray('Creating directories...'));
  await ensureDir(CLAUDE_DIR);
  await ensureDir(AGENTS_DIR);
  await ensureDir(COMMANDS_DIR);
  await ensureDir(CUSTOM_AGENTS_DIR);

  // Get template paths
  const templatesDir = path.join(__dirname, '..', 'templates');
  const agentsTemplateDir = path.join(templatesDir, 'agents');
  const commandsTemplateDir = path.join(templatesDir, 'commands');

  // Copy agents
  console.log(chalk.gray('\nInstalling agents...'));
  const agentFiles = await fs.readdir(agentsTemplateDir);
  for (const file of agentFiles) {
    // SECURITY: Validate filename to prevent path traversal
    const fileName = path.basename(file);
    if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
      console.log(chalk.yellow(`  ⚠️  Skipped suspicious file: ${file}`));
      continue;
    }

    const src = path.join(agentsTemplateDir, fileName);
    const dest = path.join(AGENTS_DIR, fileName);

    // SECURITY: Verify resolved paths stay within expected directories
    const resolvedSrc = path.resolve(src);
    const resolvedDest = path.resolve(dest);
    const resolvedTemplates = path.resolve(agentsTemplateDir);
    const resolvedAgents = path.resolve(AGENTS_DIR);

    if (!resolvedSrc.startsWith(resolvedTemplates) ||
        !resolvedDest.startsWith(resolvedAgents)) {
      console.log(chalk.red(`  🚨 Security violation blocked: ${file}`));
      continue;
    }

    // SECURITY: Check for symlinks
    try {
      const stats = await fs.lstat(src);
      if (stats.isSymbolicLink()) {
        console.log(chalk.red(`  🚨 Blocked symlink: ${file}`));
        continue;
      }
    } catch (error) {
      console.log(chalk.yellow(`  ⚠️  Could not verify ${file}: ${error.message}`));
      continue;
    }

    await copyTemplate(src, dest, `agent: ${fileName}`, force);
  }

  // Copy commands
  console.log(chalk.gray('\nInstalling commands...'));
  const commandFiles = await fs.readdir(commandsTemplateDir);
  for (const file of commandFiles) {
    // SECURITY: Validate filename to prevent path traversal
    const fileName = path.basename(file);
    if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
      console.log(chalk.yellow(`  ⚠️  Skipped suspicious file: ${file}`));
      continue;
    }

    const src = path.join(commandsTemplateDir, fileName);
    const dest = path.join(COMMANDS_DIR, fileName);

    // SECURITY: Verify resolved paths stay within expected directories
    const resolvedSrc = path.resolve(src);
    const resolvedDest = path.resolve(dest);
    const resolvedTemplates = path.resolve(commandsTemplateDir);
    const resolvedCommands = path.resolve(COMMANDS_DIR);

    if (!resolvedSrc.startsWith(resolvedTemplates) ||
        !resolvedDest.startsWith(resolvedCommands)) {
      console.log(chalk.red(`  🚨 Security violation blocked: ${file}`));
      continue;
    }

    // SECURITY: Check for symlinks
    try {
      const stats = await fs.lstat(src);
      if (stats.isSymbolicLink()) {
        console.log(chalk.red(`  🚨 Blocked symlink: ${file}`));
        continue;
      }
    } catch (error) {
      console.log(chalk.yellow(`  ⚠️  Could not verify ${file}: ${error.message}`));
      continue;
    }

    await copyTemplate(src, dest, `command: ${fileName}`, force);
  }

  console.log(chalk.gray('\n📁 Installation locations:'));
  console.log(chalk.gray(`  Agents:   ${AGENTS_DIR}`));
  console.log(chalk.gray(`  Commands: ${COMMANDS_DIR}`));
  console.log(chalk.gray(`  Custom:   ${CUSTOM_AGENTS_DIR}`));
}

async function uninstall() {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Remove AI Council agents and commands?',
      default: false
    }
  ]);

  if (!confirm) {
    console.log(chalk.gray('Uninstall cancelled'));
    return;
  }

  // Remove installed files
  const filesToRemove = [
    path.join(AGENTS_DIR, 'skeptical-architect.md'),
    path.join(COMMANDS_DIR, 'council.md')
  ];

  for (const file of filesToRemove) {
    const exists = await fileExists(file);
    if (exists) {
      await fs.unlink(file);
      console.log(chalk.gray(`  ✓ Removed ${path.basename(file)}`));
    }
  }

  // Ask about custom agents
  const customExists = await fileExists(CUSTOM_AGENTS_DIR);
  if (customExists) {
    const customFiles = await fs.readdir(CUSTOM_AGENTS_DIR);
    if (customFiles.length > 0) {
      const { removeCustom } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'removeCustom',
          message: `Remove ${customFiles.length} custom agent(s)?`,
          default: false
        }
      ]);

      if (removeCustom) {
        await fs.rm(CUSTOM_AGENTS_DIR, { recursive: true, force: true });
        console.log(chalk.gray(`  ✓ Removed custom agents`));
      }
    }
  }
}

async function addAgent(agentPath) {
  const fullPath = path.resolve(agentPath);

  // Security: Prevent path traversal attacks
  const fileName = path.basename(fullPath);
  if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
    throw new Error('Invalid filename: path traversal detected');
  }

  const exists = await fileExists(fullPath);
  if (!exists) {
    throw new Error(`Agent file not found: ${agentPath}`);
  }

  // Validate it's a markdown file
  if (!fullPath.endsWith('.md')) {
    throw new Error('Agent file must be a .md (Markdown) file');
  }

  // Ensure custom agents directory exists
  await ensureDir(CUSTOM_AGENTS_DIR);

  // Copy to custom agents directory
  const dest = path.join(CUSTOM_AGENTS_DIR, fileName);

  // Security: Verify destination is within custom agents directory
  const resolvedDest = path.resolve(dest);
  const resolvedCustomDir = path.resolve(CUSTOM_AGENTS_DIR);
  if (!resolvedDest.startsWith(resolvedCustomDir)) {
    throw new Error('Security error: destination outside custom agents directory');
  }

  const destExists = await fileExists(dest);
  if (destExists) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Custom agent "${fileName}" already exists. Overwrite?`,
        default: false
      }
    ]);

    if (!overwrite) {
      console.log(chalk.gray('Cancelled'));
      return;
    }
  }

  // Read, validate, and copy
  const content = await fs.readFile(fullPath, 'utf8');
  await validateTemplate(content, fullPath);
  await fs.writeFile(dest, content, 'utf8');

  console.log(chalk.green(`\n✓ Installed custom agent: ${fileName}`));
  console.log(chalk.gray(`📁 Location: ${dest}`));
  console.log(chalk.gray(`\n💡 To use this agent, reference it in your /council command`));
  console.log(chalk.gray(`   or launch directly with the Task tool.`));
}

module.exports = {
  install,
  uninstall,
  addAgent
};
