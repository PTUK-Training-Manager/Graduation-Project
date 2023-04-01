import React from 'react';
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper} from '@mui/material';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PrintIcon from '@mui/icons-material/Print';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const CompletedTrainees: React.FC = () => {
  return (
    <>
       <Grid container sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
        }}>
      {/* <Stack display="flex"> */}
        <Paper  sx={{padding:4}}
             elevation={10}>
          <TableContainer sx={{ maxHeight: '450px' }}>
            <Table aria-aria-label="current trainne table" stickyHeader>
              <TableHead>
                <TableRow className='table-row' >
                  <TableCell  sx={{backgroundColor:"#EDF3F6"}} sortDirection="asc">Student Number</TableCell>
                  <TableCell  sx={{backgroundColor:"#EDF3F6"}} >Student Name</TableCell>
                  <TableCell  sx={{backgroundColor:"#EDF3F6"}} >Evaluation Forms</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Trainnes.map((row) => (
                  <TableRow
                    key={row['s-number']}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell  sx={{backgroundColor:"white"}} >{row['s-number']}</TableCell>
                    <TableCell  sx={{backgroundColor:"white"}} >{row['s-name']}</TableCell>
                    <TableCell  sx={{backgroundColor:"white"}}>
                      <MenuItem>
                        <ListItemButton>
                          <PrintIcon />
                          <ListItemText primary="1"></ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                          <PrintIcon />
                          <ListItemText primary="2"></ListItemText>
                        </ListItemButton>
                      </MenuItem>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* <Stack className="page"  spacing={4} direction="column">
            <Pagination count={10} />
        </Stack> */}
      {/* </Stack> */}
      </Grid>
    </>
  );
}
const Trainnes = [
  {
    's-number': '201910213',
    's-name': 'Sara Zebdeh',
  },
  {
    's-number': '201910135',
    's-name': 'Hannen Thiab',
  },
  {
    's-number': '201910790',
    's-name': 'Hla Madi',
  },
  {
    's-number': '201910124',
    's-name': 'Shahd Amer',
  },
  {
    's-number': '202010310',
    's-name': 'Shahd Amer',
  },
  {
    's-number': '201810652',
    's-name': 'Mohammad Hajar',
  },
  {
    's-number': '202111322',
    's-name': 'Ali Jaber',
  },
  {
    's-number': '201810194',
    's-name': 'Sondos Asad',
  },
  {
    's-number': '201911150',
    's-name': 'Roua Qashoo',
  },
  {
    's-number': '201810216',
    's-name': 'Shimaa Khadir',
  },
];
export default CompletedTrainees;