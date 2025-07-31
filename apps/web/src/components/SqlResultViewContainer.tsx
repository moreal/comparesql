import { JSX } from "solid-js";

export function SqlResultViewContainer(props: { children: JSX.Element }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        "border-radius": "5px",
      }}
    >
      {props.children}
    </div>
  );
}
