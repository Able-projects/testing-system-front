import { SET_LEVEL_LIST } from '../actions/types'
const initialState = {
    levelsList: null
}

export default function reducer(state=initialState,action){
    switch(action.type){
        case SET_LEVEL_LIST:
            return {
                ...state, levelsList: action.payload
            }
        default: 
            return state
    }
}
