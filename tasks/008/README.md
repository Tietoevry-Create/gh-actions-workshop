# 8 Keeping dependencies up to date with Dependabot

<details>
<summary>Navigation</summary>

0. ~~[Getting started](../000/README.md)~~
1. ~~[Creating a workflow](../001/README.md)~~
1. ~~[Building code in a workflow](../002/README.md)~~
1. ~~[Running multiple jobs in parallel](../003/README.md)~~
1. ~~[Running jobs in sequence](../004/README.md)~~
1. ~~[Deploying to GitHub Pages](../005/README.md)~~
1. ~~[Using other events to run workflows](../006/README.md)~~
1. ~~[Outputs from steps and jobs](../007/README.md)~~
1. **Keeping dependencies up to date with Dependabot** (this task)
1. [Matrices](../009/README.md)
1. [Workflow dispatch inputs and security verification](../010/README.md)
1. [Learn more about GitHub Actions](../011/README.md)

</details>

Dependabot is a GitHub feature that automatically creates pull requests to update dependencies.
It supports many different package managers, including npm (Node), Maven (Java), NuGet (.NET), and more.
It can even keep workflow dependencies up to date!

## 8.1 Enabling Dependabot

GitHub will check the `.github` directory, and if there's a `dependabot.yml` file there, it will enable Dependabot for the repository.
Let's create a new file called `.github/dependabot.yml` and enable Dependabot for our repository.
As we have both Node and GitHub Actions code in our repo, we should keep both of them up to date.

```yaml
version: 2 # The version of the Dependabot config file format. Currently only v2 is supported, and the file _must_ start with `version: 2`.

updates:
  # Enable version updates for npm dependencies
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: daily

  # Enable version updates for GitHub Actions
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: daily
```

If we commit this file to a new branch and create a pull request for that branch, we'll see that a new check is added to the PR.
It will validate the Dependabot configuration file to see that we haven't made any mistakes.
A few minutes after the PR is merged, Dependabot will start creating pull requests to update our dependencies if there are any.

[Dependabot's documentation](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file) has a lot of information about what can be configured.
It's possible to [group dependencies](https://sindre.is/sometimes-blogging/dependabot-protips/), ignore certain dependencies, and more.

That's all there is to it!
You now know how to create a workflow, how to run jobs in parallel and in sequence, how to use external actions and how to use different events to trigger workflows.
You're now ready to start creating your own workflows!

## What's next?

What you haven't yet learned is how to…

- use environment variables
- use inputs when running jobs manually
- use caching to speed up workflows
- use matrix builds to run the same job multiple times with different inputs
- use artifacts to pass data between jobs
- use the `if` keyword to conditionally run steps or jobs
- use GitHub Secrets
- learn about security practices

You can find some of these topics introduced in the [next task for advanced experiments](../009/README.md).
