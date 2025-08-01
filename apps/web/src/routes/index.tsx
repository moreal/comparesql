import { createSignal } from "solid-js";
import { Show } from "solid-js/web";
import { Form } from "../components/Form.tsx";
import { ExecutionResult } from "../components/ExecutionResult.tsx";

export default function Home() {
  const [sql, setSql] = createSignal<string>("");

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        padding: "3rem",
      }}
    >
      <main
        style={{
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
          "align-items": "center",
          gap: "1rem",
        }}
      >
        <Form setter={setSql} />
        <Show when={sql()}>
          {(sql) => <ExecutionResult sql={sql()} />}
        </Show>
      </main>
    </div>
  );
}
