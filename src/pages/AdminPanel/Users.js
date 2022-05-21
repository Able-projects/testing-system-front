import * as React from 'react';
import { connect } from 'react-redux'
import Box from '@mui/material/Box';
import { getUsers } from '../../store/actions/userActions'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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


function Users(props) {
  const { userList } = props.userReducer
  React.useEffect(() => {
    props.getUsers()
  }, [])
  console.log(userList)
  return (
    <Box sx={{ display: 'flex' }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList?.map((user) => (
              <StyledTableRow key={user.name}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">{user.role}</StyledTableCell>
                <StyledTableCell align="right">{user.score}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


const mapStateToProps = (state) => ({
  userReducer: state.userReducer
})

export default connect(mapStateToProps, { getUsers })(Users);
