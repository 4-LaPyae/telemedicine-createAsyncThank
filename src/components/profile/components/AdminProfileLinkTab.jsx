import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const AdminProfileLinkTab = ({ setTabIndex, tabIndex }) => {
    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                textColor='primary'
                indicatorColor='primary'
                aria-label='secondary tabs example'
            >
                <Tab value={0} label='User Information' />
                <Tab
                    value={3}
                    label='User Info'
                    sx={{ display: tabIndex == 3 ? "block" : "none" }}
                />
            </Tabs>
        </Box>
    );
};

export default AdminProfileLinkTab;
