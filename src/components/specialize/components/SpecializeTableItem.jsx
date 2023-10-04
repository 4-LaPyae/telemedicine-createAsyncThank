import {Avatar, Stack, TableCell, TableRow} from '@mui/material';
import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {selectSpecialize} from '../features/SpecialistSlice';

import SpecilistAlertBox from '../../../app/components/Alert/SpcialistAlertBox';

const SpecializeTableItem = ({item, setOpen}) => {
    // console.log(item.image);
    const [openAlert, setOpenAlert] = useState(false);
    const dispatch = useDispatch();
    const updateHandler = (item) => {
        setOpen(true);
        dispatch(selectSpecialize(item));
    };
    const deleteHandler = () => {
        setOpenAlert(true);
    };
    return (
        <>
            <TableRow key={item._id}>
                <TableCell align="right" sx={{paddingLeft: 3}}>
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            // margin: "0 auto",
                        }}
                        variant="square"
                        src={item.image}
                        alt="doctor"
                    >
                        {item?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                </TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.myName}</TableCell>

                <TableCell align="left" sx={{paddingRight: 3}}>
                    <Stack
                        direction={'row'}
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        <EditIcon
                            sx={{color: 'blue', cursor: 'pointer'}}
                            onClick={() => updateHandler(item)}
                        />

                        <DeleteIcon
                            sx={{color: 'red', cursor: 'pointer'}}
                            onClick={() => deleteHandler()}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            <SpecilistAlertBox
                item={item}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
            />
        </>
    );
};

export default SpecializeTableItem;
