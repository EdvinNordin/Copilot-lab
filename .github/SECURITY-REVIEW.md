# Security Review — The Daily Harvest API

**Date:** 2026-05-11  
**Reviewer:** GitHub Copilot (Omegapoint Secure by Design framework)  
**Codebase:** `application/src/`  
**Standard:** OWASP ASVS v5.0.0 + Omegapoint Secure Design Principles

---

## 1. Executive Summary

The Daily Harvest API was reviewed against Omegapoint's Secure by Design principles and the OWASP Application Security Verification Standard (ASVS) v5.0.0. The codebase is a TypeScript/Express REST API with in-memory data storage.

The review identified **16 vulnerabilities** across four severity levels. The most critical finding — plaintext password storage with no password verification on login — has been **fully remediated** during this review session. All other findings require attention before this API is deployed to a production environment.

### Overall Posture

| Area | Status |
|---|---|
| Authentication | ⚠️ Partially fixed — bcrypt implemented, JWT not yet issued |
| Authorization | ❌ No route is protected by token validation |
| Input Validation | ⚠️ Basic validation present, mass assignment and length limits missing |
| Sensitive Data | ✅ Passwords no longer returned in responses |
| Error Handling | ✅ Generic error messages on auth failure |
| Logging | ❌ No security event logging |
| Dependencies | ❌ Vulnerable `lodash` present, no lockfile |
| HTTP Security | ❌ No `helmet`, wildcard CORS |

### Vulnerability Count by Severity

| Severity | Count |
|---|---|
| Critical | 3 (1 fixed) |
| High | 5 |
| Medium | 5 |
| Low | 3 |
| **Total** | **16** |

---

## 2. Vulnerability Inventory

### Critical

| ID | Title | Status | Omegapoint Verification |
|---|---|---|---|
| C1 | Passwords stored in plain text, login bypasses password check | ✅ Fixed | V3.F, V8.A |
| C2 | No session token issued on login — raw `userId` returned | ❌ Open | V3.F |
| C3 | All mutating routes are completely unauthenticated | ❌ Open | V3.F, V16.E |

**C1 — Plain-text password storage**  
During registration the password was discarded and never stored. During login, any password was accepted for any registered email address. No hashing was performed at any point.

**C2 — No token on login**  
Login returns a plain `userId`. This is not a cryptographically signed credential and cannot be validated on subsequent requests. Any party who learns a user's ID gains access.

**C3 — Unauthenticated mutating routes**  
`POST/PUT/DELETE /api/products`, `POST /api/reviews`, `POST /api/cart/checkout`, and all cart mutations require no identity proof. Any anonymous caller can add or delete products, post fake reviews, or checkout another user's cart.

---

### High

| ID | Title | Omegapoint Verification |
|---|---|---|
| H1 | Cart is global — no per-user isolation (broken access control) | V3.F, V16.E |
| H2 | Wildcard CORS — `app.use(cors())` allows any origin | V16.E |
| H3 | No security HTTP headers — `helmet` is absent | V16.E |
| H4 | `lodash@4.17.20` has a known prototype pollution vulnerability (CVE-2021-23337) | V8.A |
| H5 | No rate limiting on authentication endpoints | V3.F |

**H1 — Global cart**  
`let cartItems: CartItem[]` is a single module-level array shared by all HTTP requests. Every user reads and writes the same cart. User A's checkout silently empties User B's cart.

**H2 — Wildcard CORS**  
`app.use(cors())` sets `Access-Control-Allow-Origin: *`, permitting cross-origin requests from any domain. This enables cross-site request forgery style attacks against any frontend that uses cookies or credentials.

**H3 — Missing security headers**  
Without `helmet`, responses lack `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, and `Strict-Transport-Security`. These headers mitigate clickjacking, MIME sniffing, and protocol downgrade attacks.

**H4 — Vulnerable dependency**  
`lodash@4.17.20` (in `devDependencies`) has a known prototype pollution vulnerability. The package is not imported anywhere in the source — it should be removed entirely.

**H5 — No rate limiting**  
`POST /api/auth/login` has no request throttling. An attacker can attempt an unlimited number of password guesses without restriction.

---

### Medium

| ID | Title | Omegapoint Verification |
|---|---|---|
| M1 | User enumeration via `409` on duplicate registration | V3.F |
| M2 | No request body size limit — DoS via large payloads | V16.E |
| M3 | Review `author` and `comment` fields have no length limits | V16.E |
| M4 | `PUT /api/products/:id` is vulnerable to mass assignment | V16.E |
| M5 | `orderId` is predictable (`Date.now()`) | V16.E |

**M1 — User enumeration**  
`POST /api/auth/register` returns `409 Email already registered` when a duplicate email is submitted. This confirms whether an email address is registered, enabling account enumeration.

**M2 — Unbounded request bodies**  
`express.json()` is used without a `limit` option. A caller can send megabyte-scale JSON bodies, exhausting server memory.

**M3 — Unbounded review content**  
`author` and `comment` in `POST /api/reviews/:productId` are stored with no length validation. Extremely long strings can be stored and reflected to all clients reading that product's reviews.

**M4 — Mass assignment**  
`products[index] = { ...products[index], ...updates, id: products[index].id }` spreads the entire request body onto the stored product, allowing callers to inject unexpected fields.

**M5 — Predictable order ID**  
`ORDER-${Date.now()}` is guessable within a millisecond window. Systems treating this as a secret or unique identifier are vulnerable to enumeration.

---

### Low

| ID | Title | Omegapoint Verification |
|---|---|---|
| L1 | No security event logging | V8.A |
| L2 | `JWT_SECRET` not validated at startup | V16.E |
| L3 | No `package-lock.json` — supply chain risk | V8.A |

---

## 3. Implemented Fixes

### C1 — bcrypt Password Hashing

**Files changed:**
- `src/types/types.ts` — replaced `password?: string` with `passwordHash?: string`
- `src/routes/auth.ts` — full bcrypt integration

#### Before

```ts
// Registration — password silently discarded, user stored without it
const newUser: User = { id: String(userIdCounter++), name, email };
users.push(newUser);
res.status(201).json({ user: newUser });

