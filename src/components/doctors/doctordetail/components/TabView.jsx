import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import AppointmentTabView from "./AppointmentTabView";
import SheduleTabView from "./SheduleTabView";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDoctorDetail } from "../../features/DoctorApi";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function TabView({ type, tabIndex, setTabIndex, id }) {
    const theme = useTheme();

    return (
        <Box>
            <TabPanel value={tabIndex} index={0} dir={theme.direction}>
                <AppointmentTabView setTabIndex={setTabIndex} id={id} />
            </TabPanel>

            <TabPanel value={tabIndex} index={1} dir={theme.direction}>
                <SheduleTabView setTabIndex={setTabIndex} id={id} type={type} />
            </TabPanel>
        </Box>
    );
}

export default TabView;
