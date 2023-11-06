import { useState } from "react";
import styles from "./app.module.css";

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 90) + 120}deg 100% 50%)`;
}

export function App() {
  const [startColor, setStartColor] = useState("rebeccapurple");
  const [endColor, setEndColor] = useState("hotpink");

  function setRandomColors() {
    setStartColor(randomColor());
    setEndColor(randomColor());
  }

  return (
    <>
      <header>
        <img
          src="https://picsum.photos/1130/235"
          alt=""
          width="1130"
          height="235"
        />
      </header>

      <main>
        <h1
          className={styles.gradientText}
          style={{
            // @ts-expect-error CSS custom properties are not yet supported by
            //                  the TypeScript compiler.
            "--start-color": startColor,
            "--end-color": endColor,
          }}
        >
          Hello World! 🐼
        </h1>
        <p>
          This is an example web page that doesn't do too much. One cool thing
          it can do, though is to change the heading colors just by the click of
          a button!!! Try it out yourself:
          <button onClick={setRandomColors}>Change heading gradient</button>
        </p>
      </main>
    </>
  );
}
