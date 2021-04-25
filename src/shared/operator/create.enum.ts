export function createEnum<T>(
  o: Record<keyof T, string>,
): Record<keyof T, string> {
  return o;
}
