import React ,{useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../Components/Navbar';
import getUserFromCache from '../Utils/getUserFromCache';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const OrderHistory = () => {
    const [orderHistory, setorderHistory] = useState([]);
    useEffect(() => {
        const username = getUserFromCache();
        axios.post(process.env.REACT_APP_SERVER_URL + "/api/getOrders", { username })
            .then((res) => {
                console.log(res.data);
                setorderHistory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className='container' style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Order Id</StyledTableCell>
                                <StyledTableCell align="right">Company</StyledTableCell>
                                <StyledTableCell align="right">Type</StyledTableCell>
                                <StyledTableCell align="right">Amount</StyledTableCell>
                                <StyledTableCell align="right">Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderHistory.map((row) => (
                                <StyledTableRow key={row.order_id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.order_id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.company_name}</StyledTableCell>
                                    <StyledTableCell align="right">{row.gas_type}</StyledTableCell>
                                    <StyledTableCell align="right">{row.amount}</StyledTableCell>
                                    <StyledTableCell align="right">{row.order_date}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default OrderHistory;