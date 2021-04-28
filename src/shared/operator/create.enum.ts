type record<T> = Record<keyof T, string>;
export function createEnum<T>(o: record<T>): record<T> {
  return Object.freeze(o);
}
