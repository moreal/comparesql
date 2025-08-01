export interface Executor {
  execute(sql: string): Promise<string>;
}
