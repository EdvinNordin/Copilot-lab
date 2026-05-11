# Lab 6 - Using Agent Mode with Secure by Design Principles

#### Duration: 45 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:

- Understand how to use GitHub Copilot's Agent mode for security-focused code reviews
- Apply Omegapoint's Secure by Design principles in code reviews
- Understand best practices for AI-assisted security reviews
- Gain confidence in using AI to enhance security posture
- Learn to write secure code with AI assistance

## 🍎 Scenario: Securing The Daily Harvest's Codebase with GitHub Copilot Agent Mode

The Daily Harvest's codebase has grown rapidly, and the team wants to ensure that security is integrated into the development process. They have decided to use GitHub Copilot's Agent mode to perform security-focused code reviews based on Omegapoint's Secure by Design principles.

## 📊 Step 1: Setting Up GitHub Copilot Agent Mode for Security Reviews

### Instructions:

1. Open your code editor and navigate to the project directory.
2. Copy the files from the **CoPilot-rules-template** folder into the **.github** folder, replacing the files from Lab 5.
3. Review the content of the **copilot-instructions.md** file to understand the security principles and guidelines that GitHub Copilot will follow during code reviews.

### 💡 What to Look For:

- Clear instructions for GitHub Copilot on how to perform security reviews
- Specific security principles and guidelines outlined in the instructions
- Examples of secure coding practices that GitHub Copilot should look for

## ✏️ Step 2: Performing a Security-Focused Code Review with GitHub Copilot Agent Mode

In this step, you'll use GitHub Copilot's Agent mode to conduct a comprehensive security review of The Daily Harvest codebase.

### Instructions:

1. **Open GitHub Copilot Chat** in your IDE and ensure you're in **Agent mode** (check the dropdown below the prompt field)
2. **Submit a comprehensive security review prompt** to analyze the codebase for security vulnerabilities

   <details>
   <summary>Sample Security Review Prompt</summary>

   ```
   I need you to perform a comprehensive security review of The Daily Harvest's backend API codebase using Secure by Design principles. Please:

   1. Analyze the source code in the src/ directory for security vulnerabilities
   2. Check for authentication and authorization issues
   3. Review input validation and output encoding practices
   4. Identify potential business logic abuse scenarios
   5. Check for sensitive data exposure (credentials, API keys, personal data)
   6. Review error handling for information leakage
   7. Examine dependency security (outdated packages, known vulnerabilities)
   8. Assess logging of security-relevant events
   9. Verify trust boundary implementations
   10. Apply Omegapoint's Secure by Design principles to all findings

   Please generate a detailed security report with:
   - Critical vulnerabilities (with severity levels)
   - Specific code examples where issues exist
   - Recommended fixes for each issue
   - References to relevant Omegapoint verifications and OWASP ASVS principles
   - Test cases to verify security fixes

   Work autonomously and provide actionable recommendations that follow our security guidelines.
   ```

   </details>

3. **Submit the prompt** and allow Agent mode to analyze the codebase

## 👀 Step 3: Observing the Security Analysis

Watch how Agent mode conducts the security review.

### What You'll Observe:

**🔍 Analysis Phase:**

- Agent examines code files for security patterns and anti-patterns
- Identifies potential vulnerabilities in authentication, authorization, and input handling
- Reviews dependency information for known issues
- Maps findings to Omegapoint verification IDs and OWASP standards

**⚡ Review Phase:**

- Agent provides detailed security findings with code snippets
- Explains the security impact of each vulnerability
- Categorizes issues by severity and type
- References specific verification requirements

**📋 Reporting Phase:**

- Generates a comprehensive security report
- Provides remediation recommendations
- Suggests secure coding patterns aligned with Secure by Design

### Instructions:

1. **Monitor the Agent's analysis** - allow it to complete without interruption
2. **Review each finding** as the Agent reports it:
   - Note the vulnerability type and severity
   - Understand the code context and impact
   - Read the Omegapoint verification references
3. **Keep notes** on the top 3-5 priority issues to address
4. **Save the security report** - copy it to a new file in your project for future reference

## 🔧 Step 4: Prioritizing and Understanding Vulnerabilities

Work with the Agent to understand and prioritize the security findings.

### Instructions:

