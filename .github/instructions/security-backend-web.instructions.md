---
applyTo: '**/web/**/*.{ts,js}'
---

# Backend Web & BFF Security Instructions (TypeScript/Node.js)

This document defines security instructions for backend web applications and BFF (Backend-for-Frontend) services serving web clients, built with TypeScript and Node.js.
Copilot must verify that the code adheres to these instructions when generating code or reviewing pull requests.
Copilot must always add a reference to the relevant section in any instruction in this document when writing chat answers or pull request comments.

## 1. Session & Authentication

_Reference: Web Browsers, Identity Modeling_

Copilot must verify:

### 1.1 Session Management

- Sessions must be created using secure, HTTP-only cookies to prevent XSS-based token theft.
- Use session management libraries such as `express-session`, `cookie-session`, or framework-specific solutions (e.g., NestJS session).
- Cookie Secure and SameSite attributes must be properly configured (Secure=true in production, SameSite=Strict or Lax).
- Session identifiers must be cryptographically random with sufficient entropy (use `crypto.randomBytes()` or library defaults).
- Configure appropriate session timeouts and implement session regeneration on privilege escalation.

### 1.2 Authentication

- Authentication must be properly enforced on all endpoints using authentication middleware.
- Use established authentication libraries (e.g., `passport`, `express-openid-connect`, or framework-specific auth guards).
- Failed authentication attempts must be rate-limited to prevent brute force attacks (use `express-rate-limit` or similar).
- If authentication errors occur they must result in a 401 response code.

### 1.3 Authorization

- Authorization must be enforced according to least privilege and zero trust principles.
- Use authorization middleware or guards applied per-route or route group.
- If authorization errors occur they must result in a 403 response code.

---

## 2. CSRF Protection

_Reference: Web Browsers, Secure APIs by Design_

Copilot must verify:

### 2.1 CSRF Token Handling

- CSRF tokens must be generated and validated for all state-changing operations (POST, PUT, DELETE, PATCH).
- Use CSRF protection middleware such as `csurf`, `csrf-csrf`, or framework-specific solutions (e.g., NestJS CSRF guard).
- Tokens must be unique per session and unpredictable (cryptographically random).
- Token validation must be enforced before processing state-changing requests.
- CSRF tokens should be included in forms or custom headers (e.g., X-CSRF-Token).

### 2.2 Defense Layers

- SameSite cookie attributes must be properly set as an additional defense layer (SameSite=Strict or Lax).
- Consider double-submit cookie pattern or synchronizer token pattern based on your architecture.

---

## 3. XSS Prevention

_Reference: Web Browsers, Secure APIs by Design_

Copilot must verify:

### 3.1 Output Encoding

- All dynamic content must be properly encoded when rendered to prevent stored and reflected XSS.
- Use templating engines with auto-escaping enabled by default (e.g., EJS with `<%=` for escaping, Handlebars, Pug, Nunjucks).
- For React/Vue server-side rendering, ensure proper escaping through framework defaults.
- User input must never be output directly into HTML attributes, JavaScript contexts, or CSS without proper encoding.
- Use context-aware encoding: HTML entity encoding for HTML context, JavaScript encoding for script context, URL encoding for URLs.
- Consider using sanitization libraries like `DOMPurify` (if rendering HTML) or `xss` for additional protection.

### 3.2 Input Validation

- Input validation must be applied according to trust boundaries using libraries like `joi`, `zod`, `validator.js`, or `class-validator`.
- Input output encoding must be applied according to trust boundaries and context.
- Reject or sanitize dangerous HTML/JavaScript patterns in user input.

---

## 4. HTTP Security Headers

_Reference: Web Browsers, Secure APIs_

Copilot must verify:

- HSTS, X-Content-Type-Options, X-Frame-Options, and CSP headers must be configured.
- Use security header middleware such as `helmet` for Express.js to configure security headers properly.
- Cache-Control must be configured to prevent sensitive data caching (Cache-Control: no-store for sensitive pages).
- Security headers must be applied consistently across all responses.
- Configure Content-Security-Policy (CSP) with appropriate directives to prevent XSS and data injection attacks.
- Consider using `helmet` with custom configuration for fine-grained control over security headers.

---

## 5. Protocol & Data Security

_Reference: Infrastructure & Data Storage_

Copilot must verify:

### 5.1 Protocol Security

