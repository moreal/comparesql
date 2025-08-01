import { For } from "solid-js";
import { ExecutorComponent } from "./ExecutorComponent.tsx";

export type ExecutorType = "GlueSQL" | "SQLite" | "Postgres" | "MySQL";

export type ExecutorData = {
  name: ExecutorType;
};

type ExecutionListProps = {
  sql: string;
};

export function ExecutionResult(props: ExecutionListProps) {
  const pairs: ExecutorData[] = [
    {
      name: "GlueSQL",
    },
    {
      name: "SQLite",
    },
    {
      name: "Postgres",
    },
    {
      name: "MySQL",
    },
  ];

  return (
    <For each={pairs}>
      {(pair) => (
        <ExecutorComponent
          sql={props.sql}
          name={pair.name}
        />
      )}
    </For>
  );
}
