import Immutable from 'seamless-immutable'

import { SET_FIRSTOPEN } from './types'

const initialState = Immutable({
    firstOpen: false
})

const firstOpenReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_FIRSTOPEN:
            console.log(state)
            return{
                firstOpen: action.firstOpen
            }
        default:
            return state
    }
}

export default firstOpenReducer