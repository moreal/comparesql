import { createSignal } from "solid-js";
import { Show } from "solid-js/web";
import { Form } from "../components/Form.tsx";
import { ExecutionResult } from "../components/ExecutionResult.tsx";

export default function Home() {
  const [sql, setSql] = createSignal<string>("");

  return (
    <main>
      <Form setter={setSql} />
      <Show when={sql()}>
        {(sql) => <ExecutionResult sql={sql()} />}
      </Show>
    </main>
  );
}
