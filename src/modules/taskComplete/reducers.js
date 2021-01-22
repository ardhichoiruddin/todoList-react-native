import Immutable from 'seamless-immutable'

import { SAVE_TASKCOMPLETE, DELETE_TASKCOMPLETE } from './types'

const initialState = Immutable({
    taskComplete: []
})

const taskCompleteReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_TASKCOMPLETE:
            return{
                taskComplete: state.taskComplete.concat({
                    id: action.data.id,
                    nameTask: action.data.nameTask,
                    description: action.data.description,
                    dateTask: action.data.dateTask,
                    timeTask: action.data.timeTask,
                    category: action.data.category,
                    complete: !action.data.complete
                }) 
            }
        case DELETE_TASKCOMPLETE:
            return{
                taskComplete: state.taskComplete.filter(tk => tk.id !== action.taskId)
            }
        default:
            return state
    }
}

export default taskCompleteReducer