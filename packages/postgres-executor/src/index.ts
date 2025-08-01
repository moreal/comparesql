import type { Executor } from "@comparesql/executor";

export class PostgresExecutor implements Executor {
  constructor(
    private readonly composeFile: string = "../../compose.yaml",
    private readonly containerName: string = "postgresql",
    private readonly username: string = "testuser",
    private readonly database: string = "testdb",
  ) {}

  async execute(sql: string): Promise<string> {
    // Ensure SQL ends with semicolon for proper transaction handling
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
        "psql",
        "-U",
        this.username,
        "-d",
        this.database,
        "-c",
        `START TRANSACTION; ${normalizedSql} ROLLBACK;`,
      ],
    }).output();

    const stdout = new TextDecoder().decode(commandOutput.stdout);
    const stderr = new TextDecoder().decode(commandOutput.stderr);

    // Check for errors
    if (commandOutput.code !== 0) {
      throw new Error(`PostgreSQL execution failed: ${stderr}`);
    }

    // Clean up the output by removing transaction messages
    const lines = stdout.split("\n");
    const filteredLines = lines.filter((line) =>
      !line.includes("START TRANSACTION") &&
      !line.includes("ROLLBACK")
    );

    return filteredLines.join("\n").trim();
  }
}
