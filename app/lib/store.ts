/**
 * A minimal external store for useSyncExternalStore. Client-only state that
 * React does not own (the Lenis instance, whether the intro has played)
 * lives here, so components read it without setting state inside effects.
 */
export function createStore<T>(initial: T) {
  let value = initial;
  const listeners = new Set<() => void>();

  return {
    get: () => value,
    set(next: T) {
      if (Object.is(next, value)) return;
      value = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
