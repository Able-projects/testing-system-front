import axios from "axios";
import { SET_QUESTION_LIST, SERVER_URL  } from "./types";
import { setAuthToken } from "./authActions";
export const getQuestionsList = (isRan = false) => (dispatch) => {
  setAuthToken();
  axios
    .get(SERVER_URL + "/api/questions")
    .then((res) => {
      let newArray = res.data?.data.map((el) => {
        let options = []
        el.option1 && options.push({ option: el.option1 })
        el.option2 && options.push({ option: el.option2 })
        el.option3 && options.push({ option: el.option3 })
        el.option4 && options.push({ option: el.option4 })
        el.option5 && options.push({ option: el.option5 })
        let newObj = {
          id: el._id,
          question: el.question,
          options,
          answer: el.answer,
          score: el.score,
          sectionId: el.sectionId,
          levelId: el.levelId
        };
        return newObj;
      });

      dispatch({
        type: SET_QUESTION_LIST,
        payload: isRan ? getRandonQuesions(newArray) : newArray,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_QUESTION_LIST,
        payload: [],
      });
    });
};
function getRandonQuesions(item) {
  // создать новый массив с вопросами
  let arr = [];
  let c = item.map(el => el);
  console.log(item, '--item');
  for (let i = 0; i < 10; i++) {
    let ind = Math.floor(Math.random() * c.length);

    if (c[ind] !== undefined) {
      arr.push(c[ind]);
      c.splice(ind, 1);
    }
  }
  return arr;
}
export const getQuestionsBySL = (sectionId, levelId) => (dispatch) => {
  setAuthToken();
  axios
    .get(`${SERVER_URL}/api/questions/${sectionId}/${levelId}`)
    .then((res) => {
      let newArray = res.data?.data.map((el) => {
        let options = []
        el.option1 && options.push({ option: el.option1 })
        el.option2 && options.push({ option: el.option2 })
        el.option3 && options.push({ option: el.option3 })
        el.option4 && options.push({ option: el.option4 })
        el.option5 && options.push({ option: el.option5 })
        let newObj = {
          id: el._id,
          question: el.question,
          options,
          answer: el.answer,
          score: el.score
        };
        return newObj;
      });

      dispatch({
        type: SET_QUESTION_LIST,
        payload: getRandonQuesions(newArray),
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_QUESTION_LIST,
        payload: [],
      });
    });
};

export const addQuestion = (body) => (dispatch) => {
  setAuthToken();
  axios.post(SERVER_URL + "/api/questions", body).then((res) => {
    dispatch(getQuestionsList());
  });
};

export const deleteQuestion = (id) => (dispatch) => {
  setAuthToken();
  axios.delete(SERVER_URL + "/api/questions/" + id).then((res) => {
    dispatch(getQuestionsList());
  });
};
