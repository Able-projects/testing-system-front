import axios from "axios";
import { SET_QUESTION_LIST } from "./types";
import { setAuthToken } from "./authActions";
export const getQuestionsList = () => (dispatch) => {
  setAuthToken();
  axios
    .get("http://localhost:5050/api/questions")
    .then((res) => {
      let newArray = res.data?.data.map((el) => {
        let newObj = {
          id: el._id,
          question: el.question,
          options: [
            { option: el.option1 },
            { option: el.option2 },
            { option: el.option3 },
            { option: el.option4 },
            // { option: el.option5 },
          ],
          answer: el.answer,
        };
        return newObj;
      });

      dispatch({
        type: SET_QUESTION_LIST,
        payload: newArray,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_QUESTION_LIST,
        payload: [],
      });
    });
};

export const getQuestionsBySL = (sectionId, levelId) => (dispatch) => {
  setAuthToken();
  axios
    .get(`http://localhost:5050/api/questions/${sectionId}/${levelId}`)
    .then((res) => {
      let newArray = res.data?.data.map((el) => {
        let newObj = {
          id: el._id,
          question: el.question,
          options: [
            { option: el.option1 },
            { option: el.option2 },
            { option: el.option3 },
            { option: el.option4 },
            // { option: el.option5 },
          ],
          answer: el.answer,
        };
        return newObj;
      });
      dispatch({
        type: SET_QUESTION_LIST,
        payload: newArray,
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
  console.log(body, "--");
  axios.post("http://localhost:5050/api/questions", body).then((res) => {
    dispatch(getQuestionsList());
  });
};

export const deleteQuestion = (id) => (dispatch) => {
  setAuthToken();
  axios.delete("http://localhost:5050/api/questions/" + id).then((res) => {
    dispatch(getQuestionsList());
  });
};
