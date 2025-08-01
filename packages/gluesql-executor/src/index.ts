import type { Executor } from "@comparesql/executor";
import { gluesql } from "gluesql";

export class GlueSQLExecutor implements Executor {
  async execute(sql: string): Promise<string> {
    const glue = await gluesql(); // @ts-ignore: wrong typed...
    const result = await glue.query(sql) as GlueSQLExecutionResult[];
    return result.map(renderResult).join("\n\n");
  }
}

function renderResult(result: GlueSQLExecutionResult): string {
  if (result.type === "SELECT") {
    if (result.rows.length === 0) {
      return "No rows returned";
    }

    const columns = Object.keys(result.rows[0]);

    // FIXME: Pretty formatting.
    return [
      columns.join(" | "),
      "---",
      ...result.rows.map((row) =>
        columns.map((column) => {
          const value = row[column];
          if (typeof value === "number") {
            return value.toString();
          } else if (typeof value === "string") {
            return `"${value}"`;
          }

          return value;
        }).join(" | ")
      ),
    ].join("\n");
  } else if (result.type === "CREATE TABLE") {
    return "Table created successfully";
  } else if (result.type === "INSERT") {
    return `Inserted ${result.affected} rows`;
  } else {
    throw new Error(`Unknown result type: ${(result as any).type}`);
  }
}

type GlueSQLExecutionResult = {
  rows: Record<string, string | number>[];
  type: "SELECT";
} | {
  type: "CREATE TABLE";
} | {
  affected: number;
  type: "INSERT";
};
