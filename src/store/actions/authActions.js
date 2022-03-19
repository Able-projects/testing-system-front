import axios from "axios"
import {AUTH_ERRORS,LOGIN} from './types'
export const signup = (body,navigate) => dispatch => {
    dispatch({
        type: AUTH_ERRORS,
        payload: null
    })
    axios.post('http://localhost:5050/api/register',body).then(res => {
        navigate('/', {
            state: { },
          });
    }).catch(err =>
        dispatch({
            type: AUTH_ERRORS,
            payload: err
        })
    ) 
}
export const setAuthToken=token=>{
    let tokenAuth = token || localStorage.getItem('token')
    if(tokenAuth){
        axios.defaults.headers.common['Authorization'] = "bearer " + tokenAuth;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const signin = (body,navigate) => dispatch => {
    dispatch({
        type: AUTH_ERRORS,
        payload: null
    })
    axios.post('http://localhost:5050/api/signin',body).then(res => {
        dispatch({
            type: LOGIN,
            payload: res.data?.data
        })
        setAuthToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        if(res?.data?.data.role === 'admin'){
            navigate('/admin', {
                state: { },
            });
        }else{
            navigate('/AppMenu', {
                state: { },
            });
        }
    }).catch(err =>{
            dispatch({
                type: AUTH_ERRORS,
                payload: err?.response?.data
            })
        }
    ) 
}

export const logout = (navigate) => dispatch => {
    dispatch({
        type: AUTH_ERRORS,
        payload: null
    })
    navigate('/', {
        state: { },
    });
    dispatch({
        type: LOGIN,
        payload: null
    })
    setAuthToken('')
}