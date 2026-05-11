# Lab 4 - GitHub Copilot Agent Mode: Goal-Oriented Development

#### Duration: 45 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:

- Understand what GitHub Copilot Agent mode is and when to use it
- Learn how Agent mode differs from Ask mode and Autocomplete
- Experience how Agent mode autonomously makes changes across multiple files
- Use Agent mode to achieve a specific, measurable goal (80%+ code coverage)
- Observe and understand Agent mode's decision-making process
- Apply best practices for delegating complex tasks to AI agents

## 🤖 What is GitHub Copilot Agent Mode?

GitHub Copilot Agent mode is built for larger, goal-oriented tasks. Unlike Ask mode (which doesn’t modify your workspace or run commands) or Autocomplete (inline suggestions), Agent mode can work autonomously across files — creating, editing, and running commands on your behalf.

### Key Features:

- 🎯 **Goal-Oriented**: Works toward specific, measurable objectives
- 🔄 **Autonomous Operation**: Makes decisions and changes without constant guidance
- 📁 **Multi-File Awareness**: Understands and modifies multiple files simultaneously
- 🧠 **Advanced Models**: Leverages premium AI models for complex reasoning
- 📊 **Progress Tracking**: Monitors and reports progress toward goals
- 🔍 **Context Understanding**: Maintains awareness of project structure and dependencies

### When to Use Agent Mode:

- ✅ Large refactoring tasks across multiple files
- ✅ Implementing complete features end-to-end
- ✅ Achieving specific metrics (coverage, performance, security)
- ✅ Complex code migrations or upgrades
- ✅ Comprehensive documentation generation

## 🍎 Scenario: Boosting The Daily Harvest's Test Coverage

Your pre-release task is to **reach 80%+ code coverage** across the project. Since multiple routes and utilities need tests, this is a good fit for Agent mode.

### Your Mission:

Use Agent mode to automatically:

- 🔍 Analyze the current codebase and identify coverage gaps
- 📝 Generate comprehensive test suites for uncovered code
- 🎯 Achieve the 80% coverage target efficiently
- 📊 Ensure all new tests follow project conventions and pass

## 🚀 Step 1: Assessing Current Coverage

Before using Agent mode, record your baseline coverage.

### Instructions:

