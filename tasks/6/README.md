# 6 Using other events

There are looads of events we can use to trigger our workflows.
We mostly use the `pull_request` event, as it makes the most sense when validating pull requests, but some times we use the others, which make a huge list:

- `branch_protection_rule`
- `check_run`
- `check_suite`
- `create`
- `delete`
- `deployment`
- `deployment_status`
- `discussion`
- `discussion_comment`
- `fork`
- `gollum` (yes, gollum)
- `issue_comment`
- `issues`
- `label`
- `merge_group`
- `milestone`
- `page_build`
- `project`
- `project_card`
- `project_column`
- `public`
- `pull_request`
- `pull_request_comment` (use `issue_comment`)
- `pull_request_review`
- `pull_request_review_comment`
- `pull_request_target`
- `push`
- `registry_package`
- `release`
- `repository_dispatch`
- `schedule`
- `status`
- `watch`
- `workflow_call`
- `workflow_dispatch`
- `workflow_run`

Read more about them in [the documentation](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows).

## 5.1 `workflow_dispatch`

One of the events is `workflow_dispatch` which lets us trigger a workflow by the click of a button.
This is useful for testing workflows, or for running workflows that are not triggered by an event, such as deploying to production.
Let's create one that prints out hello world.

Because we're using a new event and not `pull_request` as before, we need to make a new workflow file for this.

1. Create a new file called `hello-world.yml` in the `.github/workflows` directory.
1. Add the following content to the file:

   ```yaml
   name: Click to say hi

   on:
     - workflow_dispatch

   jobs:
     hello-world:
       runs-on: ubuntu-latest
       steps:
         - name: Hello world
           run: echo "Hello 🌏!"
   ```

1. Commit and push your changes to the main branch
1. Now go to the "Actions" tab in your repository (<https://github.com/[your-username]/gh-actions-workshop/actions>)
1. Click on the `Click to say hi` workflow in the panel to the left and run it on the main branch
1. See that there's a button called "Run workflow" in the top right corner
1. Click it!!!
1. Now see that a new run has been started and that it prints out `Hello 🌏!` in the logs

## 5.2 `schedule`

Another event that is useful is `schedule`.
This lets us run a workflow on a schedule, for instance every day at 12:00.
We use them to for instance run a workflow that checks for security vulnerabilities in our dependencies every day, or to run workflows that are very long-running and therefore can't be run on every pull request.
They're also useful for fetching data from other sources once a day.

Let's create a workflow that runs every five minutes (_which is the shortest time interval_) and prints out the current time.
We'll use the CRON syntax to schedule the workflow.
If you're not familiar with it, check out [crontab guru](https://crontab.guru/) to quickly create your own CRON expressions.

In a new workflow file (`timestamp.yml`), add the following content:

```yaml
name: Timestamp

on:
  schedule:
    - cron: "*/5 * * * *" # Run every five minutes

jobs:
  timestamp:
    runs-on: ubuntu-latest
    steps:
      - name: Timestamp
        run: echo "The time is $(date)"
```

> **Note**
> Be sure to remove this workflow when you're done with it, as it will run every minute forever and that's not very sustainable 🌱

That's all there is to it!
You now know how to create a workflow, how to run jobs in parallel and in sequence, how to use external actions and how to use different events to trigger workflows.
You're now ready to start creating your own workflows!
