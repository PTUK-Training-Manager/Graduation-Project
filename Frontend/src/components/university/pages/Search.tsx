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
import AddIcon from '@mui/icons-material/Add';
import './ustyle.css';
import TextField from '@mui/material/TextField';
import ListItemButton from '@mui/material/ListItemButton';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './ser.css';

export default function Search() {
  return (
    <>
      <UNavbar />
      <Stack spacing={4} direction="row">
        <TextField label="Search"></TextField>
        <SearchIcon />
        <ListItemButton>
          <AddIcon className="add" />
        </ListItemButton>
      </Stack>
      <Stack display="flex">
        <Paper sx={{ width: '800px', marginLeft: '160px', mt: 2 }}>
          <TableContainer sx={{ maxHeight: '450px' }}>
            <Table aria-aria-label="current trainne table" stickyHeader>
              <TableHead>
                <TableRow className="table-row">
                  <TableCell
                    sx={{ backgroundColor: '#EDF3F6' }}
                    sortDirection="asc"
                  >
                    Student Number
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#EDF3F6' }}>
                    Company Name
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#EDF3F6' }}>
                    Type{' '}
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#EDF3F6' }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#EDF3F6' }}>
                    Start Date
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#EDF3F6' }}>
                    End Form
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Trainnes.map((row) => (
                  <TableRow
                    key={row['s-number']}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ backgroundColor: 'white' }}>
                      {row['s-number']}
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'white' }}>
                      {row['c-name']}
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'white' }}>
                      {row['type']}
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'white'}} 
                    style={{ color: row.status === 'Running' ? 'orange' : row.status === 'Rejected' ? 'red' : row.status === 'Completed' ? 'green' : row.status === 'Accepted' ? 'blue': row.status === 'Pending' ? 'gray' : 'white' }}>
                      {row['status']}
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'white' }}>
                      {row['startD']}
                    </TableCell>
                    <TableCell sx={{ backgroundColor: 'white' }}>
                      {row['endD']}
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
    'c-name': 'Foothill',
    type: 'First',
    status: 'Running',
    startD: '19-11-2020',
    endD: '--',
  },
  {
    's-number': '201910135',
    'c-name': 'ASAL',
    type: 'Second',
    status: 'Pending',
    startD: '--',
    endD: '--',
  },
  {
    's-number': '201910790',
    'c-name': 'Foothill',
    type: 'Second',
    status: 'Rejected',
    startD: '--',
    endD: '--',
  },
  {
    's-number': '201810362',
    'c-name': 'Exalt',
    type: 'Second',
    status: 'Running',
    startD: '20-2-2021',
    endD: '--',
  },
  {
    's-number': '201910124',
    'c-name': 'Exalt',
    type: 'First',
    status: 'Accepted',
    startD: '--',
    endD: '--',
  },
  {
    's-number': '201811120',
    'c-name': 'ASAL',
    type: 'Compined',
    status: 'Completed',
    startD: '18-11-2021',
    endD: '19-2-20200',
  },
  {
    's-number': '201811284',
    'c-name': 'ASAL',
    type: 'First',
    status: 'Running',
    startD: '17-10-2020',
    endD: '--',
  },
  {
    's-number': '201810650',
    'c-name': 'Foothill',
    type: 'Second',
    status: 'Rejected',
    startD: '--',
    endD: '--',
  },
];
