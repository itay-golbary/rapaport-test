import React, { FC } from "react";
import { Paper } from "@material-ui/core";

interface Props {
  className?: string;
}

const PaperContainer: FC<Props> = ({ className, children }) => {
  return <Paper className={className}>{children}</Paper>;
};

export { PaperContainer };
