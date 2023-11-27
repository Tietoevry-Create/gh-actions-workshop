# 7 Outputs from steps and jobs

<details>
<summary>Navigation</summary>

1. ~~[Creating a workflow](../1/README.md)~~
1. ~~[Building code in a workflow](../2/README.md)~~
1. ~~[Running multiple jobs in parallel](../3/README.md)~~
1. ~~[Running jobs in sequence](../4/README.md)~~
1. ~~[Deploying to GitHub Pages](../5/README.md)~~
1. ~~[Using other events to run workflows](../6/README.md)~~
1. **Outputs from steps and jobs** (this task)

</details>

From time to time we want our workflows to output something that we can use in other steps or jobs.
For instance, we might want to output the URL to a deployed application so that we can use it in a later step to run some tests against it.
Step outputs are also a nice way to create "variables" in our workflows, by outputting the result of a command to a file and then using that file in a later step.

## Single line output

To define outputs for a step, we need to add contents to the file which has the path `$GITHUB_OUTPUT`.
To use that output in a later step, we use `steps.<step-id>.outputs.<output-name>`.

This means each step that outputs something needs a unique ID (use the `id` key in the step definition), in addition to changing the output file.
In the example below, we set the ID of the first step to `whats-the-answer` and output the answer to life, the universe and everything to the output key `answer`:

```yaml
steps:
  - name: What's the answer to life, the universe and everything?
    id: whats-the-answer
    run: |
      echo "answer=42" >> "$GITHUB_OUTPUT"

  - name: Use the answer
    run: |
      echo "The answer is ${{ steps.whats-the-answer.outputs.answer  }}"
```

## Multi-line output

Because of the way that bash handles newlines, we need to use a slightly different syntax to output multi-line strings.
By adding a delimiter which is not used in the output, we can use `<<` to output everything until the delimiter to the output file.
We'll end up with something like this:

```
{name}<<{delimiter}
{value}
{delimiter}
```

The delimiter `EOF` (End Of File) is commonly used, but you can use any string that is not used in the output.
In the example below, we set an output with the key `json-output` to the JSON response from the World Time API:

```yml
steps:
  - name: Find the current time in Oslo
    run: |
      echo "json-response<<EOF" >> $GITHUB_OUTPUT
      curl "http://worldtimeapi.org/api/timezone/Europe/Oslo" >> $GITHUB_OUTPUT
      echo "EOF" >> $GITHUB_OUTPUT
```

You might have noticed it by now, but using camel-casing is the recommended way to name outputs, ids and just about anything when working with GitHub Actions.

## Job outputs

We can also output things from jobs, which is useful if we want to use the output from one job in another job.
These work similar to step outputs, but we need to use the `jobs.<job-id>.outputs.<output-name>` syntax to access them.
We also need to define `outputs` on the job that outputs something.
A common use is to output deploy urls to an end-to-end test job, so that we can run tests against the deployed application:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest

    outputs:
      deploy-url: ${{ steps.deploy.outputs.deploy-url }}

    steps:
      - name: Deploy to staging
        id: deploy
        run: |
          echo "deploy-url=https://staging.example.com" >> $GITHUB_OUTPUT

  e2e-test:
    runs-on: ubuntu-latest

    needs: deploy

    steps:
      - name: Run end-to-end tests
        run: |
          echo "Running tests against ${{ needs.deploy.outputs.deploy-url }}"
```

## 7.1 Running Lighthouse checks on a site deployed to GitHub Pages

Lighthouse is a tool for running audits on web pages.
It can be used to check for accessibility issues, performance issues, SEO issues and more.
In [task 5](../5/README.md), we deployed a website to GitHub Pages.
Let's add a step that runs Lighthouse checks on the deployed site.

Previously we had the following steps in our deploy job:

```yaml
- name: Checkout code
  uses: actions/checkout@v3

- name: Build application
  run: npm run build

- name: Setup Pages
  uses: actions/configure-pages@v3

- name: Upload artifact
  uses: actions/upload-pages-artifact@v2
  with:
    # Upload the `dist` folder, which was generated by `npm run build`
    path: "./dist"

- name: Deploy to GitHub Pages
  id: deployment
  uses: actions/deploy-pages@v2
```

If we take a look at the [`actions/deploy-pages` documentation](https://github.com/actions/deploy-pages), we can see that it has an output called `page_url`.
This is the URL to the deployed site, which we can use to run Lighthouse checks against.
Let's use the [Lighthouse CI Action](https://github.com/marketplace/actions/lighthouse-ci-action) to check our newly deployed page.
This could be added as a new step after the deploy step, but let's create a new job instead.
The reasoning behind this is that we'll get to different checks in the GitHub UI.
If something were to fail, we'd be able to see whether it was the deploy step or the Lighthouse step that failed.

1. Output the `page_url` from the `deploy` job
1. Create a new job called `lighthouse` that runs on `ubuntu-latest`
1. Add a `needs` key to the job that makes it depend on the `deploy` job
1. Add a step that runs the Lighthouse CI Action with the URL to the deployed site as input

<details>
<summary>This would look something like this (spoiler)</summary>

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest

    outputs:
      page_url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Build application
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v3

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          # Upload the `dist` folder, which was generated by `npm run build`
          path: "./dist"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2

  lighthouse:
    runs-on: ubuntu-latest
    needs: deploy
    steps:
      - name: Run Lighthouse checks
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: ${{ needs.deploy.outputs.page_url }}
```
</details>

After running this workflow, you should be able to see the Lighthouse checks in the GitHub UI.