import Immutable from 'seamless-immutable'

import { SAVE_NOTIFICATIONNOW } from './types'

const initialState = Immutable({
    notifTaskNow: []
})

const notificationNowReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_NOTIFICATIONNOW:
            return{
                notifTaskNow: action.data
            }
        default:
            return state
    }
}

export default notificationNowReducer