export function remove<T>(array: T[] | undefined, item: T): T[] {
  if (!array) return [];
  return array.filter((element) => element !== item);
}

export function range(from: number, to: number): number[] {
  const diff = Math.min(from, to) - Math.max(from, to);
  const result: number[] = Array.from({ length: diff });

  if (from <= to) {
    for (let i = from; i <= to; i += 1) {
      result.push(i);
    }
  } else {
    for (let i = from; i >= to; i -= 1) {
      result.push(i);
    }
  }
  return result;
}
