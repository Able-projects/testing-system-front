import axios from "axios"
import { SET_LEVEL_LIST, SET_ERRORS } from "./types"
import { setAuthToken } from './authActions'
export const getLevelList = () => dispatch => {
    setAuthToken()
    axios.get('http://localhost:5050/api/levels').then(res => {
        dispatch({
            type: SET_LEVEL_LIST,
            payload: res.data?.data
        })
    }).catch(() => {
        dispatch({
            type: SET_LEVEL_LIST,
            payload: null
        })
    } )
}

export const deleteLevels = (id) => dispatch => {
    setAuthToken()
    axios.delete('http://localhost:5050/api/level/'+id).then(res => {
        dispatch(getLevelList())
    })
}

export const addLevel = (data,handleClose) => dispatch => {
    setAuthToken()
    axios.post('http://localhost:5050/api/level/',data).then(res => {
        if(res.data.success){
            handleClose()
            dispatch(getLevelList())
        }
    }).catch(error => {
        dispatch({
            type: SET_ERRORS,
            payload: error?.response?.data
        })
    })
}

export const editLevels = (id,data,handleClose) => dispatch => {
    setAuthToken()
    axios.put('http://localhost:5050/api/level/'+id,data).then(res => {
        if(res.data.success){
            handleClose()
            dispatch(getLevelList())
        }
    }).catch(error => {
        dispatch({
            type: SET_ERRORS,
            payload: error?.response?.data
        })
    })
}