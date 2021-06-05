import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUrlQuery } from "../../../navigation";

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
  const { queryValueStringify } = useUrlQuery(urlName);

  const [state, setState] = useState(() => {
    let value = defaultValue;

    // TODO: get value from url query if exists
    if (queryValueStringify) {
      switch (typeof defaultValue) {
        case "string": {
          value = queryValueStringify as typeof defaultValue;

          break;
        }
        case "number": {
          value = Number(queryValueStringify) as typeof defaultValue;

          break;
        }
        case "boolean": {
          value = (queryValueStringify === "true") as typeof defaultValue;

          break;
        }
        case "object": {
          break;
        }
      }
    }

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