- HTTPS/TLS must be enforced; HTTP must be disabled.
- Configure Node.js/Express server to redirect HTTP to HTTPS or disable HTTP listener entirely in production.
- Use secure TLS configuration (TLS 1.2+ only, strong cipher suites).
- For outbound web requests from BFF/backend-web services, prefer `axios` with a shared hardened client configuration.
- `axios` clients must enforce HTTPS-only targets, bounded timeouts, restricted redirects, and certificate validation (never disable TLS verification).

### 5.2 Secrets & Configuration

- Always use Azure Managed Identity for service-to-service authentication where supported (using `@azure/identity` SDK).
- Secrets must never be hardcoded in code or configuration files.
- Secrets must be injected at runtime from secure stores (e.g., Azure Key Vault using `@azure/keyvault-secrets`).
- Use environment variables or configuration management libraries (e.g., `dotenv`, `config`, `convict`) to load configuration.
- Any secrets that need to be created must be created with sufficient entropy (use `crypto.randomBytes()` or similar).

### 5.3 Data Protection

- Warn if code or configuration exposes sensitive data such as personal data, tokens, or credentials.
- Sensitive data must be encrypted in transit and at rest.
- Use parameterized queries or ORMs (e.g., TypeORM, Sequelize, Prisma) with proper escaping to prevent SQL injection.
- Data minimization and retention policies must be implemented.
- PII must be handled according to applicable regulations (GDPR, etc.).

---

## 6. Authorization & Access Control

_Reference: Claims-Based Access Control, Secure APIs_

Copilot must verify:

- Authorization must be consistently enforced across all endpoints.
- Sensitive operations must be explicitly verified and logged.
- Business logic must not be susceptible to abuse or bypass vulnerabilities.

---

## 7. Input Validation & Output Encoding

_Reference: Secure APIs, Secure APIs by Design_

Copilot must verify:

### 7.1 Input Validation

- All input from web clients must be validated (form data, query parameters, headers).
- Use validation libraries such as `joi`, `zod`, `class-validator`, `yup`, or `validator.js` to enforce strict schemas.
- File uploads must be validated for type, size, and content (use libraries like `multer` with proper configuration).
- Validate MIME types, file extensions, and magic numbers for uploaded files.
- If input validation errors occur they must result in a 400 response code.

### 7.2 Output Encoding

- Response data must be properly encoded based on context (HTML, JSON, JavaScript).
- Use response DTOs or view models; never return domain entities or database models directly.
- Error messages must be generic without exposing implementation details.
- Never include stack traces or sensitive information in error responses to clients.

---

## 8. Error Handling & Logging

_Reference: Defense-in-Depth_

Copilot must verify:

### 8.1 Logging

- Security-relevant events, errors and exceptions must be logged using structured logging libraries (e.g., `winston`, `pino`, `bunyan`).
- Configure appropriate log levels (debug, info, warn, error) based on environment.
- Authentication failures, authorization failures, and suspicious activities must be logged with sufficient context (user, IP, timestamp, action).
- Use audit logging for security-critical operations with dedicated log streams or tags.
- Sensitive data must never be logged (passwords, tokens, PII, credit cards).
- Never log full request/response bodies without sanitization; use field redaction for sensitive fields.

### 8.2 Error Handling

- Errors and exceptions must be handled securely without leaking internal implementation details.
- Use centralized error handling middleware to catch and sanitize errors before returning to clients.
- Return generic error messages to clients; log detailed error information server-side only.
- Never expose stack traces, database errors, or internal paths in client-facing error responses.
- Implement proper try-catch blocks and promise rejection handlers to prevent unhandled exceptions.

---

## 9. Test-Driven Application Security

_Reference: Test-Driven AppSec_

Copilot must enforce that:

- Authorization rules must have comprehensive tests (positive and negative cases) using testing frameworks like Jest, Mocha, or Vitest.
- Input validation must be tested with both valid and malicious payloads to ensure proper rejection.
- CSRF protection, XSS prevention, and rate limiting must be tested with dedicated test cases.
- Session and authentication flows must be tested, including session timeout, regeneration, and invalidation.
- Use tools like `supertest` for end-to-end API/web endpoint testing.
- Security middleware must be tested to ensure proper configuration and behavior.
- Test security headers are correctly set using response assertion libraries.

---

References:

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Secure APIs by Design: https://securityblog.omegapoint.se/en/secure-apis-by-design
- Omegapoint Defense-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- Omegapoint Test-Driven AppSec: https://securityblog.omegapoint.se/en/test-driven-application-security
- OWASP ASVS v5.0.0: https://owasp.org/www-project-application-security-verification-standard/
