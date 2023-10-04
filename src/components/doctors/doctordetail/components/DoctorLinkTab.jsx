import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const STab = styled(Tab)(({ theme }) => {
  return {
    fontSize: "14px",
    fontWeight: "bold",
  };
});

export default function DoctorLinkTab({ type, setTabIndex, tabIndex }) {
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <STab
          value={0}
          label="Appointment"
          sx={{
            textTransform: "capitalize",
            fontSize: "16px",
          }}
        />
        {type == "INHOUSE" ? (
          ""
        ) : (
          <STab
            value={1}
            label="Schedule"
            sx={{
              textTransform: "capitalize",
              fontSize: "16px",
            }}
          />
        )}
      </Tabs>
    </Box>
  );
}
