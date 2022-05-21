import * as React from 'react';
import { connect } from 'react-redux';
import { InputLabel, TableContainer, TableHead, Table, TableBody, TableRow, Box, Select, MenuItem, Typography, Button, TextField, Container, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Dialog, AppBar, Toolbar, IconButton, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { addQuestion, deleteQuestion } from '../../store/actions/questionsList'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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

const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        height: 48,
        padding: '0 30px',
    },
    questionAppBar: {
        position: 'relative',
        mb: 2
    },
    questionTitle: {
        ml: 2,
        flex: 1
    },
    questionBoxAnswer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    boxBtnAnswer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },
    row: {
        display: 'flex',
        alignItems: 'center'
    },
    questionSimpe: {
        backgroundColor: '#a6d4fa',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '16px',
        marginBottom: '16px'
    },
    inpAnswer: {
        padding: '16px',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        '&:focus': {
            outlineColor: '#1976d2'
        },
        '&:hover': {
            borderColor: "rgba(0, 0, 0, 0.87)"
        }
    },
    inpNumber: {
        padding: '16px',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        '&:focus': {
            outlineColor: '#1976d2'
        },
        '&:hover': {
            borderColor: "rgba(0, 0, 0, 0.87)"
        },
        color: 'inherit',
        marginBottom: '10px',
        marginTop: '10px'
    }

});

function Questions(props) {
    const classes = useStyles();
    const { sectionList } = props.sectionsReducer
    const { levelsList } = props.levelReducer
    const { questionList } = props.questionReducer
    const [open, setOpen] = React.useState(false);
    const [answers, setAnswers] = React.useState([{ answer: '' }]);
    const [questionName, setQuestionName] = React.useState('');
    const [num, setNum] = React.useState('1');
    const [score, setScore] = React.useState('0');
    const [sectionId, setSectionId] = React.useState(sectionList ? sectionList[0]?._id : '');
    const [levelId, setLevelId] = React.useState(levelsList ? levelsList[0]?._id : '');
    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        setQuestionName('');
        setAnswers([{ answer: '' }]);
        setNum('1');
    };
    const handleSave = () => {
        setOpen(false);
        setQuestionName('');
        setAnswers([{ answer: '' }]);
        setNum('1');
        const body = {
            question: questionName,
            option1: answers[0]?.answer || null,
            option2: answers[1]?.answer || null,
            option3: answers[2]?.answer || null,
            option4: answers[3]?.answer || null,
            option5: answers[4]?.answer || null,
            answer: num,
            score,
            sectionId,
            levelId
        }
        props.addQuestion(body)
    };
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add new Question
                <AddCircleIcon sx={{ ml: 1 }} fontSize='small' />
            </Button>
            <Dialog
                fullWidth='fullWidth'
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.questionAppBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography className={classes.questionTitle} variant="h6" component="div">
                            Questions
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Box>
                        <Box p={2} mb={2}>
                            <TextField
                                fullWidth
                                defaultValue={questionName}
                                variant="outlined"
                                // label='Please enter question...'
                                placeholder='Please enter question...'
                                sx={{
                                    mb: 2
                                }}
                                onChange={(e) => setQuestionName(e.target.value)}
                            />

                            {answers.map((item, key) => (
                                <Box key={key} className={classes.questionBoxAnswer} mb={2} >
                                    <input
                                        className={classes.inpAnswer}
                                        value={item.answer}
                                        placeholder='Please enter answer...'
                                        onChange={(e) => setAnswers(answers.map((item1, key1) => {
                                            if (key === key1) {
                                                item1.answer = e.target.value
                                            }
                                            return item1
                                        }))} />


                                    <Box display={'flex'} ml={3}>
                                        <Button variant='contained' sx={{ ml: 2 }}
                                            onClick={() => setAnswers(answers.filter((item2, key2) => key !== key2))}
                                        >delete <DeleteForeverIcon sx={{ ml: 1 }} fontSize='small' />
                                        </Button>
                                    </Box>
                                </Box>
                            ))}

                            {answers.length <= 4 ?
                                <Box className={classes.boxBtnAnswer} mb={2} >
                                    <Button variant='contained' sx={{ p: '16px 16px' }} onClick={() => setAnswers([...answers, { answer: '' }])}>add new answer<AddCircleIcon sx={{ ml: 1 }} fontSize='small' />
                                    </Button>
                                </Box> : ''
                            }
                            <InputLabel>Enter correct answer</InputLabel>
                            <input className={classes.inpNumber}
                                value={num}
                                type='text'
                                placeholder='Enter the number of the correct answer'
                                maxLength='1'
                                onChange={(e) => setNum(e.target.value <= answers.length ? e.target.value.replace(/[^1-5]+/g, '') : num)}
                            />
                            <InputLabel>Enter score</InputLabel>
                            <input className={classes.inpNumber}
                                value={score}
                                type='text'
                                placeholder='Enter the score'
                                maxLength='1'
                                onChange={(e) => setScore(e.target.value.replace(/[^1-9]+/g, ''))}
                            />
                            <Box className={classes.row}>
                                <InputLabel id="section-select-label">Section id: </InputLabel>
                                <Select
                                    labelId="section-select-label"
                                    id="demo-simple-select"
                                    value={sectionId}
                                    label="Section id"
                                    sx={{ m: 1, minWidth: 120 }}
                                >
                                    {sectionList?.map((item) => (
                                        <MenuItem key={item._id} onClick={() => setSectionId(item._id)} value={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                                <InputLabel id="level-select-label">Level id: </InputLabel>
                                <Select
                                    labelId="level-select-label"
                                    id="demo-simple-select"
                                    value={levelId}
                                    sx={{ m: 1, minWidth: 120 }}
                                    label="Level id"
                                >
                                    {levelsList?.map((item) => (
                                        <MenuItem key={item._id} onClick={() => setLevelId(item._id)} value={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </Box>

                        </Box>
                        <Box className={classes.questionSimpe} >
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label" >Question №1 {questionName}</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    value={`answer${num - 1}`}
                                    name="radio-buttons-group"
                                >   {answers.map((item, key) => (
                                    <FormControlLabel key={key} value={"answer" + key} control={<Radio />} label={item.answer} />
                                ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Box>
                </Container >
            </Dialog>
            <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>level</StyledTableCell>
                            <StyledTableCell>section</StyledTableCell>
                            <StyledTableCell>score</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questionList?.map((item) => (
                            <StyledTableRow key={item._id}>
                                <StyledTableCell component="th" scope="row">
                                    {item.question}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {levelsList?.find(level => (level._id === item.levelId))?.name || item.levelId}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {sectionList?.find(section => (section._id === item.sectionId))?.name || item.sectionId}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {item.score}
                                </StyledTableCell>
                                <StyledTableCell align="right"><Button variant="outlined" onClick={() => props.deleteQuestion(item.id)} color="error">Delete</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}

const mapStateToProps = (state) => ({
    questionReducer: state.questionReducer,
    errorReducer: state.errorReducer,
    sectionsReducer: state.sectionsReducer,
    levelReducer: state.levelReducer
})

export default connect(mapStateToProps, { deleteQuestion, addQuestion })(Questions);