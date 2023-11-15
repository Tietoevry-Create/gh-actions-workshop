# 3 Running multiple jobs

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

## 3.1 Test, lint and format

In the previous task, we learned how to build the project.
We're still missing some safeguards though.
We should run our unit tests, we should check that we have no linting errors (check that there are no mistakes that can lead to bugs) and we should check that our code is formatted correctly.

We can see in the [`package.json`](../../package.json) file that we have a few `scripts` available.
These can all be run with `npm run <script name>`:

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "test": "vitest run",
  "lint:check": "eslint . --ext .ts,.tsx",
  "format:check": "prettier --check ."
}
```

Create one job for each of these scripts (apart from `start` which will run the development server indefinitely).
Now if we commit and see how the workflow runs, we can see that all jobs are run at the same time.

If we open up the repository settings page again and take a look at our branch protection rule, we can now search for the new jobs we added.
Jobs will show up in search after they've been run at least once.

Did everything pass?
If yes, move on to [task 4](../4/README.md)!
