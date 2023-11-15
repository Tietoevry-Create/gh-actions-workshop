# GitHub Actions Workshop

Welcome to the GitHub Actions workshop!
This workshop will teach you how to use GitHub Actions to automate your workflows.

## What are GitHub Actions?

GitHub Actions are a way to automate your workflows.
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

## What will we do in this workshop?

The workshop consists of five main tasks:

1. [Create a workflow](tasks/1/README.md)
2. [Building code in a workflow](tasks/2/README.md)
3. [Running multiple jobs](tasks/3/README.md)
4. [Running jobs in parallel](tasks/4/README.md)
5. [Deploying to GitHub Pages](tasks/5/README.md)
6. [Using other events to run workflows](tasks/6/README.md)

## Prerequisites

- A GitHub account
- A text editor (e.g. [Visual Studio Code](https://code.visualstudio.com/))

If you don't want to use a text editor, it's possible to do everything on <https://github.dev>, which essentially is a web-based version of Visual Studio Code.

## 0 Getting started

1. Click the "Use this template" button at the top of this repository to create a new repository from this template. If you need to decide, set your own user as the owner of the new repository.
2. Call the repository `gh-actions-workshop`.

If you're doing things locally:

3. Clone your new repository
4. Open your new repository in your text editor

If you're doing things on <https://github.dev>:

3. Open your repository on <https://github.dev/[your-username]/gh-actions-workshop>

Now you're ready to go!
Please proceed to [task 1](tasks/1/README.md).
