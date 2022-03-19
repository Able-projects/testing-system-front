import { combineReducers } from "redux";
import userReducer from './userReducer'
import authReducer from './authReducer'
import levelReducer from './levelReducer'
import sectionsReducer from './sectionsReducer'
import questionReducer from './questionReducer'
import errorReducer from './errorReducer'

export default combineReducers({userReducer,errorReducer,authReducer,levelReducer,questionReducer,sectionsReducer})