1. **Ask the Agent to prioritize the findings** using this prompt:

   <details>
   <summary>Sample Prioritization Prompt</summary>

   ```
   Based on your security review, please:
   1. List the top 5 critical vulnerabilities that pose the highest risk to The Daily Harvest
   2. For each vulnerability, explain:
      - Why it's critical
      - Which Omegapoint verification it violates
      - The potential impact if not addressed
      - Which code file(s) are affected
   3. Provide a recommended remediation order
   ```

   </details>

2. **Ask for specific vulnerability details** if you need clarification:

   <details>
   <summary>Sample Detail Request Prompt</summary>

   ```
   For the [vulnerability name] issue you identified:
   1. Show me the exact vulnerable code
   2. Explain step-by-step how an attacker could exploit this
   3. What is the specific secure coding practice that's missing?
   4. Provide a secure code example that fixes this issue
   ```

   </details>

## 📝 Step 5: Generating Security-Focused Test Cases

Request that the Agent generate test cases to verify security fixes.

### Instructions:

1. **Ask the Agent to create security tests** for one of the identified vulnerabilities:

   <details>
   <summary>Sample Security Test Prompt</summary>

   ```
   For the [vulnerability name] issue, please generate comprehensive test cases that verify the security fix:

   1. Create negative test cases that verify the vulnerability is fixed (e.g., unauthorized access is blocked)
   2. Create positive test cases that verify legitimate functionality still works
   3. Include edge cases and boundary conditions
   4. Use the existing testing patterns in `src/__tests__/routes/cart.test.ts` as reference for style and structure
   5. Ensure all tests are specific to this security issue and can be run locally

   Format the tests so I can easily copy them into a test file in my IDE.
   ```

   </details>

2. **Review the generated test cases** - make sure they:
   - Test the specific vulnerability scenario
   - Follow your project's testing conventions
   - Can actually be executed in your local environment

## 🛠️ Step 6: Implementing One Security Fix Locally

Now implement a fix for one vulnerability directly in your IDE.

### Instructions:

1. **Choose a non-critical vulnerability** to fix as a practice exercise (avoid the most critical issues for now)

2. **Ask the Agent for implementation guidance**:

   <details>
   <summary>Sample Implementation Prompt</summary>

   ```
   I'm ready to fix the [vulnerability name] issue. Please:

   1. Show me the exact code location (file path and line numbers)
   2. Provide a complete secure code replacement
   3. Explain what changed and why it's secure
   4. List any dependencies or imports I need to add
   5. Provide the test case that verifies this fix works

   I will implement this directly in my IDE.
   ```

   </details>

3. **Open the vulnerable file** in your IDE based on the Agent's guidance

4. **Make the code changes** following the Agent's recommendations:
   - Edit the vulnerable code with the secure version
   - Add any necessary imports
   - Follow your project's code style

5. **Add the security test** to verify the fix:
   - Open the appropriate test file or create a new one
   - Add the security test case from the Agent
   - Run the test locally to ensure it passes

   ```bash
   npm run test:run
   ```

6. **Verify the fix** by running tests and confirming the vulnerability is addressed

## 📊 Step 7: Documenting Security Improvements

Create a summary of the security review and improvements.

### Instructions:

1. **Ask the Agent to create a security summary document**:

   <details>
   <summary>Sample Summary Prompt</summary>

   ```
   Create a comprehensive security review summary document that includes:

   1. Executive Summary
      - Overall security posture assessment
      - Number of vulnerabilities by severity

   2. Vulnerability Inventory
      - List of all findings with severity levels
      - Brief description of each
      - References to Omegapoint verifications

   3. Implemented Fixes
      - The fix(es) we implemented locally
      - Test cases that verify the fixes
      - Before/after code comparison

   4. Recommended Next Steps
      - Remaining high-priority issues to address
      - Suggested security practices to adopt
      - Timeline for remediation

   5. Security Best Practices
      - Key Omegapoint Secure by Design principles relevant to our codebase
      - Quick reference for developers

   Format this as a markdown file that we can save in our project repository.
   ```

   </details>

2. **Copy the generated document** to a new file in your project:
   - Create a file: `.github/SECURITY_REVIEW.md`
   - Paste the summary document content
   - Commit this to your repository as documentation

