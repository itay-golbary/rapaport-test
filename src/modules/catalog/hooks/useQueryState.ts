import { useCallback, useState } from "react";

type HandleChangeState<T> = (value: T) => void;

type UseQueryState = <T>(
  urlName: string,
  defaultValue: T,
  onChangeCallback?: HandleChangeState<T>
) => [T, HandleChangeState<T>];

const useQueryState: UseQueryState = (
  urlName,
  defaultValue,
  onChangeCallback
) => {
  const [state, setState] = useState(() => {
    const value = defaultValue;

    // TODO: get value from url query if exists

    return value;
  });

  const handleChangeState: HandleChangeState<typeof defaultValue> = useCallback(
    (value) => {
      // TODO: update url

      if (onChangeCallback) {
        onChangeCallback(value);
      }

      setState(value);
    },
    [onChangeCallback]
  );

  return [state, handleChangeState];
};

export { useQueryState };
