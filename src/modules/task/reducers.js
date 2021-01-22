import uuid from 'react-uuid'
import Immutable from 'seamless-immutable'

import { SAVE_TASK, DELETE_TASK } from './types'

const initialState = Immutable({
    task: []
})

const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_TASK:
            return{
                task: state.task.concat({
                    id: action.id ? action.id : uuid(),
                    nameTask: action.data.nameTask,
                    description: action.data.description,
                    dateTask: action.data.dateTask,
                    timeTask: action.data.timeTask,
                    category: action.data.category,
                    complete: false
                }) 
            }
        case DELETE_TASK:
            return{
                task: state.task.filter(tk => tk.id !== action.taskId)
            }
        default:
            return state
    }
}

export default taskReducer