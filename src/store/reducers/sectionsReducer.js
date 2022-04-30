import { SET_SECTION_LIST } from "../actions/types";
const initialState = {
  sectionList: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SECTION_LIST:
      return {
        ...state,
        sectionList: action.payload,
      };
    default:
      return state;
  }
}
