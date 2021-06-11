import React, { FC } from "react";
import {
  Divider,
  Drawer as MaterialDrawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

interface Props {}

const Drawer: FC<Props> = ({ children }) => {
  return (
    <MaterialDrawer variant="permanent" anchor="left">
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </MaterialDrawer>
  );
};

export { Drawer };
