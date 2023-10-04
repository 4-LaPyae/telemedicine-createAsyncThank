import {Avatar, Box, Stack, TableCell, TableRow} from '@mui/material';
import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {selectDoctor} from '../../features/DoctorSlice';
import {Link, useNavigate} from 'react-router-dom';
import {deleteDoctor, getDoctorsList} from '../../features/DoctorApi';
import DoctorAlertBox from '../../../../app/components/Alert/DoctorAlertBox';
import {ToastContainer} from 'react-toastify';

const DoctorsTableItem = ({item, open, setOpen, type}) => {
    const [openAlert, setOpenAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateHandler = (item) => {
        setOpen(true);
        // console.log(item);
        dispatch(selectDoctor(item));
    };
    const deleteHandler = () => {
        setOpenAlert(true);
    };
    const navigateDetail = () => {
        navigate(`/doctors/${item._id}`, {
            state: {
                doctorData: {doctorData: item, type},
            },
        });
    };
    return (
        <>
            <TableRow key={item._id}>
                <TableCell align="center" onClick={navigateDetail}>
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            margin: '0 auto',
                            cursor: 'pointer',
                        }}
                        variant="rounded"
                        src={item.profile}
                        alt="doctor"
                    >
                        {item?.firstName?.charAt(0).toUpperCase()}
                    </Avatar>
                </TableCell>
                <TableCell align="center" onClick={navigateDetail}>
                    <Box sx={{cursor: 'pointer'}}>
                        {item.firstName} {item.lastName}
                    </Box>
                </TableCell>
                <TableCell align="center">
                    {item?.specialist?.name}
                </TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{`${item.experience} years`}</TableCell>
                <TableCell align="center">{item.gender}</TableCell>

                <TableCell align="center">
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <EditIcon
                            sx={{
                                color: 'blue',
                                cursor: 'pointer',
                            }}
                            onClick={() => updateHandler(item)}
                        />
                        <DeleteIcon
                            onClick={() => deleteHandler()}
                            sx={{
                                color: 'red',
                                cursor: 'pointer',
                            }}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            <DoctorAlertBox
                item={item}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                type={type}
            />
        </>
    );
};

export default DoctorsTableItem;
