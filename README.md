# GitHub Actions Workshop

Welcome to the GitHub Actions workshop!
This workshop will teach you how to use GitHub Actions to automate your workflows.

Our goal with this workshop is to make you gain a basic understanding of GitHub Actions, and to give you the tools to continue learning on your own.
Additionally, we want you to be more comfortable and confident in using GitHub Actions in your own projects.
Opening up a large repository with many workflows can be intimidating, but we hope that this workshop will make you feel more at home.

## What will we do in this workshop?

The workshop consists of eight main tasks:

1. [Creating a workflow](./tasks/1/README.md)
1. [Building code in a workflow](./tasks/2/README.md)
1. [Running multiple jobs in parallel](./tasks/3/README.md)
1. [Running jobs in sequence](./tasks/4/README.md)
1. [Deploying to GitHub Pages](./tasks/5/README.md)
1. [Using other events to run workflows](./tasks/6/README.md)
1. [Outputting data from steps and jobs](./tasks/7/README.md)
1. [Keeping dependencies up to date with Dependabot](./tasks/8/README.md)
1. [Matrices](../9/README.md)
1. [Workflow dispatch inputs and security verification](./tasks/10/README.md)

If you already have some experience with GitHub Actions, feel free to skip ahead to the task you're interested in.

## Prerequisites

- A GitHub account
- A text editor (e.g. [Visual Studio Code](https://code.visualstudio.com/))
- Knowledge of Git and Pull Requests are assumed

If you don't want to use a text editor on your computer, it's possible to do everything on <https://github.dev>, which essentially is a web-based version of Visual Studio Code.

## What is GitHub Actions?

GitHub Actions is a way to automate your workflows.
Anything that needs to be done _every time something happens_ it typically a job for machines.
GitHub Actions can trigger any time code changes, a pull request is opened, a new release is created, and more.
You can even add a button in the GitHub UI to trigger a workflow manually.

Typical use cases for GitHub Actions include:

- Running tests
- Building and deploying applications
- Sending notifications
- Creating releases
- Checking for security vulnerabilities

Ok, that's the introduction out of the way, let's get started!

## 0 Getting started

1. Click the "Use this template" button at the top of this repository to create a new repository from this template.
   If you need to decide, set your own user as the owner of the new repository.

   ⚠️ It's best if your new repository is **`public`**, as one of the tasks requires it.

2. Name the repository `gh-actions-workshop`

   ℹ️ This is not a requirement, but some of the tasks assume that this is the name.
   If you decide to use another name, keep in mind that you might have to change some of the commands in the tasks.

**If you're doing things locally**:

3. Clone your new repository
4. Open your new repository in your text editor

**If you're doing things on <https://github.dev>**:

3. Open your repository on <https://github.dev/[your-username]/gh-actions-workshop>

Now you're ready to go!
Please proceed to [task 1](tasks/1/README.md).
