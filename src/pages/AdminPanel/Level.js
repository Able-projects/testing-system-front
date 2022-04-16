import * as React from 'react';
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import { getLevelList, addLevel, deleteLevels, editLevels } from '../../store/actions/levelActions'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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


function Levels(props) {
  const {levelsList} = props.levelReducer
  const {errors} = props.errorReducer
  const [open, setOpen] = React.useState(false);
  const [editedSection, setEditedSection] = React.useState(null);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      name: data.get('name'),
    }

    if(editedSection){
      props.editLevels(editedSection._id, body, handleClose)
      setEditedSection(null)
    }else{
      props.addLevel(body,handleClose)
    }
  };
  const editLevels = (section) => {
    setEditedSection(section)
    handleOpen()
  }
  return (
    <Box>
      <Button onClick={handleOpen} variant="contained">Add new Level</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
           {editedSection ?
            <h2 id="parent-modal-title">Edit Level</h2>:
            <h2 id="parent-modal-title">Add new Level</h2>}
            <Grid item xs={12} sx={{marginBottom: '15px', marginTop: '15px'}}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  defaultValue={editedSection ? editedSection.name : ''}
                  placeholder="level name"
                  name="name"
                />
            </Grid>
            {errors?.message && <Alert severity="error">{errors.message}</Alert> }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {editedSection ? 'Edit level' : 'Add level' }
            </Button>
          </Box>
      </Modal>
      <TableContainer sx={{ marginTop: '20px' }}  component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {levelsList?.map((section) => (
            <StyledTableRow key={section._id}>
              <StyledTableCell component="th" scope="row">
                {section.name}
              </StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" color="success" onClick={() => editLevels(section)}>Edit</Button></StyledTableCell>
              <StyledTableCell align="right"><Button variant="outlined" onClick={() => props.deleteLevels(section._id)} color="error">Delete</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}


const mapStateToProps=(state)=>({
	levelReducer: state.levelReducer,
  errorReducer: state.errorReducer,
  sectionsReducer: state.sectionsReducer
})

export default connect(mapStateToProps, {getLevelList,deleteLevels,addLevel,editLevels}) (Levels);
