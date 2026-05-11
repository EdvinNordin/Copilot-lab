---
applyTo: '**/*.*'
---

# Organisation Instructions — Cydig

This document defines organisation-wide standards for all application components.
Copilot must verify that the code adheres to these instructions when generating or modifying code and when reviewing pull requests.
Copilot must always add a reference to the relevant section in this document when writing chat answers or pull request comments.

Applies to all repositories and all code generated, modified, or reviewed by Copilot.

---

## 1. Tech Stack

_Reference: Secure Development, Defense-in-Depth_

Copilot must assume these when generating or reviewing code.

- **Languages:** TypeScript, JavaScript, CSS, HTML, YAML.
- **Frontend:** React (TSX/JSX), Vite, Tailwind CSS. Auth via MSAL React / Auth0 / NextAuth.
- **Backend (API & BFF):** Node.js, Express, NestJS, axios, helmet.
- **Testing:** Jest, Mocha, Vitest.
- **Infrastructure:** Azure (Key Vault, Managed Identity and so on). Terraform.
- **CI/CD:** GitHub Actions, CodeQL, Dependabot.

---

## 2. Security by Design

_Reference: Defense-in-Depth, Secure Architecture_

Copilot must enforce:

- Follow defense-in-depth and least-privilege.
- Systems must fail securely and deny access by default.
- Conduct threat modeling for new features.
- Document security exceptions with compensating controls.
- Detect OWASP ASVS v5.0.0 violations and suggest corrections.
- Warn when security posture is weakened.

---

## 3. Authentication & Authorization

_Reference: Identity Modeling, Secure APIs by Design_

Copilot must verify:

### 3.1 Authentication

- Use OAuth 2.0, OpenID Connect, or SAML only. No custom auth schemes.
- Enforce MFA. Support passwordless.

### 3.2 Authorization

- Authorization (role/claims-based) at service layer. Client-side checks are never sole defense.
- Tenant/market data isolation at data access layer. Cross-tenant denied by default, audited.

### 3.3 Session Management

- Secure sessions: timeouts, invalidation on logout/password change, random identifiers.

---

## 4. Input Validation & Output Encoding

_Reference: Secure Development, Defense-in-Depth_

Copilot must verify:

- Allowlist-validate all untrusted input. Server-side validation mandatory.
- Context-aware output encoding (HTML, URL, JS, SQL). Use parameterized queries/ORMs.
- Validate file uploads (type, size, content). No dynamic code execution (eval, exec).

---

## 5. Data Protection

_Reference: Infrastructure & Data Storage_

Copilot must verify:

- Encrypt sensitive data in transit.
- Never hardcode secrets, credentials, or keys. Use secure key management.
- Apply data minimization, retention policies, secure deletion. Handle PII per GDPR.

---

## 6. API Security

_Reference: Secure APIs, Secure APIs by Design_

Copilot must verify:

- All endpoints authenticated unless explicitly public. Validate tokens every request.
- Rate limiting required. Validate all parameters (query, path, body, headers).
- Never expose internal identifiers or stack traces. Sanitize error messages.

---

## 7. Logging & Monitoring

_Reference: Defense-in-Depth_

Copilot must verify:

- Log security events (auth, authz, sensitive changes) with context (timestamp, user, IP, action, outcome).
- Never log passwords, tokens, or PII.
- Centralize logs, monitor anomalies, alert on critical events.

---

## 8. Vulnerability & Dependency Management

_Reference: Defense-in-Depth, Test-Driven AppSec_

Copilot must verify:

- Keep dependencies updated. Remove unused libraries. Use SCA scanning in CI/CD.
- Implement SAST, DAST, security gates. Prioritize remediation by severity.

---

## 9. Test-Driven Application Security

_Reference: Test-Driven AppSec_

Copilot must enforce:

- Automated tests for all security requirements, including negative tests.
- Test auth flows, session management, output encoding, CSRF.
- Security tests in CI/CD must block insecure deployments.

---

## 10. Code Quality

_Reference: Secure Development, Defense-in-Depth_

Copilot must enforce:

- Code must conform to project ESLint and Prettier configs.
- After changes, run `npm run lint` and `npm run format:check`. Auto-fix violations.
- Never disable linting/formatting rules without justified comment.
- Projects must have ESLint/Prettier configs. Warn if missing. Integrate in CI/CD.

---

## 11. Compliance & Governance

_Reference: Secure Architecture_

Copilot must verify:

- Comply with GDPR, PCI-DSS, HIPAA, SOC 2 as applicable.
- Maintain audit trails. Conduct regular compliance assessments.

---

## Omegapoint Verification Reference (mandatory)

End every chat answer or PR comment with:

`Omegapoint verification(s): Vx.Y[, Vn.Z ...] (https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications)`

---

## References

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Secure APIs by Design: https://securityblog.omegapoint.se/en/secure-apis-by-design
- Omegapoint Test-Driven AppSec: https://securityblog.omegapoint.se/en/test-driven-application-security
- Omegapoint Defense-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- OWASP ASVS v5.0.0: https://owasp.org/www-project-application-security-verification-standard/