import { LOGIN, LOGOUT, AUTH_ERRORS } from '../actions/types'
const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    passwordHash: null,
    authErrors: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, userInfo: action.payload }
        case AUTH_ERRORS:
            return { ...state, authErrors: action.payload }
        case LOGOUT:
            return { ...state, username: null }
        default:
            return state
    }
}
