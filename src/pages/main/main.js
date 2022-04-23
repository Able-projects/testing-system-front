import { connect } from "react-redux";
import { getQuestionsBySL } from "../../store/actions/questionsList";
import { makeStyles } from "@mui/styles";
import { Button, Box, Grid, Container } from "@mui/material";
import { useState, useEffect } from "react";
import Card from "../../components/card/card";
import { sectionCards } from "../../data";

const HomePage = (props) => {
  // useEffect(() => {
  //     props.getQuestionsBySL("6235e7af14220952af350d19","62518c082d1e9360bf341a72")
  // },[])

  const { sectionList } = props.sectionsReducer;
  const { levelsList } = props.levelReducer;
  const [section, setSection] = useState("Все");
  const [level, setLevel] = useState("Все");
  const [data, setData] = useState([]);

  const useStyles = makeStyles({
    row: {
      display: "flex",
      marginBottom: "20px",
    },
    button: {
      marginRight: "20px",
    },
  });
  const classes = useStyles();

  useEffect(() => {
    setData(sectionCards);
  }, []);

  const filter = (btn) => {
    if (btn !== "Все") {
      let newArray = sectionCards.filter((item) => item.title === btn);
      setData(newArray);
    } else {
      setData(sectionCards);
    }
  };

  // console.log(sectionCards, "--sectionCards");
  return (
    <div className="home-page">
      <Container>
        <Box
          className={classes.row}
          sx={{
            width: { xs: "40%", sm: "80%", md: "100%", lg: "100%" },
            display: "flex",
            justifyContent: "space-between",
          }}>
          <Button
            className={classes.button}
            variant={section === "Все" ? "contained" : "outlined"}
            onClick={() => {
              setSection("Все");
              filter("Все");
            }}>
            Все
          </Button>
          {/* Option buttons */}
          <Box
            sx={{
              display: "flex",
              width: { lg: "20%", md: "30%", sm: "50%" },

              justifyContent: "space-between",
            }}>
            {["HTML", "CSS", "JS"].map((btn, i) => (
              <Button variant="contained" key={i} onClick={() => filter(btn)}>
                {btn}
              </Button>
            ))}
          </Box>

          {sectionList?.map((item) => (
            <Button
              className={classes.button}
              key={item._id}
              variant={section === item.name ? "contained" : "outlined"}
              onClick={() => setSection(item.name)}>
              {item.name}
            </Button>
          ))}
        </Box>
        <Box className={classes.row}>
          <Button
            className={classes.button}
            variant={level === "Все" ? "contained" : "outlined"}
            onClick={() => setLevel("Все")}>
            Все
          </Button>
          {levelsList?.map((item) => (
            <Button
              className={classes.button}
              key={item._id}
              variant={level === item.name ? "contained" : "outlined"}
              onClick={() => setLevel(item.name)}>
              {item.name}
            </Button>
          ))}
        </Box>
        {/* ///Cards */}

        <Grid container>
          {data.map((elem, i) => (
            <Grid spacing={1} item xs={12} sm={6} md={4} lg={4} key={i}>
              <Card title={elem.title} level={level} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sectionsReducer: state.sectionsReducer,
  levelReducer: state.levelReducer,
});

export default connect(mapStateToProps, { getQuestionsBySL })(HomePage);
