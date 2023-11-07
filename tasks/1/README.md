# 1 Your first task

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

Great work!
You've now created your first workflow 🎉
Let's do something a little more productive in [the next task](../2/README.md).
