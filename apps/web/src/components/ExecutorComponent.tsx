import { Executor } from "@comparesql/executor";
import { Component, createResource } from "solid-js";
import { Show } from "solid-js/web";
import { SqlResultViewContainer } from "./SqlResultViewContainer.tsx";

type ExecutorComponentProps<TResult> = {
  sql: string;
  name: string;
  executor: Executor<TResult>;
  resultViewComponent: Component<{
    result: TResult;
  }>;
};

export function ExecutorComponent<TResult>(
  props: ExecutorComponentProps<TResult>,
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
