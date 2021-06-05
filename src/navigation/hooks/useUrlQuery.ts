import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const useUrlQuery = (urlName: string) => {
  const { search } = useLocation();

  const queryValueStringify = useMemo(
    () => new URLSearchParams(search).get(urlName),
    [search]
  );

  return { queryValueStringify };
};

export { useUrlQuery };
