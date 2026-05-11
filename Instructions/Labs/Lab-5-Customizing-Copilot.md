# Lab 5 - Customizing GitHub Copilot

#### Duration: 30 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:

- Explain what custom instructions are and how they shape GitHub Copilot’s behavior.
- Enable custom instructions in this project.
- Use one custom instruction to plan a new feature.
- Use another to generate a GitHub Issue for that feature.
- See how GitHub Copilot can be tailored to organizational workflows.

## 🍎 Scenario: Limiting Redundancy in The Daily Harvest's workflows

Your team uses GitHub Copilot heavily, but results are sometimes inconsistent across sessions.

For example, Copilot may use the wrong testing framework or outdated API versions. Repeating the same style, version, and formatting rules in every new chat is inefficient.

In this lab, you’ll fix that by using custom instruction files.

## 📄 Introduction to Custom Instructions

Custom instruction files can be defined at three levels:

1. Organization
2. Repository
3. Personal

This lab focuses on repository-level instructions. If multiple levels are present, priority is: personal → repository → organization.

Using **natural language**, these files define rules and context that are prepended to prompts.

### A Rudimentary Example

Example `.github/copilot-instructions.md`:

```md
Begin every response with "Sure thing! Let me get on that."

End every response with "And that about does it."
```

Copilot responses will follow that format across supported surfaces.

```md
Sure thing! Let me get on that.
...
---Answer to prompt---
...
And that about does it.
```

## ⚙️ Step 1: Enable custom instructions

First, make sure instruction files are enabled in your IDE.

**Instructions (VS Code):**

1. In your IDE, open the Settings editor using `Cmd`+`,` (Mac) or `Ctrl`+`,` (Linux/Windows)
2. In the search box at the top of your settings editor, type "copilot instructions"
3. Ensure the setting "GitHub Copilot: Use Instruction Files" is enabled (checked)

**Instructions (JetBrains IDEs):**

1. Go to IDE Settings/Preferences
2. Navigate to **Tools** > **GitHub Copilot**
3. Enable "Use Instruction Files"

You're now ready to create custom instructions.

## 📝 Step 2: Create a custom instructions file

Now generate your first custom instructions file.

**Instructions:**

1. In your IDE, open GitHub Copilot Chat and switch to Agent Mode
2. Click the cogwheel in the upper-right portion of the Chat window
3. From the drop-down, select the "Generate Agent Instructions"
4. Let GitHub Copilot analyze your repository and generate a tailored instructions file.
5. Review the result and adjust any guidelines that seem incorrect or missing.

## 💭 Step 3: Using the instructions file for feature planning

Use your instruction file to plan a feature and draft a GitHub Issue.

**Instructions:**

1. In **Agent Mode**, ask Copilot to plan a feature of your choice. Check whether the response follows your instruction file.
2. Then ask GitHub Copilot to draft a GitHub Issue (title + description) detailing that plan.

<details>
  <summary>Sample Prompt</summary>

```
Draft a GitHub Issue for this feature plan. Include:
- A concise title
- Problem statement
- Proposed implementation approach
- Acceptance criteria
- Test considerations
```

</details>

3. Copy the generated issue content into a new GitHub issue and verify it follows your instruction guidelines.

## 💪 Extra Credit: Going further beyond with custom prompt files and chat modes

### Prompt Files

Custom instructions define global guardrails. Prompt files let you reuse the same structured prompt repeatedly.

Prompt files can be stored locally or in `.github/prompts` and can standardize:

- What **mode** are you using?
- What **model** (e.g., GPT, Claude, or Gemini) do you want this particular prompt to target?
- Are there any **tools** you want this prompt to use?
- What **description** would you provide for the goal of this prompt?

<details>
  
  <summary>A note about tool priority</summary>

Tool availability priority:

1. Tools specified in the prompt file (if any)
2. Tools from the referenced chat mode in the prompt file (if any)
3. Default tools for the selected chat mode

</details>

You can also use variables with `${variableName}` syntax:

- Workspace variables: `${workspaceFolder}`, `${workspaceFolderBasename}`
- Selection variables: `${selection}`, `${selectedText}`
- File context variables: `${file}`, `${fileBasename}`, `${fileDirname}`, `${fileBasenameNoExtension}`
- Input variables: `${input:variableName}`, `${input:variableName:placeholder} (pass values to the prompt from the chat input field)`

Basic prompt file format:

