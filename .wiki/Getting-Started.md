# Getting Started

This guide helps you get started with the AI DevOps Framework.

## Prerequisites

- Git
- Node.js 18+
- GitHub CLI (`gh`)
- Bash shell

## Installation

1. Clone the repository:

```bash
git clone https://github.com/marcusquinn/aidevops.git
cd aidevops
```

2. Run the setup:

```bash
npm run setup
```

3. Configure your API keys:

```bash
bash .agent/scripts/setup-local-api-keys.sh
```

## Directory Structure

```text
aidevops/
├── .agent/
│   ├── scripts/      # Helper scripts
│   ├── workflows/    # AI workflow guides
│   └── memory/       # Persistent AI context
├── .github/
│   └── workflows/    # CI/CD workflows
├── AGENTS.md         # AI assistant instructions
└── package.json      # Project configuration
```

## Next Steps

- Read the [Workflow Guides](Workflow-Guides)
- Explore the [Script Reference](Script-Reference)
- Set up [MCP Integrations](MCP-Integrations)
