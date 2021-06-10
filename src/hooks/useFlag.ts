import { useCallback, useState } from "react";

type UseFlag = (
  initialState?: boolean
) => [boolean, () => void, () => void, () => void];

const useFlag: UseFlag = (initialState) => {
  const [flag, setFlag] = useState(initialState ?? false);

  const setToTrue = useCallback(() => {
    setFlag(true);
  }, []);

  const setToFalse = useCallback(() => {
    setFlag(false);
  }, []);

  const toggleFlag = useCallback(() => {
    setFlag((state) => !state);
  }, [setFlag]);

  return [flag, setToTrue, setToFalse, toggleFlag];
};

export { useFlag };
