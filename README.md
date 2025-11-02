# 🏛️ AI Council for Claude Code

> Multi-agent consensus system for better architectural decisions through ensemble AI reasoning

AI Council brings the "wisdom of crowds" approach to Claude Code by enabling **parallel multi-agent consultation** for architecture decisions, code reviews, and technical planning. Get balanced recommendations from multiple expert perspectives, including a battle-hardened **skeptical architect** who prevents over-engineering.

---

## ✨ Features

- **🎯 Multi-Agent Consensus**: Query multiple specialized Claude Code agents in parallel
- **👴 Skeptical Architect**: 30-year veteran who challenges complexity and provides 3 viable approaches (boring/balanced/ambitious)
- **🏗️ Generative Architect**: Master builder who finds ways to make it work and provides execution path (core/enhanced/visionary)
- **⚖️ Balanced Perspective**: Destruction (Skeptical) + Construction (Generative) = Informed decisions
- **🚀 Startup-Aware**: Optimized for small teams, limited resources, and pivot probability
- **🔧 Extensible**: Add your own custom agents easily
- **📦 System-Wide**: Installs to `~/.claude` for use across all projects

---

## 🚀 Quick Start

### Installation

```bash
# Install globally via npx
npx @ai-council/claude install

# Or install and run
npm install -g @ai-council/claude
ai-council install
```

### Usage in Claude Code

Once installed, use the `/sc:council` command:

```bash
/sc:council

Problem: Should we implement OAuth2 + JWT + auth microservice, or use session-based authentication?

Context: Early-stage SaaS, 500 users → 5000 in 6mo, Node.js + PostgreSQL, 2 backend devs
```

The council will:
1. **Launch 3-4 specialized agents in parallel**
2. **Collect anonymous responses** (Agent Alpha, Beta, Gamma)
3. **Synthesize recommendations** with trade-off analysis
4. **Challenge all options** (including the recommendation)

---

## 🤔 What Makes This Different?

### Traditional Approach
```
You: "Should we use OAuth2 or sessions?"
Claude: "Use sessions for simplicity at your scale."
```

### AI Council Approach
```
You: "Should we use OAuth2 or sessions?"

AI Council launches 4 agents:
  - Skeptical Architect: Challenges ALL options
  - System Architect: Evaluates scalability
  - Security Engineer: Assesses vulnerabilities
  - Backend Architect: Estimates implementation

Synthesis provides:
  ✅ 3 viable approaches (boring, balanced, ambitious)
  ⚡ Trade-off matrix across all options
  🚨 Devil's advocate challenges to each approach
  📊 Decision framework with escape hatches
  💡 Recommendation WITH reservations
```

---

## 🎯 The Skeptical Architect

The star of the council is the **Skeptical Architect** - a 30-year startup veteran who:

### Always Provides 2-3 Approaches

```yaml
Option A - Boring But Works:
  What: Sessions with PostgreSQL
  Timeline: 3 weeks
  Risk: Low
  Fails when: 50K+ concurrent users

Option B - Balanced Pragmatism:
  What: Hybrid JWT with refresh tokens
  Timeline: 5 weeks
  Risk: Medium
  Fails when: Poor JWT security practices

Option C - Ambitious Architecture:
  What: OAuth2 microservice
  Timeline: 8 weeks
  Risk: High
  Fails when: 2 devs can't maintain complexity
```

### Challenges Every Option (Including Own Recommendation)

```
My Recommendation: Option A (Sessions)

But watch out for:
  - Mobile app requirement appearing suddenly
  - Session storage hitting limits at 10K users
  - Junior devs pushing for "resume-driven development"

Escape hatches:
  - Add JWT for mobile later (both can coexist)
  - Upgrade to Redis at 10K users (1 day migration)
```

### Startup Context Awareness

```yaml
Truth #1: "Your first architecture will be wrong"
  → Build for change, not perfection

Truth #2: "You'll pivot before you scale"
  → Premature optimization = wasted work

Truth #3: "2 devs can't maintain microservices"
  → Team size dictates architecture

Truth #4: "Users don't care about your tech stack"
  → Ship features, not architecture astronautics
```

