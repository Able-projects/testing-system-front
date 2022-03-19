import axios from "axios"
import { SET_USERS_LIST } from "./types"
import { setAuthToken } from './authActions'
export const getUsers = () => dispatch => {
    setAuthToken()
    axios.get('http://localhost:5050/api/users').then(res => {
        dispatch({
            type: SET_USERS_LIST,
            payload: res.data?.data
        })
    })
}