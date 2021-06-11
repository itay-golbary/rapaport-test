import React, { FC } from "react";

import {
  TextInput,
  Props as TextInputProps,
} from "../../../components/TextInput";
import { Paper } from "@material-ui/core";

interface Props
  extends Pick<TextInputProps, Exclude<keyof TextInputProps, "type">> {}

const CatalogSearchInput: FC<Props> = ({
  // search,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Paper>
      <TextInput
        type={"search"}
        // name={"search"}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
      />
    </Paper>
  );
};

export { CatalogSearchInput };
