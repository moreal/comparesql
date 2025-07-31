import { Executor } from "@comparesql/executor";
import { Component, createResource } from "solid-js";
import { Show } from "solid-js/web";
import { SqlResultViewContainer } from "./SqlResultViewContainer.tsx";

export function ExecutorComponent<TResult>(
  props: {
    sql: string;
    name: string;
    executor: Executor<TResult>;
    resultViewComponent: Component<{
      result: TResult;
    }>;
  },
) {
  const [result] = createResource(async () => {
    return await props.executor.execute(props.sql);
  });

  return (
    <SqlResultViewContainer>
      <p>{props.name}</p>
      <Show when={result()}>
        {(result) => <props.resultViewComponent result={result()} />}
      </Show>
    </SqlResultViewContainer>
  );
}
