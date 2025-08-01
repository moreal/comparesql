import type { Executor } from "@comparesql/executor";

export class PostgresExecutor implements Executor {
  constructor(private readonly command: string = "psql") {}

  async execute(sql: string): Promise<string> {
    const commandOutput = await new Deno.Command(this.command, {
      args: ["-c", `START TRANSACTION; ${sql} ROLLBACK;`],
    }).output();
    const output = new TextDecoder().decode(commandOutput.stdout);
    return output.split("\n").slice(1, -2).join("\n");
  }
}
