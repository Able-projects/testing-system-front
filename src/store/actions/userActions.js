import axios from "axios"
import { SET_USERS_LIST , SERVER_URL} from "./types"
import { setAuthToken } from './authActions'
export const getUsers = () => dispatch => {
    setAuthToken()
    axios.get(SERVER_URL + '/api/users').then(res => {
        dispatch({
            type: SET_USERS_LIST,
            payload: res.data?.data
        })
    })
}
export const putUserScore = (id, data, navigate) => dispatch => {
    setAuthToken()
    axios.put(SERVER_URL + '/api/score/' + id, data).then(res => {
        navigate('/AppMenu', {
            state: {},
        })
    })
}
