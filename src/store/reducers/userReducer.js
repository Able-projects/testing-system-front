import { SET_USERS_LIST} from '../actions/types'
const initialState = {
    userList: null
}

export default function reducer(state=initialState,action){
    switch(action.type){
        case SET_USERS_LIST:
            return {
                ...state, userList: action.payload
            }
        default: 
            return state
    }
}
