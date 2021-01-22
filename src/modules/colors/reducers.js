import uuid from 'react-uuid'
import Immutable from 'seamless-immutable'

import { SAVE_COLOR, DELETE_COLOR } from './types'

const initialState = Immutable({
    colors: [
        {
            id: 1,
            color: '#E71D36'
        },
        {
            id: 2,
            color: '#fcbf49'
        },
        {
            id: 3,
            color: '#219ebc'
        },
        {
            id: 4,
            color: '#fb8b24'
        },
    ]
})

const colorsReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_COLOR:
            return{
                colors: state.colors.concat({
                    id: uuid(),
                    color: action.color
                }) 
            }
        case DELETE_COLOR:
            return{
                colors: state.colors.filter(color => color.id !== action.colorId)
            }
        default:
            return state
    }
}

export default colorsReducer