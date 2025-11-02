# 🚀 Quick Start Guide

Get AI Council running in 2 minutes.

---

## Installation

```bash
npx @ai-council/claude install
```

That's it! AI Council is now installed to `~/.claude/`

---

## First Use

In Claude Code, use the `/sc:council` command:

```
/sc:council

Problem: Should we use PostgreSQL or MongoDB for our app?

Context: E-commerce site, 10K products, need full-text search, team knows SQL
```

---

## What Happens Next

1. **4 agents analyze in parallel** (~30-45 seconds)
   - Skeptical Architect
   - System Architect
   - Security Engineer
   - Backend Architect

2. **You get a synthesis** with:
   - 🤝 Where agents agree
   - ⚡ Where they disagree (reveals trade-offs)
   - 🎯 3 viable approaches
   - 📊 Decision matrix
   - 💡 Recommendation (with concerns)

---

## Example Output

```markdown
## 🎯 Three Viable Approaches

### Option A: PostgreSQL (Boring But Works)
Timeline: 2 weeks | Risk: Low
Fails when: >1M products with complex search

### Option B: PostgreSQL + Elasticsearch (Balanced)
Timeline: 4 weeks | Risk: Medium
Fails when: Team can't maintain two systems

### Option C: MongoDB (Ambitious)
Timeline: 6 weeks | Risk: High
Fails when: Team learning curve delays launch

## 💡 Recommendation: Option A

Start with PostgreSQL, add Elasticsearch when search becomes bottleneck.

Escape hatch: Migration to Elasticsearch takes 1 week when needed.
```

---

## Common Commands

```bash
# Install
npx @ai-council/claude install

# Add custom agent
npx @ai-council/claude add-agent ./my-agent.md

# Uninstall
npx @ai-council/claude uninstall
```

---

## Pro Tips

### 1. Be Specific

❌ **Vague**: "How should we build this?"
✅ **Specific**: "Node.js + PostgreSQL vs Python + MongoDB for 10K user SaaS?"

### 2. Include Context

```
Context:
- Team: 3 backend devs (know Node.js, learning Python)
- Scale: 1K users now, 10K in 6mo
- Timeline: Ship in 8 weeks
```

### 3. Trust the Skeptical Architect

The skeptical architect challenges EVERYTHING (including the recommendation).
This prevents over-engineering.

### 4. Read All 3 Options

Don't just pick the recommendation. Consider:
- **Option A** if speed matters most
- **Option B** if growth is certain
- **Option C** if you have the team/time

---

## Next Steps

- Read [Full Documentation](README.md)
- Learn [Usage Patterns](docs/USAGE.md)
- Create [Custom Agents](docs/CUSTOM_AGENTS.md)

---

**That's it! Start making better architecture decisions. 🏛️**

*The council provides perspectives. You make the final decision.*
