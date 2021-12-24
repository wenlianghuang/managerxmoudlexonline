import React, {useState,useEffect} from 'react';
import {useHistory,useLocation,useParams} from 'react-router-dom';
import axios from 'axios';

import SearchBar from '../../SearchBar/SearchBar';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonGroup  from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import {SideBarHeader} from '../../AllDecoration/AllDecoration'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170,align:'left' },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
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

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;

  return (
    <TableHead>
      <TableRow>
      </TableRow>
      
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            
          >
            
              {column.label}
             
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export default function CreatePOP(){
  
  const [modeltype,setModelType] = useState('');
  const [modelname,setModelName] = useState('');
  const [projectcodename,setProjectCodeName] = useState('');
  const [supportswod,setSupportSWOD] = useState('');
  const [sclversion,setSCLVersion] = useState('');
  const [groupdescription,setGroupDescription] = useState('');
  const [sclrefresh,setSCLRefresh] = useState('');
  const [gcm,setGCM] = useState('');
  
  //2021.12.24
  const classes = SideBarHeader();

  //About Search
  const [searched, setSearched] = useState("");
  const [filterrow,setFilterRow] = useState(rows);
  const requestSearch = (searchedVal) => {
    const filterRows = rows.filter((row)=>{
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilterRow(filterRows);
  }

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  //CheckBox
  const [selected, setSelected] = useState([]);
  const [preloadname,setPreloadName] = useState([]);
  const [preloadcode,setPreloadCode] = useState([]);
  const [preloadpopulation,setPreloadPopulation] = useState([]);
  const [preloadsize,setPreloadSize] = useState([]);
  const [preloaddensity,setPreloadDensity] = useState([]);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filterrow.map((n) => n.name);
      const newName = filterrow.map(n=>n.name);
      const newCode = filterrow.map(n=>n.code);
      const newPopulation = filterrow.map(n=>n.population);
      const newSize = filterrow.map(n=>n.size);
      const newDensity = filterrow.map(n=>n.density);
      //console.log("Select All of Name: ",newSelecteds)
      //console.log("Select All of Detail: ",newDetail);
      setSelected(newSelecteds);
      setPreloadName(newName);
      setPreloadCode(newCode);
      setPreloadPopulation(newPopulation);
      setPreloadSize(newSize);
      setPreloadDensity(newDensity);
      return;
    }
    setSelected([]);
    setPreloadName([]);
    setPreloadCode([]);
    setPreloadPopulation([]);
    setPreloadSize([]);
    setPreloadDensity([]);
  };
  
  //Check the item indivisually 2021.12.01 
  const handleClick = (event, name,allcheckbox) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    let newPreloadName = [];
    let newPreloadCode = [];
    let newPreloadPopulation = [];
    let newPreloadSize = [];
    let newPreloadDensity = [];
    console.log(selectedIndex)
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newPreloadName = newPreloadName.concat(preloadname,allcheckbox.name);
      newPreloadCode = newPreloadCode.concat(preloadcode,allcheckbox.code);
      newPreloadPopulation = newPreloadPopulation.concat(preloadpopulation,allcheckbox.population)
      newPreloadSize = newPreloadSize.concat(preloadsize,allcheckbox.size);
      newPreloadDensity = newPreloadDensity.concat(preloaddensity,allcheckbox.density)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setPreloadName(newPreloadName);
    setPreloadCode(newPreloadCode);
    setPreloadPopulation(newPreloadPopulation);
    setPreloadSize(newPreloadSize);
    setPreloadDensity(newPreloadDensity);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const history = useHistory();
  const handleAllPOPPNSub = async (e) => {
    e.preventDefault();
    await axios.post("/rcdfunc/createpop",{
      preloadname: preloadname,
      preloadcode: preloadcode,
      preloadpopulation: preloadpopulation,
      preloadsize: preloadsize,
      preloaddensity: preloaddensity,
      
    },
    {
      headers:{
        "Content-Type":"application/json",
      },
    }
    ).then((res)=>{
      console.log(res.data)
    }).catch((error)=>{
      console.error(error)
    }) 
  }

  const handleSelectedPOPPNSub = async (e) => {
    e.preventDefault();
    await axios.post("/rcdfunc/createpop",{
      preloadname: preloadname,
      preloadcode: preloadcode,
      preloadpopulation: preloadpopulation,
      preloadsize: preloadsize,
      preloaddensity: preloaddensity,
    },
    {
      headers:{
        "Content-Type":"application/json",
      }
    },
    ).then((res)=>{
      console.log(res.data.data)
    }).catch((error)=>{
      console.error(error);
    })
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.push('/dashboard');
  }


  //Some about Table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return(
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center',
          position:'relative'
        }}
      >
        {/*
        <Typography
              style={{
                color:"white",
                backgroundColor:"gray"
              }}
        >
          SCL Information
        </Typography>
            */}
        <Box className={classes.eachBox}>
          SCL Information
        </Box>
        <Box component="form" Validate sx={{ maxWidth: 1000,maxHeight:100,mt:2 }}>
          <Box style={{width: "80%",marginBottom:1,position:'absolute',top:70,width:300,marginRight:50,left:350}}>
          <TextField
                margin="normal"
                required
                fullWidth
                id="modeltype"
                label="Model Type"
                value={modeltype}
                name="modeltype"
                autoComplete="Model Type"
                autoFocus
                onChange={(e)=>setModelType(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="modelname"
                label="Model Name"
                value={modelname}
                id="modelname"
                autoComplete="Model Name"
                onChange={(e)=>setModelName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="supportswod"
                label="Support SWOD"
                value={supportswod}
                id="supportswod"
                autoComplete="Support SWOD"
                onChange={(e)=>setSupportSWOD(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="projectcodename"
                label="ProjectCodeName"
                value={projectcodename}
                id="projectcodename"
                autoComplete="ProjectCodeName"
                onChange={(e)=>setProjectCodeName(e.target.value)}
              />
          </Box>
          <Box style={{width: "80%",marginBottom:1,position:'absolute',top:70,width:300,marginRight:50,left:800}}>
          <TextField
                margin="normal"
                required
                fullWidth
                id="sclversion"
                label="SCL Version"
                value={sclversion}
                name="sclversion"
                autoComplete="SCL Version"
                autoFocus
                onChange={(e)=>setSCLVersion(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="groupdescription"
                label="Group Description"
                value={groupdescription}
                id="groupdescription"
                autoComplete="Group Description"
                onChange={(e)=>setGroupDescription(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="sclrefresh"
                label="SCL Refresh"
                value={sclrefresh}
                id="sclrefresh"
                autoComplete="SCL Refresh"
                onChange={(e)=>setSCLRefresh(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="gcm"
                label="GCM"
                value={gcm}
                id="gcm"
                autoComplete="GCM"
                onChange={(e)=>setGCM(e.target.value)}
              />
          </Box>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            style={{width:300,position:'absolute',right:0,top:400}}
          />
          <Paper style={{ width: 1100,position:'absolute',top:500,left:350}}>
            <Box
              style={{position: "relative",paddingLeft:20, width: "100%",height:55,color:'white',backgroundColor:'#7F8C8D',fontSize:30}}>
                Preload PN Information
            </Box>
            <TableContainer style={{ maxHeight: 340  }}>
              <Table stickyHeader aria-label="sticky table">
                {/*
                <TableHead>
                  <TableRow>
                    <TableCell align="left" colSpan={5} style={{color:'white',backgroundColor:'#7F8C8D',fontSize:30}} >
                      Preload PN Information
                    </TableCell>
                  </TableRow>
                  <TableRow>
                  {columns.map((column) => {
                    return(
                      <> 
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 57, minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                    </>
                    )               
                  })}
                  </TableRow>
                </TableHead>
                */}
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={filterrow.length}
                />
                <TableBody>
                  {filterrow
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      /*return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} >
                            
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                        })}
                        </TableRow>
                      );*/
                      return(
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name,row)}
                          //onClick={(event)=>handleClick(event,row)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          //key={row}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>{row.population}</TableCell>
                          <TableCell>{row.size}</TableCell>
                          <TableCell>{row.density}</TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{}}  
            />
          </Paper>

          <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{position:'absolute', top:1000,textAlign:"center",right:0}}>
            <Button onClick={handleAllPOPPNSub} style={{textTransform: 'none'}} >Create all POP PN</Button>
            <Button onClick={handleSelectedPOPPNSub} style={{textTransform: 'none',marginLeft: 20}} >Create selected POP PN</Button>
            <Button onClick={handleCancel} style={{textTransform: 'none',marginLeft: 20}} >Cancel</Button>
          </ButtonGroup>
        </Box>
      </Box>
    {/*
    <div>
      <h1 style={{position: 'relative',left: 400,top:100}}>Create POP</h1>
    </div>
    */}
    </>
  )
}