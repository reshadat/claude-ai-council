#!/usr/bin/env node

const { install, uninstall, addAgent } = require('../src/installer');
const chalk = require('chalk');

const command = process.argv[2];
const args = process.argv.slice(3);
const hasFlag = (flag) => args.includes(`--${flag}`) || args.includes(`-${flag[0]}`);

async function main() {
  try {
    switch (command) {
      case 'install':
        const forceFlag = hasFlag('force') || hasFlag('f');
        const noForceFlag = hasFlag('no-force');
        console.log(chalk.blue('🏛️  Installing AI Council for Claude Code...\n'));

        // Only pass force option if explicitly set
        const installOptions = {};
        if (forceFlag) installOptions.force = true;
        if (noForceFlag) installOptions.force = false;

        await install(installOptions);
        console.log(chalk.green('\n✅ AI Council installed successfully!'));
        console.log(chalk.gray('\nUsage:'));
        console.log(chalk.gray('  In Claude Code, use: /council'));
        console.log(chalk.gray('  Or manually launch agents with Task tool\n'));
        break;

      case 'uninstall':
        console.log(chalk.yellow('🗑️  Uninstalling AI Council...\n'));
        await uninstall();
        console.log(chalk.green('\n✅ AI Council uninstalled successfully!'));
        break;

      case 'add-agent':
        const agentPath = process.argv[3];
        if (!agentPath) {
          console.error(chalk.red('❌ Error: Please provide path to agent file'));
          console.log(chalk.gray('\nUsage: ai-council add-agent <path-to-agent.md>'));
          process.exit(1);
        }
        await addAgent(agentPath);
        console.log(chalk.green('\n✅ Custom agent added successfully!'));
        break;

      default:
        console.log(chalk.blue('🏛️  AI Council - Multi-Agent Consensus for Claude Code\n'));
        console.log('Commands:');
        console.log(chalk.gray('  install      Install AI Council to ~/.claude (system-wide)'));
        console.log(chalk.gray('  uninstall    Remove AI Council from ~/.claude'));
        console.log(chalk.gray('  add-agent    Add a custom agent'));
        console.log(chalk.gray('\nFlags:'));
        console.log(chalk.gray('  --no-force   Prompt before overwriting (default auto-updates)'));
        console.log(chalk.gray('\nUsage:'));
        console.log(chalk.gray('  npx @ai-council/claude install              # Smart install/update'));
        console.log(chalk.gray('  npx @ai-council/claude install --no-force   # Prompt for changes'));
        console.log(chalk.gray('  npx @ai-council/claude add-agent ./my-agent.md\n'));
        break;
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}

main();
