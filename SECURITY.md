# Security Policy

## Supported Versions

| Version/Branch | Supported          |
| -------------- | ------------------ |
| `main`         | :white_check_mark: |
| other branches | :x:                |

## Reporting a Vulnerability

- Please **do not open a public issue** for security matters.
- Submit a private report via [GitHub Security Advisories](https://github.com/fsaeliteperformance-arch/FSA-ELITE-PERFORMANCE-STORE/security/advisories/new).
- Include reproduction steps, affected endpoints/routes, and potential impact.
- We aim to acknowledge reports within **2 business days** and provide status updates at least weekly until resolution.

## Handling Secrets

- Never commit API keys, tokens, or credentials. Use `.env.local` (already gitignored) for local development.
- Server-only secrets such as `STRIPE_SECRET_KEY` must stay on the server or CI secrets store and are never exposed to the browser.
- Rotate any credential suspected of exposure and re-run secret scanning before deployment.
