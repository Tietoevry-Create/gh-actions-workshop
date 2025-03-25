# 10 Workflow dispatch inputs and security verification

<details>
<summary>Navigation</summary>

0. ~~[Getting started](../000/README.md)~~
1. ~~[Creating a workflow](../001/README.md)~~
1. ~~[Building code in a workflow](../002/README.md)~~
1. ~~[Running multiple jobs in parallel](../003/README.md)~~
1. ~~[Running jobs in sequence](../004/README.md)~~
1. ~~[Deploying to GitHub Pages](../005/README.md)~~
1. ~~[Using other events to run workflows](../006/README.md)~~
1. ~~[Outputs from steps and jobs](../007/README.md)~~
1. ~~[Keeping dependencies up to date with Dependabot](../008/README.md)~~
1. ~~[Matrices](../009/README.md)~~
1. **Workflow dispatch inputs and security verification** (this task)
1. [Learn more about GitHub Actions](../011/README.md)

</details>

In this chapter we'll try out a few Workflow dispatch inputs and security verification.

## 9.1 String inputs

In step 6, we learned how to use a `workflow_dispatch` event to manually trigger a workflow.
We only added a dispatch, but didn't make use of the `inputs` functionality.
Let's try that out!

Let's start by creating a new workflow `advanced.yaml`.

```yaml
name: Workflow dispatch inputs and security verification

on:
  workflow_dispatch:
    inputs:
      message:
        type: string
        description: Input your message

jobs:
  hello-message-job:
    name: Hello message
    runs-on: ubuntu-latest
    steps:
      - name: Print message to terminal
        run: echo "Hello ${{ inputs.message }}!"
```

Now, navigate to the job's page on GitHub, i.e. `https://github.com/[your-username]/gh-actions-workshop/actions/workflows/advanced.yaml`

On the top right you'll find the "Run workflow" button, where you can enter your message.
You'll see that it prints your message.

There are other input types, such as `choice`, `boolean`, and `environment`.
We will make use of a `choice` in the next section.

> [!WARNING]  
> Do note, free text inputs can be **very dangerous**, we'll get back to some of this in a moment.

## 9.2 Conditionals

1. Let's add another input of type `choice`:

```yaml
name: Workflow dispatch inputs and security verification

on:
  workflow_dispatch:
    inputs:
      message:
        type: string
        description: Input your message

      lang-selector:
        type: choice
        description: Choose your language
        options:
          - English
          - Norsk
```

2. Duplicate the `hello-message-job` and rename the two copies to respectively `hello-english-job` and `hello-norsk-job`
3. For the Norwegian one, replace the "Hello" in the message by "Hei".

Now we'd like only to show the greeting in the selected language.

To do this, we can use the `if` clause as such:

```yaml
name: Workflow dispatch inputs and security verification

on:
  workflow_dispatch:
    inputs:
      message:
        type: string
        description: Input your message

      lang-selector:
        type: choice
        description: Choose your language
        options:
          - English
          - Norsk

jobs:
  hello-english-job:
    if: inputs.lang-selector == 'English'
    name: Hello ${{ inputs.message }} 🇬🇧"

  hello_norsk_job:
    if: inputs.lang-selector == 'Norsk'
    name: Hei ${{ inputs.message }} 🇳🇴"
```

This is a simple example, but you can use the `if` clause in many places, such as in steps, jobs, and even on the workflow level.

## 9.3 Security considerations

In the above workflow, we are simply taking the input and writing it back out without any checks.
This poses a security risk, as the input could contain code that would be executed.
We can use the [zizmor](https://github.com/woodruffw/zizmor) tool to check for such vulnerabilities.

<!-- Check out the installation instructions on the [zizmor documentation page](https://woodruffw.github.io/zizmor/installation/) to install it locally. -->
<!-- Then run it against our workflow file. -->

Let's try to build or own meta action which runs zizmor on all of our workflows.

```yaml
name: Zizmor validation

on:
  push:
    paths:
      - ".github/workflows/**"

jobs:
  zizmor:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # We'll have to install Python to install Zizmor via pip
      - name: Setup python
        uses: actions/setup-python@v5
        with:
          python-version: "3.x"

      - name: Install zizmor
        run: |
          python -m pip install zizmor --root-user-action=ignore

      - name: Run zizmor
        # For the sake of the example, we'll only check for high severity issues
        run: zizmor .github/workflows --min-severity high
```

You should get two errors similar to:

```text
error[template-injection]: code injection via template expansion
  --> /[my/user/path]/gh-actions-workshop/.github/workflows/advanced.yaml:24:7
   |
24 |     - name: Print message to terminal
   |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ this step
25 |       run: echo "Hello ${{ inputs.message }}!"
   |       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ inputs.message may expand into attacker-controllable code
   |
   = note: audit confidence → Low
```

The recommended way to mitigate our error is to first set the `message` as an environment variable and then use that environment variable inside the run statement.
Environment variables will be sanitized by GitHub Actions.

To set an environment variable, you can define an `env:` block on either the workflow, job or step level.
You then use the environment variable just as you would in any regular shell script.

We'll be doing it on the step level, as such

```yaml
steps:
  - name: Print message to terminal
    run: echo "Hei ${MESSAGE}!"
    env:
      MESSAGE: ${{ inputs.message }}
```

You'll notice that also zizmor is happy now.
In the [next task](../011/README.md), you will get some tips on topics for further reading!
