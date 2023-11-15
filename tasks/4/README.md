# 4 Running jobs in parallel

As we learned in the previous task, we can run multiple jobs in parallel.
Most jobs can be run at the same time, however in some cases jobs need to wait for each other to finish.
For instance if we have a step that deploys the application, we might want to run end-to-end tests after the deployment has finished.

For this, we can use the `needs` keyword:

```diff
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

+   needs: job1

    steps:
      - name: Step 1
        run: echo "Step 1"
      - name: Step 2
        run: echo "Step 2"
```

## Post a comment on the pull request when all jobs are finished

If we take a look through the [GitHub Marketplace](https://github.com/marketplace?type=actions), we can see that there are thousands upon thousands of actions available for us to use.
Some of these are created by GitHub themselves, some are created by other companies and some are created by individuals.
Let's use [peter-evans/create-or-update-comment](https://github.com/marketplace/actions/create-or-update-comment) to post a comment to the PR once all jobs are finished.

<!-- Some things that workflows can do need _permissions_.
For instance, if we want to post a comment to a pull request, we need to have the `pull_requests: write` permission.
There are many different permissions we need to give our jobs if we want them to perform certain actions, and we can see which permissions are required in the [documentation](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs).
 -->

Create a new job which uses the `peter-evans/create-or-update-comment` action:

```yaml
jobs:
  job1: ...

  job2: ...

  post-comment:
    runs-on: ubuntu-latest

    needs: [job1, job2]

    steps:
      - name: Post comment
        uses: peter-evans/create-or-update-comment@v3
        with:
          issue-number: ${{ github.event.pull_request.number }}
          body: |
            All jobs have finished! 🎉
```

Here we've used `github.event.pull_request.number` which is part of the context that is available to us.
⚠️ Note that what event is used (in this case `pull_request`) determines what context is available.
