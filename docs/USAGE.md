# Usage Guide

Complete guide to using AI Council in Claude Code for better architectural decisions.

---

## 🚀 Getting Started

### Installation

```bash
npx @ai-council/claude install
```

This installs to `~/.claude/`:
```
~/.claude/
├── agents/
│   ├── skeptical-architect.md
│   └── custom/                 # Your custom agents go here
└── commands/
    └── council.md              # /sc:council slash command
```

---

## 💬 Basic Usage

### The `/sc:council` Command

```bash
/sc:council

Problem: [Your specific question or decision]
Context: [Relevant background information]
```

**Example**:
```bash
/sc:council

Problem: Should we add Redis caching or optimize PostgreSQL queries?
Context: Dashboard loads in 800ms, 2000 concurrent users, PostgreSQL 14
```

---

## 🎯 When to Use AI Council

### ✅ Good Use Cases

**Architecture Decisions**:
```
Problem: Monolith vs microservices for new payment system?
Context: 15K users, 8 devs, need PCI compliance
```

**Technology Selection**:
```
Problem: Next.js vs Remix for admin dashboard?
Context: Team knows React, need SSR, have REST API
```

**Performance Optimization**:
```
Problem: Slow API responses (500ms p95)
Context: Node.js + PostgreSQL, 50 endpoints, 5K users
```

**Code Review**:
```
Problem: Review this auth implementation for security
Context: [code snippet or file reference]
```

**Refactoring Decisions**:
```
Problem: Extract user management into separate service?
Context: 50K LOC monolith, user code across 30 files
```

### ❌ Not Ideal For

- Simple syntax questions (use Claude directly)
- Debugging specific errors (use root-cause-analyst)
- Writing code from scratch (use Task with appropriate agent)
- Learning concepts (use learning-guide or documentation)

---

## 🎭 Understanding the Council Process

### Phase 1: Parallel Consultation

Council launches 3-4 specialized agents **in parallel**:

```
Agent Alpha (skeptical-architect):
  → Challenges complexity
  → Provides 3 approaches (boring, balanced, ambitious)

Agent Beta (system-architect):
  → Evaluates scalability
  → Considers design patterns

Agent Gamma (security-engineer):
  → Assesses vulnerabilities
  → Reviews security implications

Agent Delta (domain-specific):
  → Context-specific expertise
  → Detailed implementation analysis
```

### Phase 2: Anonymous Analysis

Responses are collected with code names to prevent bias:
- "Agent Alpha says..."
- "Agent Beta argues..."
- "Agent Gamma warns..."

### Phase 3: Smart Synthesis

Main Claude synthesizes all perspectives:
- 🤝 Areas of agreement
- ⚡ Productive disagreements
- 🎯 Synthesized recommendation
- ⚖️ Trade-off matrix
- 🚨 Universal concerns

---

## 📊 Interpreting Council Output

### Understanding the Synthesis

```markdown
## 🤝 Areas of Agreement

All agents agreed:
- ✅ [Point of consensus]
- ✅ [Shared recommendation]

## ⚡ Productive Disagreements

**Alpha vs Beta**:
- Alpha: "Start simple with PostgreSQL"
- Beta: "Plan for Redis from day one"
- Trade-off: Complexity vs future-proofing

Resolution: Start simple, add Redis when metrics show need
```

### The Decision Matrix

```markdown
| Criterion | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Time      | 2 weeks  | 4 weeks  | 8 weeks  |
| Team fit  | High     | Medium   | Low      |
| Scale     | 10K      | 100K     | 1M+      |
```

Use this to make informed choices based on YOUR context.

### Escape Hatches

Every recommendation includes escape hatches:

```markdown
Migration Path:
  Now: Simple sessions
  At 10K users: Add Redis (1 day)
  At 100K users: Hybrid JWT (1 week)
```

This means you're never locked in.

---

## 🔧 Advanced Usage

### Custom Agent Selection

```bash
/sc:council --agents="skeptical,performance,security"
```

Default panels:
- **Standard**: skeptical, system, security, performance
- **Feature**: skeptical, requirements-analyst, quality
- **Performance**: performance, skeptical, root-cause-analyst

### Focusing the Analysis

Be specific in your problem statement:

**Vague** ❌:
```
Problem: Our app is slow
```

**Specific** ✅:
```
Problem: Dashboard loads in 2s, users expect <500ms
Context: React frontend, Node.js API, PostgreSQL
Metrics: 500 concurrent users, 50 API endpoints
Constraints: 3 frontend devs, can't rewrite in new framework
```

### Including Code References

```bash
/sc:council

Problem: Review this authentication implementation
Context: src/auth/session.ts lines 45-120
Requirements: Support 10K concurrent sessions, GDPR compliant

[Include code snippet or file reference]
```

---

## 💡 Best Practices

### 1. Provide Context

**Essential Context**:
- Team size and skill level
- Current scale (users, data, requests)
- Growth expectations
- Resource constraints (time, budget, team capacity)

