import React, { ChangeEventHandler, FC, useCallback } from "react";
import { OutlinedInput } from "@material-ui/core";

export interface Props {
  value?: string | null;
  onChange: (value?: string | null) => void;
  // name: string;
  placeholder?: string;
  type?: string;
}

const TextInput: FC<Props> = ({
  // name,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {
  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (event) => {
      onChange(event.target.value || undefined);
    },
    [onChange]
  );

  return (
    <OutlinedInput
      type={type}
      // name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export { TextInput };
