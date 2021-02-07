
import Immutable from 'seamless-immutable'

import { SAVE_DATEBYSELECT, LOADING_TRUEDATEBYSELECT, LOADING_FALSEDATEBYSELECT } from './types'

const initialState = Immutable({
    dateBySelect: [],
    loading: false
})

const dateBySelectReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_DATEBYSELECT:
            return{
                ...state,
                dateBySelect: action.data
            }
        case LOADING_TRUEDATEBYSELECT:
            return{
                ...state,
                loading: true
            }
        case LOADING_FALSEDATEBYSELECT:
            return{
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default dateBySelectReducer