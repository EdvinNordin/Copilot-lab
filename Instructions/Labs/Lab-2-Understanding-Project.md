# Lab 2 - Exploring the Codebase with GitHub Copilot

#### Duration: 30 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:

- Use GitHub Copilot Chat in "Ask" mode to understand unfamiliar codebases
- Learn how to efficiently navigate and analyze project structure with AI assistance
- Understand how to identify build processes, testing frameworks, and dependencies
- Develop strategies for onboarding to new projects using GitHub Copilot

## 🍎 Scenario: Your First Day at The Daily Harvest

You just got access to the API repository. Your first goal is to quickly understand:

- What does this API actually do?
- How is the code organized and structured?
- What technologies and frameworks are being used?
- How do I build, run, and test the API?

You will use GitHub Copilot Chat to speed up onboarding.

## 🤖 Introduction to GitHub Copilot Chat

GitHub Copilot Chat helps you understand code, generate changes, and solve development tasks.

| Mode      | Purpose                                 | Best For                                           |
| --------- | --------------------------------------- | -------------------------------------------------- |
| **Ask**   | Get explanations and answers about code | Understanding existing code, learning new concepts |
| **Agent** | Take action and make changes            | Code edits, multi-file changes, running commands   |

For exploring an unfamiliar codebase, **Ask mode** is the best starting point because it lets you:

- Query specific files or code patterns without making changes
- Get high-level explanations of project structure and purpose
- Understand dependencies, build processes, and testing strategies
- Ask follow-up questions to deepen your understanding

## 🧠 Choosing the Right AI Model

Different models have different strengths. GitHub Copilot now offers intelligent model selection to optimize your workflow.

### Available Models

