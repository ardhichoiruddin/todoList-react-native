import uuid from 'react-uuid'

import { SAVE_CATEGORY, DELETE_CATEGORY } from './types'

const initialState = {
    category: []
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_CATEGORY:
            return{
                category: state.category.concat({
                    id: uuid(),
                    name: action.category
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