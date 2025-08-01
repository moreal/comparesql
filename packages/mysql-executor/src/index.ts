import type { Executor } from "@comparesql/executor";

export class MySQLExecutor implements Executor {
  constructor(
    private readonly composeFile: string = "../../compose.yaml",
    private readonly containerName: string = "mysql",
    private readonly username: string = "testuser",
    private readonly password: string = "testpassword",
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
        "mysql",
        "-u",
        this.username,
        `-p${this.password}`,
        this.database,
        "-e",
        `START TRANSACTION; ${normalizedSql} ROLLBACK;`,
      ],
    }).output();

    const stdout = new TextDecoder().decode(commandOutput.stdout);
    const stderr = new TextDecoder().decode(commandOutput.stderr);

    // Check for errors
    if (commandOutput.code !== 0) {
      throw new Error(`MySQL execution failed: ${stderr}`);
    }

    console.log(stdout);
    console.log(stderr);

    // Clean up the output by removing MySQL warnings and transaction messages
    const lines = stdout.split("\n");
    const filteredLines = lines.filter((line) =>
      !line.includes("mysql: [Warning]") &&
      !line.includes("START TRANSACTION") &&
      !line.includes("ROLLBACK")
    );

    return filteredLines.join("\n").trim();
  }
}
