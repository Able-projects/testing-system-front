import * as React from "react";
import Card from "@mui/material/Card";
import { connect } from "react-redux";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
export function TestCard(props) {
  const { title, level, sectionId, levelId, section } = props;
  // добавить остальные типы карточек
  const getImage = () => {
    if (title === "HTML") {
      return "/Image/html/icons8-html-5-150.svg";
    }
    if (title === "CSS") {
      return "/Image/css/icons8-css3-150.svg";
    }
    if (title === "JS") {
      return "Image/javascript/icons8-javascript-150.svg";
    }
    if (title === "React") {
      return "Image/react/icons8-react-native-150.svg";
    }
    return "/Image/javascript-html5-css3.png";
    // добавить номальную все картинки в одной
  };

  const goToPage = () => {
    navigate(`/test/${section.toLowerCase()}/${sectionId}/${levelId}`);
  };

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" sx={{ width: 220, m: "auto" }} height='220' image={getImage()} alt="quest variant" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {level}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => goToPage()} size="small">
          Начать
        </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  sectionsReducer: state.sectionsReducer,
  levelReducer: state.levelReducer,
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, {})(TestCard);

//props.getQuestionsBySL(sectionId, levelId)}
