# 4 Running jobs in sequence

<details>
<summary>Navigation</summary>

0. ~~[Getting started](../000/README.md)~~
1. ~~[Creating a workflow](../001/README.md)~~
1. ~~[Building code in a workflow](../002/README.md)~~
1. ~~[Running multiple jobs in parallel](../003/README.md)~~
1. **Running jobs in sequence** (this task)
1. [Deploying to GitHub Pages](../005/README.md)
1. [Using other events to run workflows](../006/README.md)
1. [Outputs from steps and jobs](../007/README.md)
1. [Keeping dependencies up to date with Dependabot](../008/README.md)
1. [Matrices](../009/README.md)
1. [Workflow dispatch inputs and security verification](../010/README.md)
1. [Learn more about GitHub Actions](../011/README.md)

</details>

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

## 4.1 Post a comment on the pull request when all jobs are finished

If we take a look through the [GitHub Marketplace](https://github.com/marketplace?type=actions), we can see that there are thousands upon thousands of actions available for us to use.
Some of these are created by GitHub themselves, some are created by other companies and some are created by individuals.
Let's use [peter-evans/create-or-update-comment](https://github.com/marketplace/actions/create-or-update-comment) to post a comment to the PR once all jobs are finished.

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
        uses: peter-evans/create-or-update-comment@v4
        with:
          issue-number: ${{ github.event.pull_request.number }}
          body: |
            All jobs have finished! 🎉
```

Here we've used `github.event.pull_request.number` which is part of the context that is available to us.

> [!IMPORTANT]
> What event is used (in this case `pull_request`) determines what context is available.

Run the workflow and see if it works.
Doesn't it???
Perhaps we'll have to do some debugging 🤔

## 4.2 Debugging

If we click the `details` link in the workflow run, we can see that the `post-comment` job is failing.
What does the log say?
It looks like some kind of permissions error, as we get a `RequestError [HttpError]: Resource not accessible by integration` error which is one of the least explanatory errors I know of.
What's happening here?

## 4.3 Adding permissions

Some things that workflows can do need _permissions_.
For instance, if we want to post a comment to a pull request in a _public repository_, we need to have the `pull-requests: write` permission.
There are many different permissions we need to give our jobs if we want them to perform certain actions, and we can see which permissions are required in the [documentation](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs).

Permissions can be added to workflows or to jobs.
Best practices is to use as little as possible.
In our case we only need to add permissions to the `post-comment` job, so let's do that:

```diff
post-comment:
  runs-on: ubuntu-latest

+ permissions:
+   pull-requests: write

needs: [job1, job2]

steps:
  - name: Post comment
    uses: peter-evans/create-or-update-comment@v4
    with:
      issue-number: ${{ github.event.pull_request.number }}
      body: |
        All jobs have finished! 🎉
```

Now run the workflow again and see if it works.

It did??
You're learning fast! 🚀
Let's try deploying to production in [task 5](../005/README.md)!
