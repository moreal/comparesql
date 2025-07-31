import { createSignal } from "solid-js";
import { GlueSqlResultView } from "~/components/gluesql/GlueSqlResultView.tsx";
import { Show } from "solid-js/web";
import { Executor } from "@comparesql/executor";
import { For } from "solid-js/web";
import { ExecutorComponent } from "../components/Executor.tsx";
import { Component } from "solid-js";
import { GlueSQLExecutor } from "@comparesql/gluesql-executor";

type Pair<TResult> = {
  name: string;
  executor: Executor<TResult>;
  resultViewComponent: Component<{ result: TResult }>;
};

function createPair<TResult>(
  name: string,
  executor: Executor<TResult>,
  resultViewComponent: Component<{ result: TResult }>,
): Pair<TResult> {
  return { name, executor, resultViewComponent };
}

export default function Home() {
  let inputRef: HTMLInputElement;
  const [sql, setSql] = createSignal("");
  const pairs = [
    createPair(
      "GlueSQL",
      new GlueSQLExecutor(),
      GlueSqlResultView,
    ),
  ];

  return (
    <main>
      <form>
        <input ref={inputRef!} type="text" placeholder="Enter SQL query" />
        <button type="submit" onClick={() => setSql(inputRef!.value)}>
          Submit
        </button>
      </form>
      <Show when={sql()}>
        {(sql) => (
          <For each={pairs}>
            {(pair) => (
              <ExecutorComponent
                sql={sql()}
                name={pair.name}
                executor={pair.executor}
                resultViewComponent={pair.resultViewComponent}
              />
            )}
          </For>
        )}
      </Show>
    </main>
  );
}
