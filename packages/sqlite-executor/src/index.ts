import type { Executor } from "@comparesql/executor";

export class SqliteExecutor implements Executor {
  constructor(
    private readonly composeFile: string = "../../compose.yaml",
    private readonly containerName: string = "sqlite",
  ) {}

  async execute(sql: string): Promise<string> {
    // Ensure SQL ends with semicolon
    const normalizedSql = sql.trim().endsWith(";")
      ? sql.trim()
      : `${sql.trim()};`;

    const commandOutput = await new Deno.Command("docker", {
      args: [
        "compose",
        "-f",
        this.composeFile,
        "exec",
        "-T",
        this.containerName,
        "sqlite3",
        ":memory:",
        normalizedSql,
      ],
    }).output();

    const stdout = new TextDecoder().decode(commandOutput.stdout);
    const stderr = new TextDecoder().decode(commandOutput.stderr);

    // Check for errors
    if (commandOutput.code !== 0) {
      throw new Error(`SQLite execution failed: ${stderr}`);
    }

    return stdout.trim();
  }
}
