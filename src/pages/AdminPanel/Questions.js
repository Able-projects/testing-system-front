import * as React from 'react';
import { connect } from 'react-redux';
import { Box, Typography, Button, TextField, Container, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Dialog, AppBar, Toolbar, IconButton, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
        color: 'inherit'
    }

});

function Questions(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [answers, setAnswers] = React.useState([{ answer: '' }]);
    const [questionName, setQuestionName] = React.useState('');
    const [num, setNum] = React.useState('1');
    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        setQuestionName('');
        setAnswers([{ answer: '' }]);
        setNum('1');
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
                        <Button autoFocus color="inherit" onClick={handleClose}>
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
                            <input className={classes.inpNumber}
                                value={num}
                                type='text'
                                placeholder='Enter the number of the correct answer'
                                maxLength='1'
                                onChange={(e) => setNum(e.target.value.replace(/[^1-5]+/g, ''))}
                            />
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
        </div >
    );
}

const mapStateToProps = (state) => ({
    questionReducer: state.questionReducer,
    errorReducer: state.errorReducer
})

export default connect(mapStateToProps, {})(Questions);