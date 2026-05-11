---
applyTo: '**/*.{tsx,jsx,ts,js,css,html}'
---

# React Frontend Security Instructions

This document defines security instructions for React single-page applications (SPAs) built with TypeScript/JavaScript and CSS. It covers applications using common React tooling such as Vite or similar bundlers, CSS frameworks (e.g., Tailwind CSS), and authentication libraries (e.g., MSAL React, Auth0, NextAuth).
Copilot must verify that the code adheres to these instructions when generating code or reviewing pull requests.
Copilot must always add a reference to the relevant section in any instruction in this document when writing chat answers or pull request comments.

---

## 1. Authentication & Session Management

_Reference: Identity Modeling, Secure APIs by Design_

Copilot must verify:

### 1.1 Authentication Provider Configuration

- Authentication must be handled through established libraries and protocols (OAuth 2.0, OpenID Connect) using well-maintained libraries (e.g., `@azure/msal-react`, `auth0-react`, `next-auth`); custom authentication schemes must never be implemented.
- The authentication provider must be initialized before rendering the React tree and made available via a context provider (e.g., `<MsalProvider>`, `<Auth0Provider>`).
- Authenticated route guards or authentication template components must wrap all protected routes to enforce login before rendering protected content.
- Authentication configuration values (client IDs, authority URIs, scope URIs) must use environment variables or deploy-time replacement tokens; they must never contain real secrets or production identifiers in committed source code.
- Token cache location should be set to `sessionStorage` (not `localStorage`) to limit token exposure to the browser tab lifetime.

### 1.2 Token Acquisition & Storage

- Tokens must be acquired through the authentication library's silent renewal mechanism (e.g., `acquireTokenSilent`); manual token construction is not permitted.
- If access tokens are stored in `sessionStorage` for API calls, they must be short-lived and refreshed via silent renewal before expiration.
- Tokens must never be stored in `localStorage`, cookies accessible to JavaScript, or global JavaScript variables.
- Token values must never appear in URL query strings, path parameters, or API response bodies.

### 1.3 Logout & Session Cleanup

- Logout must invoke the authentication library's logout method (e.g., `logoutRedirect`, `logoutPopup`, `logout`) and also clear all application-managed `sessionStorage` and `localStorage` keys that contain sensitive data (tokens, roles, cached user data).
- Session timeout handling should warn the user before the session expires and trigger re-authentication.
- On authentication failure (e.g., 401 from the API), the application must invalidate the stored token and redirect to re-authentication rather than retrying with a stale token.

---

## 2. Authorization & Role-Based Access Control

_Reference: Claims-Based Access Control, Secure APIs_

Copilot must verify:

### 2.1 Role & Claims Extraction

- Roles and claims must be extracted from the identity token or access token using the authentication library's API or a dedicated parser function.
- Token payload parsers must validate token structure and handle malformed or missing tokens gracefully by returning empty or default values — never throwing unhandled exceptions.
- Non-string or unexpected values in role/claims arrays must be filtered out before use.
- Role and claim strings must be compared case-insensitively to prevent bypass through casing variations.

### 2.2 Client-Side Authorization Guards

- UI controls for privileged operations (e.g., create, update, delete) must be conditionally rendered based on the authenticated user's roles or claims.
- Authorization checks in components must perform case-insensitive comparison and must not trust user-modifiable data for authorization decisions.
- Client-side role checks are a UX convenience only; all state-changing operations must be authorized server-side. Code comments or documentation must make this explicit.
- Authorization state stored in browser storage must be treated as untrusted and used only for UI rendering decisions, never as a security boundary.

### 2.3 Least Privilege

- The application must request the narrowest OAuth scope needed for the current operation (e.g., read-only scopes for read-only users, write scopes for admins).
- Default-deny must be applied: if no roles or claims are present, no privileged actions must be available.

---

## 3. XSS Prevention & Output Encoding

_Reference: Secure APIs by Design, Defense-in-Depth_

Copilot must verify:

### 3.1 React JSX Auto-Escaping

- All dynamic content must be rendered using JSX expressions (`{variable}`), which React auto-escapes by default; this auto-escaping must never be bypassed.
- `dangerouslySetInnerHTML` must never be used to render user-supplied or API-supplied content. If raw HTML rendering is absolutely required, a sanitization library (e.g., `DOMPurify`) must sanitize the input first.
- Direct DOM manipulation via `document.innerHTML`, `document.write`, `insertAdjacentHTML`, or refs with `.innerHTML` must be avoided.

### 3.2 Dynamic Attribute Safety

