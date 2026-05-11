Omegapoint Secure by Design — Developer Guide
1. What are Omegapoint's Secure by Design Principles?
Omegapoint's framework is built on the idea that security is not a feature you bolt on at the end — it's a set of design decisions you make from the start. The core principles are:

Principle	In plain English
Zero Trust	Never assume a request is legitimate because it came from inside your network or has a valid-looking user ID. Verify identity and permissions on every single request.
Least Privilege	Give callers only the access they need for that specific action — nothing more. A user who can read products should not automatically be able to delete them.
Defence in Depth	Don't rely on a single control. Layer authentication + authorisation + input validation + rate limiting + logging so that if one layer fails, others catch it.
Fail Securely	When something goes wrong, default to denying access — never to granting it. A missing token means no access, not guest access.
Input Validation at Trust Boundaries	Treat every input from outside your process as untrusted. Validate it at the edge (the route handler) before it touches any business logic or data.
Avoid Information Leakage	Error messages, logs, and responses should never reveal internal structure, credentials, stack traces, or whether a specific user/email exists.
Audit Security-Relevant Events	Log authentication failures, authorisation denials, and suspicious input. You cannot detect or respond to an attack you cannot see.
2. How do they relate to OWASP ASVS v5.0.0?
OWASP ASVS is a detailed checklist of specific, testable requirements. Omegapoint's principles are the why — ASVS gives you the what to check. They map directly:

Omegapoint Principle	Relevant ASVS Chapter
Zero Trust / Least Privilege	V3 — Session Management, V4 — Access Control
Input Validation	V5 — Validation, Sanitization and Encoding
Data Protection	V6 — Stored Cryptography, V8 — Data Protection
Fail Securely / Error Handling	V7 — Error Handling and Logging
Audit Logging	V7 — Error Handling and Logging
Dependency Management	V10 — Malicious Code, V14 — Configuration
The Omegapoint verification IDs (e.g. V3.F, V8.A) are their own curated mapping of these ASVS controls to cloud-native applications — a focused subset of the most critical checks.

3. Practical Examples from This Codebase
Authentication & Authorization
What went wrong:

Any password worked for any registered email. Login returned a plain userId — not a signed token — so downstream routes had no way to verify identity.

What was fixed:

What still needs doing:
Every POST/PUT/DELETE route has zero authentication — no middleware checks a token before executing business logic. An anonymous HTTP call can delete any product right now.

Input Validation
What's good: The routes do validate required fields and types at the boundary:

What's missing — mass assignment in products.ts:

The fix: Explicitly allowlist what callers can update:

What's also missing: No body size limit. express.json({ limit: "10kb" }) prevents memory exhaustion from oversized payloads.

Data Protection
What went wrong: The User type had password?: string — plain text. Even if the field had been stored, any serialisation bug could have exposed it.

What was fixed:

Registration now hashes with bcrypt at SALT_ROUNDS = 12 (OWASP minimum). The response explicitly excludes passwordHash:

Key data protection rule: Never return, log, or serialise a field that contains credentials or PII unless you have explicitly decided to include it.

Error Handling & Logging
What's good: Auth errors already use generic messages:

What's missing: There is no logging at all. A brute-force attack against /api/auth/login would leave no trace in any log. The minimum that should be logged:

The rule: Log that an event happened and when, never what the secret was.

Dependency Management
What was found:

lodash@4.17.20 — known prototype pollution vulnerability (CVE-2021-23337), and it's not imported anywhere in the source code
No package-lock.json — npm install resolves ^4.18.2 differently on every machine
Fixes:

Run npm audit after every dependency change. In CI, fail the build on high/critical findings.

4. What Developers Should Keep in Mind When Writing New Code
Before you write a route, ask:

Who is allowed to call this? Anonymous, authenticated user, or admin only? Add the auth middleware before the handler, not inside it.

What input am I accepting? Define exactly what fields are valid, their types, and their ranges. Reject everything else at the route boundary.

What am I returning? Check every field in the response. If a field is sensitive (hash, internal ID, PII), don't include it — return only what the caller needs.

What happens when it fails? The error message must be safe to show externally. No stack traces, no internal IDs, no field names from your database schema.

Should this be logged? Auth failures, access denials, and suspicious input should always produce a log entry.

A practical checklist per route:

5. How to Verify Your Code Follows These Principles
Automated checks already in place:

Write security-specific tests for every route you add. The pattern established in this project:

Test that missing/invalid auth returns 401 — not 200
Test every validation branch returns the right 4xx
Test that sensitive fields (passwords, hashes) are absent from responses
Test that identical errors are returned for different failure reasons (anti-enumeration)
Peer review checklist:

Does any new route accept a request body without validating all fields?
Is req.body spread directly onto a stored object?
Does any error response include a stack trace or internal detail?
Is any secret, token, or password included in a log statement?
Reference the Omegapoint verifications when raising a security concern in a PR — V3.F (authentication), V8.A (data protection), V16.E (general secure implementation) are the most commonly applicable to this codebase.

Omegapoint verification(s): V3.F, V8.A, V16.E (https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications)