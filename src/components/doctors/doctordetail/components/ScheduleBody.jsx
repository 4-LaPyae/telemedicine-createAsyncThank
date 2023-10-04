import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MkAutoComplete from "../../../../app/components/MkAutoComplete";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoctorSession,
  getDoctorDetail,
  updateDoctorSession,
} from "../../features/DoctorApi";

const ScheduleBody = ({ gap, meetingTime, doctorsDetail, status }) => {
  const location = useLocation();
  const [doctorSectionFlag, setDoctorSectionFlag] = useState(false);
  const doctorData = location?.state?.doctorData?.doctorData;
  const dispatch = useDispatch();
  console.log({ doctorData, status });
  const [stacksMon, setStacksMon] = useState([
    { startTime: "9:00 AM", endTime: "12:00 PM" },
  ]);
  const [stacksTue, setStacksTue] = useState([
    { startTime: "9:00 AM", endTime: "12:00 PM" },
  ]);
  const [stacksWed, setStacksWed] = useState([
    { startTime: "9:00 AM", endTime: "12:00 PM" },
  ]);
  const [stacksThu, setStacksThu] = useState([
    { startTime: "9:00 AM", endTime: "12:00 PM" },
  ]);
  const [stacksFri, setStacksFri] = useState([
    { startTime: "9:00 AM", endTime: "12:00 PM" },
  ]);
  const [stacksSat, setStacksSat] = useState([
    { startTime: "9:00 AM", endTime: "12:00 PM" },
  ]);
  const [stacksSun, setStacksSun] = useState([
    { startTime: "9:00 AM", endTime: "12:00 PM" },
  ]);
  const [monCheck, setMonCheck] = useState(true);
  const [tueCheck, setTueCheck] = useState(true);
  const [wedCheck, setWedCheck] = useState(true);
  const [thurCheck, setThurCheck] = useState(true);
  const [friCheck, setFriCheck] = useState(true);
  const [satCheck, setSatCheck] = useState(true);
  const [sunCheck, setSunCheck] = useState(true);
  const [submonCheck, setSubMonCheck] = useState(false);
  const [subtueCheck, setSubTueCheck] = useState(false);
  const [subwedCheck, setSubWedCheck] = useState(false);
  const [subthurCheck, setSubThurCheck] = useState(false);
  const [subfriCheck, setSubFriCheck] = useState(false);
  const [subsatCheck, setSubSatCheck] = useState(false);
  const [subsunCheck, setSubSunCheck] = useState(false);
  const [anchorElMon, setAnchorElMon] = useState(null);
  const [anchorElTue, setAnchorElTue] = useState(null);
  const [anchorElWed, setAnchorElWed] = useState(null);
  const [anchorElThu, setAnchorElThu] = useState(null);
  const [anchorElFri, setAnchorElFri] = useState(null);
  const [anchorElSat, setAnchorElSat] = useState(null);
  const [anchorElSun, setAnchorElSun] = useState(null);
  const [error, setError] = useState(false);
  const [errorTimeMon, setErrorTimeMon] = useState(false);
  const [errorTimeTue, setErrorTimeTue] = useState(false);
  const [errorTimeWed, setErrorTimeWed] = useState(false);
  const [errorTimeThu, setErrorTimeThu] = useState(false);
  const [errorTimeFri, setErrorTimeFri] = useState(false);
  const [errorTimeSat, setErrorTimeSat] = useState(false);
  const [errorTimeSun, setErrorTimeSun] = useState(false);
  const openMon = Boolean(anchorElMon);
  const idMon = openMon ? "simple-popover" : undefined;
  const openTue = Boolean(anchorElTue);
  const idTue = openTue ? "simple-popover" : undefined;
  const openWed = Boolean(anchorElWed);
  const idWed = openWed ? "simple-popover" : undefined;
  const openThu = Boolean(anchorElThu);
  const idThu = openThu ? "simple-popover" : undefined;
  const openFri = Boolean(anchorElFri);
  const idFri = openFri ? "simple-popover" : undefined;
  const openSat = Boolean(anchorElSat);
  const idSat = openSat ? "simple-popover" : undefined;
  const openSun = Boolean(anchorElSun);
  const idSun = openSun ? "simple-popover" : undefined;
  //Monday
  const handleAddStackMon = () => {
    setStacksMon(() => [...stacksMon, { startTime: "", endTime: "" }]);
  };
  const handleDeleteStackMon = (index) => {
    setStacksMon((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks.splice(index, 1);
      return updatedStacks;
    });
    setMonCheck(false);
  };
  const handleStartTimeChangeMon = (index, newValue) => {
    setStacksMon((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        startTime: newValue,
      };
      return updatedStacks;
    });
  };
  const handleEndTimeChangeMon = (index, newValue) => {
    setStacksMon((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        endTime: newValue,
      };
      return updatedStacks;
    });
  };

  //Tuesday
  const handleAddStackTue = () => {
    setStacksTue((prevStacks) => [
      ...prevStacks,
      { startTime: "9:00 AM", endTime: "12:00 PM" },
    ]);
  };
  const handleDeleteStackTue = (index) => {
    setStacksTue((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks.splice(index, 1);
      return updatedStacks;
    });
    setTueCheck(false);
  };
  const handleStartTimeChangeTue = (index, newValue) => {
    setStacksTue((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        startTime: newValue,
      };
      return updatedStacks;
    });
  };
  const handleEndTimeChangeTue = (index, newValue) => {
    setStacksTue((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        endTime: newValue,
      };
      return updatedStacks;
    });
  };

  //Wednesday
  const handleAddStackWed = () => {
    setStacksWed((prevStacks) => [
      ...prevStacks,
      { startTime: "9:00 AM", endTime: "12:00 PM" },
    ]);
  };
  const handleDeleteStackWed = (index) => {
    setStacksWed((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks.splice(index, 1);
      return updatedStacks;
    });
    setWedCheck(false);
  };
  const handleStartTimeChangeWed = (index, newValue) => {
    setStacksWed((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        startTime: newValue,
      };
      return updatedStacks;
    });
  };
  const handleEndTimeChangeWed = (index, newValue) => {
    setStacksWed((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        endTime: newValue,
      };
      return updatedStacks;
    });
  };
  //Thursday
  const handleAddStackThu = () => {
    setStacksThu((prevStacks) => [
      ...prevStacks,
      { startTime: "9:00 AM", endTime: "12:00 PM" },
    ]);
  };
  const handleDeleteStackThu = (index) => {
    setStacksThu((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks.splice(index, 1);
      return updatedStacks;
    });
    setThurCheck(false);
  };
  const handleStartTimeChangeThu = (index, newValue) => {
    setStacksThu((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        startTime: newValue,
      };
      return updatedStacks;
    });
  };
  const handleEndTimeChangeThu = (index, newValue) => {
    setStacksThu((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        endTime: newValue,
      };
      return updatedStacks;
    });
  };

  //Friday
  const handleAddStackFri = () => {
    setStacksFri((prevStacks) => [
      ...prevStacks,
      { startTime: "9:00 AM", endTime: "12:00 PM" },
    ]);
  };
  const handleDeleteStackFri = (index) => {
    setStacksFri((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks.splice(index, 1);
      return updatedStacks;
    });
    setFriCheck(false);
  };
  const handleStartTimeChangeFri = (index, newValue) => {
    setStacksFri((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        startTime: newValue,
      };
      return updatedStacks;
    });
  };
  const handleEndTimeChangeFri = (index, newValue) => {
    setStacksFri((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        endTime: newValue,
      };
      return updatedStacks;
    });
  };
  //Saturday
  const handleAddStackSat = () => {
    setStacksSat((prevStacks) => [
      ...prevStacks,
      { startTime: "9:00 AM", endTime: "12:00 PM" },
    ]);
  };
  const handleDeleteStackSat = (index) => {
    setStacksSat((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks.splice(index, 1);
      return updatedStacks;
    });
    setSatCheck(false);
  };
  const handleStartTimeChangeSat = (index, newValue) => {
    setStacksSat((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        startTime: newValue,
      };
      return updatedStacks;
    });
  };
  const handleEndTimeChangeSat = (index, newValue) => {
    setStacksSat((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        endTime: newValue,
      };
      return updatedStacks;
    });
  };
  //Sunday
  const handleAddStackSun = () => {
    setStacksSun((prevStacks) => [
      ...prevStacks,
      { startTime: "9:00 AM", endTime: "12:00 PM" },
    ]);
  };
  const handleDeleteStackSun = (index) => {
    setStacksSun((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks.splice(index, 1);
      return updatedStacks;
    });
    setSunCheck(false);
  };
  const handleStartTimeChangeSun = (index, newValue) => {
    setStacksSun((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        startTime: newValue,
      };
      return updatedStacks;
    });
  };
  const handleEndTimeChangeSun = (index, newValue) => {
    setStacksSun((prevStacks) => {
      const updatedStacks = [...prevStacks];
      updatedStacks[index] = {
        ...updatedStacks[index],
        endTime: newValue,
      };
      return updatedStacks;
    });
  };

  console.log({ doctorsDetail });
  useEffect(() => {
    console.log("change tab");

    if (doctorsDetail?.doctorSession) {
      setDoctorSectionFlag(false);
      // console.log(doctorsDetail.doctorSession.dayOfWeek);
      setStacksMon(doctorsDetail.doctorSession.dayOfWeek.Mon);
      setStacksTue(doctorsDetail.doctorSession.dayOfWeek.Tue);
      setStacksWed(doctorsDetail.doctorSession.dayOfWeek.Wed);
      setStacksThu(doctorsDetail.doctorSession.dayOfWeek.Thu);
      setStacksFri(doctorsDetail.doctorSession.dayOfWeek.Fri);
      setStacksSat(doctorsDetail.doctorSession.dayOfWeek.Sat);
      setStacksSun(doctorsDetail.doctorSession.dayOfWeek.Sun);
      doctorsDetail.doctorSession.dayOfWeek.Mon === []
        ? setMonCheck(false)
        : setMonCheck(false);
      doctorsDetail.doctorSession.dayOfWeek.Tue === []
        ? setTueCheck(false)
        : setTueCheck(false);
      doctorsDetail.doctorSession.dayOfWeek.Web === []
        ? setWedCheck(false)
        : setWedCheck(false);
      doctorsDetail.doctorSession.dayOfWeek.Thu === []
        ? setThurCheck(false)
        : setThurCheck(false);
      doctorsDetail.doctorSession.dayOfWeek.Fri === []
        ? setFriCheck(false)
        : setFriCheck(false);
      doctorsDetail.doctorSession.dayOfWeek.Sat === []
        ? setSatCheck(false)
        : setSatCheck(false);
      doctorsDetail.doctorSession.dayOfWeek.Sun === []
        ? setSunCheck(false)
        : setSunCheck(false);
    } else {
      setDoctorSectionFlag(true);
    }
  }, [doctorsDetail]);

  useEffect(() => {
    stacksMon?.length === 0 ? setMonCheck(false) : setMonCheck(true);
    stacksTue?.length === 0 ? setTueCheck(false) : setTueCheck(true);
    stacksWed?.length === 0 ? setWedCheck(false) : setWedCheck(true);
    stacksThu?.length === 0 ? setThurCheck(false) : setThurCheck(true);
    stacksFri?.length === 0 ? setFriCheck(false) : setFriCheck(true);
    stacksSat?.length === 0 ? setSatCheck(false) : setSatCheck(true);
    stacksSun?.length === 0 ? setSunCheck(false) : setSunCheck(true);
  }, [stacksMon, stacksTue, stacksWed, stacksThu, stacksFri, stacksSat]);

  const onCloseSub = () => {
    setSubMonCheck(false);
    setSubTueCheck(false);
    setSubWedCheck(false);
    setSubThurCheck(false);
    setSubFriCheck(false);
    setSubSatCheck(false);
    setSubSunCheck(false);
  };

  const handleClickMon = (event) => {
    setAnchorElMon(event.currentTarget);
  };
  const handleCloseMon = () => {
    setAnchorElMon(null);
    onCloseSub();
  };
  const handleClickTue = (event) => {
    setAnchorElTue(event.currentTarget);
  };
  const handleCloseTue = () => {
    setAnchorElTue(null);
    onCloseSub();
  };
  const handleClickWed = (event) => {
    setAnchorElWed(event.currentTarget);
  };
  const handleCloseWed = () => {
    setAnchorElWed(null);
    onCloseSub();
  };
  const handleClickThu = (event) => {
    setAnchorElThu(event.currentTarget);
  };
  const handleCloseThu = () => {
    setAnchorElThu(null);
    onCloseSub();
  };
  const handleClickFri = (event) => {
    setAnchorElFri(event.currentTarget);
  };
  const handleCloseFri = () => {
    setAnchorElFri(null);
    onCloseSub();
  };
  const handleClickSat = (event) => {
    setAnchorElSat(event.currentTarget);
  };
  const handleCloseSat = () => {
    setAnchorElSat(null);
    onCloseSub();
  };
  const handleClickSun = (event) => {
    setAnchorElSun(event.currentTarget);
  };
  const handleCloseSun = () => {
    setAnchorElSun(null);
    onCloseSub();
  };

  function checkStartEndTimes(array) {
    // console.log(array);
    for (let i = 0; i < array.length; i++) {
      const current = array[i];
      if (
        current.startTime === null ||
        current.endTime === null ||
        current.startTime === current.endTime
      ) {
        return false;
      }

      for (let j = i + 1; j < array.length; j++) {
        const compare = array[j];
        // console.log(compare);
        if (
          current.startTime === compare.startTime ||
          current.endTime === compare.endTime
        ) {
          return false; // Start time and end time are the same
        }
      }
    }

    return true; // No same start time and end time found
  }
  const handleSave = () => {
    const isValidMon = checkStartEndTimes(stacksMon);
    const isValidTue = checkStartEndTimes(stacksTue);
    const isValidWed = checkStartEndTimes(stacksWed);
    const isValidThu = checkStartEndTimes(stacksThu);
    const isValidFri = checkStartEndTimes(stacksFri);
    const isValidSat = checkStartEndTimes(stacksSat);
    const isValidSun = checkStartEndTimes(stacksSun);

    const gapTime = parseInt(gap?.substring(0, gap?.indexOf(" ")));
    const meetTime = parseInt(
      meetingTime?.substring(0, meetingTime?.indexOf(" "))
    );

    const data = {
      doctorId: doctorData?._id,
      sessionMeetingTime: meetTime,
      sessionGap: gapTime,
      dayOfWeek: {
        Mon: stacksMon,
        Tue: stacksTue,
        Web: stacksWed,
        Thu: stacksThu,
        Fri: stacksFri,
        Sat: stacksSat,
        Sun: stacksSun,
      },
    };
    console.log({ data });

    if (doctorSectionFlag) {
      dispatch(addDoctorSession({ data }));
    } else {
      dispatch(
        updateDoctorSession({
          data,
          id: doctorsDetail?.doctorSession?._id,
        })
      );
    }
  };

  const disabledStartTimeOptions = (index, endTime) => {
    if (index > 0) {
      return (option) => {
        const selectedOption = moment(option, "h:mm A");
        const start = moment(endTime, "h:mm A");

        // Allow 15 minutes buffer time and restrict end time to be before start time
        const bufferTime = moment.duration(15, "minutes");
        const minEndTime = moment(start).add(bufferTime).format("h:mm A");
        return (
          selectedOption.isAfter(moment(minEndTime, "h:mm A")) ||
          selectedOption.isAfter(start)
        );
      };
    } else {
      return (option) => option;
    }
  };

  const disabledEndTimeOptions = (index, startTime) => {
    return (option) => {
      const selectedOption = moment(option, "h:mm A");
      const start = moment(startTime, "h:mm A");

      // Allow 15 minutes buffer time and restrict end time to be before start time
      const bufferTime = moment.duration(15, "minutes");
      const minEndTime = moment(start).add(bufferTime).format("h:mm A");

      return (
        selectedOption.isAfter(moment(minEndTime, "h:mm A")) ||
        selectedOption.isAfter(start)
      );
    };
  };

  function generateTime() {
    let hours, minutes, meridiem;
    let times = [];

    for (hours = 0; hours < 24; hours++) {
      for (minutes = 0; minutes < 60; minutes += 15) {
        if (hours < 12) {
          meridiem = "AM";
        } else {
          meridiem = "PM";
        }

        let hourText = hours === 0 ? "12" : hours > 12 ? hours - 12 : hours;
        let minuteText = minutes === 0 ? "00" : minutes;

        let time = hourText + ":" + minuteText + " " + meridiem;
        times.push(time);
      }
    }

    return times;
  }

  const PopComponent = ({ id, open, anchorEl, onClose, day }) => {
    const days = [
      {
        name: "Monday",
        checked: submonCheck,
        checkHandler: (e) => {
          e.preventDefault();
          setSubMonCheck(e.target.checked);
          console.log({ submonCheck });
          console.log(e.target.checked);
        },
      },
      {
        name: "Tuesday",
        checked: subtueCheck,
        checkHandler: (e) => {
          e.preventDefault();
          setSubTueCheck(e.target.checked);
          console.log(e.target.checked);
          console.log({ subtueCheck });
        },
      },
      {
        name: "Wednesday",
        checked: subwedCheck,
        checkHandler: (e) => {
          e.preventDefault();
          setSubWedCheck(e.target.checked);
          console.log(e.target.checked);
          console.log({ subwedCheck });
        },
      },
      {
        name: "Thursday",
        checked: subthurCheck,
        checkHandler: (e) => {
          e.preventDefault();
          setSubThurCheck(e.target.checked);
          console.log(e.target.checked);
          console.log({ subthurCheck });
        },
      },
      {
        name: "Friday",
        checked: subfriCheck,
        checkHandler: (e) => {
          e.preventDefault();
          setSubFriCheck(e.target.checked);
          console.log(e.target.checked);
          console.log({ subfriCheck });
        },
      },
      {
        name: "Saturday",
        checked: subsatCheck,
        checkHandler: (e) => {
          e.preventDefault();
          setSubSatCheck(e.target.checked);
          console.log(e.target.checked);
          console.log({ subsatCheck });
        },
      },
      {
        name: "Sunday",
        checked: subsunCheck,
        checkHandler: (e) => {
          e.preventDefault();
          console.log(e.target.checked);
          setSubSunCheck(e.target.checked);
          console.log({ subsunCheck });
        },
      },
    ];

    const filterDays = days.filter((dy) => {
      return dy.name !== day;
    });

    const handleCopy = (e) => {
      e.preventDefault();
      if (idMon) {
        console.log("mon");
        console.log({
          submonCheck,
          subtueCheck,
          subwedCheck,
          subthurCheck,
          subfriCheck,
          subsatCheck,
          subsunCheck,
        });
        if (subtueCheck) {
          console.log("in subtueCheck");
          setStacksTue(stacksMon);
          setTueCheck(monCheck);
          setSubTueCheck(false);
          console.log({ stacksMon });
        }
        if (subwedCheck) {
          setStacksWed(stacksMon);
          setWedCheck(monCheck);
          setSubWedCheck(false);
        }
        if (subthurCheck) {
          setStacksThu(stacksMon);
          setThurCheck(monCheck);
          setSubThurCheck(false);
        }
        if (subfriCheck) {
          setStacksFri(stacksMon);
          setFriCheck(monCheck);
          setSubFriCheck(false);
        }
        if (subsatCheck) {
          setStacksSat(stacksMon);
          setSatCheck(monCheck);
          setSubSatCheck(false);
        }
        if (subsunCheck) {
          setStacksSun(stacksMon);
          setSunCheck(monCheck);
          setSubSunCheck(false);
        }
        setAnchorElMon(null);
      }
      if (idTue) {
        console.log("tue");
        if (submonCheck) {
          setStacksMon(stacksTue);
          setMonCheck(tueCheck);
          setSubMonCheck(false);
        }
        if (subwedCheck) {
          setStacksWed(stacksTue);
          setWedCheck(tueCheck);
          setSubWedCheck(false);
        }
        if (subthurCheck) {
          setStacksThu(stacksTue);
          setThurCheck(tueCheck);
          setSubThurCheck(false);
        }
        if (subfriCheck) {
          setStacksFri(stacksTue);
          setFriCheck(tueCheck);
          setSubFriCheck(false);
        }
        if (subsatCheck) {
          setStacksSat(stacksTue);
          setSatCheck(tueCheck);
          setSubSatCheck(false);
        }
        if (subsunCheck) {
          setStacksSun(stacksTue);
          setSunCheck(tueCheck);
          setSubSunCheck(false);
        }
        setAnchorElTue(null);
      }
      if (idWed) {
        console.log("wed");
        if (submonCheck) {
          setStacksMon(stacksWed);
          setMonCheck(wedCheck);
          setSubMonCheck(false);
        }
        if (subtueCheck) {
          setStacksWed(stacksWed);
          setTueCheck(wedCheck);
          setSubTueCheck(false);
        }
        if (subthurCheck) {
          setStacksThu(stacksWed);
          setThurCheck(wedCheck);
          setSubThurCheck(false);
        }
        if (subfriCheck) {
          setStacksFri(stacksWed);
          setFriCheck(wedCheck);
          setSubFriCheck(false);
        }
        if (subsatCheck) {
          setStacksSat(stacksWed);
          setSatCheck(wedCheck);
          setSubSatCheck(false);
        }
        if (subsunCheck) {
          setStacksSun(stacksWed);
          setSunCheck(wedCheck);
          setSubSunCheck(false);
        }
        setAnchorElWed(null);
      }
      if (idThu) {
        console.log("thu");
        if (submonCheck) {
          setStacksMon(stacksThu);
          setMonCheck(thurCheck);
          setSubMonCheck(false);
        }
        if (subtueCheck) {
          setStacksWed(stacksThu);
          setTueCheck(thurCheck);
          setSubTueCheck(false);
        }
        if (subwedCheck) {
          setStacksThu(stacksThu);
          setWedCheck(thurCheck);
          setSubWedCheck(false);
        }
        if (subfriCheck) {
          setStacksFri(stacksThu);
          setFriCheck(thurCheck);
          setSubFriCheck(false);
        }
        if (subsatCheck) {
          setStacksSat(stacksThu);
          setSatCheck(thurCheck);
          setSubSatCheck(false);
        }
        if (subsunCheck) {
          setStacksSun(stacksThu);
          setSunCheck(thurCheck);
          setSubSunCheck(false);
        }
        setAnchorElThu(null);
      }
      if (idFri) {
        console.log("fri");
        if (submonCheck) {
          setStacksMon(stacksFri);
          setMonCheck(friCheck);
          setSubMonCheck(false);
        }
        if (subtueCheck) {
          setStacksWed(stacksFri);
          setTueCheck(friCheck);
          setSubTueCheck(false);
        }
        if (subwedCheck) {
          setStacksThu(stacksFri);
          setWedCheck(friCheck);
          setSubWedCheck(false);
        }
        if (subthurCheck) {
          setStacksFri(stacksFri);
          setThurCheck(friCheck);
          setSubThurCheck(false);
        }
        if (subsatCheck) {
          setStacksSat(stacksFri);
          setSatCheck(friCheck);
          setSubSatCheck(false);
        }
        if (subsunCheck) {
          setStacksSun(stacksFri);
          setSunCheck(friCheck);
          setSubSunCheck(false);
        }
        setAnchorElFri(null);
      }
      if (idSat) {
        console.log("sat");
        if (submonCheck) {
          setStacksMon(stacksSat);
          setMonCheck(satCheck);
          setSubMonCheck(false);
        }
        if (subtueCheck) {
          setStacksWed(stacksSat);
          setTueCheck(satCheck);
          setSubTueCheck(false);
        }
        if (subwedCheck) {
          setStacksThu(stacksSat);
          setWedCheck(satCheck);
          setSubWedCheck(false);
        }
        if (subthurCheck) {
          setStacksFri(stacksSat);
          setThurCheck(satCheck);
          setSubThurCheck(false);
        }
        if (subfriCheck) {
          setStacksSat(stacksSat);
          setFriCheck(satCheck);
          setSubFriCheck(false);
        }
        if (subsunCheck) {
          setStacksSun(stacksSat);
          setSunCheck(satCheck);
          setSubSunCheck(false);
        }
        setAnchorElSat(null);
      }
      if (idSun) {
        console.log("sun");
        if (submonCheck) {
          setStacksMon(stacksSun);
          setMonCheck(sunCheck);
          setSubMonCheck(false);
        }
        if (subtueCheck) {
          setStacksWed(stacksSun);
          setTueCheck(sunCheck);
          setSubTueCheck(false);
        }
        if (subwedCheck) {
          setStacksThu(stacksSun);
          setWedCheck(sunCheck);
          setSubWedCheck(false);
        }
        if (subthurCheck) {
          setStacksFri(stacksSun);
          setThurCheck(sunCheck);
          setSubThurCheck(false);
        }
        if (subfriCheck) {
          setStacksSat(stacksSun);
          setFriCheck(sunCheck);
          setSubFriCheck(false);
        }
        if (subsatCheck) {
          setStacksSun(stacksSat);
          setSatCheck(sunCheck);
          setSubSatCheck(false);
        }
        setAnchorElSun(null);
      }
    };

    return (
      <>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={onClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            mt: "10px",
            boxShadow: "0px 0px 50px 0px rgb(82 63 105 / 15%)",
          }}
        >
          <Stack sx={{ padding: 1 }}>
            {filterDays.map((day) => (
              <FormControlLabel
                control={
                  <Checkbox checked={day.checked} onChange={day.checkHandler} />
                }
                label={day.name}
              />
            ))}
            <Button variant="contained" onClick={handleCopy}>
              Copy
            </Button>
          </Stack>
        </Popover>
      </>
    );
  };

  const AlertComponent = ({ type }) => {
    return (
      <Alert severity={type}>
        <Typography>Select Valid Time</Typography>
      </Alert>
    );
  };
  //When split this component i cannnot add popOver component if somebody can fix ,fix this!!!!!!!!!!
  // const AddAndCopyComponent = ({ addHandler, copyHandler }) => {
  //     return (
  //         <Box width={"20%"}>
  //             <Stack
  //                 direction={"row"}
  //                 spacing={1}
  //                 justifyContent={"end"}
  //                 alignItems={"center"}
  //                 width={"100%"}
  //             >
  //                 <Box sx={{ cursor: "pointer" }}>
  //                     <AddIcon onClick={addHandler} />
  //                 </Box>
  //                 <Box sx={{ cursor: "pointer" }}>
  //                     <ContentCopyIcon onClick={copyHandler} />
  //                 </Box>
  //             </Stack>
  //         </Box>
  //     );
  // };

  const CheckBoxComponent = ({ checkDay, labelDay }) => {
    const checkDayHandler = (e) => {
      if (labelDay === "MON") {
        setMonCheck(e.target.checked);
        e.target.checked
          ? setStacksMon([
              {
                startTime: "9:00 AM",
                endTime: "12:00 PM",
              },
            ])
          : setStacksMon([]);
      }
      if (labelDay === "TUE") {
        setTueCheck(e.target.checked);
        e.target.checked
          ? setStacksTue([
              {
                startTime: "9:00 AM",
                endTime: "12:00 PM",
              },
            ])
          : setStacksTue([]);
      }
      if (labelDay === "WED") {
        setWedCheck(e.target.checked);
        e.target.checked
          ? setStacksWed([
              {
                startTime: "9:00 AM",
                endTime: "12:00 PM",
              },
            ])
          : setStacksWed([]);
      }
      if (labelDay === "THU") {
        setThurCheck(e.target.checked);
        e.target.checked
          ? setStacksThu([
              {
                startTime: "9:00 AM",
                endTime: "12:00 PM",
              },
            ])
          : setStacksThu([]);
      }
      if (labelDay === "FRI") {
        setFriCheck(e.target.checked);
        e.target.checked
          ? setStacksFri([
              {
                startTime: "9:00 AM",
                endTime: "12:00 PM",
              },
            ])
          : setStacksFri([]);
      }
      if (labelDay === "SAT") {
        setSatCheck(e.target.checked);
        e.target.checked
          ? setStacksSat([
              {
                startTime: "9:00 AM",
                endTime: "12:00 PM",
              },
            ])
          : setStacksSat([]);
      }
      if (labelDay === "SUN") {
        setSunCheck(e.target.checked);
        e.target.checked
          ? setStacksSun([
              {
                startTime: "9:00 AM",
                endTime: "12:00 PM",
              },
            ])
          : setStacksSun([]);
      }
    };

    return (
      <Box width={"10%"}>
        <FormControlLabel
          control={<Checkbox checked={checkDay} onChange={checkDayHandler} />}
          label={labelDay}
        />
      </Box>
    );
  };

  // Usage
  let timeArray = generateTime();

  return (
    <>
      {error ? (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          <Typography variant="h4">
            Select Session Time and Session Metting Time
          </Typography>
        </Alert>
      ) : (
        <></>
      )}
      <Box>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <CheckBoxComponent checkDay={monCheck} labelDay={"MON"} />
            <Box width={"70%"}>
              {stacksMon?.length === 0 ? (
                <Typography fontSize={"16px"}>Unavailable</Typography>
              ) : (
                <>
                  {stacksMon?.map((stack, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        width: "50%",
                        marginBottom: 1,
                      }}
                    >
                      <MkAutoComplete
                        fullWidth
                        label="Start Time"
                        name={`startTime-${index}`}
                        placeholder="Start Time"
                        options={
                          index === 0
                            ? timeArray
                            : timeArray.filter(
                                disabledStartTimeOptions(
                                  index,
                                  stacksMon[index - 1].endTime
                                )
                              )
                        }
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleStartTimeChangeMon(index, newValue);
                        }}
                        value={stack.startTime}
                      />
                      <Typography>-</Typography>
                      <MkAutoComplete
                        fullWidth
                        label="End Time"
                        name={`endTime-${index}`}
                        placeholder="End Time"
                        // options={timeArray}
                        options={timeArray.filter(
                          disabledEndTimeOptions(index, stack.startTime)
                        )}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleEndTimeChangeMon(index, newValue);
                        }}
                        value={stack.endTime}
                      />
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon
                          color="error"
                          onClick={() => handleDeleteStackMon(index)}
                        />
                      </Box>
                    </Stack>
                  ))}
                </>
              )}
            </Box>
            <Box width={"20%"}>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <AddIcon onClick={handleAddStackMon} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <ContentCopyIcon onClick={handleClickMon} />
                  <PopComponent
                    id={idMon}
                    open={openMon}
                    anchorEl={anchorElMon}
                    onClose={handleCloseMon}
                    day={"Monday"}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {errorTimeMon ? <AlertComponent type="error" /> : <></>}
      </Box>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

      <Box>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <CheckBoxComponent checkDay={tueCheck} labelDay={"TUE"} />
            <Box width={"70%"}>
              {stacksTue?.length === 0 ? (
                <Typography fontSize={"16px"}>Unavailable</Typography>
              ) : (
                <>
                  {stacksTue?.map((stack, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        width: "50%",
                        marginBottom: 1,
                      }}
                    >
                      <MkAutoComplete
                        fullWidth
                        label="Start Time"
                        name={`startTime-${index}`}
                        placeholder="Start Time"
                        // options={timeArray}
                        options={
                          index === 0
                            ? timeArray
                            : timeArray.filter(
                                disabledStartTimeOptions(
                                  index,
                                  stacksTue[index - 1].endTime
                                )
                              )
                        }
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleStartTimeChangeTue(index, newValue);
                        }}
                        value={stack.startTime}
                      />
                      <Typography>-</Typography>
                      <MkAutoComplete
                        fullWidth
                        label="End Time"
                        name={`endTime-${index}`}
                        placeholder="End Time"
                        // options={timeArray}
                        options={timeArray.filter(
                          disabledEndTimeOptions(index, stack.startTime)
                        )}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleEndTimeChangeTue(index, newValue);
                        }}
                        value={stack.endTime}
                      />
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon
                          color="error"
                          onClick={() => handleDeleteStackTue(index)}
                        />
                      </Box>
                    </Stack>
                  ))}
                </>
              )}
            </Box>
            <Box width={"20%"}>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <AddIcon onClick={handleAddStackTue} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <ContentCopyIcon onClick={handleClickTue} />
                  <PopComponent
                    id={idTue}
                    open={openTue}
                    anchorEl={anchorElTue}
                    onClose={handleCloseTue}
                    day={"Tuesday"}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {errorTimeTue ? <AlertComponent type="error" /> : <></>}
      </Box>

      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

      <Box>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <CheckBoxComponent checkDay={wedCheck} labelDay={"WED"} />
            <Box width={"70%"}>
              {stacksWed?.length === 0 ? (
                <Typography fontSize={"16px"}>Unavailable</Typography>
              ) : (
                <>
                  {stacksWed?.map((stack, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        width: "50%",
                        marginBottom: 1,
                      }}
                    >
                      <MkAutoComplete
                        fullWidth
                        label="Start Time"
                        name={`startTime-${index}`}
                        placeholder="Start Time"
                        // options={timeArray}
                        options={
                          index === 0
                            ? timeArray
                            : timeArray.filter(
                                disabledStartTimeOptions(
                                  index,
                                  stacksWed[index - 1].endTime
                                )
                              )
                        }
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleStartTimeChangeWed(index, newValue);
                        }}
                        value={stack.startTime}
                      />
                      <Typography>-</Typography>
                      <MkAutoComplete
                        fullWidth
                        label="End Time"
                        name={`endTime-${index}`}
                        placeholder="End Time"
                        // options={timeArray}
                        options={timeArray.filter(
                          disabledEndTimeOptions(index, stack.startTime)
                        )}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleEndTimeChangeWed(index, newValue);
                        }}
                        value={stack.endTime}
                      />
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon
                          color="error"
                          onClick={() => handleDeleteStackWed(index)}
                        />
                      </Box>
                    </Stack>
                  ))}
                </>
              )}
            </Box>
            <Box width={"20%"}>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <AddIcon onClick={handleAddStackWed} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <ContentCopyIcon onClick={handleClickWed} />
                  <PopComponent
                    id={idWed}
                    open={openWed}
                    anchorEl={anchorElWed}
                    onClose={handleCloseWed}
                    day={"Wednesday"}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {errorTimeWed ? <AlertComponent type="error" /> : <></>}
      </Box>

      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

      <Box>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <CheckBoxComponent checkDay={thurCheck} labelDay={"THU"} />
            <Box width={"70%"}>
              {stacksThu?.length === 0 ? (
                <Typography fontSize={"16px"}>Unavailable</Typography>
              ) : (
                <>
                  {stacksThu?.map((stack, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        width: "50%",
                        marginBottom: 1,
                      }}
                    >
                      <MkAutoComplete
                        fullWidth
                        label="Start Time"
                        name={`startTime-${index}`}
                        placeholder="Start Time"
                        // options={timeArray}
                        options={
                          index === 0
                            ? timeArray
                            : timeArray.filter(
                                disabledStartTimeOptions(
                                  index,
                                  stacksThu[index - 1].endTime
                                )
                              )
                        }
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleStartTimeChangeThu(index, newValue);
                        }}
                        value={stack.startTime}
                      />
                      <Typography>-</Typography>
                      <MkAutoComplete
                        fullWidth
                        label="End Time"
                        name={`endTime-${index}`}
                        placeholder="End Time"
                        // options={timeArray}
                        options={timeArray.filter(
                          disabledEndTimeOptions(index, stack.startTime)
                        )}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleEndTimeChangeThu(index, newValue);
                        }}
                        value={stack.endTime}
                      />
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon
                          color="error"
                          onClick={() => handleDeleteStackThu(index)}
                        />
                      </Box>
                    </Stack>
                  ))}
                </>
              )}
            </Box>
            <Box width={"20%"}>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <AddIcon onClick={handleAddStackThu} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <ContentCopyIcon onClick={handleClickThu} />
                  <PopComponent
                    id={idThu}
                    open={openThu}
                    anchorEl={anchorElThu}
                    onClose={handleCloseThu}
                    day={"Thursday"}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {errorTimeThu ? <AlertComponent type="error" /> : <></>}
      </Box>

      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

      <Box>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <CheckBoxComponent checkDay={friCheck} labelDay={"FRI"} />
            <Box width={"70%"}>
              {stacksFri?.length === 0 ? (
                <Typography fontSize={"16px"}>Unavailable</Typography>
              ) : (
                <>
                  {stacksFri?.map((stack, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        width: "50%",
                        marginBottom: 1,
                      }}
                    >
                      <MkAutoComplete
                        fullWidth
                        label="Start Time"
                        name={`startTime-${index}`}
                        placeholder="Start Time"
                        // options={timeArray}
                        options={
                          index === 0
                            ? timeArray
                            : timeArray.filter(
                                disabledStartTimeOptions(
                                  index,
                                  stacksFri[index - 1].endTime
                                )
                              )
                        }
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleStartTimeChangeFri(index, newValue);
                        }}
                        value={stack.startTime}
                      />
                      <Typography>-</Typography>
                      <MkAutoComplete
                        fullWidth
                        label="End Time"
                        name={`endTime-${index}`}
                        placeholder="End Time"
                        // options={timeArray}
                        options={timeArray.filter(
                          disabledEndTimeOptions(index, stack.startTime)
                        )}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleEndTimeChangeFri(index, newValue);
                        }}
                        value={stack.endTime}
                      />
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon
                          color="error"
                          onClick={() => handleDeleteStackFri(index)}
                        />
                      </Box>
                    </Stack>
                  ))}
                </>
              )}
            </Box>
            <Box width={"20%"}>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <AddIcon onClick={handleAddStackFri} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <ContentCopyIcon onClick={handleClickFri} />
                  <PopComponent
                    id={idFri}
                    open={openFri}
                    anchorEl={anchorElFri}
                    onClose={handleCloseFri}
                    day={"Friday"}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {errorTimeFri ? <AlertComponent type="error" /> : <></>}
      </Box>

      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

      <Box>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <CheckBoxComponent checkDay={satCheck} labelDay={"SAT"} />
            <Box width={"70%"}>
              {stacksSat?.length === 0 ? (
                <Typography fontSize={"16px"}>Unavailable</Typography>
              ) : (
                <>
                  {stacksSat?.map((stack, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        width: "50%",
                        marginBottom: 1,
                      }}
                    >
                      <MkAutoComplete
                        fullWidth
                        label="Start Time"
                        name={`startTime-${index}`}
                        placeholder="Start Time"
                        // options={timeArray}
                        options={
                          index === 0
                            ? timeArray
                            : timeArray.filter(
                                disabledStartTimeOptions(
                                  index,
                                  stacksSat[index - 1].endTime
                                )
                              )
                        }
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleStartTimeChangeSat(index, newValue);
                        }}
                        value={stack.startTime}
                      />
                      <Typography>-</Typography>
                      <MkAutoComplete
                        fullWidth
                        label="End Time"
                        name={`endTime-${index}`}
                        placeholder="End Time"
                        // options={timeArray}
                        options={timeArray.filter(
                          disabledEndTimeOptions(index, stack.startTime)
                        )}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleEndTimeChangeSat(index, newValue);
                        }}
                        value={stack.endTime}
                      />
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon
                          color="error"
                          onClick={() => handleDeleteStackSat(index)}
                        />
                      </Box>
                    </Stack>
                  ))}
                </>
              )}
            </Box>
            <Box width={"20%"}>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <AddIcon onClick={handleAddStackSat} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <ContentCopyIcon onClick={handleClickSat} />
                  <PopComponent
                    id={idSat}
                    open={openSat}
                    anchorEl={anchorElSat}
                    onClose={handleCloseSat}
                    day={"Saturday"}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {errorTimeSat ? <AlertComponent type="error" /> : <></>}
      </Box>
      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

      <Box>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <CheckBoxComponent checkDay={sunCheck} labelDay={"SUN"} />
            <Box width={"70%"}>
              {stacksSun?.length === 0 ? (
                <Typography fontSize={"16px"}>Unavailable</Typography>
              ) : (
                <>
                  {stacksSun?.map((stack, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        width: "50%",
                        marginBottom: 1,
                      }}
                    >
                      <MkAutoComplete
                        fullWidth
                        label="Start Time"
                        name={`startTime-${index}`}
                        placeholder="Start Time"
                        // options={timeArray}
                        options={
                          index === 0
                            ? timeArray
                            : timeArray.filter(
                                disabledStartTimeOptions(
                                  index,
                                  stacksSun[index - 1].endTime
                                )
                              )
                        }
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleStartTimeChangeSun(index, newValue);
                        }}
                        value={stack.startTime}
                      />
                      <Typography>-</Typography>
                      <MkAutoComplete
                        fullWidth
                        label="End Time"
                        name={`endTime-${index}`}
                        placeholder="End Time"
                        // options={timeArray}
                        options={timeArray.filter(
                          disabledEndTimeOptions(index, stack.startTime)
                        )}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                          option === value
                        }
                        onChange={(event, newValue) => {
                          handleEndTimeChangeSun(index, newValue);
                        }}
                        value={stack.endTime}
                      />
                      <Box
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <DeleteIcon
                          color="error"
                          onClick={() => handleDeleteStackSun(index)}
                        />
                      </Box>
                    </Stack>
                  ))}
                </>
              )}
            </Box>
            <Box width={"20%"}>
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Box sx={{ cursor: "pointer" }}>
                  <AddIcon onClick={handleAddStackSun} />
                </Box>
                <Box sx={{ cursor: "pointer" }}>
                  <ContentCopyIcon onClick={handleClickSun} />
                  <PopComponent
                    id={idSun}
                    open={openSun}
                    anchorEl={anchorElSun}
                    onClose={handleCloseSun}
                    day={"Sunday"}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
        {errorTimeSun ? <AlertComponent type="error" /> : <></>}
      </Box>

      <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

      <Stack sx={{ marginTop: 2 }} alignItems={"flex-start"}>
        <Button variant="contained" onClick={handleSave}>
          {doctorSectionFlag ? "Save" : "Update"}
        </Button>
      </Stack>
    </>
  );
};

export default ScheduleBody;
