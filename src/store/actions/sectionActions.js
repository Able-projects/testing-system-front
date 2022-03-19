import axios from "axios"
import { SET_SECTION_LIST, SET_ERRORS } from "./types"
import { setAuthToken } from './authActions'
export const getSectionList = () => dispatch => {
    setAuthToken()
    axios.get('http://localhost:5050/api/sections').then(res => {
        dispatch({
            type: SET_SECTION_LIST,
            payload: res.data?.data
        })
    })
}

export const deleteSection = (id) => dispatch => {
    setAuthToken()
    axios.delete('http://localhost:5050/api/section/'+id).then(res => {
        dispatch(getSectionList())
    })
}

export const addSection = (data,handleClose) => dispatch => {
    setAuthToken()
    axios.post('http://localhost:5050/api/section',data).then(res => {
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
    axios.put('http://localhost:5050/api/section/'+id,data).then(res => {
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