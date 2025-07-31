import { GlueSQLExecutionResult } from "@comparesql/gluesql-executor";
import { For } from "solid-js/web";

export function GlueSqlResultView(
  props: { result: GlueSQLExecutionResult },
) {
  return (
    <>
      <For each={props.result.filter((el) => el.type === "SELECT")}>
        {(el) => {
          if (el.rows.length === 0) return null;

          const headers = Object.keys(el.rows[0]);

          return (
            <table>
              <thead>
                <tr>
                  <For each={headers}>
                    {(header) => <th>{header}</th>}
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each={el.rows}>
                  {(row) => (
                    <tr>
                      <For each={headers}>
                        {(header) => <td>{row[header]}</td>}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          );
        }}
      </For>
    </>
  );
}
