---
applyTo: '**/*.*'
---

# Security Requirements Instructions

This document defines security requirements for all application components.
Copilot must verify that the code adheres to these instructions when generating code or reviewing pull requests.
Copilot must always add a reference to the relevant section in any instruction in this document when writing chat answers or pull request comments.

## 1. Access Control Model

_Reference: Claims-Based Access Control, Secure APIs_

Copilot must verify:

### 1.1 Market-Based Access Control

- All Product API endpoints must enforce market-based access control.
- Market context must be properly established from authenticated user claims.
- Market boundaries must be enforced at the data access layer, not just in UI.
- Cross-market data access must be explicitly denied unless authorized.

### 1.2 Data Isolation

- All queries must include market filtering predicates.
- Data isolation must be logically or physically enforced per market/tenant.
- Cross-market access attempts must be audited and alerted.

---

## 2. Authentication

_Reference: Identity Modeling, Secure APIs by Design_

Copilot must verify:

### 2.1 Authentication Protocols

- Industry-standard protocols must be used (OAuth 2.0, OpenID Connect, SAML).
- Custom authentication schemes must never be implemented.
- Passwordless authentication methods must be supported (biometrics, FIDO2, WebAuthn).

### 2.2 Multi-Factor Authentication

- Multi-factor authentication (MFA) must be enforced for users, especially admin accounts.

### 2.3 Session Management

- Session timeouts must be appropriately configured based on sensitivity.
- Session invalidation must be enforced on logout, password change, or security events.
- Session identifiers must be cryptographically random and unpredictable.

### 2.4 Password Security

- Password hashing must be secure (bcrypt, Argon2, PBKDF2) with appropriate cost factors.

---

## 3. Authorization

_Reference: Claims-Based Access Control, Secure APIs_

Copilot must verify:

### 3.1 Authorization Implementation

- Authorization must be implemented consistently (role-based or claims-based).
- Authorization decisions must be made at the service layer, close to resources.
- Client-side authorization must never be the only defense.
- Fine-grained authorization must be implemented at resource level.

### 3.2 Least Privilege

- Least privilege must be enforced; permissions must be denied by default.
- Authorization must be cached appropriately (never indefinitely).
- Sensitive operations must be explicitly verified and logged.

---

## 4. Data Protection & Encryption

_Reference: Infrastructure & Data Storage_

Copilot must verify:

### 4.1 Data Classification

- Sensitive data must be classified and handled appropriately.
- All sensitive data must be encrypted in transit (TLS 1.2+) and at rest.

### 4.2 Encryption Standards

- Strong encryption keys must be used (AES-256, RSA-2048+).
- Secure key management must be implemented; keys must never be hardcoded.
- Customer-managed keys (CMK) must be supported where required.

### 4.3 Data Minimization

- Data minimization must be applied; only necessary data must be collected/stored.
- Data retention policies and secure deletion must be implemented.
- PII must be handled according to regulations (GDPR, CCPA, etc.).

---

## 5. API Security

_Reference: Secure APIs, Secure APIs by Design_

Copilot must verify:

### 5.1 Authentication & Authorization

- All API endpoints must be authenticated unless explicitly public.
- Tokens (JWT, OAuth access tokens) must be validated on every request.
- API-level authorization checks must be implemented.

### 5.2 Rate Limiting & Validation

- Rate limiting must be implemented to prevent abuse.
- API parameters must be validated (query, path, body, headers).

### 5.3 Information Disclosure

- Internal identifiers and details must never be exposed in API responses.
- Error messages must be sanitized; stack traces must never be returned.

---

## 6. Secure Development

_Reference: Secure APIs by Design, Defense-in-Depth_

Copilot must verify:

### 6.1 Input Validation

- Input from untrusted sources must be validated using whitelisting.
- Server-side validation must be enforced (never relying on client-side only).
- Files must be validated for type, size, and content.

### 6.2 Output Encoding

