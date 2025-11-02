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
**Build Mode**: generative-architect, skeptical-architect, system-architect, quality-engineer
**Balanced Council**: generative-architect, skeptical-architect, security-engineer, performance-engineer

## Custom Personas Available

**skeptical-architect**: Challenges assumptions, provides 3 options (boring/balanced/ambitious), devil's advocate
**generative-architect**: Finds ways to make it work, provides execution path (core/enhanced/visionary), builds momentum

**When to use both**:
- Generative shows "how to build it"
- Skeptical challenges "should you build it"
- Together they create balanced decision-making

## Phase 1: Parallel Consultation

Launch selected agents in **parallel** (single message, multiple Task calls).

**IMPORTANT**: Before launching custom agents, you MUST read their persona files:

1. For skeptical-architect: Read ~/.claude/agents/skeptical-architect.md
2. For generative-architect: Read ~/.claude/agents/generative-architect.md
3. Extract the full persona content
4. Include it in the respective Task prompts below

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

### Agent 2: Generative Architect (Custom Persona - Optional)
```
Task({
  subagent_type: "general-purpose",
  description: "Generative architect analysis",
  prompt: `
    [FULL CONTENT FROM generative-architect.md GOES HERE]

    Now apply this persona to analyze:

    Context: {{CONTEXT}}
    Problem: {{PROBLEM}}

    Provide your generative analysis with the path forward:
    - Core: Ship in 2 weeks (minimum viable version)
    - Enhanced: Build once Core validates
    - Visionary: The moonshot that becomes possible

    For each layer include:
    - Why this works
    - What you'll learn
    - Resource requirements
    - Implementation roadmap
  `
})
```

### Agents 3-5: Built-in Subagents
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

## 🎯 Using Custom Personas

### Skeptical Architect's 3 Approaches

The skeptical architect provides 3 options with trade-offs:

- **Option A (Boring)**: Choose if speed and simplicity matter most
- **Option B (Balanced)**: Choose if growth is likely
- **Option C (Ambitious)**: Choose if you have team capacity and proven need

Consider escape hatches: How to migrate if you choose wrong?

### Generative Architect's 3 Layers

The generative architect provides an evolutionary build path:

- **Core (2 weeks)**: Minimum viable version that proves the concept
- **Enhanced (Month 2-3)**: Build once Core validates and hits triggers
- **Visionary (Month 4-6)**: The moonshot that becomes possible

Focus on shipping Core first, then iterate based on real user feedback.

### Using Both Together

**Generative** provides the execution path ("Here's how to build it")
**Skeptical** provides the reality check ("Here's what could go wrong")

Together they create:
- Momentum (Generative) balanced with prudence (Skeptical)
- Optimism about possibilities with awareness of risks
- Clear path forward with escape hatches identified
