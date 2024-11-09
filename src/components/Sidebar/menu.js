import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";

const styles = {
    menuItem: {
        marginBottom: "10px",
        padding: "0.5rem",
        columnGap: "10px",
        "&:hover": {
            background: "#fff !important",
            color: 'var(--primary)',
            transition: '.3s'
        },
      
    }
};

const Menu = ({ menuItems, expanded }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <MenuList sx={styles.menu}>
            {menuItems.map((item, index) => {
                return (
                    <MenuItem
                        key={index}
                        selected={item.path === location.pathname}
                        onClick={() => navigate(item.path || "")}
                        sx={styles.menuItem}
                    >
                        {item.icon}
                        <Collapse
                            in={expanded}
                            timeout="auto"
                            unmountOnExit
                            orientation="horizontal"
                        >
                            <ListItemText>{item.title}</ListItemText>
                        </Collapse>
                    </MenuItem>
                );
            })}
        </MenuList>
    );
};

export { Menu };
