import React, { FC, useMemo } from "react";
import {
  Divider,
  Drawer as MaterialDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { FilterHandlers, Filters } from "../types";

import {
  ClarityList,
  DiamondColorList,
  ShapeList,
  TypeList,
} from "../../stones";

const DrawerWidth = 200;

interface FilterItem {
  key: string;
  title: string;
  selectedOption?: string | null;
  options: string[];
  onChange: (newValue?: string | null) => void;
}

interface Props {
  filters: Omit<
    Filters,
    Extract<keyof Filters, "page" | "pageSize" | "searchQuery">
  >;
  handlers: Omit<
    FilterHandlers,
    Extract<
      keyof FilterHandlers,
      "onChangePage" | "onChangePageSize" | "onChangeSearchQuery"
    >
  >;
}

const CatalogFilters: FC<Props> = ({
  filters: {
    sortBy,
    selectedType,
    selectedShape,
    selectedClarity,
    selectedColor,
  },
  handlers: {
    onChangeSortBy,
    onChangeSelectedType,
    onChangeSelectedShape,
    onChangeSelectedClarity,
    onChangeSelectedColor,
  },
}) => {
  const filterItemList: FilterItem[] = useMemo(
    () => [
      {
        key: "type",
        title: "Type",
        selectedOption: selectedType,
        options: TypeList,
        onChange: onChangeSelectedType,
      },
      {
        key: "shape",
        title: "Shape",
        selectedOption: selectedShape,
        options: ShapeList,
        onChange: onChangeSelectedShape,
      },
      {
        key: "clarity",
        title: "Clarity",
        selectedOption: selectedClarity,
        options: ClarityList,
        onChange: onChangeSelectedClarity,
      },
      {
        key: "color",
        title: "Color",
        selectedOption: selectedColor,
        options: DiamondColorList,
        onChange: onChangeSelectedColor,
      },
    ],
    [selectedType, selectedShape, selectedClarity, selectedColor] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <MaterialDrawer
      style={{ width: DrawerWidth }}
      variant="permanent"
      anchor="left"
    >
      <List style={{ width: DrawerWidth, backgroundColor: "#efefef" }}>
        {filterItemList.map((item) =>
          item.key !== "color" || selectedType === "Diamond" ? (
            <ListItem
              style={{ flexDirection: "column" }}
              alignItems="flex-start"
              key={item.key}
            >
              <ListItemText primary={item.title} />

              <List>
                {item.options.map((key) => (
                  <ListItem
                    button
                    key={key}
                    onClick={() => {
                      if (item.selectedOption === key) {
                        item.onChange(undefined);
                      } else {
                        item.onChange(key);
                      }
                    }}
                  >
                    <ListItemText
                      secondary={
                        <span
                          style={{
                            fontWeight:
                              item.selectedOption === key ? "bold" : "normal",
                          }}
                        >
                          {key}
                        </span>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ) : null
        )}
      </List>

      <Divider />

      <ListItem
        style={{ flexDirection: "column" }}
        alignItems="flex-start"
        key={"sortBy"}
      >
        <ListItemText primary={"Sort By"} />

        <List>
          {filterItemList.map(({ key, title }) =>
            key !== "color" || selectedType === "Diamond" ? (
              <ListItem
                button
                key={key}
                onClick={() => {
                  if (sortBy === key) {
                    onChangeSortBy(undefined);
                  } else {
                    onChangeSortBy(key);
                  }
                }}
              >
                <ListItemText
                  secondary={
                    <span
                      style={{
                        fontWeight: sortBy === key ? "bold" : "normal",
                      }}
                    >
                      {title}
                    </span>
                  }
                />
              </ListItem>
            ) : null
          )}
        </List>
      </ListItem>
    </MaterialDrawer>
  );
};

export { CatalogFilters };
