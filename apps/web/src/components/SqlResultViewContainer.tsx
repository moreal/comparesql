import { JSX } from "solid-js";

export function SqlResultViewContainer(props: { children: JSX.Element }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        "border-radius": "5px",
        "min-width": "30rem",
        "display": "flex",
        "flex-direction": "column",
        "gap": "1.5rem",
      }}
    >
      {props.children}
    </div>
  );
}