1. **Run the existing test suite** to see current coverage (make sure you're in the **application** directory first):

   ```bash
   npm run test:coverage
   ```

2. **Review the coverage report** that displays in the terminal. Note:
   - Overall coverage percentage
   - Which files have low coverage
   - Which lines are uncovered

3. **Note** the current coverage percentage - you'll compare this to the final result!

## 🤖 Step 2: Activating Agent Mode

Now delegate the coverage goal to Agent mode.

### Instructions:

1. **Switch to Agent mode** in GitHub Copilot Chat by selecting 'Agent' from the dropdown underneath the prompt text area
2. **Provide your goal-oriented prompt** (example below):

<details>
<summary>Sample Agent Prompt</summary>

```
I need you to help me achieve 80% code coverage for The Daily Harvest project. Please:

1. Analyze the current test coverage across all files
2. Identify components, functions, and modules that lack adequate testing
3. Generate comprehensive unit tests for uncovered code paths
4. Ensure all new tests follow the existing testing patterns and conventions
5. Make sure all tests pass and actually improve coverage
6. Continue working until we reach at least 80% overall coverage

Please work autonomously and let me know your progress as you go. Focus on business logic, utility functions, and API route handlers first.
```

</details>

3. **Submit the prompt** and let the Agent begin working.

## 👀 Step 3: Observing Agent Mode in Action

Watch how Agent mode works toward the goal across multiple files.

### What You'll Observe:

**🔍 Analysis Phase:**

- Agent examines project structure
- Identifies files with low/no test coverage by analyzing existing tests
- Plans its testing strategy and prioritizes high-impact areas
- Reviews existing code patterns to maintain consistency

**⚡ Execution Phase:**

- Creates new test files or enhances existing ones across multiple components
- **Runs tests automatically** to verify work (you may see permission prompts)
- Writes tests across components with awareness of dependencies
- Adjusts based on test and build feedback

**🔧 Self-Healing Capabilities:**

- **Fixes build failures** it encounters
- **Resolves test failures** by analyzing errors
- **Handles dependency issues** like missing packages/imports
- **Iterates** when initial attempts fail

**📊 Progress Reporting:**

- Updates you on coverage improvements with specific metrics
- Reports any issues or blockers it encounters and how it's addressing them
- Suggests additional areas that need attention based on its analysis
- Shows you its decision-making process and next steps

### Instructions:

1. **Monitor the Agent's work** - don't interrupt unless there's an error
   - If GitHub Copilot times out, simply restart the analysis
   - **Click "Allow" when prompted** - the Agent will ask permission before running tests or terminal commands for safety
   - You might need to press `Ctrl+C` to stop the test execution process before the Agent will continue working
2. **Watch the file explorer** - you'll see new test files being created in real-time
3. **Check the Agent's status updates** - it will report progress toward the 80% goal with detailed feedback
4. **Note the multi-file coordination** - observe how it handles dependencies between tests and maintains project consistency
5. **Observe the self-healing** - watch how it responds to and fixes any build or test failures it encounters
6. **You're always in control**:
   - **Review all changes** before accepting them
   - **Keep or discard individual files** the Agent creates
   - **Easily undo the work** using Git if the Agent misses the mark or goes in the wrong direction
   - **Guide the Agent** with additional instructions if needed

Additional information can be found in the [GitHub Copilot Agent Mode blog post](https://github.blog/ai-and-ml/github-copilot/agent-mode-101-all-about-github-copilots-powerful-mode/) and the [Visual Studio Code Documentation](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode).

## 🔧 Step 4: Reviewing and Refining Agent Results

The Agent works toward the 80% target, but you should still verify results.

### Instructions:

1. **Run coverage again** to verify the improvement:

   ```bash
   npm run test:coverage
   ```

2. **Compare before/after results:**
   - Starting coverage: \_\_\_\_%
   - Final coverage: \_\_\_\_%
   - Goal achieved? ✅/❌

3. **Review the generated tests:**
   - Open a few of the new test files
   - Check if they follow your project's testing patterns
   - Verify test quality and comprehensiveness

4. **If coverage is still below 80%**, ask the Agent to continue:
   <details>
   <summary>Sample Agent Prompt</summary>

   ```
   Current coverage is at X%. Please continue working to reach our 80% goal. Focus on the remaining uncovered areas.
   ```

   </details>

## 🎯 Step 5: Understanding Agent Decision-Making

Ask the Agent to explain how it approached the task.

### Instructions:

**Ask the Agent to explain its strategy:**

<details>
<summary>Sample Agent Prompt</summary>

```
Can you explain your approach to achieving the code coverage goal? What was your strategy for:
- Prioritizing which files to test first
- Deciding what types of tests to write
- Handling dependencies between different components
- Ensuring tests followed our project conventions
```

</details>

**Follow up with specific questions about its decisions:**

<details>
<summary>Sample Agent Prompt</summary>

```
What were the biggest challenges you encountered while working toward the 80% coverage goal? How did you handle edge cases or complex components?
```

</details>

## 🎓 Best Practices for Agent Mode

Use these practices for effective Agent mode usage:

### ✅ Do:

- **Set clear, measurable goals** (like "80% coverage")
- **Provide context** about project conventions and requirements
- **Let the Agent work autonomously** - avoid micro-managing
- **Review results** before considering the task complete
- **Ask for explanations** to understand the Agent's reasoning

### ❌ Don't:

- **Interrupt frequently** - let the Agent complete its work cycles
- **Give vague instructions** - be specific about desired outcomes
- **Skip verification** - always test that the Agent's work achieves your goal
- **Ignore errors** - address any issues the Agent reports

## 🚀 Real-World Applications

Common real-world use cases:

**🏢 Enterprise Scenarios:**

- Legacy code modernization across hundreds of files
- Implementing comprehensive security scanning and fixes
- Migrating entire codebases to new frameworks or standards
- Achieving compliance requirements (accessibility, security, performance)

**🚀 Startup Scenarios:**

- Rapidly implementing MVPs with proper test coverage
- Scaling applications while maintaining code quality
- Adding comprehensive error handling and monitoring
- Preparing codebases for production deployment

## 🏆 Exercise Wrap-up

You’ve now used GitHub Copilot Agent mode for a complex, goal-oriented task.

### Reflection Questions:

1. What surprised you most about Agent mode's capabilities?
2. How would Agent mode change your approach to large refactoring tasks?
3. What types of development goals would you delegate to Agent mode in real projects?
4. How did the Agent's autonomous approach compare to your manual development process?
5. Which interaction style (Autocomplete, Ask mode, Agent mode) do you find most useful for different scenarios?

### Key Takeaways:

- Agent mode is effective for complex, multi-file tasks.
- Clear goals and context improve results.
- Review and validation are still essential.

## 🔮 What's Next?

In Lab 5, you'll learn how to customize your GitHub Copilot experience.
