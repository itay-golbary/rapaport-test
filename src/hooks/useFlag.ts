import { useCallback, useState } from "react";

type InitialState = boolean;

const useFlag = (initialState?: InitialState) => {
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
