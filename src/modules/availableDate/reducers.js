import Immutable from 'seamless-immutable'

import { SAVE_AVAILABLEDATE, REMOVE_AVAILABLEDATE } from './types'

const initialState = Immutable({
    date: []
})

const availableDateReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_AVAILABLEDATE:
            return{
                date: action.availableDate
            }
        case REMOVE_AVAILABLEDATE:
            return{
                date: []
            }
        default:
            return state
    }
}

export default availableDateReducer