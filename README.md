# GitHub Actions Workshop

Welcome to the GitHub Actions workshop!
This workshop will teach you how to use GitHub Actions to automate your workflows.

Our goal with this workshop is to make you gain a basic understanding of GitHub Actions, and to give you the tools to continue learning on your own.
Additionally, we want you to be more comfortable and confident in using GitHub Actions in your own projects.
Opening up a large repository with many workflows can be intimidating, but we hope that this workshop will make you feel more at home.

## What will we do in this workshop?

The workshop consists of eleven main tasks:

0. [Getting started](./tasks/000/README.md)
1. [Creating a workflow](./tasks/001/README.md)
1. [Building code in a workflow](./tasks/002/README.md)
1. [Running multiple jobs in parallel](./tasks/003/README.md)
1. [Running jobs in sequence](./tasks/004/README.md)
1. [Deploying to GitHub Pages](./tasks/005/README.md)
1. [Using other events to run workflows](./tasks/006/README.md)
1. [Outputting data from steps and jobs](./tasks/007/README.md)
1. [Keeping dependencies up to date with Dependabot](./tasks/008/README.md)
1. [Matrices](./tasks/009/README.md)
1. [Workflow dispatch inputs and security verification](./tasks/010/README.md)

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

Ok, that's the introduction out of the way, let's [get started](./tasks/000/README.md)!
