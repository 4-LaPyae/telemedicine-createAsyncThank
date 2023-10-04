import {
    Box,
    Alert,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Stack,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import TableToolbar from '../../../../app/components/Table/TableToolbar';
import SimpleInput from '../../../../app/components/SimpleInput';
import SearchIcon from '@mui/icons-material/Search';
import DoctorsTableItem from '../tableitem/DoctorsTableItem';
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from 'react-redux';
import TableFooterPagination from '../../../../app/components/Table/TableFooterPagination';
import DoctorsDrawer from '../DoctorsDrawer';
import {getDoctorsList} from '../../features/DoctorApi';
import {changePaginationData} from '../../features/DoctorSlice';

const DoctorCoTabPanel = ({type}) => {
    const {doctors, pagination, getStatus} = useSelector(
        (state) => state.DoctorSlice
    );
    const dispatch = useDispatch();
    const [inputVal, setInputVal] = useState('');
    const [name, setName] = useState('');
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0
            ? rowsPerPage - doctors?.length
            : rowsPerPage - doctors?.length;

    useEffect(() => {
        const timeoutInput = setTimeout(() => {
            setName(inputVal);
        }, 400);
        return () => clearInterval(timeoutInput);
    }, [inputVal]);

    useEffect(() => {
        dispatch(
            getDoctorsList({
                page: page + 1,
                limit: rowsPerPage,
                filterName: name,
            })
        );

        // mark to where page reach
        dispatch(
            changePaginationData({
                page: page + 1,
                limit: rowsPerPage,
            })
        );
    }, [page, rowsPerPage, name]);

    useEffect(() => {
        if (doctors?.length === 0) {
            setRowsPerPage(10);
            setPage(0);
        }
    }, [pagination]);

    return (
        <Box component={Paper} sx={{padding: '25px 0px'}}>
            <TableToolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems={'center'}
                    sx={{
                        flex: '1 1 100%',
                        margin: '0px 0 30px 0',
                    }}
                >
                    <Box>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            spacing={5}
                        >
                            <Box>
                                <Typography
                                    variant="h3"
                                    sx={{fontWeight: 'bold'}}
                                >
                                    Doctors List
                                </Typography>
                            </Box>
                            <Box>
                                <SimpleInput
                                    fullwidth
                                    placeholder="Name or Phone"
                                    onChange={(e) => {
                                        setInputVal(e.target.value);
                                    }}
                                    startAdornment={
                                        <InputAdornment>
                                            <IconButton disabled>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <DoctorsDrawer
                            type={type}
                            open={open}
                            setOpen={setOpen}
                        />
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {titles.map((title) => (
                                <TableCell
                                    key={title.id}
                                    align="center"
                                >
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {title.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {getStatus === 'pending' ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                rowSpan={3}
                                align="center"
                            >
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {doctors?.length > 0 ? (
                                <>
                                    <TableBody>
                                        {doctors?.map(
                                            (row, index) => (
                                                <DoctorsTableItem
                                                    item={row}
                                                    key={index}
                                                    setOpen={setOpen}
                                                    type={type}
                                                />
                                            )
                                        )}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height:
                                                        53.3 *
                                                        emptyRows,
                                                }}
                                            >
                                                <TableCell
                                                    colSpan={8}
                                                />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooterPagination
                                        rowsPerPageOptions={[
                                            10, 20, 30,
                                        ]}
                                        tableList={pagination?.total}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        handleChangePage={
                                            handleChangePage
                                        }
                                        handleChangeRowsPerPage={
                                            handleChangeRowsPerPage
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <TableRow>
                                        <TableCell colSpan={8}>
                                            <Alert severity="error">
                                                This is no
                                                <strong>
                                                    {' '}
                                                    Cooperate{' '}
                                                </strong>
                                                Doctors.
                                            </Alert>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                        </>
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DoctorCoTabPanel;

const titles = [
    {id: 'profile', label: 'Profile'},
    {id: 'name', label: 'Name'},
    {id: 'name', label: 'Specialist'},
    {id: 'email', label: 'Email'},
    {id: 'phone', label: 'Phone'},
    {id: 'exp', label: 'Experience'},
    {id: 'gender', label: 'Gender'},
    {id: 'action', label: 'Action'},
];
