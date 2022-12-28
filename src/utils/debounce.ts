export function debounce<T extends any[]>(
  func: (...args: T) => any,
  ms: number,
): (...args: T) => void {
  let timeout: NodeJS.Timeout
  return (...args: T) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, ms)
  };
}
