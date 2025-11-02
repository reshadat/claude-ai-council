# Contributing to AI Council

Thank you for your interest in contributing! This document provides guidelines for contributing to the AI Council project.

---

## 🎯 Ways to Contribute

- 🐛 **Report Bugs**: Found an issue? Let us know!
- 💡 **Suggest Features**: Have ideas for new agents or features?
- 📝 **Improve Documentation**: Help make the docs clearer
- 🎭 **Create Agents**: Design new expert agent personas
- 🔧 **Fix Issues**: Pick up an issue and submit a PR
- ⭐ **Spread the Word**: Star the repo, share with others

---

## 🐛 Reporting Bugs

Before creating a bug report:
1. Check existing issues to avoid duplicates
2. Test with the latest version
3. Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Run command '...'
2. See error

**Expected behavior**
What you expected to happen.

**Environment:**
 - OS: [e.g. macOS 14.0]
 - Node.js version: [e.g. 20.0.0]
 - AI Council version: [e.g. 1.0.0]

**Additional context**
Any other context about the problem.
```

---

## 💡 Feature Requests

We welcome feature suggestions! Use this template:

```markdown
**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you thought about.

**Use Case**
Real-world scenario where this helps.
```

---

## 🎭 Contributing Custom Agents

Creating a new expert agent? Great! Here's how:

### 1. Design the Agent

Follow the [Custom Agents Guide](docs/CUSTOM_AGENTS.md):
- Define clear expertise
- Create structured responses
- Give it a distinct voice
- Include examples

### 2. Test Your Agent

```bash
# Add locally
ai-council add-agent ./my-agent.md

# Test solo
# Launch via Task tool in Claude Code

# Test in council
/sc:council with your agent included
```

### 3. Submit for Review

```bash
# Fork the repo
git clone https://github.com/yourusername/ai-council-claude.git
cd ai-council-claude

# Create feature branch
git checkout -b agent/my-domain-expert

# Add your agent
cp ~/my-agent.md templates/agents/community/

# Commit
git add templates/agents/community/my-agent.md
git commit -m "Add [Domain] Expert agent"

# Push and create PR
git push origin agent/my-domain-expert
```

### Agent Review Criteria

✅ **Clear Expertise**: Well-defined domain and experience level
✅ **Structured Output**: Consistent, parseable response format
✅ **Distinct Voice**: Doesn't overlap with existing agents
✅ **Practical Value**: Solves real architectural/technical decisions
✅ **Examples Included**: Shows expected output format
✅ **Well Documented**: Clear usage instructions

---

## 🔧 Code Contributions

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/ai-council-claude.git
cd ai-council-claude

# Install dependencies
npm install

# Create a branch
git checkout -b feature/my-feature
```

### Making Changes

1. **Follow Existing Patterns**: Check similar code for conventions
2. **Keep It Simple**: Prefer clarity over cleverness
3. **Comment Complex Logic**: Help future maintainers
4. **Test Your Changes**: Ensure nothing breaks

### Commit Messages

Use clear, descriptive commit messages:

```
Good:
- "Add database performance engineer agent"
- "Fix installer crash on Windows"
- "Update README with custom agent examples"

Bad:
- "fix bug"
- "updates"
- "wip"
```

### Pull Request Process

1. **Update Documentation**: If you changed behavior, update docs
2. **Test Locally**: Run `npm install -g .` and test the CLI
3. **Describe Changes**: Explain what and why in PR description
4. **Link Issues**: Reference related issues with `Fixes #123`

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test these changes?

## Checklist
- [ ] Code follows project style
- [ ] Documentation updated
- [ ] Tested locally
- [ ] No breaking changes (or documented)
```

---

## 📝 Documentation Contributions

Documentation improvements are always welcome!

### What to Document

- 📖 Usage examples
- 🎯 Best practices
- ⚠️ Common pitfalls
- 🔧 Troubleshooting guides
- 🎭 Agent design patterns

### Documentation Style

- Use clear, simple language
- Include code examples
- Add screenshots where helpful
- Keep it concise

---

## 🏗️ Project Structure

```
ai-council-claude/
├── bin/
│   └── cli.js              # CLI entry point
├── src/
│   └── installer.js        # Installation logic
├── templates/
│   ├── agents/             # Agent personas
│   │   ├── skeptical-architect.md
│   │   └── community/      # Community agents
│   └── commands/           # Slash commands
│       └── council.md
├── docs/                   # Documentation
│   └── CUSTOM_AGENTS.md
├── package.json            # NPM package config
└── README.md               # Main documentation
```

---

## 🧪 Testing Guidelines

### Manual Testing

```bash
# Install locally
npm install -g .

# Test installation
ai-council install

# Verify files
ls ~/.claude/agents/
ls ~/.claude/commands/

# Test in Claude Code
# Use /sc:council command

# Test uninstall
ai-council uninstall
```

### Testing Checklist

- [ ] Installation works on fresh system
- [ ] Custom agent addition works
- [ ] Uninstall cleans up properly
- [ ] Cross-platform compatibility (macOS, Linux, Windows)

---

## 🤝 Code of Conduct

### Our Standards

**Positive Behaviors**:
- ✅ Being respectful and inclusive
- ✅ Accepting constructive criticism
- ✅ Focusing on what's best for the community
- ✅ Showing empathy toward others

**Unacceptable Behaviors**:
- ❌ Harassment or discriminatory language
- ❌ Trolling or insulting comments
- ❌ Personal or political attacks
- ❌ Publishing others' private information

### Enforcement

Project maintainers will:
1. Remove inappropriate content
2. Warn violators
3. Temporarily or permanently ban repeat offenders

---

## 📧 Getting Help

Need help with your contribution?

- 💬 [GitHub Discussions](https://github.com/yourusername/ai-council-claude/discussions)
- 📧 Open an issue with the `question` label
- 🎯 Tag maintainers in your PR for review

---

## 🎉 Recognition

Contributors who add valuable agents or features will be:
- Listed in the README
- Credited in release notes
- Given collaborator status (for regular contributors)

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to AI Council! 🙏**

Every contribution helps developers make better architectural decisions.
