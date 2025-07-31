import type { Executor } from "@comparesql/executor";
import { gluesql } from "gluesql";

export class GlueSQLExecutor implements Executor<GlueSQLExecutionResult> {
  async execute(sql: string): Promise<GlueSQLExecutionResult> {
    const glue = await gluesql(); // @ts-ignore: wrong typed...
    return glue.query(sql);
  }
}

export type GlueSQLExecutionResult = ({
  rows: Record<string, any>[];
  type: "SELECT";
} | {
  type: "CREATE TABLE";
} | {
  affected: number;
  type: "INSERT";
})[];