GitHub Copilot supports multiple AI models through its **Auto Model Selection** feature. The list of available models changes over time. For the latest supported models, see: [GitHub Copilot Supported Models](https://docs.github.com/en/copilot/reference/ai-models/supported-models).

**Recommended Approach**: Use [Auto Model Selection](https://docs.github.com/en/copilot/concepts/auto-model-selection) to let Copilot automatically choose the optimal model for your specific task. This ensures you always get the best performance.

**Manual Selection**: When available in your IDE or GitHub.com, you can also manually select a specific model based on your needs:
- Fast responses and code completions
- Complex reasoning and problem-solving
- Detailed analysis and explanations

### 🔄 Experimenting with Different Models

If manual model selection is available in your environment, you can compare how different models respond to the same question.

**How to Switch Models (when available):**

1. In GitHub Copilot Chat, look for the model selector (usually below the text area in which prompts can be submitted)
2. Click on the current model name to see available options
3. Select a different model and ask your question

## 🔍 Step 1: Understanding the Project Purpose

Start with a high-level understanding of what the app does.

### Instructions:

1. Switch to "Ask" mode within GitHub Copilot Chat if you are not already in that mode.
2. Ask questions that help you understand the current application behavior.
3. **Try different models**: Start with the default model, then experiment with others to see how their explanations differ

If you get stuck, try using these sample prompts to explore the project:

<details>
  <summary>Sample Prompts</summary>
  
  ```
  What is the main purpose of this application? What does it do?
  ```

```
Can you give me a high-level overview of this project's features and functionality?
```

```
What type of application is this? Is it a web app, API, desktop app, or something else?
```

</details>

### 💡 What to Expect from GitHub Copilot

When you ask these questions, GitHub Copilot can quickly summarize:

- **Application Type**: Whether it's an e-commerce site, API, web application, etc.
- **Core Features**: Key functionality like user authentication, product catalogs, payment processing
- **Technology Stack**: Programming languages, frameworks, and architectural patterns in use
- **Business Domain**: The industry or use case the application serves

It does this by analyzing your code structure, config files, dependencies, and patterns. Ask specific questions to get more useful answers.

## 🏗️ Step 2: Analyzing Project Structure

Next, understand how the codebase is organized.

### Instructions:

Ask structure-focused questions in Ask mode. Try the same question with different models to compare depth and clarity.

<details>
  <summary>Sample Prompts</summary>

```
How is this project structured? Can you explain the main folders and their purposes?
```

```
What are the most important files I should understand as a new developer on this project?
```

```
Are there any configuration files I should be aware of? What do they control?
```

</details>

### 💡 What to Expect from GitHub Copilot

GitHub Copilot can provide a structural breakdown, including:

- **Folder Roles**: Explanations of what code lives in main directories like `src/`, `tests/`, `public/`, or `components/`.
- **Key Files**: Identification of critical files such as `package.json`, `README.md`, or main entry points (e.g., `app.ts`, `main.py`).
- **Architectural Patterns**: Insights into how the project is organized (e.g., MVC, layered architecture, microservices).
- **Configuration Details**: Information about configuration files like environment variables (`.env`), build configuration (e.g., `webpack.config.js`), or database connection settings.

Use this as your quick map of the codebase.

## 💻 Step 3: Identifying Technologies and Frameworks

Identify the tech stack so you know what tools and skills are needed.

### Instructions:

Ask questions about the languages, frameworks, and dependencies used in this project.

If you get stuck, try using these sample prompts to explore the project

<details>
  <summary>Sample Prompts</summary>

```
What programming languages are used in this project?
```

```
What frameworks and libraries does this project depend on? Can you explain what each major one does?
```

```
What's the package.json/requirements.txt/build.gradle telling me about the dependencies?
```

</details>

If Copilot mentions unfamiliar technologies, ask follow-up questions.

<details>
  <summary>Sample Follow-up Prompts</summary>

```
Can you explain what [framework name] is and why it might be used in this type of project?
```

```
What are the key benefits of using [library name] over other similar libraries?
```

```
How does [technology name] work at a high level?
```

</details>

### 🎁 Optional Model Experimentation Challenge

Framework questions are great for model comparison.

**Try This**: Pick one technology and ask these prompts with different models:

1. "Explain [technology] and its role in this project"
1. "Analyze the architectural benefits of using [technology] in this context"

**Questions to Consider:**

- Which model gave the most comprehensive explanation?
- Did any model provide unique insights the others missed?
- Which explanation style did you prefer and why?
- How did the depth of technical detail vary between models?

## 🔨 Step 4: Understanding the Build Process

Figure out how to build and run the app locally.

### Instructions:

Ask Copilot how to build and run the project. If needed, use these sample prompts:

<details>
  <summary>Sample Prompts</summary>

```
How do I build this project? What are the build commands?
```

```
What do I need to install or set up before I can run this project locally?
```

```
Are there any environment variables or configuration I need to set up?
```

```
How do I start the development server or run the application?
```

</details>

### ⚙️ Try It Yourself:

1. Follow the build instructions GitHub Copilot provided
2. Try to start the development server
3. If you encounter errors, ask GitHub Copilot for help troubleshooting

<details>
  <summary>Answer</summary>

You can build the project by [opening a terminal](https://code.visualstudio.com/docs/terminal/getting-started) in Visual Studio Code and running the following commands:

```
cd application
npm install
npm run dev
```

</details>

When the API is running at `http://localhost:3000`, quickly test core endpoints like listing products (`GET /api/products`), adding items to the cart (`POST /api/cart`), and processing checkout (`POST /api/cart/checkout`).

## 🧪 Step 5: Understanding the Testing Strategy

Next, identify how tests are organized and executed.

### Instructions:

Ask Copilot how this codebase is tested. If needed, use these sample prompts:

<details>
  <summary>Sample Prompts</summary>

```
How do I run the tests for this project? What testing frameworks are being used?
```

```
What types of tests exist in this codebase? (unit, integration, e2e, etc.)
```

```
Can you analyze the test coverage? Are there areas that might need more testing?
```

```
How are tests organized? Where should I put new tests?
```

</details>

### 📈 Extension: Test Coverage Deep Dive

**Advanced Prompts:**

```
Can you identify which files or functions have low or missing test coverage?
```

```
What would be good candidates for adding more tests to improve coverage?
```

## 🎁 Optional Task: Building a Better README

Now use Copilot to improve onboarding documentation for future developers.

### Instructions:

1. Ask Copilot to analyze the current README and suggest improvements.
2. Create or enhance documentation based on your exploration.

<details>
  <summary>Sample Prompts</summary>

```
Does this project have a README? If so, what's missing that would help new developers?
```

```
Based on our conversation about this project, can you help me create a comprehensive "Quick Start Guide" for new developers? Include setup steps, key commands, and important files to know about.
```

```
Can you suggest a better project description and feature list for the README based on the actual codebase?
```

</details>

### 💡 Pro Tips for README Enhancement:

- Include actual setup commands you've tested
- Add troubleshooting sections for common issues
- Document environment requirements and dependencies
- Include links to important files and folders
- Add examples of common development tasks

### 🔄 Iterative Improvement:

After Copilot generates documentation, refine it with follow-up prompts:

```
Can you make this setup guide more beginner-friendly?
```

```
Add a troubleshooting section for common setup issues.
```

```
Include examples of how to run different types of tests.
```

## 💡 Tips and Tricks

### 🤝 GitHub Copilot as Your Learning Partner

Use Copilot Chat for three things:

- **Learn concepts** (frameworks, APIs, architecture)
- **Evaluate tradeoffs** (patterns, libraries, design choices)
- **Troubleshoot issues** (errors, flaky tests, unexpected behavior)

Example prompts:

```
Explain the difference between REST APIs and GraphQL.
```

```
What are the pros and cons of using TypeScript vs JavaScript?
```

**Best Practices & Patterns:**

```
What's the MVC pattern and how does it apply to web development?
```

```
When should I use async/await vs Promises in JavaScript?
```

```
What are some common security considerations for web applications?
```

**Troubleshooting & Problem Solving:**

```
I'm getting this error: [paste error message]. What does it mean and how can I fix it?
```

```
What's the difference between 500 and 404 HTTP status codes?
```

```
Why might my tests be failing intermittently?
```

### 💡 Pro Tips for Effective Learning with GitHub Copilot

1. **Ask "Why" Questions**: Don't just ask what something does—ask why it's used

   ```
   Why would a team choose Redux over React's built-in state management?
   ```

2. **Request Comparisons**: Understanding alternatives helps you make better decisions

   ```
   Compare Docker vs virtual machines - when would I use each?
   ```

3. **Get Context**: Ask how technologies fit into the bigger picture

   ```
   How does JWT authentication work in a typical web application flow?
   ```

4. **Seek Examples**: Request practical demonstrations

   ```
   Can you show me a simple example of how middleware works in Express.js?
   ```

### 🔍 Making the Most of Your AI Learning Buddy

- Start broad, then get specific.
- Ask basic questions early.
- Use Copilot as a sanity check before implementation.

Copilot is a fast way to learn and validate your approach while onboarding.

## 🏆 Exercise Wrap-up

In this exercise, you used GitHub Copilot Chat in Ask mode to:

- ✅ Understand the purpose and functionality of an unfamiliar API codebase
- ✅ Analyze project structure and organization
- ✅ Identify technologies, frameworks, and dependencies
- ✅ Learn how to build, run, and test the API

### Reflection Questions:

1. How did using GitHub Copilot Chat change your approach to exploring a new codebase compared to manual exploration?
2. What types of questions were most effective for getting useful information?
3. Were there any areas where GitHub Copilot's explanations needed clarification or weren't accurate?
4. **Model Comparison**: Which AI models did you try, and what differences did you notice in their responses?
5. **Model Preferences**: Did you develop preferences for certain models for specific types of questions? Why?

### Key Takeaways:

- GitHub Copilot Chat can dramatically accelerate codebase onboarding
- Starting with high-level questions and drilling down works well
- Always verify critical build/setup instructions by actually trying them
- Use follow-up questions to deepen understanding of unfamiliar technologies
- **Different AI models excel at different tasks** - experimenting with multiple models gives you a more complete picture
- **Model selection strategy** can improve both the quality and speed of your development workflow

## 🚀 Next Steps

In the next exercise, we'll use what we've learned about the codebase to start improving test coverage and implementing new features for The Daily Harvest's e-commerce platform!
