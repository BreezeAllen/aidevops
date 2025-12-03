# Git Platform CLI Integration

<!-- AI-CONTEXT-START -->

## Quick Reference

- **GitHub**: `gh` - `brew install gh` - `gh auth login`
- **GitLab**: `glab` - `brew install glab` - `glab auth login`
- **Gitea**: `tea` - `go install code.gitea.io/tea@latest` - `tea login add`

**Recommendation**: Use native CLIs directly. They handle auth securely and are well-maintained.
<!-- AI-CONTEXT-END -->

## Overview

Use the official CLI tools for each Git platform. They provide secure authentication, comprehensive features, and are actively maintained.

## GitHub CLI (`gh`)

The official GitHub CLI. See [github-cli.md](github-cli.md) for detailed usage.

```bash
# Install
brew install gh

# Authenticate
gh auth login

# Common operations
gh repo list
gh issue list
gh pr create
gh release create v1.0.0 --generate-notes
```

## GitLab CLI (`glab`)

The official GitLab CLI. See [gitlab-cli.md](gitlab-cli.md) for detailed usage.

```bash
# Install
brew install glab

# Authenticate
glab auth login

# Common operations
glab repo list
glab issue list
glab mr create
glab release create v1.0.0
```

## Gitea CLI (`tea`)

The official Gitea CLI. See [gitea-cli.md](gitea-cli.md) for detailed usage.

```bash
# Install
go install code.gitea.io/tea@latest

# Authenticate
tea login add

# Common operations
tea repos list
tea issues list
tea pulls create
tea releases create v1.0.0
```

## Multi-Platform Workflows

For repositories mirrored across platforms:

```bash
# Push to multiple remotes
git remote add github git@github.com:user/repo.git
git remote add gitlab git@gitlab.com:user/repo.git
git push github main
git push gitlab main

# Or use a push alias for all
git remote add all git@github.com:user/repo.git
git remote set-url --add --push all git@github.com:user/repo.git
git remote set-url --add --push all git@gitlab.com:user/repo.git
git push all main
```

## Authentication Best Practices

1. **Use CLI auth** - Each CLI stores tokens securely in your keyring
2. **Avoid env vars** - Only use `GITHUB_TOKEN` etc. when scripts require it
3. **Get token from CLI** - Use `gh auth token` when needed
4. **SSH for git** - Use SSH keys for git push/pull operations
