import isEqual from 'lodash/isEqual';
import { useRef, useEffect, EffectCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDeepEffect = <T extends Array<any>>(
  effect: EffectCallback,
  deps?: T,
  cb?: (arg: T) => boolean,
): void => {
  const prevDeps = useRef(deps);
  const isInitialRenderRef = useRef(true);

  useEffect(() => {
    // If on mount
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      effect();
      return;
    }

    // If cb is a function
    if (prevDeps.current) {
      if (cb?.call?.(undefined, prevDeps.current)) {
        prevDeps.current = deps;
        effect();
      }
      return;
    }

    // Else do a deep compare
    if (!isEqual(prevDeps.current, deps)) {
      prevDeps.current = deps;
      effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};

export default useDeepEffect;
