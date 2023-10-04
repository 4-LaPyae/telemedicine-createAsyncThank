import { HomeRounded } from "@mui/icons-material";
import MedicationIcon from "@mui/icons-material/Medication";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PersonIcon from "@mui/icons-material/Person";
import StarsIcon from "@mui/icons-material/Stars";
import HomeIcon from "@mui/icons-material/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { faHospitalUser } from "@fortawesome/free-solid-svg-icons";

export const Routes = [
  {
    text: "Dashboard",
    route: "dashboard",
    icon: <HomeIcon style={{ color: "#000000" }} />,
  },
  {
    text: "Doctors",
    route: "doctors",
    icon: (
      <FontAwesomeIcon
        icon={faUserDoctor}
        style={{
          color: "#000000",
          fontSize: "20px",
          padding: "0px 3px 0px 4px",
        }}
      />
    ),
  },
  {
    text: "Patients",
    route: "patients",
    // icon: <AccessibleIcon style={{ color: "#000000" }} />,
    icon: (
      <FontAwesomeIcon
        icon={faHospitalUser}
        style={{
          color: "#000000",
          fontSize: "20px",
          padding: "0px 0px 0px 4px",
        }}
      />
    ),
  },
  {
    text: "Appointment",
    route: "appointment",
    icon: <BookOnlineIcon style={{ color: "#000000" }} />,
  },
  {
    text: "Specialist",
    route: "specialize",
    icon: <StarsIcon style={{ color: "#000000" }} />,
  },
  {
    text: "System Admin",
    route: "sys-admin",
    icon: <PersonIcon style={{ color: "#000000" }} />,
  },
];
