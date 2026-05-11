For any new or changed code, Copilot MUST:

1. Detect violations of Omegapoint's secure design principles, including relevant verifications in OWASP ASVS v5.0.0.
2. Suggest corrections that strengthen defense-in-depth, such as the 6-step model for secure API design or other relevant reference architecture.
3. Require tests for all security-relevant logic. In particular negative tests concerning authorization logic and input validation.
4. Verify that all generated or modified code passes the project's linting and formatting checks (ESLint and Prettier). If violations are found, fix them automatically before considering the change complete.

Copilot should also warn and explain when security posture is weakened.
Thus, the following questions (when applicable) should be investigated and explained:

- Is authentication and proper authorization enforced according to the principles of least privilege and zero trust?
- Is input validation applied according to trust boundaries and domain logic?
- Is input output encoding applied according to trust boundaries and context?
- Are there any unused or unnecessary libraries that can be removed?
- Are there any outdated dependencies?
- Are there any dependencies with known vulnerabilities?
- Does the code or configuration contain or expose sensitive data such as personal data, tokens or credentials?
- Can business logic be abused?
- Are security-relevant events, errors and exceptions logged?
- Are errors and exceptions handled securely without leaking internal implementation details?

Copilot must always add a reference to the relevant verification in Omegapoint’s secure design principles when writing chat answers or PR comments.

This reference MUST be a specific numbered verification ID from:
https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications

### Required reference format

- Always include a dedicated line at the end of the answer/comment:
    - `Omegapoint verification(s): Vx.Y[, Vn.Z ...] (https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications)`
- `Vx.Y` must match the exact verification identifier used in the Omegapoint document (examples: `V16.E`, `V3.F`, `V8.A`).

### Selection rules

- Choose the most relevant verification(s) for the security topic being discussed.
- If the topic spans multiple areas (e.g., auth + logging + dependency scanning), include multiple verification IDs.
- If unsure which verification applies, include a best-effort mapping AND include `V16.E` as a general secure-implementation fallback.

### Examples

- `Omegapoint verification(s): V16.E (https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications)`
- `Omegapoint verification(s): V3.F, V8.A (https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications)`

---

References:

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Secure APIs by Design: https://securityblog.omegapoint.se/en/secure-apis-by-design
- Omegapoint Test-Driven AppSec: https://securityblog.omegapoint.se/en/test-driven-application-security
- Omegapoint Defense-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- OWASP ASVS v5.0.0: https://owasp.org/www-project-application-security-verification-standard/
