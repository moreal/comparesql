export interface Executor<T = string> {
  execute(sql: string): Promise<T>;
}
