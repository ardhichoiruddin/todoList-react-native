import Immutable from 'seamless-immutable'

import { SAVE_IDCATEGORY } from './types'

const initialState = Immutable({
    idCategory :0
})

const idFilterCategoryReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_IDCATEGORY:
            return{
                idCategory: action.id
            }
        default:
            return state
    }
}

export default idFilterCategoryReducer