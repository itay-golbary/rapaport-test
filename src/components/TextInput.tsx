import React, { ChangeEventHandler, FC, useCallback } from "react";
import { Input } from "@material-ui/core";

export interface Props {
  value?: string | null;
  onChange: (value?: string | null) => void;
  type?: string;
}

const TextInput: FC<Props> = ({ value, onChange, type = "text" }) => {
  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (event) => {
      onChange(event.target.value || undefined);
    },
    [onChange]
  );

  return <Input type={type} value={value} onChange={handleChange} />;
};

export { TextInput };