---

## 🏗️ The Generative Architect

The complement to the Skeptical Architect - a **Master Builder** with 30 years of shipping experience who:

### Provides Evolutionary Build Path

```yaml
Core - Ship in 2 Weeks:
  What: Minimum viable version that proves the concept
  Focus: One specific use case solved completely
  Learns: What users actually want vs what you predicted

Enhanced - Build Once Core Validates:
  What: Compound on validated Core
  Triggers: Specific metrics and user feedback
  Adds: Capabilities that amplify Core value

Visionary - The Moonshot:
  What: Category-defining future state
  Path: Evolutionary, not revolutionary
  Built on: Proven foundation from Core + Enhanced
```

### Finds Ways to Make It Work

```
Your idea: "Build AI-powered code review tool"

Generative Analysis:
  ✅ This solves real pain (manual review is slow)
  ✅ Timing is right (post-Copilot trust in AI)
  ✅ Here's how we ship in 2 weeks...

Core (Week 1-2):
  - GitHub Action that comments on PRs
  - Uses OpenAI API to detect issues
  - Learn: What developers actually act on

Enhanced (Month 2):
  - Team-specific rule learning
  - Auto-fix suggestions
  - Build when: 50+ PRs with 40%+ acceptance

Visionary (Month 4-6):
  - Real-time IDE integration
  - Proactive architecture suggestions
  - Category creation: "AI code quality partner"
```

### Builds Momentum

```yaml
Truth #1: "Shipped imperfect beats perfect unshipped"
  → Market feedback > Internal perfection

Truth #2: "Users will surprise you every time"
  → Build to learn, not to predict

Truth #3: "Momentum is a feature"
  → Shipping creates clarity and resources

Truth #4: "Constraints breed creativity"
  → Limited resources = sharper solutions
```

---

## ⚖️ Using Both Architects Together

**Generative** provides the path: "Here's how to build it"
**Skeptical** provides the reality check: "Here's what could go wrong"

Together they create:
- **Momentum** (Generative) balanced with **prudence** (Skeptical)
- **Optimism** about possibilities with **awareness** of risks
- **Clear path forward** with **escape hatches** identified

```bash
/sc:council --agents="generative,skeptical,system,security"

# Generative: Here's the 2-week Core version...
# Skeptical: But watch out for these failure modes...
# System: Here's how it scales...
# Security: Here's what you must protect...
# = Balanced decision with execution path + risk mitigation
```

---

## 📖 Example Output

<details>
<summary>Click to see full council synthesis example</summary>

```markdown
## 🏛️ AI Council Synthesis: Authentication Decision

### 🤝 Unanimous Agreement

All 4 agents agreed:
- ✅ Session-based auth is the right choice
- ✅ OAuth2/JWT/microservice is over-engineering
- ✅ Implementation: 3 weeks (sessions) vs 8 weeks (OAuth2)
- ✅ Security: Sessions MORE secure (immediate revocation)

### ⚡ Productive Tension

**Skeptical vs System Architect**:
- Skeptical: "Do nothing complex, sessions work fine"
- System: "Consider hybrid JWT for future API needs"
- Resolution: Start simple, migrate only when needed

**Security vs Backend**:
- Security: "JWT in localStorage = critical XSS vulnerability"
- Backend: "But JWT has simpler implementation for APIs"
- Resolution: Session cookies with httpOnly flag beats JWT

### 🎯 Final Recommendation

**Build: Session-based authentication**

Stack: express-session + connect-pg-simple + bcrypt
Timeline: 2-3 weeks (2 devs)
Security: httpOnly cookies + CSRF + rate limiting

Migration Path:
  Now: Sessions (500-10K users)
  Later: Add JWT for mobile IF needed
  Never: OAuth2 microservice (unless >50K users + 10 devs)

### 📊 Decision Matrix

| Approach | Time | Complexity | Security | Scale |
|----------|------|------------|----------|-------|
| Sessions | 3 weeks | Low | High | 10K users |
| Hybrid JWT | 5 weeks | Medium | Medium | 50K users |
| OAuth2 | 8 weeks | High | Medium | 100K+ users |

### 🚨 Critical Insight (Skeptical Architect)

> "OAuth2 is for third-party authorization, not email/password login.
> When you add social login, you'll be an OAuth2 CLIENT, not SERVER.
> Building your own OAuth2 server = 130 engineering hours/year wasted."
```

