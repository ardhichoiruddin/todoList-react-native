import Immutable from 'seamless-immutable'

import { SAVE_TASKBYCATEGORY } from './types'

const initialState = Immutable({
    taskByCategory: []
})

const taskByCategoryReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_TASKBYCATEGORY:
            return{
                taskByCategory: action.data
            }
        default:
            return state
    }
}

export default taskByCategoryReducer