import {LOGIN,LOGOUT} from '../actions/types'
const initialState = {
    username: null,
    passwordHash: null
}

export default function reducer(state=initialState,action){
    switch(action.type){
        case LOGIN:
            return {...state,username:action.payload}
        case LOGOUT:
            return {...state,username:null}
        default: 
            return state
    }
}
