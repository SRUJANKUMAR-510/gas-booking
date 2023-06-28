import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditDialog from '../Components/EditDialog';
import AddDialog from '../Components/AddDialog';
import QueryDialog from '../Components/QueryDialog';
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 13,
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


export default function Admin() {
	const [Tables, setTables] = useState([]);
	const [buttonSelected, setbuttonSelected] = useState(0);
	const [dataTable, setdataTable] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [openAdd, setOpenAdd] = React.useState(false);
	const [dialogData, setdialogData] = useState({});
	const [prevDialogData, setprevDialogData] = useState({});
	const [openQuery, setOpenQuery] = React.useState(false);
	const navigate = useNavigate();


	const URLpath = new URLSearchParams(window.location.search);
	const id = URLpath.get('id');
	const name = URLpath.get('password');


	const handleClickOpen = (row) => {
		setprevDialogData(row);
		setdialogData(row);
		setOpen(true);
	};

	const handleClickOpenAdd = () => {
		const temp = {};
		for (let key in dataTable[0]) {
			temp[key] = "";
		}
		setdialogData(temp);
		setOpenAdd(true);
	};

	const handleClose = () => {
		setOpen(false);
		setOpenAdd(false);
		setOpenQuery(false);
	};

	const handleUpdate = () => {
		setOpen(false);
		axios.post(process.env.REACT_APP_SERVER_URL + "/api/UpdateRow", { table: Tables[buttonSelected].Tables_in_gasbooking, prevRow: prevDialogData, row: dialogData })
			.then((res) => {
				handleTable(Tables[buttonSelected].Tables_in_gasbooking);
			})
			.catch((err) => {
				console.log(err);
			});

	};

	const handleAdd = (e) => {
		e.preventDefault();
		setOpenAdd(false);
		axios.post(process.env.REACT_APP_SERVER_URL + "/api/insertRow", { table: Tables[buttonSelected].Tables_in_gasbooking, row: dialogData })
			.then((res) => {
				handleTable(Tables[buttonSelected].Tables_in_gasbooking);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios.get(process.env.REACT_APP_SERVER_URL + "/api/getAllTables")
			.then((res) => {
				setTables(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (Tables.length > 0) {
			axios.post(process.env.REACT_APP_SERVER_URL + "/api/getTable", { table: Tables[buttonSelected].Tables_in_gasbooking })
				.then((res) => {
					setdataTable(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [Tables, buttonSelected]);

	const handleTable = (table) => {
		axios.post(process.env.REACT_APP_SERVER_URL + "/api/getTable", { table })
			.then((res) => {
				setdataTable(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}


	return (
		<>
			{
				(id !== 'vinay' || name !== "123456") ? navigate('/pageNotFound') :
					<div style={{ height: "100vh", display: "flex", gap: "3px" }}>
						<Box
							sx={{
								display: "flex",
								minWidth: "20vw",
								padding: "10px",
								margin: "5px",
								marginRight: "3px",
								borderRadius: "10px",
								alignItems: "center",
								flexDirection: "column",
								bgcolor: "background.paper",
								boxShadow: "8px 8px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19)"
							}}
						>
							<Typography variant="h6" component="h2">
								<b>Admin Dashboard</b>
							</Typography>
							<Box
								sx={{
									display: "flex",
									width: "100%",
									padding: "10px",
									flexDirection: "column",
									marginTop: "10px",
									borderRadius: "10px",
									flexGrow: 1,
									bgcolor: "grey.200",
									gap: "10px",
								}}
							>
								<Typography variant="h6" component="h2">
									Tables
								</Typography>
								{Tables.map(({ Tables_in_gasbooking }, index) =>
								(<Button
									key={index}
									variant={buttonSelected === index ? "contained" : "outlined"}
									onClick={() => {
										setbuttonSelected(index);
									}}
								>{Tables_in_gasbooking}</Button>)
								)}
							</Box>
						</Box>
						<Box sx={{
							flexGrow: 1,
							padding: "10px",
							maxWidth: "78vw",
							margin: "5px",
							marginLeft: "0px",
							borderRadius: "10px",
							bgcolor: "background.paper",
							boxShadow: "8px 8px 8px 8px rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19)"
						}}>
							<Button
								variant="contained"
								sx={{ position: "absolute", right: "150px", top: "20px", minWidth: "80px" }}
								onClick={() => {
									setOpenQuery(true);
								}}
							>
								Query
							</Button>
							<Button
								variant="contained"
								sx={{ position: "absolute", right: "50px", top: "20px", minWidth: "80px" }}
								onClick={handleClickOpenAdd}
							>
								Add
							</Button>
							<div className='container' style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
								<TableContainer sx={{ maxWidth: 950, maxHeight: "85vh" }} component={Paper}>
									<Table stickyHeader aria-label="sticky table">
										<TableHead>
											<TableRow>
												{dataTable.length > 0 ? Object.keys(dataTable[0]).map((key) => (
													<StyledTableCell key={key}>{key}</StyledTableCell>
												)) : null}
												<StyledTableCell align="right" sx={{ paddingRight: "25px" }}>Action</StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{dataTable.map((row, index) => (
												<StyledTableRow key={index}>
													{Object.keys(row).map((key) => (
														<StyledTableCell key={key}>
															{row[key] && row[key].length > 20 ? row[key].substring(0, 20) + "..." : row[key]}
														</StyledTableCell>
													))}
													<StyledTableCell align="right" key={'action'}>
														<div style={{ display: "flex", gap: "10px", justifyContent: "right" }}>
															<IconButton aria-label="edit" sx={{ marginTop: "6px" }}
																onClick={() => {
																	handleClickOpen(row);
																}}
															>
																<EditIcon sx={{ color: "#1021DF" }} />
															</IconButton>
															<IconButton aria-label="delete" sx={{ marginTop: "6px" }}
																onClick={() => {
																	axios.post(process.env.REACT_APP_SERVER_URL + "/api/deleteRow", { table: Tables[buttonSelected].Tables_in_gasbooking, row })
																		.then((res) => {

																			handleTable(Tables[buttonSelected].Tables_in_gasbooking);
																		})
																		.catch((err) => {
																			console.log(err);
																		});
																}}
															>
																<DeleteIcon sx={{ color: "#FF0000" }} />
															</IconButton>
														</div>
													</StyledTableCell>
												</StyledTableRow>
											))}

										</TableBody>
									</Table>
								</TableContainer>
								<EditDialog dialogData={dialogData} setdialogData={setdialogData} open={open} handleClose={handleClose} handleUpdate={handleUpdate} />
								<AddDialog dialogData={dialogData} setdialogData={setdialogData} open={openAdd} handleClose={handleClose} handleAdd={handleAdd} />
								<QueryDialog open={openQuery} handleClose={handleClose} />
							</div>
						</Box>
					</div>
			}
		</>
	);
}
