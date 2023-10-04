import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AdminProfileInputs from "./AdminProfileInputs";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const AdminProfileTabView = ({ tabIndex, setTabIndex }) => {
    const theme = useTheme();
    return (
        <Box>
            <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                <Typography variant='body2'>
                    <AdminProfileInputs />
                </Typography>
            </TabPanel>
            {/* <TabPanel value={tabIndex} index={1} dir={theme.direction}>
        <Typography variant="body2">
            <ProfilePasswordInputs />
        </Typography>
    </TabPanel> */}
        </Box>
    );
};

export default AdminProfileTabView;