- User-controlled values must not be injected into `href`, `src`, `action`, or event-handler attributes without validation and sanitization.
- `javascript:` URIs and `data:` URIs from user input must be blocked.
- When constructing URLs with user-supplied parameters, values must be URI-encoded using `encodeURIComponent` to prevent injection.

### 3.3 CSS Injection Prevention

- User-supplied values must never be interpolated directly into CSS class names, inline `style` attributes, or CSS-in-JS template strings without sanitization.
- When using utility-first CSS frameworks (e.g., Tailwind CSS), dynamic class names must be constructed from a predefined allow-list, not from raw user input.
- CSS custom properties (`--var`) set from user input must be validated and constrained to expected value types.

### 3.4 Content Security Policy

- The production deployment must configure a strict Content Security Policy (CSP) that disallows `unsafe-inline` and `unsafe-eval` for scripts.
- CSP directives must restrict `connect-src` to the known API origin and authentication provider endpoints.
- `style-src` directives must be as restrictive as possible; if inline styles are required by the CSS framework, use nonces or hashes rather than `unsafe-inline`.

---

## 4. Input Validation

_Reference: Secure APIs, Secure APIs by Design_

Copilot must verify:

### 4.1 Form & User Input Validation

- All user input in forms must be validated before submission using whitelist/allow-list patterns.
- Numeric inputs must be validated as numbers within the allowed range on the client, but also enforced server-side.
- String inputs must be trimmed and validated for maximum length, allowed characters, and format before being sent to the API.
- Dropdown and select values must be validated against the known set of allowed options; values must not be trusted simply because they came from a `<select>` element.

### 4.2 API Response Validation

- API responses must be validated for expected structure and types before use (e.g., verify arrays are arrays, objects have required fields matching TypeScript interfaces).
- Unexpected or malformed API responses must be handled gracefully without exposing raw response data to the user.
- Data retrieved from `sessionStorage` or `localStorage` (e.g., cached API responses parsed via `JSON.parse`) must be validated for expected structure after parsing; `JSON.parse` exceptions must be caught.

---

## 5. API Communication Security

_Reference: Secure APIs, Secure APIs by Design_

Copilot must verify:

### 5.1 HTTPS Enforcement

- All API communication must use HTTPS in production; `http://` URLs are acceptable only for local development, gated behind an environment flag (e.g., `import.meta.env.DEV`, `process.env.NODE_ENV === 'development'`).
- Fetch or HTTP client requests must include appropriate `Content-Type` headers (e.g., `application/json` for JSON bodies).

### 5.2 Authentication Headers

- Every fetch call to authenticated backend APIs must include the `Authorization: Bearer <token>` header.
- Tokens must be read from the authentication library or browser storage at call time and must not be cached in module-level variables that could become stale.
- If the stored token is `null` or expired, the fetch must not proceed; instead, re-authentication or silent token renewal must be triggered.

### 5.3 Error Handling in API Calls

- API error responses must be handled through a centralized error handler to ensure consistent behavior across all API calls.
- Error messages from the API must be sanitized before display; raw error response bodies must not be shown to the user.
- `console.error` / `console.log` calls in error handlers must not log sensitive data (tokens, PII, full request/response bodies).
- 401 responses must trigger re-authentication flow; other error codes must display user-friendly messages without internal details.

---

## 6. Secrets & Configuration Management

_Reference: Infrastructure & Data Storage_

Copilot must verify:

### 6.1 No Hardcoded Secrets

- Client IDs, tenant IDs, scope URIs, API URLs, and other environment-specific values must use environment variables or deploy-time replacement tokens that are substituted at build/deploy time.
- Real credentials, tokens, or secrets must never appear in committed source code, including authentication configuration files and API URL modules.
- `.env` files containing real values must be listed in `.gitignore`.

### 6.2 Build-Time Configuration

- The bundler's environment variable mechanism (e.g., `import.meta.env` for Vite, `process.env` for Webpack/CRA) must be used for environment-specific configuration.
- Environment guards (e.g., `import.meta.env.DEV`, `process.env.NODE_ENV`) must be used consistently to separate local development configuration from production values.
- Production builds must not include development-only modules, local configuration, or source maps.

---

## 7. Dependency Security

_Reference: Defense-in-Depth_

Copilot must verify:

### 7.1 Dependency Auditing

- `npm audit` (or equivalent) must be run regularly and integrated into the CI/CD pipeline.
- All dependencies in `package.json` must be reviewed for necessity; unused libraries must be removed.
- Dependencies must be kept up to date; major version upgrades must be evaluated for breaking changes and security improvements.
- The `engines` field in `package.json` should specify supported Node.js versions to ensure consistent build environments.

### 7.2 Third-Party Script & Resource Integrity

