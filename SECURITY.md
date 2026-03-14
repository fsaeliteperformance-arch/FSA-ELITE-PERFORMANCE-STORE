# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this repository, please open a private
security advisory via **GitHub → Security → Advisories → New draft advisory** rather
than filing a public issue.

---

## Secret / Credential Management

### Rules

1. **Never commit secrets.** API keys, tokens, passwords, or any credentials must
   never appear in source code, documentation, commit messages, or configuration
   files that are tracked by git.

2. **Use environment variables.** All secrets must be passed via environment
   variables (`.env.local` for local development, repository/environment secrets
   for CI/CD). See `.env.example` for the list of required variables.

3. **`.env.local` is git-ignored.** The `.gitignore` already excludes `.env`,
   `.env.local`, and `.env*.local`. Do not remove these entries.

4. **Rotate immediately on exposure.** If a secret is accidentally committed or
   otherwise exposed, revoke/rotate it immediately before doing anything else —
   do not rely on removing it from git history alone.

### Automated Scanning

Every push and pull request is scanned by [Gitleaks](https://github.com/gitleaks/gitleaks)
via the `secret-scan` GitHub Actions workflow. Any detected secret will fail the
check and block the merge.

### Incident Response

| Step | Action |
|------|--------|
| 1 | **Revoke** the exposed secret immediately (Stripe dashboard, GitHub settings, etc.) |
| 2 | **Rotate** — generate a new credential and update it in the appropriate secret store |
| 3 | **Audit** — review access logs for the revoked credential to check for unauthorized use |
| 4 | **Remove** the secret from git history using `git filter-repo` or BFG Repo Cleaner |
| 5 | **Force-push** the cleaned history and notify all collaborators to re-clone |
| 6 | **Document** the incident and update processes to prevent recurrence |
