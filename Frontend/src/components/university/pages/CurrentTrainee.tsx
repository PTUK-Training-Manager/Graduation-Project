import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import UNavbar from './UNavbar';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import './ustyle.css';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import './ct.css';

export default function CurrentTrainne() {
  return (
    <>
      <UNavbar />
      <Stack spacing={4} direction="row">
        <TextField
        label="Search"
        >
        </TextField>
        <SearchIcon />
      </Stack>
      <Stack display="flex">
        <Paper sx={{ width: '800px', marginLeft: '160px', mt:2}}>
          <TableContainer sx={{ maxHeight: '450px' }}>
            <Table aria-aria-label="current trainne table" stickyHeader>
              <TableHead>
                <TableRow className='table-row' >
                  <TableCell  sx={{backgroundColor:"#EDF3F6"}} sortDirection="asc">Student Number</TableCell>
                  <TableCell  sx={{backgroundColor:"#EDF3F6"}} >Student Name</TableCell>
                  <TableCell  sx={{backgroundColor:"#EDF3F6"}} >Progress Form</TableCell>
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
                        <ListItemButton>
                          <ManageSearchIcon />
                        </ListItemButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Stack className="page"  spacing={4} direction="column">
            <Pagination count={10} />
        </Stack>
      </Stack>
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
