import { useRef, useEffect } from "react";

export function useOnDepsChange(callback: () => void, deps: unknown[]) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    savedCallback.current?.();
  }, deps);
}
