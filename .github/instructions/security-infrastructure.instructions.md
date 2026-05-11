---
applyTo: '**/infrastructure/*.*'
---

# Infrastructure & IaC Security Instructions

This document defines security instructions for Infrastructure-as-Code (IaC) and cloud infrastructure configurations.
Copilot must verify that the code adheres to these instructions when generating code or reviewing pull requests.
Copilot must always add a reference to the relevant section in any instruction in this document when writing chat answers or pull request comments.

## 1. Infrastructure Security & IaC Best Practices

_Reference: Infrastructure & Data Storage, Secure Architecture_

Copilot must verify:

### 1.1 IaC Configuration

- Infrastructure must be defined as code (Terraform, Bicep, CloudFormation, ARM templates).
- IaC configurations must be version-controlled and subject to code review.
- Infrastructure validation and security scanning must be implemented in CI/CD pipelines.

### 1.2 Security Scanning

- IaC security scanning tools (tfsec, Checkov, Terrascan) must be used to detect misconfigurations.
- Configuration drift must be detected and prevented.

### 1.3 Secrets Management

- Secrets and credentials must never be committed to IaC files.

---

## 2. Secrets & Credentials Management

_Reference: Infrastructure & Data Storage_

Copilot must verify:

### 2.1 Secret Storage

- Secrets must never be hardcoded in IaC code or configuration files.
- Dedicated secret management services must be used (Azure Key Vault, AWS Secrets Manager, HashiCorp Vault).
- Secrets must be injected at runtime from secure stores, never stored in repositories.

### 2.2 Secret Rotation & Access

- Secret rotation must be implemented and automated where possible.
- Short-lived credentials and tokens must be used.
- Managed identities (Azure Managed Identity, AWS IAM Roles) must be used for service authentication.

---

## 3. Network Security & Segmentation

_Reference: Infrastructure & Data Storage, Defense-in-Depth_

Copilot must verify:

### 3.1 Network Segmentation

- Network segmentation must be implemented using VNets, subnets, and security groups.
- Private endpoints and private links must be used for Azure services.

### 3.2 Network Access Control

- Network security groups (NSGs) must be configured with least privilege rules.
- Traffic must be denied by default with explicit allow rules.
- Application-layer firewalls (WAF) and DDoS protection must be implemented for public services.

### 3.3 Protocol Security

- TLS 1.2 or higher must be enforced for all network communications.

---

## 4. Identity & Access Management (IAM)

_Reference: Identity Modeling, Claims-Based Access Control_

Copilot must verify:

### 4.1 Access Control

- Least privilege access must be implemented for all identities.
- Built-in RBAC roles must be used; custom roles must be minimized.
- Role assignments must be regularly reviewed and unused permissions removed.

### 4.2 Authentication

- Multi-factor authentication (MFA) must be enforced for user accounts.
- Privileged access and just-in-time (JIT) controls must be implemented.
- Service identities must use managed identities where possible.

---

## 5. Compute Security & Hardening

_Reference: Defense-in-Depth_

Copilot must verify:

### 5.1 Image Security

- Base images from trusted sources must be used with security patches.
- Automated patching and update management must be implemented.

### 5.2 Hardening

- Unnecessary services and ports must be disabled.
- Disk encryption must be enabled for OS and data disks.
- Endpoint protection and antimalware must be deployed.
- Just-in-time VM access must be used for administrative access.

---

## 6. Data Storage & Encryption

_Reference: Infrastructure & Data Storage_

Copilot must verify:

### 6.1 Encryption at Rest

- Encryption at rest must be enabled for all data storage services (databases, storage accounts, disks).
- Customer-managed keys (CMK) must be used where required.
- Encryption key rotation policies must be implemented.

### 6.2 Encryption in Transit

- Encryption in transit (TLS) must be enforced for all communications.

### 6.3 Database Security

- Database-level security measures (TDE, firewall rules, row-level security) must be implemented.
- Automated backups with geographic redundancy must be configured.

---

## 7. Monitoring, Logging & Auditing

_Reference: Defense-in-Depth_

Copilot must verify:

### 7.1 Logging

- Diagnostic logs must be enabled for all infrastructure resources.
- Logs must be centralized in a secure workspace (Azure Monitor, Log Analytics).
- Audit trails must be maintained for compliance and forensics.

### 7.2 Monitoring

- Security-relevant events must be monitored and alerted on.
- Vulnerability scanning must be implemented for VMs, containers, and registries.
- Suspicious activities and anomalies must be detected.

---

## 8. Container & Kubernetes Security

_Reference: Defense-in-Depth, Secure Architecture_

Copilot must verify:

### 8.1 Image Security

- Minimal, hardened base images from trusted registries must be used.
- Container images must be scanned for vulnerabilities before deployment.
- Image signing and verification must be implemented.
- Secrets must never be included in container images.

### 8.2 Runtime Security

- Containers must run with non-root users and resource limits.
- RBAC, network policies, and pod security must be enforced in Kubernetes.
- Pod security standards and admission controllers must be implemented.

---

## 9. CI/CD & Deployment Security

_Reference: Secure Architecture, Defense-in-Depth_

Copilot must verify:

### 9.1 Pipeline Security

- CI/CD pipelines must be secured with authentication and authorization.
- Secrets must never be stored in pipeline definitions.
- Approval gates must be implemented for production deployments.

### 9.2 Deployment Validation

- Deployment validations and blue-green/canary strategies must be used.
- Infrastructure changes must be validated before application.
- Supply chain integrity must be verified (signed code, verified dependencies).

---

## 10. Compliance & Governance

_Reference: Secure Architecture_

Copilot must verify:

### 10.1 Policy Enforcement

- Policy enforcement must be implemented (Azure Policy, AWS Config).
- Security baselines and compliance requirements must be defined and enforced.
- Deny policies must prevent insecure configurations.

### 10.2 Compliance Monitoring

- Resources must be properly tagged for cost tracking and access control.
- Continuous compliance monitoring and reporting must be implemented.
- Compliance violations must be documented and remediated.

---

References:

- Omegapoint Secure Design Principles: https://securityblog.omegapoint.se/en/cis-control-verifications-cloud-native-applications
- Omegapoint Secure APIs by Design: https://securityblog.omegapoint.se/en/secure-apis-by-design
- Omegapoint Defense-in-Depth: https://securityblog.omegapoint.se/en/defense-in-depth
- Omegapoint Test-Driven AppSec: https://securityblog.omegapoint.se/en/test-driven-application-security
- CIS Benchmarks: https://www.cisecurity.org/cis-benchmarks/
- Azure Security Benchmark: https://docs.microsoft.com/en-us/security/benchmark/azure/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
