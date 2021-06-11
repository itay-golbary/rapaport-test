import React, { FC, useEffect } from "react";
import { Filters } from "../types";
import { MenuContainer } from "../../../components/menu/MenuContainer";
import { FilterItem } from "./FilterItem";

interface FilterItemOption<T> {
  key: string;
  value: T;
  text: string;
}

interface FilterItemProps<T> {
  key: string;
  title: string;
  selectedOptionKey: string;
  options: FilterItemOption<T>[];
  onChange: (newValue?: T) => void;
}

interface Props {
  filters: Omit<
    Filters,
    Extract<keyof Filters, "page" | "pageSize" | "searchQuery">
  >;
}

const CatalogFilters: FC<Props> = ({ filters }) => {
  return (
    <MenuContainer>
      <FilterItem />
      <FilterItem />
      <FilterItem />
      <FilterItem />
      <FilterItem />
    </MenuContainer>
  );
};

export { CatalogFilters };
