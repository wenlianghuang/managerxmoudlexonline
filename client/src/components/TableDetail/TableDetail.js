import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import {columnM} from './MenuBook/MenuBookTableContent';
import {columnT} from './Test2/Test2TableContent';
import {useTableStyles} from '../AllDecoration/AllDecoration';


import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';

export default function TableDetail({subtitle}){
  const tabletemplate = useTableStyles();
  console.log("subtitle: ",subtitle)
  let columns;

  let allcolumns = [
    columnM,
    columnT,
  ]
  let subnamearray = [
    "menubook",
    "test2",
  ]
  for(let i = 0; i < subnamearray.length;i++){
    if(subtitle === subnamearray[i]){
      columns = allcolumns[i];
      break;
    }
  }
  //only for test in table content
  function createData(name, code, population, size) {
    let density = population / size
    return { name, code, population, size,density};
  }
  
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
  ];
  

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Order
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    //setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  ////////////////////////////////////////////////
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              sortDirection={orderBy === column.id ? order : false}
              style={{ backgroundColor: '#D5DBDB'}}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
                style={{color:'black'}}
              >
                {column.label}
                {orderBy === column.id ? (
                  <Box component="span" sx={visuallyHidden} >
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  //////////////////////////////////////////////////////
  return(
    <>
    <Paper className={tabletemplate.root}>
      <TableContainer className={tabletemplate.container}>
        <Table stickyHeader aria-label="sticky table">
          {/*
          <TableHead style={{background: 'black'}} >
            <TableRow>
              {columns.map((column) => {
                
                return(
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth,backgroundColor: 'green' }}
                  >
                    
                    {column.label}
                  </TableCell>
              )})}
            </TableRow>
          </TableHead>
          */}

          <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
          />

          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={tabletemplate.PaginationTemplate}
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
      />
    </Paper>
    </>
  )
}