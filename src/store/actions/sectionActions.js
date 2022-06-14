import axios from "axios"
import { SET_SECTION_LIST, SET_ERRORS, SERVER_URL } from "./types"
import { setAuthToken } from './authActions'
export const getSectionList = () => dispatch => {
    setAuthToken()
    axios.get(SERVER_URL + '/api/sections').then(res => {
        dispatch({
            type: SET_SECTION_LIST,
            payload: res.data?.data
        })
        dispatch({
            type: SET_ERRORS,
            payload: null
        })
    }).catch(err => {
        dispatch({
            type: SET_SECTION_LIST,
            payload: []
        })
    })
}

export const deleteSection = (id) => dispatch => {
    setAuthToken()
    axios.delete(SERVER_URL + '/api/section/'+id).then(res => {
        dispatch(getSectionList())
    })
}

export const addSection = (data,handleClose) => dispatch => {
    setAuthToken()
    axios.post(SERVER_URL + '/api/section',data).then(res => {
        if(res.data.success){
            handleClose()
            dispatch(getSectionList())
        }
    }).catch(error => {
        dispatch({
            type: SET_ERRORS,
            payload: error?.response?.data
        })
    })
}

export const editSection = (id,data,handleClose) => dispatch => {
    setAuthToken()
    axios.put(SERVER_URL + '/api/section/'+id,data).then(res => {
        if(res.data.success){
            handleClose()
            dispatch(getSectionList())
        }
    }).catch(error => {
        dispatch({
            type: SET_ERRORS,
            payload: error?.response?.data
        })
    })
}