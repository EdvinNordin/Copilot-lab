# Optional Lab - Agentic Coding

#### Duration: 45 minutes

### This lab requires GitHub Copilot Pro+ (or Copilot Enterprise)

## 🎯 Learning Objectives

By the end of this exercise, you will:

- Assign a real GitHub issue to Copilot Coding Agent.
- Monitor an autonomous implementation session.
- Review and iterate on Copilot's pull request.
- Understand where Coding Agent fits in your workflow.

## 🍎 Scenario: Delegate API Work to Copilot

The Daily Harvest team needs to ship API improvements faster.

In this lab, you will delegate one scoped task to Copilot Coding Agent and handle it through the normal issue and pull request flow.

## ⌨️ What Coding Agent Is

GitHub Copilot Agent works from GitHub (not inside a chat loop in your IDE):

- You assign an issue.
- Copilot creates a branch and implements the task.
- Copilot opens a draft pull request.
- You review, request changes, and merge.

Use it for focused tasks like bug fixes, small features, tests, and docs. This requires GitHub Copilot Enterprise or appropriate Copilot subscription level.

## 📝 Step 1: Create and Assign an Issue

**Instructions:**

1. Open your repository on GitHub and go to **Issues**.
2. Create a new issue for this feature: add `POST /api/contact`.
3. Include:
   - A clear problem statement.
   - Expected request/response behavior.
   - Basic validation requirements.
   - Acceptance criteria.
4. In the issue sidebar, choose **Assign to Copilot**.
5. Confirm repository and base branch, then assign.

## 👀 Step 2: Monitor the Agent Session

**Instructions:**

1. Wait for Copilot to react on the issue and create a draft PR.
2. Open the PR from the issue's **Development** section.
3. Use **View session** in the PR timeline to track progress.
4. Observe:
   - Planned tasks in the PR description.
   - Commits and code changes.
   - Test execution and updates.

Note: completion time depends on task size.

## 🔍 Step 3: Review and Iterate

**Instructions:**

1. Review the PR like any teammate contribution.
2. Check:
   - Correct behavior.
   - Code quality and readability.
   - Test coverage for the new endpoint.
3. Leave review comments and tag `@copilot` when requesting changes.
4. Re-check updates after Copilot responds.
5. Mark ready, approve, and merge when satisfied.

## 🎁 Optional Extensions

Choose one or more if time allows:

- Assign a second issue (for example: `PUT /api/cart/:id`).
- Try assignment from the Agent Panel: <https://github.com/copilot/agents>.
- From VS Code, use the GitHub Issues integration and the **Assign to Copilot** option to start a Coding Agent task (the agent still runs from GitHub).
- Separately, experiment with Copilot Chat/Agent mode in VS Code by mentioning `@copilot` to explore or refine the same issue (this does not start a Coding Agent session).

## 🔐 Optional Security Track (GHAS + Copilot Autofix)

1. Enable GitHub Advanced Security and default CodeQL for the repo.
2. Open **Security → Code scanning** and select a finding.
3. Use **Generate Fix** with Copilot Autofix.
4. Commit to a new branch and review like any PR.

## 🏆 Exercise Wrap-up

You completed an end-to-end delegated workflow:

1. Created and assigned an issue.
2. Monitored autonomous implementation.
3. Reviewed and merged through standard PR practices.

### Reflection Questions

1. Which task types are best suited for Coding Agent in your team?
2. What review checks are non-negotiable before merge?
3. How should human and AI reviewers complement each other?
