import { Toolbar, Typography } from "@mui/material";

function TableToolbar({ children }) {
    return (
        <Toolbar>
            <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h4"
                component="div"
            >
                {children}
            </Typography>
        </Toolbar>
    );
}

export default TableToolbar;
