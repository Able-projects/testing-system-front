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
    }).catch(err => {
        dispatch({
            type: SET_QUESTION_LIST,
            payload: []
        })
    })
}

export const getQuestionsBySL = (sectionId,levelId) => dispatch => {
    setAuthToken()
    axios.get(`http://localhost:5050/api/questions/${sectionId}/${levelId}`).then(res => {
        dispatch({
            type: SET_QUESTION_LIST,
            payload: res.data?.data
        })
    }).catch(err => {
        dispatch({
            type: SET_QUESTION_LIST,
            payload: []
        })
    })
}

export const addQuestion = (body) => dispatch => {
    setAuthToken()
    console.log(body,'--')
    axios.post('http://localhost:5050/api/questions',body).then(res => {
        dispatch(getQuestionsList())
    })
}

export const deleteQuestion = (id) => dispatch => {
    setAuthToken()
    axios.delete('http://localhost:5050/api/questions/' + id).then(res => {
        dispatch(getQuestionsList())
    })
}