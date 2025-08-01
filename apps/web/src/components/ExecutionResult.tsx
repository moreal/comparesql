import { Executor } from "@comparesql/executor";
import { Component, For } from "solid-js";
import { ExecutorComponent } from "./ExecutorComponent.tsx";
import { GlueSQLExecutor } from "@comparesql/gluesql-executor";
import { GlueSqlResultView } from "./gluesql/GlueSqlResultView.tsx";

type ExecutorData<TResult> = {
  name: string;
  executor: Executor<TResult>;
  resultViewComponent: Component<{ result: TResult }>;
};

export function createExecutionData<TResult>(
  name: string,
  executor: Executor<TResult>,
  resultViewComponent: Component<{ result: TResult }>,
): ExecutorData<TResult> {
  return { name, executor, resultViewComponent };
}

type ExecutionListProps = {
  sql: string;
};

export function ExecutionResult(props: ExecutionListProps) {
  const pairs = [
    createExecutionData(
      "GlueSQL",
      new GlueSQLExecutor(),
      GlueSqlResultView,
    ),
  ];

  return (
    <For each={pairs}>
      {(pair) => (
        <ExecutorComponent
          sql={props.sql}
          name={pair.name}
          executor={pair.executor}
          resultViewComponent={pair.resultViewComponent}
        />
      )}
    </For>
  );
}
