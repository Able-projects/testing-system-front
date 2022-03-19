
import { SET_ERRORS } from "../actions/types"
const initialState = {
    errors: null
}

export default function reducer(state=initialState,action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state, errors: action.payload
            }
        default:
            return state
    }
}
