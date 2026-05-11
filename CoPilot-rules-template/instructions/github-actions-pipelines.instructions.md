---
applyTo: '**/*.{yml,yaml}'
---

# GitHub Actions Pipeline Security Instructions

This document defines security requirements for GitHub Actions workflow files (`.yml`/`.yaml`).
Copilot must verify that workflow files adhere to these instructions when generating or modifying pipeline definitions and when reviewing pull requests.
Copilot must always add a reference to the relevant section in this document when writing chat answers or pull request comments.

## 1. Action Provenance & Supply Chain Integrity

_Reference: Defense-in-Depth, Secure Architecture_

Copilot must enforce:

### 1.1 Verified Publishers Only

- All third-party actions pulled from the GitHub Marketplace must originate from **verified creators** (look for the blue verified badge on the action's marketplace listing).
- Actions from unverified publishers must never be used unless they have been internally audited and explicitly approved.
- If a verified alternative exists for a given task, it must always be preferred over an unverified one.

### 1.2 Action Pinning

- All actions must be pinned to a **full-length commit SHA** (e.g., `actions/checkout@a5ac7e51b41094c92402da3b24376905380afc29`), not a mutable tag such as `v4` or `latest`.
- A comment must accompany the SHA to indicate the human-readable version it corresponds to (e.g., `# v4.1.6`).
- Dependabot or Renovate must be configured to propose updates to pinned SHAs automatically.

### 1.3 Approved Actions Allowlist

- Organizations should configure a GitHub Actions allowlist (`Settings > Actions > General > Allow select actions`) to restrict which actions are permitted.
- First-party GitHub actions (`actions/*`, `github/*`) are always allowed.
- Commonly trusted verified actions include (but are not limited to):
  - `actions/checkout`
  - `actions/setup-node`
  - `actions/cache`
  - `actions/upload-artifact` / `actions/download-artifact`
  - `github/codeql-action`
  - `docker/login-action` / `docker/build-push-action`
  - `azure/login` / `azure/webapps-deploy`

---

## 2. Security Scanning & Quality Gates

_Reference: Defense-in-Depth, Test-Driven AppSec_

Copilot must enforce:

### 2.1 CodeQL (SAST)

- All repositories must have CodeQL analysis enabled via **GitHub's automatic default setup** (configured under `Settings > Code security > Code scanning`).
- The automatic setup handles language detection, scheduling, and SARIF upload — no custom workflow file is required.
- CodeQL must be verified as enabled and running on every repository; if it has been disabled, it must be re-enabled.

### 2.2 Dependency Scanning (SCA)

- Dependabot or a similar dependency scanning tool must be enabled.
- A `dependabot.yml` configuration must be present in `.github/` to track updates for all ecosystems used in the repository (npm, Docker, GitHub Actions, etc.).
- Known vulnerabilities must block merging.

### 2.3 Linting & Formatting Gates

- CI pipelines must include linting (`npm run lint`) and formatting checks (`npm run format:check`) as required steps.
- These checks must run on every pull request and must pass before merging is allowed.
- Test steps (`npm test` or equivalent) must also be included and must pass.

### 2.4 Container & Image Scanning

- If the pipeline builds container images, a container scanning step must be included (e.g., `aquasecurity/trivy-action`, `anchore/scan-action`).
- Scanned images must not contain critical or high-severity vulnerabilities before deployment.

---

## 3. Secrets & Credentials Management

_Reference: Infrastructure & Data Storage, Defense-in-Depth_

Copilot must enforce:

### 3.1 Secrets Handling

- Secrets must **never** be hardcoded in workflow files.
- All sensitive values must be stored in **GitHub Actions Secrets** (`${{ secrets.SECRET_NAME }}`) or retrieved from an external secret store (e.g., Azure Key Vault, HashiCorp Vault).
- Secrets must **never** be printed, echoed, or logged in workflow output. Use `::add-mask::` if a dynamic value must be protected.
- Environment variables containing secrets should be scoped to the narrowest possible step or job, not set at the workflow level.

### 3.2 Token Permissions

- The `GITHUB_TOKEN` must follow the least privilege: define explicit `permissions` at the workflow or job level.
- Default permissions must be set to `read` only (`permissions: read-all` or specific read scopes).
- Write permissions must only be granted to the specific scopes that require them.
- Example:

```yaml
permissions:
  contents: read
  pull-requests: write
  security-events: write
```

### 3.3 OpenID Connect (OIDC)

- For cloud deployments (Azure, AWS, GCP), workload identity federation via OIDC must be preferred over long-lived credentials.
- Long-lived service principal secrets or access keys must be avoided whenever OIDC is supported.

---

## 4. Workflow Trigger Security

_Reference: Secure Architecture, Defense-in-Depth_

Copilot must enforce:

### 4.1 Trigger Restrictions

- Workflows must specify explicit triggers (`on:`) — wildcard or overly broad triggers must be avoided.
- The `pull_request_target` trigger must be used with extreme caution; it runs with write access in the context of the base branch and must never check out or build untrusted PR code.
- The `workflow_dispatch` trigger must be restricted via `inputs` validation and branch protection rules.

### 4.2 Fork Security

- Workflows triggered by `pull_request` from forks must not have access to secrets by default (GitHub enforces this, but workflows must not work around it).
- Approval must be required before running workflows on first-time contributors (`Settings > Actions > Fork pull request workflows`).

### 4.3 Branch Protection

- Workflows that deploy or modify production resources must only run on protected branches.
- Required status checks must be configured in branch protection rules to enforce that CI pipelines pass before merging.

---

## 5. Runner Security

_Reference: Defense-in-Depth, Secure Architecture_

Copilot must enforce:

### 5.1 GitHub-Hosted Runners

- GitHub-hosted runners must be preferred for standard CI/CD workloads (they provide clean ephemeral environments).
- Runner images should be specified explicitly (e.g., `ubuntu-latest`, `ubuntu-24.04`) — avoid ambiguous or deprecated images.

### 5.2 Self-Hosted Runners

- Self-hosted runners must never be used on public repositories (risk of arbitrary code execution from forks).
- Self-hosted runners must be ephemeral (containerized or VM-based, destroyed after each job) to prevent cross-job contamination.
- Self-hosted runners must be hardened and regularly patched.
- Runner groups and labels must be used to isolate runners by trust level (e.g., production vs. development).

---

## 6. Workflow Structure & Best Practices

_Reference: Secure Development, Defense-in-Depth_

Copilot must enforce:

### 6.1 Job Isolation

- Separate concerns into distinct jobs (build, test, lint, security-scan, deploy) to enforce the principle of least privilege per job.
- Each job must declare its own `permissions` block rather than inheriting broad workflow-level permissions.
- Deployment jobs must use `environment` with protection rules.

### 6.2 Artifact & Cache Security

- Artifacts shared between jobs must be treated as untrusted input in consuming jobs.
- Cache poisoning risks must be mitigated by scoping caches to specific branches or refs.
- Sensitive data must never be stored in artifacts or caches.

### 6.3 Concurrency Control

- Workflows must use a top-level `concurrency` block to prevent redundant parallel runs of the same workflow for the same branch or PR. When a new run is triggered (e.g., a new push to a PR branch), the in-progress run is automatically canceled, saving runner minutes and avoiding race conditions where two deployments of the same branch execute simultaneously.

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

- `group` creates a unique key per workflow + branch/ref combination so that only one run per group is active at a time.
- `cancel-in-progress: true` cancels any already-running workflow in the same group when a new one starts.

### 6.4 Timeout Configuration

- All jobs must specify `timeout-minutes` to set a maximum wall-clock duration for a job. If a job exceeds this limit it is automatically cancelled. This prevents hung or stuck jobs (e.g., an unresponsive test suite or a deadlocked build) from consuming runner minutes indefinitely.
- Default timeout should be appropriate for the workload (e.g., 15–30 minutes for CI, 60 minutes for heavy builds).

### 6.5 Workflow Naming

- Every workflow file must include a top-level `name:` key that clearly and concisely describes the workflow's purpose (e.g., `name: CI`, `name: Deploy to Production`). This name is displayed in the GitHub Actions UI, status checks, and PR status badges, making it easy to identify what each workflow does at a glance.

---

## 7. Deployment Security

_Reference: Secure Architecture, Defense-in-Depth_

Copilot must enforce:

### 7.1 Environment Protection

- Deployment jobs must only run on the default/protected branch.
- Deployment rollback procedures must be documented and testable.

### 7.2 Deployment Validation

- Post-deployment smoke tests or health checks must be included.
- Deployment strategies (blue-green, canary, rolling) should be used for production.

---

## 8. Pipeline Maintenance & Auditability

_Reference: Secure Architecture, Defense-in-Depth_

Copilot must enforce:

### 8.1 Workflow Documentation

- Every workflow file must include a top-level `name:` that clearly describes its purpose.
- Complex workflows must include comments explaining non-obvious steps.
- Reusable workflows (`workflow_call`) must document their inputs, outputs, and secrets.

### 8.2 Audit & Review

- Changes to workflow files must require code review via branch protection rules.
- Workflow run history must be retained for audit and compliance purposes.

---

## 9. Example Secure CI Pipeline Structure

_Reference: Defense-in-Depth, Test-Driven AppSec_

Copilot should use the following as a reference template when generating new CI workflows:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@<sha> # <version>
      - uses: actions/setup-node@<sha> # <version>
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  format:
    name: Format Check
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@<sha> # <version>
      - uses: actions/setup-node@<sha> # <version>
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - run: npm ci
      - run: npm run format:check

  test:
    name: Test
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@<sha> # <version>
      - uses: actions/setup-node@<sha> # <version>
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - run: npm ci
      - run: npm test
```

---

References:

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Defense-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- Omegapoint Test-Driven AppSec: https://securityblog.omegapoint.se/en/test-driven-application-security
- GitHub Actions Security Hardening: https://docs.github.com/en/actions/security-for-github-actions/security-hardening-for-github-actions
- GitHub Actions Security Best Practices: https://docs.github.com/en/actions/security-for-github-actions
- OWASP CI/CD Security: https://owasp.org/www-project-top-10-ci-cd-security-risks/

