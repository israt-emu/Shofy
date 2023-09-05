/* eslint-disable @typescript-eslint/no-explicit-any */
type DebouncedFunction<T extends any[]> = (...args: T) => void;

export function debounce<T extends any[]>(func: (...args: T) => void, delay: number): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;

  return function (...args: T) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
