## How to Use These Instruction Files

Use these steps to add the Copilot instruction templates to your repository.

> [!IMPORTANT]
> These instruction files are currently written for a **Node.js + React + Terraform** stack.
> Before using them in another repository, rewrite and adapt them to match your own
> technology stack, architecture, security requirements, and engineering standards.

1. Create a `.github` folder in the root of your repository (if it does not already exist).
2. Copy `copilot-instructions.md` into `.github/`.
3. Copy the full `instructions/` folder (including all files) into `.github/`.
4. Rewrite and adjust the instruction files to match your repository, stack, architecture, and security requirements.

### Expected Result

After setup, your repository should include:

```text
.github/
  copilot-instructions.md
  instructions/
	...
```