- External resources loaded in HTML (e.g., CDN-hosted fonts, stylesheets, scripts) must use `crossorigin` attributes and, where possible, Subresource Integrity (SRI) hashes.
- Third-party scripts must be minimized; prefer self-hosted assets over CDN-loaded scripts when feasible.

---

## 8. Secure Storage & Browser API Usage

_Reference: Infrastructure & Data Storage_

Copilot must verify:

### 8.1 Browser Storage Usage

- Sensitive data (tokens, roles, cached user data) stored in `sessionStorage` must be treated as sensitive and cleared on logout or authentication failure.
- New browser storage keys containing sensitive data must not be introduced without security review.
- `localStorage` must not be used for any sensitive or authentication-related data due to its persistence across browser sessions.

### 8.2 Data Minimization in Storage

- Only the minimum necessary data must be stored in browser storage; full API responses should not be cached client-side unless required for functionality.
- PII (usernames, email addresses, personal identifiers) must not be persisted in `sessionStorage` or `localStorage`.

---

## 9. Error Handling & Logging

_Reference: Defense-in-Depth_

Copilot must verify:

### 9.1 React Error Boundaries

- The application must use React error boundaries (via `react-error-boundary` or custom `componentDidCatch` implementations) to catch rendering errors and display a safe fallback UI.
- Error boundary fallback components must display only generic, user-friendly error messages; they must not render `error.stack`, internal class names, API response bodies, or other implementation details.
- Any `error.message` displayed to users must be reviewed to ensure it does not leak internal implementation details in production.

### 9.2 Console Logging

- `console.error` and `console.log` calls must not log tokens, credentials, PII, or full API response bodies.
- In production builds, consider stripping or reducing console output (e.g., via a bundler plugin) to prevent information leakage in browser DevTools.
- Security-relevant events (authentication failures, authorization denials) should be forwarded to a centralized logging/monitoring service, not only logged to the browser console.

---

## 10. Build & Deployment Security

_Reference: Secure Architecture_

Copilot must verify:

### 10.1 Build Configuration

- Production builds must produce minified and tree-shaken output.
- Source maps must be disabled or excluded from production deployments (e.g., `build.sourcemap: false` in bundler configuration).
- The development server and hot module replacement (HMR) must never be exposed in production.

### 10.2 Deployment Headers

- The hosting environment must configure security headers: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`.
- CORS must be configured on the API backend to allow only the known frontend origin(s).

### 10.3 CI/CD Security Gates

- The CI/CD pipeline must run dependency auditing (`npm audit`), linting (e.g., `eslint`), type checking (e.g., `tsc`), and tests before deployment.
- Builds must fail if high-severity vulnerabilities are detected.

---

## 11. Test-Driven Application Security

_Reference: Test-Driven AppSec_

Copilot must enforce that:

### 11.1 Authentication & Authorization Tests

- Authentication configuration must be tested for correctness: provider config objects must be defined, authority/issuer URIs must be valid.
- Token parsing and role/claims extraction logic must be tested with positive cases (valid tokens and roles), negative cases (malformed tokens, missing claims, invalid types), and edge cases (empty input, unexpected encoding).
- Authorization guard logic (e.g., role-based UI rendering checks) must be tested with positive cases (matching role), negative cases (insufficient role, different tenant/team), and edge cases (case variations, empty roles).

### 11.2 Input Validation & Business Logic Tests

- Form validation logic must be tested with valid inputs, boundary values, and malicious payloads (XSS strings, SQL injection strings, oversized inputs).
- Business logic functions (e.g., duplicate checks, data filtering, permission checks) must be tested for exact matches, trimming behavior, null/undefined handling, and data isolation.
- API URL construction must be tested to verify proper encoding of user-supplied parameters.

### 11.3 Error Handling Tests

- Centralized error handler functions must be tested for all relevant HTTP status codes (200, 204, 401, 403, 500) to verify they do not leak internal details.
- React Error Boundary behavior must be tested to verify the fallback UI is rendered on component errors without exposing sensitive information.

### 11.4 Continuous Security Validation

- All security-relevant tests must run in the CI/CD pipeline before deployment.
- Test coverage must be monitored for security-critical code paths (authorization logic, token handling, input validation).
- New security requirements must have corresponding automated tests before the code is merged.

---

References:

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Secure APIs by Design: https://securityblog.omegapoint.se/en/secure-apis-by-design
- Omegapoint Defense-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- Omegapoint Test-Driven AppSec: https://securityblog.omegapoint.se/en/test-driven-application-security
- OWASP ASVS v5.0.0: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Top 10 for Web Applications: https://owasp.org/www-project-top-ten/
- OWASP Web Security Testing Guide: https://owasp.org/www-project-web-security-testing-guide/
- React Security Best Practices: https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
