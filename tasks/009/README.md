# 9 Matrices

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
1. **Matrices** (this task)
1. [Workflow dispatch inputs and security verification](../010/README.md)
1. [Learn more about GitHub Actions](../011/README.md)

</details>

## 9.1 Using a matrix

Sometimes we need to build our code on different operating systems or with different versions of a programming language.
Creating a new job for each combination would be repetitive.
Instead, we can use a matrix to define the different combinations.

To use a matrix, we define a `strategy` in our job.
The `matrix` key contains a list of keys and values.
Each key is a variable name, and each value is a list of possible values for that variable.
The job will run once for each combination of values.

Let's create a new workflow `matrix.yaml`:

```yaml
name: Matrices

on: push

jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macOS-latest]

    runs-on: ${{ matrix.os }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Run build script
        run: echo "Building on ${{ matrix.os }}"
```

## 9.2 Multiple variables

We can also define multiple variables in our matrix.
This is useful when we want to test different versions of a programming language on different operating systems.
Let's create a new workflow `matrix-multiple.yaml`:

```yaml
name: Matrices with multiple variables

on: push

jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macOS-latest]
        node-version: [14, 16]

    runs-on: ${{ matrix.os }}

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}

      - name: Run build script
        run: echo "Building on ${{ matrix.os }} with Node.js ${{ matrix.node-version }}"
```

In this example, we have 3 different operating systems and 2 different versions of Node.js.
The job will in total be run 6 times, once for each combination of operating system and Node.js version.
To verify this, try to run it and see how many jobs are created in the Actions tab.
