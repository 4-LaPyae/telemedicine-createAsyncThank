import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";

function NavItem({ item, open }) {
  return (
    <Link to={`/${item.route}`}>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.text}
            sx={{
              opacity: open ? 1 : 0,
              color: "#000000 !important",
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default NavItem;
