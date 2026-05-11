---
applyTo: '**/*.*'
---

# Code Quality Instructions

This document defines code quality requirements for all application components.
Copilot must verify that the code adheres to these instructions when generating or modifying code and when reviewing pull requests.
Copilot must always add a reference to the relevant section in this document when writing chat answers or pull request comments.

## 1. Linting

_Reference: Secure Development, Defense-in-Depth_

Copilot must enforce:

### 1.1 ESLint Compliance

- All generated or modified code must conform to the project's ESLint configuration.
- After making code changes, Copilot must verify that the code passes linting by running the project's lint command (typically `npm run lint` or `npx eslint .`).
- Linting errors and warnings must be resolved before considering a change complete.
- Auto-fixable lint issues should be resolved by running the project's lint fix command (typically `npm run lint:fix` or `npx eslint . --fix`).
- ESLint rules defined in the project configuration (e.g., `.eslintrc`, `eslint.config.js`, `eslint.config.mjs`) must not be disabled or weakened to bypass errors, unless there is a documented and justified exception.
- Inline rule disabling comments (e.g., `// eslint-disable-next-line`) must be avoided unless strictly necessary and must include a justification comment explaining why the rule is being suppressed.

### 1.2 Linting Configuration

- Projects must have a linting configuration file present (e.g., `.eslintrc`, `eslint.config.js`, `eslint.config.mjs`).
- If a project is missing a linting configuration, Copilot should warn the user and suggest adding one appropriate for the project's tech stack.
- Linting must be integrated into CI/CD pipelines to prevent non-compliant code from being merged.

---

## 2. Code Formatting

_Reference: Secure Development, Defense-in-Depth_

Copilot must enforce:

### 2.1 Prettier Compliance

- All generated or modified code must conform to the project's Prettier configuration.
- After making code changes, Copilot must verify that the code passes formatting checks by running the project's format check command (typically `npm run format:check` or `npx prettier -c .`).
- Formatting violations must be resolved before considering a change complete.
- Formatting issues should be resolved by running the project's format write command (typically `npm run format:write` or `npx prettier -w .`).
- Prettier configuration defined in the project (e.g., `.prettierrc`, `.prettierrc.json`, `prettier.config.js`) must not be overridden or weakened to bypass formatting requirements.

### 2.2 Formatting Configuration

- Projects must have a Prettier configuration file present (e.g., `.prettierrc`, `.prettierrc.json`, `prettier.config.js`).
- A `.prettierignore` file should be present to exclude files that should not be formatted (e.g., build output, generated files).
- If a project is missing a formatting configuration, Copilot should warn the user and suggest adding one appropriate for the project's tech stack.
- Formatting checks must be integrated into CI/CD pipelines to prevent non-compliant code from being merged.

---

## 3. Post-Change Verification

_Reference: Secure Development, Defense-in-Depth_

Copilot must enforce:

### 3.1 Verification Steps

- After every code change, Copilot must run both the linting and formatting checks to verify compliance.
- The expected verification commands are:
  - **Lint check**: `npm run lint` (or equivalent, e.g., `npx eslint .`)
  - **Format check**: `npm run format:check` (or equivalent, e.g., `npx prettier -c .`)
- If either check fails, Copilot must attempt to fix the issues automatically:
  - **Lint fix**: `npm run lint:fix` (or equivalent, e.g., `npx eslint . --fix`)
  - **Format fix**: `npm run format:write` (or equivalent, e.g., `npx prettier -w .`)
- After auto-fixing, Copilot must re-run the checks to verify all issues are resolved.
- If issues persist after auto-fixing, Copilot must report the remaining issues to the user with clear guidance on how to resolve them manually.

### 3.2 Consistency

- Code style must be consistent across the entire codebase; new or modified code must match the existing style conventions enforced by the linting and formatting configurations.
- Copilot must not introduce code that uses different style conventions than what is configured in the project's linting and formatting tools.

---

References:

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Defense-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- ESLint: https://eslint.org/
- Prettier: https://prettier.io/

