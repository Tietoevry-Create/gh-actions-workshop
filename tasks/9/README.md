# 9 Some more advanced topics


<details>
<summary>Navigation</summary>

1. ~~[Creating a workflow](../1/README.md)~~
1. ~~[Building code in a workflow](../2/README.md)~~
1. ~~[Running multiple jobs in parallel](../3/README.md)~~
1. ~~[Running jobs in sequence](../4/README.md)~~
1. ~~[Deploying to GitHub Pages](../5/README.md)~~
1. ~~[Using other events to run workflows](../6/README.md)~~
1. ~~[Outputs from steps and jobs](../7/README.md)~~
1. ~~[Keeping dependencies up to date with Dependabot](../8/README.md)~~
1. **Advanced topics** (this task)

</details>

In this chapter we'll try out a few advanced topics.

## 9.1 String inputs

Let's start by creating a new workflow `advanced.yaml`.

```yaml
name: Advanced topics

on:
    workflow_dispatch:
      inputs:
        message:
          type: string
          description: Input your message

jobs:
    hello_message_job:
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

Obviously, free text inputs can be **very dangerous**, we'll get back to some of this in a moment.

## 9.2 Conditionals

Let's add another input of type `choice`.

```yaml
      inputs:
        message:
          type: string
          description: Input your message
        lang_selector:
          type: choice
          description: Choose your language
          options:
            - English
            - Norsk
```

And then we duplicate our job and rename them to `hello_english_job` and `hello_norsk_job`.
And for the second one, replace the "Hello" in the message by "Hei".

Finally, we want to only show the greeting in the language selected.

To do this, we can add an `if` clause to the job.

```yaml
jobs:
  hello_english_job:
    if: inputs.lang_selector == 'English'
    name: Hilsen norsk

...

  hello_norsk_job:
    if: inputs.lang_selector == 'Norsk'
    name: Hilsen norsk
```

Of course, the conditions could be much more advanced.

## 9.3 Security considerations

In the above workflow, we are simply taking the input and writing it back out without any checks.

Install the tool [zizmor](https://github.com/woodruffw/zizmor)
by following [the instructions](https://woodruffw.github.io/zizmor/installation/).

Then run it against our workflow file.

You should get two errors similar to

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

The recommended way to mitigate is to first set the "message" as an environment variable and then use that environment variable inside the run statement.
This will cause some sanitation being run on the value.

To set an environment variable, you can define an `env:` block on the level you want to define it.
That can be the entire workflow, a complete job or an individual step.
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

