import type { Executor } from "@comparesql/executor";

export class SqliteExecutor implements Executor {
  async execute(sql: string): Promise<string> {
    const output = await new Deno.Command("sqlite3", {
      args: [":memory:", sql],
    }).output();
    return new TextDecoder().decode(output.stdout);
  }
}
