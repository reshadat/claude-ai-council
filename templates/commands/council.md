# AI Council - Multi-Agent Consensus

Execute a multi-agent consensus process using Claude Code subagents for balanced decision-making.

## User Input

**Problem**: {{PROBLEM}}
**Context**: {{CONTEXT}}

## Agent Selection

Based on the problem type, select 3-5 agents:

**Standard Panel**: skeptical-architect, system-architect, security-engineer, performance-engineer
**Feature Dev**: skeptical-architect, requirements-analyst, system-architect, quality-engineer
**Performance**: performance-engineer, skeptical-architect, root-cause-analyst, system-architect
**Architecture**: skeptical-architect, system-architect, backend-architect, security-engineer

## Phase 1: Parallel Consultation

Launch selected agents in **parallel** (single message, multiple Task calls).

**IMPORTANT**: Before launching agents, you MUST read the skeptical architect persona:

1. Read ~/.claude/agents/skeptical-architect.md
2. Extract the full persona content
3. Include it in the skeptical architect Task prompt below

Then launch all agents in a SINGLE message with multiple Task calls:

### Agent 1: Skeptical Architect (Custom Persona)
```
Task({
  subagent_type: "general-purpose",
  description: "Skeptical architect analysis",
  prompt: `
    [FULL CONTENT FROM skeptical-architect.md GOES HERE]

    Now apply this persona to analyze:

    Context: {{CONTEXT}}
    Problem: {{PROBLEM}}

    Provide your skeptical analysis with 3 viable approaches:
    - Option A: Boring But Works
    - Option B: Balanced Pragmatism
    - Option C: Ambitious Architecture

    For each option include:
    - Timeline, Risk level
    - When this fails
    - Your recommendation with concerns
  `
})
```

### Agents 2-4: Built-in Subagents
```
Task({
  subagent_type: "system-architect",
  description: "System architect analysis",
  prompt: `
    Context: {{CONTEXT}}
    Problem: {{PROBLEM}}

    Provide your expert analysis:
    1. Assessment from your perspective
    2. Recommended approach
    3. Key risks/concerns
    4. Critical trade-offs

    Be concise and actionable.
  `
})

Task({
  subagent_type: "security-engineer",
  description: "Security engineer analysis",
  prompt: [same format as above]
})

Task({
  subagent_type: "quality-engineer",
  description: "Quality engineer analysis",
  prompt: [same format as above]
})
```

## Phase 2: Anonymous Collection

Assign code names to prevent bias:
- Agent Alpha: [skeptical-architect response]
- Agent Beta: [system-architect response]
- Agent Gamma: [security-engineer response]
- Agent Delta: [quality-engineer response]
- Agent Epsilon: [optional fifth]

## Phase 3: Synthesis

Analyze all anonymous responses and produce:

### 🤝 Areas of Agreement
[Common themes across agents]

### ⚡ Productive Disagreements
[Where agents differ - reveals important trade-offs]

**Alpha (Skeptical) vs Beta (System)**:
- Alpha: [minimalist position]
- Beta: [scalability position]
- Trade-off: [insight from tension]

### 🎯 Synthesized Recommendation

**Primary Recommendation**: [Clear action]

**Implementation**:
1. [Step considering all perspectives]
2. [Step addressing concerns]
3. [Step with risk mitigation]

**Key Trade-offs**:
- [Trade-off]: [How to manage]

**Risk Mitigation**:
- [Risk]: [Strategy]

### 📊 Decision Matrix

| Aspect | Majority View | Skeptical Alternative | Recommendation |
|--------|--------------|----------------------|----------------|
| Scope | [consensus] | [minimal approach] | [balanced] |
| Complexity | [consensus] | [simpler option] | [balanced] |
| Timeline | [consensus] | [fastest path] | [balanced] |

### 🚀 Next Steps
1. [Immediate validation]
2. [Measured implementation]
3. [Monitoring/rollback plan]

---

**Confidence**: [High/Medium/Low]
**Unanimous**: [Yes/No]
**Dissent Worth Noting**: [If applicable - especially skeptical architect's concerns]

## 🎯 Using the Skeptical Architect's 3 Approaches

The skeptical architect always provides 3 options. Don't just pick the recommendation:

- **Option A (Boring)**: Choose if speed and simplicity matter most
- **Option B (Balanced)**: Choose if growth is likely
- **Option C (Ambitious)**: Choose if you have team capacity and proven need

Consider escape hatches: How to migrate if you choose wrong?
