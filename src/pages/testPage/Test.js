import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { getQuestionsBySL, getQuestionsList } from "../../store/actions/questionsList";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

export function TextMobileStepper(props) {
  const { section, sid, lid } = useParams();
  React.useEffect(()=>{
    if (section !== "Все") {
      props.getQuestionsBySL(sid, lid);
    } else {
      props.getQuestionsList();
    }
  },[])
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const { questionList } = props.questionReducer;
  const maxSteps = questionList?.length;
  const [rightAnswer, setRightAnswer] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep+1);
  };
  const checkAnswer = (obj) => {
    let choosed = Number(questionList[activeStep].answer - 1);
    let answerWord = questionList[activeStep].options[choosed].option;
    if (answerWord === obj.option) {
      setRightAnswer(rightAnswer + 1);
    }
  };
console.log(questionList)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="lx"
        sx={{
          // backgroundImage: 'linear-gradient(to right bottom, #ffffff, #fff2ff, #ffe2e8, #ffd8bd, #ffdb92, #d5dd7b, #98e07a, #13e091, #00ccc4, #00b3f1, #0092ff, #2166e7)',
          backgroundImage:
            "url(https://images.squarespace-cdn.com/content/v1/5a919aebda02bc813b5472f8/1519591892538-TA66V94BFAII897QQ2XN/blockchain.jpg?format=1500w)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          p: 2,
          height: "100vh",
          display: "flex",
        }}>
        <Box
          maxWidth="sm"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            p: 2,
            m: "0 auto",
            bgcolor: "background.default",
          }}>
          <Paper
            square
            elevation={5}
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: 50,
              pl: 2,
              borderRadius: 3,
              bgcolor: "#0288d1",
              color: "#ede7f6",
            }}>
            <Typography variant="h4">Вопрос по {section?.toUpperCase()}</Typography>
          </Paper>
          <Box
            sx={{
              minHeight: 255,
              width: "100%",
              p: 2,
              flexGrow: 1,
            }}>
            <Typography variant="body1">
              {questionList && questionList[activeStep]?.question}
            </Typography>
          </Box>

          <FormControl
            sx={{
              width: "100%",
              ml: 1.8,
              mb: 2,
            }}>
            <FormLabel sx={{ mb: 2 }} id="demo-radio-buttons-group-label">
              Варианты ответов
            </FormLabel>
            {/* /// */}
            {questionList &&
                <RadioGroup    
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name={"question"+activeStep}>
                      {questionList &&
              questionList[activeStep]?.options.map((e, i) => (
                  <FormControlLabel
                    value={e.option !== null ? e?.option : ""}
                    control={<Radio onClick={() => checkAnswer(e)}/>}
                    label={e.option !== null ? e?.option : ""}
                    sx={{
                      backgroundColor: "#e0e0e0",
                      mb: 0.5,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#bdbdbd",
                      },
                    }}
                  />))}
                </RadioGroup>
              }
          </FormControl>

          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              borderRadius: 2,
              mb: 2,
              bgcolor: "inherit",
            }}
            backButton={
              <Button
                size="small"
                onClick={() => handleNext()}
                disabled={activeStep === maxSteps - 1}
                variant="contained"
                sx={{
                  background: "#F8C205",
                  "&:hover": {
                    bgcolor: "#ff9100",
                  },
                }}>
                Next
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  sectionsReducer: state.sectionsReducer,
  levelReducer: state.levelReducer,
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, { getQuestionsBySL, getQuestionsList })(TextMobileStepper);
