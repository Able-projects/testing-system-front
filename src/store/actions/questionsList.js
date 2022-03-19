import axios from "axios"
import { SET_QUESTION_LIST } from "./types"
import { setAuthToken } from './authActions'
export const getQuestionsList = () => dispatch => {
    setAuthToken()
    axios.get('http://localhost:5050/api/questions').then(res => {
        dispatch({
            type: SET_QUESTION_LIST,
            payload: res.data?.data
        })
    })
}