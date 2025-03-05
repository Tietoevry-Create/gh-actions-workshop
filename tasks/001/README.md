# 1 Your first task

<details>
<summary>Navigation</summary>

0. ~~[Getting started](../000/README.md)~~
1. **Creating a workflow** (this task)
1. [Building code in a workflow](../002/README.md)
1. [Running multiple jobs in parallel](../003/README.md)
1. [Running jobs in sequence](../004/README.md)
1. [Deploying to GitHub Pages](../005/README.md)
1. [Using other events to run workflows](../006/README.md)
1. [Outputs from steps and jobs](../007/README.md)
1. [Keeping dependencies up to date with Dependabot](../008/README.md)
1. [Matrices](../009/README.md)
1. [Workflow dispatch inputs and security verification](../010/README.md)
1. [Learn more about GitHub Actions](../011/README.md)

</details>

## Introduction

Your first task will be to create a simple workflow that prints a message to the terminal.
This will help you get familiar with the basic structure of a workflow file.

Workflow files reside within the `.github/workflows` directory.
They have a `name`, one or more triggers (`on`) and `jobs` which will run when the event triggers.

## Goals

- Create a new workflow
- Print a message to the terminal

## Steps

1. Create a new branch
1. Create a new file in the `.github/workflows` directory (it's important to spell the directory names correctly). You can call it `pull-request.yml`
1. Add the following content to the file:

   ```yaml
   # Workflow names are optional, but should be provided.
   # They are displayed on GitHub when the action is run.
   name: Hello world ✨

   # The `on` property configures the events that will trigger the workflow.
   # In our case we want it to run when the `pull_request` event is triggered.
   # In short, that means that the workflow will run when a pull request is
   # either opened or updated (but not renamed or labeled – code needs to
   # be changed).
   on:
     - pull_request

   # Jobs are what actually do the work. We can add as many jobs as we want.
   # These will be run in parallel.
   jobs:
     hello_world_job:
       # As with workflow names (and even step names), job names are not
       # strictly required, but they are good practice.
       name: Hello world 🌱

       # There are many virtual machines we can run our jobs on. The most
       # common one is `ubuntu-latest`. See this page for a full list of
       # officially supported runners: https://github.com/actions/runner-images
       runs-on: ubuntu-latest

       # Each job can have multiple steps. These will be run in sequence.
       steps:
         - name: Print message to terminal
           run: echo "Hello 🌏!"
   ```

1. Commit and push your changes
1. Open a pull request
1. Check the "Checks" tab to see the status of your workflow
1. See that the `Hello 🌏!` message is displayed ✨

> [!TIP]
> Did you create a pull request, but the workflow didn't run?
> There are a few things that could be wrong:
>
> - The workflow file is not in the correct directory — Remember, the file needs to be in a folder called `.github/workflows` _exactly_
> - The workflow file is not named correctly — The file needs to end with `.yml` or `.yaml`
> - The workflow file is not valid YAML — YAML is very strict, so make sure you don't have any typos. If you click the `checks` button in your PR, GitHub will tell you if there are any syntax errors in your workflow file

Great work!
You've now created your first workflow 🎉
Let's do something a little more productive in [the next task](../002/README.md).