**Example**:
```
Context:
- Team: 2 backend devs, 1 junior
- Scale: 1K users, projecting 10K in 6mo
- Stack: Node.js + PostgreSQL
- Constraint: Ship in 4 weeks, budget for 1 new service max
```

### 2. Ask Specific Questions

**Vague**: "How should we build this?"
**Specific**: "Given our Node.js stack and 2 devs, should we build custom auth or use Auth0?"

### 3. Use for Decisions, Not Learning

**Good**: "Which database scaling approach for our use case?"
**Bad**: "Explain how databases work"

### 4. Trust the Skeptical Architect

The skeptical architect will challenge ALL options, including the recommendation.
This is a feature, not a bug. Listen to the concerns.

### 5. Consider All Three Approaches

Don't just pick the recommendation. Read all 3 approaches:
- **Option A** might be right if speed matters
- **Option B** might be right if growth is certain
- **Option C** might be right if you have the team

---

## 🎯 Real-World Examples

### Example 1: Database Choice

```bash
/sc:council

Problem: PostgreSQL vs MongoDB for event logging system
Context:
- 10M events/day, growing 20%/month
- Need: Time-series queries, aggregations, 90-day retention
- Team: 3 backend devs, all know PostgreSQL, none know MongoDB
- Constraints: 3-month timeline, can't hire
```

**Council Output**:
- Skeptical: "Use PostgreSQL with partitioning, you know it"
- System: "MongoDB better for time-series, but learning curve"
- Performance: "PostgreSQL with TimescaleDB extension"

**Synthesis**: PostgreSQL + TimescaleDB
- Team already knows PostgreSQL
- TimescaleDB adds time-series optimization
- 1 week to implement vs 6 weeks learning MongoDB
- Migration to dedicated time-series DB always possible

### Example 2: API Design

```bash
/sc:council

Problem: REST vs GraphQL for mobile app API
Context:
- Mobile app (iOS + Android)
- 20 endpoints currently, growing to 50
- Team: 2 backend (REST experience), 2 mobile (no GraphQL)
- Timeline: Ship mobile app in 8 weeks
```

**Council Output**:
- Skeptical: "REST works fine, GraphQL is overkill"
- System: "GraphQL better for mobile (single endpoint, flexible)"
- Backend: "GraphQL adds 3 weeks to timeline"

**Synthesis**: REST now, GraphQL later
- 8-week timeline too tight for GraphQL learning
- REST + API versioning allows migration
- Plan GraphQL for v2 post-launch

### Example 3: Caching Strategy

```bash
/sc:council

Problem: Add Redis caching layer for slow product catalog
Context:
- Current: PostgreSQL, 500ms query time
- 10K products, updated hourly
- 1K concurrent users
- Team: 2 backend devs
```

**Council Output**:
- Skeptical: "Did you add indexes? Show EXPLAIN output first"
- Performance: "Materialized views + PostgreSQL cache might be enough"
- System: "Redis makes sense if PostgreSQL optimization fails"

**Synthesis**: 3-Step Approach
1. Add indexes (2 hours) - try first
2. If still slow: Materialized views (1 day)
3. If still slow: Redis (1 week)

Don't skip straight to Redis without measuring.

---

## 🐛 Troubleshooting

### Council Takes Too Long

**Problem**: 4 agents → each takes 30-60 seconds

**Solutions**:
1. Reduce agent count: `--agents="skeptical,system,security"` (3 agents)
2. Make problem more specific (reduces response complexity)
3. Consider using single specialized agent for narrow questions

### Conflicting Recommendations

**This is normal!** Conflicts reveal important trade-offs.

**Example**:
- Skeptical: "Use sessions" (simplicity)
- System: "Use JWT" (scalability)

**Resolution**: Choose based on YOUR priorities (time vs future scale).

### Agents Agreeing Too Much

**Possible causes**:
- Problem too clear-cut (e.g., "Use HTTPS for passwords")
- Not enough context to debate
- Missing key constraints

**Fix**: Add more context about constraints, timeline, team.

---

## 📚 Related Commands

### Other Slash Commands

```bash
/sc:analyze      # Deep code analysis
/sc:design       # Architecture design
/sc:research     # Deep research mode
/sc:implement    # Feature implementation
```

### Combining with Council

```bash
# First: Research with deep-research
/sc:research "Latest React state management patterns 2025"

# Then: Council decision
/sc:council
Problem: Choose state management for our app
Context: [Use research findings]
```

---

## 🎓 Learning Resources

- [Custom Agents Guide](CUSTOM_AGENTS.md) - Create your own agents
- [GitHub Discussions](https://github.com/yourusername/ai-council-claude/discussions) - Community Q&A
- [Examples Directory](../examples/) - Real-world council sessions

---

## 💬 Getting Help

**Found a bug?** [Open an issue](https://github.com/yourusername/ai-council-claude/issues)

**Have a question?** [Start a discussion](https://github.com/yourusername/ai-council-claude/discussions)

**Want to contribute?** See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**Happy architecting! 🏛️**

*Remember: The council provides perspectives, you make the final decision based on your unique context.*