- Output must be encoded based on context (HTML, URL, JavaScript, SQL).
- Parameterized queries or ORMs must be used to prevent SQL injection.

### 6.3 Secure Coding Practices

- Dynamic code execution (eval, exec) must be avoided.
- Secure random generation must be used for security-sensitive operations.
- Hardcoded secrets, credentials, or sensitive data must be avoided.

---

## 7. Logging & Monitoring

_Reference: Defense-in-Depth_

Copilot must verify:

### 7.1 Logging Requirements

- Security-relevant events must be logged (auth success/failure, authz failures, changes).
- Logs must be centralized and protected from unauthorized access.
- Sufficient context must be included in logs (timestamp, user, IP, action, resource, outcome).
- Sensitive data (passwords, tokens, PII, credit cards) must never be logged.

### 7.2 Monitoring & Alerting

- Logs must be monitored for suspicious activities and anomalies.
- Automated alerts must be configured for critical security events.
- Incident response procedures must be defined and regularly tested.

---

## 8. Vulnerability Management

_Reference: Defense-in-Depth, Test-Driven AppSec_

Copilot must verify:

### 8.1 Dependency Management

- Dependencies must be maintained and regularly updated for security patches.
- Dependency scanning tools must be used in CI/CD pipelines.
- Vulnerabilities must be prioritized and addressed based on severity.

### 8.2 Security Testing

- Security testing must be implemented (SAST, DAST, SCA).
- Security gates in CI/CD must prevent insecure deployments.
- Patch management procedures must be documented and enforced.

---

## 9. Compliance & Governance

_Reference: Secure Architecture_

Copilot must verify:

### 9.1 Regulatory Compliance

- Applicable regulations must be identified (GDPR, PCI-DSS, HIPAA, SOC 2, etc.).
- Compliance documentation and evidence must be maintained for audits.
- Data residency and sovereignty requirements must be implemented.

### 9.2 Audit & Policy

- Audit trails must be maintained for all security-relevant activities.
- Regular compliance assessments must be conducted.
- Security policies must be defined and communicated to stakeholders.
- Policy enforcement mechanisms must be implemented.

---

## 10. Security by Design

_Reference: Defense-in-Depth, Secure Architecture_

Copilot must enforce:

### 10.1 Design Principles

- Defense-in-depth must be implemented (multiple security layers).
- Least privilege must be enforced; permissions must be denied by default.
- Systems must fail securely; they must default to denying access.
- Critical functions must be separated to prevent fraud.

### 10.2 Threat Modeling

- Authorization must be verified on every request.
- Threat modeling must be conducted for new features.
- Security exceptions must be documented with compensating controls.

---

## 11. Test-Driven Application Security

_Reference: Test-Driven AppSec_

Copilot must enforce that:

### 11.1 Security Testing Requirements

- All security requirements must have automated tests.
- Authentication and session management flows must be tested.
- Authorization rules must be tested (positive and negative cases).
- Input validation must be tested with valid and malicious payloads.
- Output encoding must be tested to prevent XSS.
- CSRF protection must be tested.
- Security headers and configurations must be tested.
- Encryption and key management must be tested.

### 11.2 Continuous Security Validation

- Security tests must run in CI/CD pipelines before deployment.
- Security quality gates must block insecure deployments.
- Test coverage must be monitored for security-critical code paths.
- Regular security testing in production must be conducted (authorized penetration testing).
- Bug bounty programs should be implemented to identify vulnerabilities.

---

References:

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Secure APIs by Design: https://securityblog.omegapoint.se/en/secure-apis-by-design
- Omegapoint Defense-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- OWASP ASVS v5.0.0: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP API Security Top 10: https://owasp.org/www-project-api-security/
- OWASP Proactive Controls: https://owasp.org/www-project-proactive-controls/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
- CIS Controls: https://www.cisecurity.org/controls/
- GDPR: https://gdpr.eu/
- PCI-DSS: https://www.pcisecuritystandards.org/
- NIST SP 800-53: https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final