// Login — any password accepted for any registered email
const user = users.find((u) => u.email === email);
if (!user) {
  return res.status(401).json({ error: "Invalid credentials" });
}
res.json({ message: "Login successful", userId: user.id });
```

#### After

```ts
// Registration — hash with bcrypt SALT_ROUNDS=12
const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
const newUser: User = { id: String(userIdCounter++), name, email, passwordHash };
users.push(newUser);
// passwordHash is never included in the response
res.status(201).json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } });

// Login — timing-safe comparison; dummy hash prevents timing-based enumeration
const dummyHash = "$2b$12$invalidhashfortimingprotectiononly000000000000000000000";
const hashToCompare = user?.passwordHash ?? dummyHash;
const passwordMatch = await bcrypt.compare(password, hashToCompare);
if (!user || !passwordMatch) {
  return res.status(401).json({ error: "Invalid credentials" });
}
```

#### Test Cases (src/__tests__/routes/auth.test.ts — C1 block)

| Test | Verifies |
|---|---|
| Registration response does not contain `password` field | Sensitive data not leaked |
| Registration response body does not contain the raw password string | No accidental serialisation |
| Login with wrong password returns `401` | Password is actually verified |
| Login with correct password returns `200` | Correct credentials accepted |
| Wrong password and unknown email return identical error messages | Anti-enumeration |
| Login response does not contain `password` or `passwordHash` | No hash exposure |
| Empty password string returns `400` | Edge case — empty credential rejected early |

All 16 auth tests pass. The 4 previously marked `[REQUIRES FIX]` tests now pass against the fixed implementation.

---

## 4. Recommended Next Steps

### Immediate Priority (before any production deployment)

| Priority | Action | Effort |
|---|---|---|
| 🔴 1 | **Issue JWT on login** — install `jsonwebtoken`, sign a token with `sub: user.id`, short expiry (15 min), refresh token pattern | Medium |
| 🔴 2 | **Add auth middleware** — validate JWT on all `POST/PUT/DELETE` routes | Small |
| 🔴 3 | **Per-user cart** — key `cartItems` map by `userId` from the JWT | Small |
| 🔴 4 | **Remove `lodash`** — `npm uninstall --save-dev lodash` | Trivial |
| 🔴 5 | **Add `helmet`** — `npm install helmet`, `app.use(helmet())` | Trivial |

### Short Term

| Priority | Action |
|---|---|
| 🟠 6 | Restrict CORS origins — `cors({ origin: process.env.ALLOWED_ORIGINS })` |
| 🟠 7 | Add rate limiting — `express-rate-limit` on `/api/auth/login` and `/register` |
| 🟠 8 | Add request body size limit — `express.json({ limit: "10kb" })` |
| 🟠 9 | Fix mass assignment — allowlist fields in `PUT /api/products/:id` |
| 🟠 10 | Replace `Date.now()` orderId with `randomUUID()` from Node's built-in `crypto` |

### Medium Term

| Priority | Action |
|---|---|
| 🟡 11 | Add structured security logging (auth failures, `4xx` on auth routes) |
| 🟡 12 | Add `JWT_SECRET` startup validation — `process.exit(1)` if unset |
| 🟡 13 | Commit `package-lock.json` — run `npm install` and add to source control |
| 🟡 14 | Add review content length limits (`author ≤ 100`, `comment ≤ 1000` chars) |
| 🟡 15 | Consider generic response for duplicate email registration (anti-enumeration) |

### Suggested Security Practices

- **Run `npm audit`** after every dependency change and block CI on high/critical findings
- **Use environment variables** for all secrets — never hardcode `JWT_SECRET` or any credential
- **Add a pre-commit hook** to run `npm run lint` and block secrets from being committed
- **Review OWASP ASVS Level 1** checklist before each release

---

## 5. Security Best Practices — Quick Reference

The following Omegapoint Secure by Design principles are most relevant to this codebase.

| Principle | Application to This Project |
|---|---|
| **Zero Trust** — verify every request | Every state-changing route must validate a JWT before executing any logic |
| **Least Privilege** — grant minimum access | Distinguish read (public) from write (authenticated) from admin (elevated) roles |
| **Defence in Depth** — multiple controls | Authentication + authorisation + input validation + rate limiting + logging — not just one layer |
| **Fail Securely** — default to deny | On any error (bad token, missing field, DB failure) return a safe error; never grant access |
| **Input Validation at Trust Boundaries** | Validate and sanitize all user-supplied data at the route handler before it enters business logic |
| **Avoid Information Leakage** | Generic error messages on auth failure; no stack traces in production responses; no secrets in logs |
| **Audit Security-Relevant Events** | Log authentication failures, authorisation denials, and input validation rejections with timestamp and IP |

### Key Commands

```bash
npm audit                    # check for known vulnerabilities in dependencies
npm run lint                 # run ESLint — fix all warnings before committing
npm run test:coverage        # must stay ≥ 80% on all metrics
```

---

## References

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Secure APIs by Design: https://securityblog.omegapoint.se/en/secure-apis-by-design
- Omegapoint Test-Driven AppSec: https://securityblog.omegapoint.se/en/test-driven-application-security
- Omegapoint Defence-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- OWASP ASVS v5.0.0: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Top 10: https://owasp.org/www-project-top-ten/

---

**Omegapoint verification(s): V3.F, V8.A, V16.E** (https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications)
