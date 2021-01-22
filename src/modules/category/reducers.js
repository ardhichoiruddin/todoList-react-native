import uuid from 'react-uuid'
import Immutable from 'seamless-immutable'

import { SAVE_CATEGORY, DELETE_CATEGORY } from './types'

const initialState = Immutable({
    category: []
})

const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_CATEGORY:
            return{
                category: state.category.concat({
                    id: uuid(),
                    name: action.category,
                    bgColor: action.bgColor
                }) 
            }
        case DELETE_CATEGORY:
            return{
                category: state.category.filter(cat => cat.id !== action.catId)
            }
        default:
            return state
    }
}

export default categoryReducer