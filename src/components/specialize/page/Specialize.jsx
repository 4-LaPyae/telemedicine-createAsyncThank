import React from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import TableToolbar from '../../../app/components/Table/TableToolbar';
import TableFooterPagination from '../../../app/components/Table/TableFooterPagination';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import SpecializeTableItem from '../components/SpecializeTableItem';
import SpecializeDrawer from '../components/SpecializeDrawer';
import {getSpecialist} from '../features/SpecialistApi';
import {changePaginationData} from '../features/SpecialistSlice';
import SimpleInput from '../../../app/components/SimpleInput';
import SearchIcon from '@mui/icons-material/Search';
import {useRef} from 'react';

const Specialize = () => {
    const [page, setPage] = useState(0);
    const [specializeName, setSpecializeName] = useState('');
    const timeoutRef = useRef(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {specialist, pagination, getStatus} = useSelector(
        (state) => state.SpecialistSlice
    );
    const [inputVal, setInputVal] = useState('');

    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutInput = setTimeout(() => {
            setSpecializeName(inputVal);
        }, 400);
        return () => clearInterval(timeoutInput);
    }, [inputVal]);

    useEffect(() => {
        dispatch(
            getSpecialist({
                page: page + 1,
                limit: rowsPerPage,
                filterName: '',
            })
        );
    }, []);
    useEffect(() => {
        dispatch(
            getSpecialist({
                page: page + 1,
                limit: rowsPerPage,
                filterName: specializeName,
            })
        );

        // mark to where page reach
        dispatch(
            changePaginationData({
                page: page + 1,
                limit: rowsPerPage,
            })
        );
    }, [page, rowsPerPage, specializeName]);
    useEffect(() => {
        if (specialist?.length === 0) {
            setRowsPerPage(10);
            setPage(0);
        }
    }, [pagination]);
    const emptyRows =
        page > 0
            ? rowsPerPage - specialist?.length
            : rowsPerPage - specialist?.length;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box component={Paper} sx={{padding: '0px 0px 25px 0px'}}>
            <TableToolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems={'center'}
                    // spacing={2}
                    sx={{flex: '1 1 100%', margin: '30px 0 30px 0'}}
                >
                    <Box>
                        <Stack
                            direction={'row'}
                            spacing={5}
                            alignItems={'center'}
                        >
                            <Typography
                                variant="h3"
                                sx={{fontWeight: 'bold'}}
                            >
                                Specialist
                            </Typography>
                            <Box>
                                <SimpleInput
                                    placeholder="Search by Name"
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
                        <SpecializeDrawer
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
                            <TableCell sx={{paddingLeft: 3}}>
                                <Typography
                                    variant="h4"
                                    sx={{fontWeight: 'bold'}}
                                >
                                    Image
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="h4"
                                    sx={{fontWeight: 'bold'}}
                                >
                                    English
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="h4"
                                    sx={{fontWeight: 'bold'}}
                                >
                                    Myanmar
                                </Typography>
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{paddingRight: 3}}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{fontWeight: 'bold'}}
                                >
                                    Action
                                </Typography>
                            </TableCell>
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
                            {specialist?.length > 0 ? (
                                <>
                                    <TableBody>
                                        {specialist?.map(
                                            (row, index) => (
                                                <SpecializeTableItem
                                                    item={row}
                                                    key={index}
                                                    setOpen={setOpen}
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
                                                    colSpan={5}
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
                                        <TableCell colSpan={3}>
                                            <Alert severity="error">
                                                This is no
                                                <strong>
                                                    {' '}
                                                    Specialist{' '}
                                                </strong>
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

export default Specialize;
