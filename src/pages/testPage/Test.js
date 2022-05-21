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
import { putUserScore } from '../../store/actions/userActions';
import { useNavigate } from 'react-router-dom'

export function TextMobileStepper(props) {
  const { section, sid, lid } = useParams();
  React.useEffect(() => {
    if (section !== "все") {
      props.getQuestionsBySL(sid, lid);
    } else {
      props.getQuestionsList(true);
    }
  }, [])
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const questions = props.questionReducer.questionList;
  const { userInfo } = props.authReducer;
  const [rightAnswer, setRightAnswer] = React.useState();
  const [userAnswer, setUserAnswer] = React.useState([]);
  const [totalScore, setTotalScore] = React.useState(0);
  const usenavigate = useNavigate();

  const maxSteps = questions?.length;

  const handleNext = () => {
    if (activeStep + 1 !== userAnswer.length) return;
    if (activeStep === maxSteps - 1) {
      let score = 0;
      let rightScore = 0;
      userAnswer.map((el) => {
        score += el.score
        if (el.rightAnswer) {
          rightScore++;
        }
      });
      setTotalScore(score);
      setRightAnswer(rightScore);
    }
    setActiveStep(activeStep + 1);
  };


  const checkAnswer = (obj) => {
    let choosed = Number(questions[activeStep].answer - 1);
    let answerWord = questions[activeStep].options[choosed].option;
    let item = {};
    const arr = userAnswer.filter(obj3 => obj3.id !== activeStep);
    item.id = activeStep;
    if (answerWord === obj.option) {
      item.rightAnswer = true;
      item.score = +questions[activeStep].score
    } else {
      item.rightAnswer = false;
      item.score = 0;
    }
    arr.push(item);

    setUserAnswer(arr)
  };
  console.log(userAnswer, '------userAnswer');
  const handleSave = () => {
    props.putUserScore(userInfo._id, { score: totalScore }, usenavigate);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="lx"
        sx={{
          // backgroundImage: 'linear-gradient(to right bottom, #ffffff, #fff2ff, #ffe2e8, #ffd8bd, #ffdb92, #d5dd7b, #98e07a, #13e091, #00ccc4, #00b3f1, #0092ff, #2166e7)',
          // backgroundImage:
          //   "url(https://images.squarespace-cdn.com/content/v1/5a919aebda02bc813b5472f8/1519591892538-TA66V94BFAII897QQ2XN/blockchain.jpg?format=1500w)",
          backgroundImage: "url(/img/blockchain.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          p: 2,
          minHeight: "100vh",
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
          {activeStep === maxSteps ? (
            <React.Fragment>
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
                <Typography variant="h4">Итог по {section?.toUpperCase()}</Typography>
              </Paper>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                  {questions?.length === 0 ? 'Нет вопросов. Выберите другие варианты сложности' : 'Мои поздравления с прохождением теста.'}
                </Typography>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {questions?.length > 0 && 'Ваш рейтинг за ответы:' + totalScore}

                </Typography>
                {
                  questions?.length > 0 &&
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Правильных ответов: {((rightAnswer !== undefined) || 0) ? `${rightAnswer} из ${maxSteps}` : '0'}
                  </Typography>
                }
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', height: '100%', pb: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                  variant="contained"
                  sx={{
                    background: "#F8C205",
                    "&:hover": {
                      bgcolor: "#ff9100",
                    },
                  }}
                  onClick={handleSave}>Save Results</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
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
                  width: "100%",
                  p: 2,
                  flexGrow: 1,
                }}>
                <Typography variant="body1">
                  {questions && questions[activeStep]?.question}
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
                {questions &&
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name={"question" + activeStep}>
                    {questions &&
                      questions[activeStep]?.options.map((e, i) => (
                        <FormControlLabel
                          value={e.option !== null ? e?.option : ""}
                          control={<Radio onClick={() => checkAnswer(e, i)} />}
                          label={e.option !== null ? e?.option : ""}
                          key={i}
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
                    disabled={activeStep === maxSteps}
                    variant="contained"
                    sx={{
                      background: "#F8C205",
                      "&:hover": {
                        bgcolor: "#ff9100",
                      },
                    }}>
                    {/* Next */}
                    {activeStep === maxSteps - 1 ? 'Finish' : 'Next'}
                    {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
              />
            </React.Fragment>

          )}
        </Box>

      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  sectionsReducer: state.sectionsReducer,
  levelReducer: state.levelReducer,
  questionReducer: state.questionReducer,
  authReducer: state.authReducer
});

export default connect(mapStateToProps, { getQuestionsBySL, getQuestionsList, putUserScore })(TextMobileStepper);
