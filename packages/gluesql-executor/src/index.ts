import type { Executor } from "@comparesql/executor";
import { gluesql } from "gluesql";

export class GlueSQLExecutor implements Executor {
  private readonly glue: ReturnType<typeof gluesql>;

  constructor() {
    this.glue = gluesql();
  }

  execute(sql: string): Promise<void> {
    return this.glue.query(sql);
  }
}
