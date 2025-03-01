# 3 Running multiple jobs in parallel

<details>
<summary>Navigation</summary>

1. ~~[Creating a workflow](../1/README.md)~~
1. ~~[Building code in a workflow](../2/README.md)~~
1. **Running multiple jobs in parallel** (this task)
1. [Running jobs in sequence](../4/README.md)
1. [Deploying to GitHub Pages](../5/README.md)
1. [Using other events to run workflows](../6/README.md)
1. [Outputs from steps and jobs](../7/README.md)
1. [Keeping dependencies up to date with Dependabot](../8/README.md)
1. [Matrices](../9/README.md)
1. [Workflow dispatch inputs and security verification](../10/README.md)
1. [Learn more about GitHub Actions](../11/README.md)


</details>

In the previous task we created a workflow that runs a single job.
Each step in a job is run in sequence:

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        run: echo "Step 1"
      - name: Step 2
        run: echo "Step 2"
```

However, we can also run multiple jobs in parallel:

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        run: echo "Step 1"
      - name: Step 2
        run: echo "Step 2"
  job2:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        run: echo "Step 1"
      - name: Step 2
        run: echo "Step 2"
```

We can have as many jobs as we want and they will all run in parallel.
Jobs are great for grouping up steps that are related to each other, and to otherwise keep the workflow file clean.
They often can be run entire independently of each other, therefore making them great for parallelization.

## 3.1 Test and lint

In the previous task, we learned how to build the project.
We're still missing some safeguards though.
We should run our unit tests, and we should check that we have no linting errors (i.e. check that there are no mistakes that can lead to bugs).

We can see in the [`package.json`](../../package.json) file that we have a few `scripts` available.
These can all be run with **`npm run <script name>`**:

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "test": "vitest run",
  "lint:check": "eslint . --ext .ts,.tsx",
  "lint:fix": "npm run lint:check -- --fix",
  "format:check": "prettier --check .",
  "format:fix": "prettier --write ."
}
```

Create one job for the test script and one for the `lint:check` script.
Remember: To run the scripts, type `npm run <script name>`.
Now if we commit and see how the workflow runs, we can see that all jobs are run at the same time.

> [!TIP]
> If you get an error saying that `package.json` is not found, or that the `vitest` or `eslint` commands aren't found, remember that each job gets its own fresh virtual machine.
> The latest version of Node and npm (and .NET and a few others) come pre-installed, but we need to both clone the repository and install dependencies before we can run the scripts, just as we did for the `build` job in the previous task.

If we open up the repository settings page again and take a look at our branch protection rule, we can now search for the new jobs we added.
Jobs will show up in search after they've been run at least once.

> [!NOTE]
> You could also add a job that runs the `format:check` script.
> If you did, you would also need to format your workflow file by the rules set by Prettier.
> That is not what we're learning right now, so we skipped it, but it's a good idea to do it in your own projects.

Did everything pass?
If yes, move on to [task 4](../4/README.md)!
