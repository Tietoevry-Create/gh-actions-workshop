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

## Prerequisites

- A GitHub account
- A text editor

## 0 Getting started

1. Fork this repository
1. Clone your forked repository
1. Open your new repository in your text editor

## 1 Your first task

1. Create a new branch
1. Create a new file in the `.github/workflows` directory. You can call it `pull-request.yml`
1. Add the following content to the file:

   ```yaml
   # Workflow names are optional, but should be provided.
   # They are displayed on GitHub when the action is run.
   name: Hello world

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
       name: Hello world

       # There are many virtual machines we can run our jobs on. The most
       # common one is `ubuntu-latest`.
       runs-on: ubuntu-latest

       # Each job can have multiple steps. These will be run in sequence.
       steps:
         - name: Hello world action step
           run: echo "Hello 🌏!"
   ```

1. Commit and push your changes
1. Open a pull request
1. Check the "Checks" tab to see the status of your workflow
1. See that the `Hello 🌏!` message is displayed ✨

## 2 Creating the first workflow that actually does something

In this project we have a simple web site.
There's not much code in it, however I think there's a bug in it which has been merged to `main` by mistake.
It seems that the project currently doesn't build correctly.
Let's create a workflow that will run our tests and check for this bug.

We'll use the `pull-request.yml` file from before, but keep in mind that the file name does not make a difference.
Nevertheless, it's good practice to name your workflow files after the event that triggers them or what they do.

### 2.1 Creating a workflow that tries to build the project

To build the project, we'll have to run the command `npm run build`.
Before we can do that, we'll need to make sure that the repository code is checked out, i.e. downloaded to the build agent.
After checking out, we have to install our Node dependencies with `npm install` (or `npm ci` which is a slightly better way to install dependencies in workflows).

1. In your workflow file, add a new job called `build` that runs on `ubuntu-latest`
1. Use the external workflow `actions/checkout@v3` to check out the repository:

   ```yaml
   - name: Checkout repository
     uses: actions/checkout@v3
   ```

1. Add a new step that installs the dependencies:

   ```yaml
   - name: Install dependencies
     run: npm ci
   ```

1. Add the last step which runs the build command:

   ```yaml
   - name: Build
     run: npm run build
   ```

1. Use the previous PR or create a new one to run the workflow

`npm run build` will return a non-zero exit code if the build fails.
The workflow picks that up and will fail the job.

### 2.2 Fixing the error in the code

Go to the `src/index.tsx` file and fix the error.
There might be a line at the top that looks suspiciously wrongful.
Commit the change and see that the workflow now runs successfully 🤩
