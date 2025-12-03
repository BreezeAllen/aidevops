import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "Create and manage GitHub releases using gh CLI with automatic changelog generation",
  args: {
    action: tool.schema.enum(["create", "draft", "list", "latest", "help"]).describe("Action to perform"),
    version: tool.schema.string().optional().describe("Version tag (e.g., v1.2.3 or 1.2.3)"),
    notes: tool.schema.string().optional().describe("Release notes (optional - auto-generates if not provided)"),
  },
  async execute(args) {
    // Normalize version to include 'v' prefix
    const version = args.version ? (args.version.startsWith("v") ? args.version : `v${args.version}`) : ""
    
    try {
      switch (args.action) {
        case "create": {
          if (!version) {
            return "Error: Version required for create action. Usage: github-release create v1.2.3"
          }
          // Check if release already exists
          const checkResult = await Bun.$`gh release view ${version} 2>&1`.text().catch(() => "not found")
          if (!checkResult.includes("not found") && !checkResult.includes("release not found")) {
            return `Release ${version} already exists. Use 'gh release view ${version}' to see details.`
          }
          // Create release with auto-generated notes or custom notes
          if (args.notes) {
            const result = await Bun.$`gh release create ${version} --title ${version} --notes ${args.notes}`.text()
            return `Release ${version} created successfully.\n${result}`
          } else {
            const result = await Bun.$`gh release create ${version} --title ${version} --generate-notes`.text()
            return `Release ${version} created with auto-generated notes.\n${result}`
          }
        }
        
        case "draft": {
          if (!version) {
            return "Error: Version required for draft action. Usage: github-release draft v1.2.3"
          }
          if (args.notes) {
            const result = await Bun.$`gh release create ${version} --title ${version} --notes ${args.notes} --draft`.text()
            return `Draft release ${version} created.\n${result}`
          } else {
            const result = await Bun.$`gh release create ${version} --title ${version} --generate-notes --draft`.text()
            return `Draft release ${version} created with auto-generated notes.\n${result}`
          }
        }
        
        case "list": {
          const result = await Bun.$`gh release list --limit 10`.text()
          return result || "No releases found."
        }
        
        case "latest": {
          const result = await Bun.$`gh release view --json tagName,name,publishedAt,url`.text()
          return result || "No releases found."
        }
        
        case "help":
        default:
          return `GitHub Release Tool (uses gh CLI)

Actions:
  create <version>  Create a new release (auto-generates changelog)
  draft <version>   Create a draft release for review
  list              List recent releases
  latest            Show the latest release details
  help              Show this help message

Examples:
  github-release create v1.2.3
  github-release create v1.2.3 --notes "Custom release notes"
  github-release draft v2.0.0
  github-release list
  github-release latest

Requirements:
  - gh CLI installed and authenticated (gh auth login)
  - Repository must be a git repo with GitHub remote

Note: Uses --generate-notes for automatic changelog from commits/PRs.`
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes("gh: command not found")) {
        return "Error: gh CLI not installed. Install with: brew install gh"
      }
      if (errorMessage.includes("not logged in")) {
        return "Error: gh CLI not authenticated. Run: gh auth login"
      }
      return `Error: ${errorMessage}`
    }
  },
})
