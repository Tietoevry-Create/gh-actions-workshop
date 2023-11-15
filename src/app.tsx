import { Sortable } from "./components/sortable";

export function App() {
  return (
    <>
      <h1>Hi y&apos;all 🐼</h1>

      <h2>I like jigsaw puzzles 👾</h2>
      <p>
        Using a complex set of algorithms and datastructures, we have created an
        advanced version of a jisgaw puzzle. It&apos;s hard to solve and
        doesn&apos;t look very good, but it was fun to make.
      </p>

      <Sortable />

      <br />
      <h2>…and fun facts 🧞‍♂️</h2>
      <p>
        Cleopatra lived closer in time to the Moon landing than to the
        construction of the Great Pyramid of Giza. She was born 2000 years
        before the Moon landing (69 BC), but 2491 years after the pyramid&apos;s
        construction ended (2560 BC). See more on{" "}
        <a href="https://noel.fun">Noel.fun</a>.
      </p>
    </>
  );
}