## 🎓 Step 8: Understanding Security Principles

Deepen your understanding of the security principles applied in this review.

### Instructions:

1. **Ask the Agent to explain the principles**:

   <details>
   <summary>Sample Explanation Prompt</summary>

   ```
   For developers new to our project, please explain:

   1. What are Omegapoint's Secure by Design principles?
   2. How do they relate to OWASP ASVS v5.0.0?
   3. For each of these categories, give practical examples from our codebase review:
      - Authentication & Authorization
      - Input Validation
      - Data Protection
      - Error Handling & Logging
      - Dependency Management
   4. What should developers keep in mind when writing new code?
   5. How can developers verify their code follows these principles?
   ```

   </details>

2. **Use this as a reference guide** for your team - save the explanation as `.github/SECURE_DESIGN_GUIDE.md`

## 🎁 Step 9: Optional - Create a Security Checklist

Help future developers by creating a pre-commit security checklist.

### Instructions:

1. **Ask the Agent to generate a checklist**:

   <details>
   <summary>Sample Checklist Prompt</summary>

   ```
   Create a developer security checklist that should be reviewed before submitting code:

   1. It should be concise (1-2 pages)
   2. Include yes/no questions developers can ask themselves
   3. Reference the specific vulnerabilities we found in our review
   4. Include links to relevant Omegapoint verifications
   5. Provide examples of what to look for
   6. Format as a markdown checklist for easy printing/sharing

   This will be shared with all developers on the team.
   ```

   </details>

2. **Save the checklist** as `.github/PRE_COMMIT_SECURITY_CHECKLIST.md`

## 🏆 Exercise Wrap-up

You've now conducted a comprehensive security review using GitHub Copilot Agent mode and Secure by Design principles.

### 🎯 Why Language-Specific Best Practices Matter

GitHub Copilot performs better when your instructions define best practices for the specific language and stack in use. If your guidance clearly distinguishes .NET, TypeScript/Node.js, and Java/Spring expectations, Copilot can apply the correct coding patterns, libraries, testing style, and security approach instead of guessing.

In security reviews, this also helps Copilot apply the right validation, authentication/authorization, and error-handling patterns for each ecosystem.

Benefits of language-specific best-practice instructions:

1. Higher accuracy for language and framework conventions
2. More consistent code style and architecture across contributors
3. Better security and validation defaults aligned to the stack
4. Less prompt repetition and fewer manual fixes
5. Faster onboarding for new team members

What to make specific in your instructions:

1. Language and runtime (for example: .NET, TypeScript/Node.js, Java)
2. Framework and version (for example: ASP.NET Core, Express/NestJS, Spring Boot)
3. Testing framework (for example: xUnit/NUnit, Jest/Vitest, JUnit)
4. Validation, logging, and error handling conventions
5. Security requirements and dependency expectations
6. File or path scope using applyTo patterns so language-specific rules are applied only where they belong

### Reflection Questions:

1. What types of vulnerabilities did the Agent identify that you might have missed manually?
2. How did the Omegapoint verification references help you understand the security issues?
3. What surprised you most about the security analysis?
4. How would you explain the importance of Secure by Design to a junior developer?
5. What changes to your development workflow would help prevent these vulnerabilities in the future?

### Key Takeaways:

- **Agent mode is effective** for comprehensive security analysis across codebases
- **Security reviews should follow principles** like Omegapoint's Secure by Design
- **Verification frameworks** (like OWASP ASVS) provide structured guidance
- **Testing security fixes** is as important as implementing them
- **Documentation** helps teams maintain security awareness

### Important Reminders:

- ✅ Always **review AI-generated security recommendations** - they're guidance, not gospel
- ✅ **Test security fixes** thoroughly before deploying to production
- ✅ **Keep security reviews current** as your codebase and dependencies evolve
- ✅ **Make security a team practice**, not just an AI tool
- ✅ **Reference legitimate sources** like OWASP and Omegapoint for security guidance

## 🔮 What's Next?

You've now mastered:

- GitHub Copilot's core capabilities (Autocomplete, Ask mode, Agent mode)
- Test-driven development with Copilot
- Security-focused code reviews with Agent mode
- Custom instructions and security principles

Continue applying these skills to make The Daily Harvest a secure, high-quality platform!
