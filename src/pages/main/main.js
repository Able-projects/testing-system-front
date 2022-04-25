import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import Card from "../../components/card/card";
const HomePage = (props) => {
  const { sectionList } = props.sectionsReducer;
  const { levelsList } = props.levelReducer;
  const [section, setSection] = useState("Все");
  const [level, setLevel] = useState("Все");
  const [sectionId, setSectionId] = useState("Все");
  const [levelId, setLevelId] = useState("Все");
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
  return (
    <div className="home-page">
      <Box className={classes.row}>
        <Button
          className={classes.button}
          variant={section === "Все" ? "contained" : "outlined"}
          onClick={() => setSection("Все")}>
          Все
        </Button>
        {sectionList?.map((item) => (
          <Button
            className={classes.button}
            key={item._id}
            variant={section === item.name ? "contained" : "outlined"}
            onClick={() => {
              setSection(item.name);
              setSectionId(item._id);
            }}>
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
            onClick={() => {
              setLevel(item.name);
              setLevelId(item._id);
            }}>
            {item.name}
          </Button>
        ))}
      </Box>
      <Card
        sectionId={sectionId}
        levelId={levelId}
        title={section}
        level={level}
        section={section}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  sectionsReducer: state.sectionsReducer,
  levelReducer: state.levelReducer,
});

export default connect(mapStateToProps, {})(HomePage);
//props.getQuestionsBySL(sectionId, levelId)}