```md
---
{header values, if applicable. For example...}
description: 'This is a test prompt'
---

{body, including any variables and the prompt itself}
Workspace to target: ${workspaceFolder}
How to start each response: ${input:greeting}

Please begin your response with your assigned greeting.

Create a file named `test.txt` and write "Hello, world!" to that file
```

Now create a reusable prompt file.

**Instructions:**

1. In your IDE, switch to the Explorer tab in your sidebar (if you are not already there)
2. Open the Settings editor using `Cmd`+`,` (Mac) or `Ctrl`+`,` (Linux/Windows)
3. In the search menu, type "Prompt file"
4. Ensure the option "Chat: Prompt Files" is enabled
5. Ensuring you have GitHub Copilot Chat open, click the cogwheel in the top-right corner of the Chat window
6. In the drop-down menu provided, click "Prompt Files"
7. You should now have a new menu open up in your command palette at the top of your screen. Click the button that says "New prompt file..."
8. When choosing the location to save the prompt file, choose the standard `.github/prompts` directory
9. Name the prompt file `explanation` and press Enter. This creates `explanation.prompt.md`.
10. Create a prompt file that explains a code snippet provided by the user (example below).

<details>

  <summary>Example Prompt File</summary>

    ```md
    ---
    mode: 'agent'
    description: 'Generate a clear code explanation with examples'
    ---

    Explain the following code in a clear, beginner-friendly way:

    Code to explain: ${input:code:Paste your code here}
    Target audience: ${input:audience:Who is this explanation for? (e.g., beginners, intermediate developers, etc.)}

    Please provide:

    * A brief overview of what the code does
    * A step-by-step breakdown of the main parts
    * Explanation of any key concepts or terminology
    * A simple example showing how it works
    * Common use cases or when you might use this approach

    Use clear, simple language and avoid unnecessary jargon.
    ```

</details>

11. To use the prompt, open Chat and type `/explanation`, then press Enter.
12. Provide any requested inputs and observe how Copilot follows the reusable prompt file.

### Custom Chat Modes

Copilot includes **Ask** and **Agent** modes by default. Custom chat modes let you define your own mode-specific goals for your environment.

Custom chat mode files (`.chatmode.md`) have a YAML header plus a natural-language body. Common header fields:

- description
- tools
- model

Store chat modes in `.github/chatmodes` or your local user profile.

**Instructions:**

1. In your IDE, ensure GitHub Copilot Chat is open
2. Click on the cogwheel in the top-right corner of the Chat window
3. In the drop-down menu, select "Modes"
4. You should now see a new drop-down menu in your command palette at the top of your IDE. Click the button that says "Create new custom chat mode file..."
5. Choose to save this new file in `.github/chatmodes`, then name your file "Plan"
6. You should now see a template generated titled `Plan.chatmode.md`
7. From this template, take a few minutes to build a custom chat mode that will plan out how to tackle new code changes

<details>

  <summary>Example Chat Mode File</summary>

```md
---
description: Generate an implementation plan for new features or refactoring existing code.
tools: ["fetch", "githubRepo", "search", "usages"]
model: Claude Sonnet 4
---

# Planning mode instructions

You are in planning mode. Your task is to generate an implementation plan for a new feature or for refactoring existing code.
Don't make any code edits, just generate a plan.

The plan consists of a Markdown document that describes the implementation plan, including the following sections:

- Overview: A brief description of the feature or refactoring task.
- Requirements: A list of requirements for the feature or refactoring task.
- Implementation Steps: A detailed list of steps to implement the feature or refactoring task.
- Testing: A list of tests that need to be implemented to verify the feature or refactoring task.
```

</details>

8. To use this chat mode, return to your GitHub Copilot Chat window. At the bottom, where your prompt is entered, click your currently selected mode
9. In the drop-down list provided, choose "Plan"
10. Write a prompt in this new mode for a feature you want to implement and compare the response to your mode instructions.

## 🏆 Exercise Wrap-up

In this exercise, you customized Copilot behavior with instruction files, prompt files, and chat modes.

### Reflection Questions

- A more limited feature utilizing custom instructions is the [path-specific custom instructions file](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions?tool=vscode). How might these be beneficial over more general repository instruction sets?
- What are some prompts you might be using in your daily workflow that can be consolidated into an instructions file?

### Key Takeaways

- Custom instructions files can be used to limit repetition in your prompts
- Custom instructions can both reinforce context and define response formats
- These files can be stored at different levels to enforce rules with different scopes

## 🔮 What's Next?

In Lab 6, you'll apply Secure by Design standards to your GitHub Copilot workflow.
