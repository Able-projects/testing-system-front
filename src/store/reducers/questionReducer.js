import { SET_QUESTION_LIST } from "../actions/types";
const initialState = {
  questionList: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTION_LIST:
      return {
        ...state,
        questionList: action.payload,
      };
    default:
      return state;
  }
}
