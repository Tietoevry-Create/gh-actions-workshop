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

1. In your workflow file, add a new **job** called `build` that runs on `ubuntu-latest`
1. In the first **step**, use the external workflow `actions/checkout@v3` to check out the repository:

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

## 2.2 Add a PR rule to keep anyone from merging if the build fails

We now have a workflow that tries to build our code, but it's not very useful if we can still merge broken code.
GitHub has a feature called "branch protection rules" that can be used to prevent merging code that doesn't pass the checks.
Let's add a rule that prevents merging if the build fails.

1. Go to the repository settings on <https://github.com/[your-username]/gh-actions-workshop/settings>
1. Click on "Branches" in the sidebar
1. Click on "Add branch protection rule"
1. Under "Branch name pattern", enter `main`. If you have a different default branch, use that instead.
1. Check the "Require status checks to pass before merging" checkbox and see that the box opens up
1. Search for the workflow you created (`build`) and select it to make it required
1. Click "Create" to create the rule
1. Open the PR again and see that we can't merge it 😻

Now the PR can't be merged until the build passes 🎉
Other settings I usually add to my branch protection rules are:

- Require branches to be up to date before merging
- Require conversation resolution before merging
- Require deployments to succeed before merging (if we use GitHub deployments)

## 2.3 Fix the error in the code

Go to the [`src/index.tsx`](../../src/index.tsx) file and fix the error.
There might be a line at the top that looks suspiciously wrongful.
Commit the change and see that the workflow now runs successfully 🤩

Ok nice, now the project builds! Let's move on to [task 3](../3/README.md) to run our tests.
