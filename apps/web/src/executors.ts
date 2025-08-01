"use server";

import { GlueSQLExecutor } from "@comparesql/gluesql-executor";
import { SqliteExecutor } from "@comparesql/sqlite-executor";
import { PostgresExecutor } from "@comparesql/postgres-executor";

export async function executeGlueSQL(sql: string): Promise<string> {
  const executor = new GlueSQLExecutor();
  return await executor.execute(sql);
}

export async function executeSqlite(sql: string): Promise<string> {
  const executor = new SqliteExecutor();
  return await executor.execute(sql);
}

export async function executePostgres(sql: string): Promise<string> {
  const executor = new PostgresExecutor("psql-17");
  return await executor.execute(sql);
}

export async function executeAllEngines(sql: string) {
  return {
    gluesql: await executeGlueSQL(sql),
    sqlite: await executeSqlite(sql),
    postgres: await executePostgres(sql),
  };
}
