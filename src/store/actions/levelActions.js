import axios from "axios"
import { SET_LEVEL_LIST } from "./types"
import { setAuthToken } from './authActions'
export const getLevelList = () => dispatch => {
    setAuthToken()
    axios.get('http://localhost:5050/api/levels').then(res => {
        dispatch({
            type: SET_LEVEL_LIST,
            payload: res.data?.data
        })
    })
}