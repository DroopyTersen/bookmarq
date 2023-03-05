export interface ICache {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(
    key: string,
    value: T,
    expires?: Date | string
  ): Promise<{ key: string; value: T; expires?: string }>;
}
