# 🏛️ AI Council for Claude Code

> Multi-agent consensus system for better architectural decisions

Get balanced recommendations from multiple expert AI perspectives in parallel. Includes a **Skeptical Architect** who prevents over-engineering and a **Generative Architect** who finds the execution path.

---

## 🚀 Installation

```bash
# Quick install via npx (recommended)
npx claude-ai-council install

# Or install globally
npm install -g claude-ai-council
ai-council install
```

This installs to `~/.claude/` for system-wide use across all projects.

**Requirements**: Node.js ≥18.0.0, Claude Code

---

## 💡 Quick Start

Use the `/council` command in Claude Code:

```bash
/council

Problem: Should we use OAuth2 or session-based auth?
Context: Early-stage SaaS, 500 users, Node.js + PostgreSQL, 2 devs
```

The council will:
1. Launch 3-4 specialized agents in parallel
2. Collect anonymous expert opinions
3. Synthesize recommendations with trade-offs
4. Challenge all options (including the recommendation)

---

## 🎯 What You Get

### Skeptical Architect
30-year veteran who challenges complexity and provides 3 viable approaches:

```yaml
Option A - Boring But Works:
  What: Sessions with PostgreSQL
  Timeline: 3 weeks
  Fails when: 50K+ concurrent users

Option B - Balanced Pragmatism:
  What: JWT with refresh tokens
  Timeline: 5 weeks
  Fails when: Poor security practices

Option C - Ambitious Architecture:
  What: OAuth2 microservice
  Timeline: 8 weeks
  Fails when: 2 devs can't maintain it
```

**Startup Truths**:
- "Your first architecture will be wrong" → Build for change
- "You'll pivot before you scale" → Avoid premature optimization
- "2 devs can't maintain microservices" → Team size dictates architecture

### Generative Architect
Master builder who provides evolutionary build path:

```yaml
Core - Ship in 2 Weeks:
  Minimum viable version that proves the concept

Enhanced - Build Once Core Validates:
  Compound on validated foundation

Visionary - The Moonshot:
  Category-defining future state
```

**Build Truths**:
- "Shipped imperfect beats perfect unshipped"
- "Users will surprise you every time"
- "Momentum is a feature"

---

## ⚖️ Traditional vs Council Approach

**Traditional**:
```
You: "Should we use OAuth2 or sessions?"
Claude: "Use sessions for simplicity."
```

**AI Council**:
```
Launches 4 agents in parallel:
  • Skeptical: Challenges ALL options
  • Generative: Execution path for each
  • System: Scalability analysis
  • Security: Vulnerability assessment

Provides:
  ✅ 3 viable approaches (boring/balanced/ambitious)
  ⚡ Trade-off matrix
  🚨 Devil's advocate for each option
  📊 Decision framework with escape hatches
  💡 Recommendation WITH reservations
```

---

## 📖 Example Output

```markdown
## 🏛️ Council Synthesis: Authentication Decision

### 🤝 Consensus
All agents agreed: Session-based auth is right choice
- Implementation: 3 weeks vs 8 weeks (OAuth2)
- Security: Sessions MORE secure (immediate revocation)
- Scale: Works to 10K users, then add JWT only if needed

### ⚡ Productive Tension
Skeptical: "Sessions work fine, don't complicate"
System: "Consider hybrid JWT for future API needs"
Resolution: Start simple, migrate when needed

### 🎯 Recommendation
Build: Session-based authentication
Stack: express-session + connect-pg-simple + bcrypt
Timeline: 2-3 weeks

Migration Path:
  Now → 10K users: Sessions
  Mobile app needed: Add JWT (both coexist)
  Never: OAuth2 server (unless 50K+ users + 10 devs)

### 🚨 Critical Insight
"OAuth2 is for third-party authorization, not email/password.
When you add social login, you'll be OAuth2 CLIENT, not SERVER."
```

---

## 🎯 Council Modes

```bash
# Balanced council (recommended)
/council --agents="generative,skeptical,security,performance"

# Architecture review
/council --agents="skeptical,system,backend,security"

# Build mode (momentum-focused)
/council --agents="generative,skeptical,quality"

# Standard panel (default if no agents specified)
/council
```

---

## 🔧 Custom Agents

Add your own expert agents:

```bash
# Create agent file
echo "# My Domain Expert..." > my-expert.md

# Install it
ai-council add-agent ./my-expert.md

# Use in council
/council --agents="skeptical,my-expert"
```

See [docs/CUSTOM_AGENTS.md](docs/CUSTOM_AGENTS.md) for details.

---

## 🛠️ What Gets Installed

```
~/.claude/
├── agents/
│   ├── skeptical-architect.md
│   ├── generative-architect.md
│   └── custom/                 # Your custom agents
└── commands/
    └── council.md              # /council command
```

---

## 🔄 Updating

```bash
# Auto-updates to latest version
npx claude-ai-council install

# Prompt before overwriting
npx claude-ai-council install --no-force
```

Your custom agents in `~/.claude/agents/custom/` are never touched.

---

## 📚 Common Use Cases

**Architecture Decisions**
```bash
/council
Problem: Monolith vs microservices?
Context: 10K users, 5 devs
```

**Performance**
```bash
/council
Problem: Redis caching or optimize queries?
Context: 500ms response time, 1000 concurrent users
```

**Tech Selection**
```bash
/council
Problem: Next.js vs vanilla React?
Context: Team knows React, need SEO
```

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md).

- 🐛 Report bugs: [GitHub Issues](https://github.com/reshadat/claude-ai-council/issues)
- 💡 Suggest features
- 🎨 Share custom agents
- 📝 Improve docs

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 🔗 Links

- **NPM**: [claude-ai-council](https://www.npmjs.com/package/claude-ai-council)
- **GitHub**: [reshadat/claude-ai-council](https://github.com/reshadat/claude-ai-council)
- **Issues**: [Report bugs](https://github.com/reshadat/claude-ai-council/issues)

---

**Made by developers who've seen too many over-engineered systems**

*"Show me three paths. Challenge all of them. Ship the boring one that works."*