</details>

---

## 🛠️ Installation Details

### What Gets Installed

```
~/.claude/
├── agents/
│   ├── skeptical-architect.md    # Challenges complexity, provides 3 options
│   ├── generative-architect.md   # Builds momentum, provides execution path
│   └── custom/                    # Your custom agents
└── commands/
    └── council.md                 # /sc:council slash command
```

### System Requirements

- Node.js >= 18.0.0
- Claude Code (with slash command support)

### Updating

When new versions are released, simply run install again:

```bash
# Auto-updates existing files without prompts
npx @ai-council/claude install

# Prompt before overwriting (if you want control)
npx @ai-council/claude install --no-force
```

**Smart Updates**: The installer auto-detects existing installations and updates files without prompting. Your custom agents in `~/.claude/agents/custom/` are never touched.

---

## 🔧 Adding Custom Agents

Create your own expert agents and add them to the council:

### 1. Create Agent Definition

```markdown
<!-- my-domain-expert.md -->

# Domain Expert Agent

You are an expert in [domain] with [experience].

## Core Directives

1. [Directive 1]
2. [Directive 2]

## Response Structure

[How this agent should respond]
```

### 2. Install Custom Agent

```bash
ai-council add-agent ./my-domain-expert.md
```

### 3. Use in Council

```bash
/sc:council --agents="skeptical,system,my-domain-expert"
```

See [CUSTOM_AGENTS.md](docs/CUSTOM_AGENTS.md) for detailed guide.

---

## 📚 Use Cases

### Architecture Decisions
```bash
/sc:council
Problem: Monolith vs microservices for new feature?
Context: 10K users, 5 devs, Node.js stack
```

### Performance Optimization
```bash
/sc:council
Problem: Add Redis caching or optimize PostgreSQL queries?
Context: 500ms average response time, 1000 concurrent users
```

### Technology Selection
```bash
/sc:council
Problem: Next.js vs vanilla React for new dashboard?
Context: Team knows React, need SEO, have backend API
```

### Code Review
```bash
/sc:council
Problem: Review this authentication implementation
Context: [paste code or file reference]
```

---

## 🎯 Council Modes

### Standard Panel (Default)
- **skeptical-architect**: Challenge complexity
- **system-architect**: Scalability & patterns
- **security-engineer**: Vulnerabilities
- **performance-engineer**: Speed & efficiency

### Balanced Council (Recommended)
- **generative-architect**: Execution path (how to build)
- **skeptical-architect**: Reality check (what could fail)
- **security-engineer**: Protection requirements
- **performance-engineer**: Speed & efficiency

### Custom Panels

```bash
# Build mode (momentum-focused)
/sc:council --agents="generative,skeptical,system,quality"

# Architecture review
/sc:council --agents="skeptical,system,backend,security"

# Performance optimization
/sc:council --agents="performance,skeptical,root-cause-analyst"

# Feature development
/sc:council --agents="generative,requirements-analyst,quality"
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new agent types
- 📝 Improve documentation
- 🔧 Add new features
- 🎨 Share custom agents

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- Inspired by [ai-council-mcp](https://github.com/0xAkuti/ai-council-mcp) multi-AI consensus approach
- Built for the [Claude Code](https://claude.ai/claude-code) developer community
- Skeptical Architect persona inspired by 30 years of real startup battle scars

---

## 🔗 Links

- **Documentation**: [docs/](docs/)
- **Issue Tracker**: [GitHub Issues](https://github.com/yourusername/ai-council-claude/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-council-claude/discussions)
- **NPM Package**: [@ai-council/claude](https://www.npmjs.com/package/@ai-council/claude)

---

## ⭐ Star History

If this helps you make better architecture decisions, give it a star!

---

**Made with ❤️ by developers who've seen too many over-engineered systems**

*"Show me three paths. Challenge all of them. Ship the boring one that works."*
