# 2 Creating the first workflow that actually does something

In this project we have a simple web site.
There's not much code in it, however I think there's a bug in it which has been merged to `main` by mistake.
It seems that the project currently doesn't build correctly.
Let's create a workflow that will run our tests and check for this bug.

We'll use the `pull-request.yml` file from before, but keep in mind that the file name does not make a difference.
Nevertheless, it's good practice to name your workflow files after the event that triggers them or what they do.

## 2.1 Creating a workflow that tries to build the project

To build the project, we'll have to run the command `npm run build`.
Before we can do that, we'll need to make sure that the repository code is checked out, i.e. downloaded to the build agent.
After checking out, we have to install our Node dependencies with `npm install` (or `npm ci` which is a slightly better way to install dependencies in workflows).

1. In your workflow file, add a new job called `build` that runs on `ubuntu-latest`
1. Use the external workflow `actions/checkout@v3` to check out the repository:

   ```yaml
   - name: Checkout repository
     # To reference external workflows, we use the `uses` keyword.
     # The thing after the `@` is the version of the workflow, and is a Git tag.
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

## 2.2 Fixing the error in the code

Go to the `src/index.tsx` file and fix the error.
There might be a line at the top that looks suspiciously wrongful.
Commit the change and see that the workflow now runs successfully 🤩

Ok nice, now the project builds! Let's move on to [task 3](../3/README.md) to run our tests.
