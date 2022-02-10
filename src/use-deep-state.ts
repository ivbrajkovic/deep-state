import isEqual from 'lodash/isEqual';
import { useState, useCallback, SetStateAction } from 'react';

type AnyObject = Record<string, unknown>;

type A<S> = Partial<S> | ((oldValue: S) => void);

interface SetDeepState<S> {
  (callback: A<S>): void;
  (newState: A<S>, deepEquality?: boolean | string[], merge?: boolean): void;
}

const isPrimitive = (value: unknown) =>
  value === null || !(typeof value === 'object' || typeof value === 'function');

const useDeepState = <S>(initialState: S): [S, SetDeepState<S>] => {
  const [state, setState] = useState(initialState);

  const setDeepState: SetDeepState<S> = useCallback(
    (
      newState: A<S>,
      deepEquality: boolean | string[] = false,
      merge = true,
    ) => {
      const isPropertiesEqual = (properties: string[], a: S, b: Partial<S>) => {
        for (let i = 0; i < properties.length; i++) {
          const property = properties[i];
          if (!isEqual((a as AnyObject)[property], (b as AnyObject)[property]))
            return false;
        }
        return true;
      };

      if (isPrimitive(newState) || typeof newState === 'function') {
        setState(newState as SetStateAction<S>);
        return;
      }

      // Deep equality entire object or specified properties
      if (deepEquality) {
        if (typeof deepEquality === 'boolean') {
          setState((oldState) => {
            // If true than deep compare objects
            if (isEqual(oldState, newState)) return oldState;
            return newState as S;
          });
        } else if (Array.isArray(deepEquality)) {
          setState((oldState) => {
            // If array than deep compare selected attributes
            if (isPropertiesEqual(deepEquality, oldState, newState))
              return oldState;

            // State are not equal, so update
            if (merge) return { ...oldState, ...newState };
            return newState as S;
          });
        }
        return;
      }

      if (typeof newState === 'object' && merge) {
        // If new state is object than merge objects
        setState((oldState) => ({ ...oldState, ...newState }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return [state, setDeepState];
};

export default useDeepState;

// const Component = () => {
//   const [state, setState] = useDeepState<{
//     key: number;
//     isLoader: boolean;
//   }>({
//     key: 0,
//     isLoader: false,
//   });

//   setState({ isLoader: false });
//   setState({ key: 1 }, true);
//   setState({ key: 1 }, true, true);
//   setState((old) => {
//     console.log(old);
//   });

//   return null;
// };
