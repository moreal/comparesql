import { createResource } from "solid-js";
import { Show } from "solid-js/web";
import { SqlResultViewContainer } from "./SqlResultViewContainer.tsx";
import { SqlResultView } from "./SqlResultView.tsx";
import {
  executeGlueSQL,
  executePostgres,
  executeSqlite,
} from "../executors.ts";
import type { ExecutorType } from "./ExecutionResult.tsx";

type ExecutorComponentProps = {
  sql: string;
  name: ExecutorType;
};

export function ExecutorComponent(
  props: ExecutorComponentProps,
) {
  const [result] = createResource(
    () => [props.sql, props.name],
    async ([sql, name]) => {
      switch (name) {
        case "GlueSQL":
          return await executeGlueSQL(sql);
        case "SQLite":
          return await executeSqlite(sql);
        case "Postgres":
          return await executePostgres(sql);
        default:
          throw new Error(`Unknown executor: ${name}`);
      }
    },
  );

  return (
    <SqlResultViewContainer>
      <p>{props.name}</p>
      <Show when={result()}>
        {(result) => <SqlResultView result={result()} />}
      </Show>
    </SqlResultViewContainer>
  );
}
