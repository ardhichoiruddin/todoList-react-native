import moment from 'moment'

import { SAVE_NOTIFICATIONNOW } from './types'

export const fetchDateNotif = () => async(dispatch, getState) => {
    const getData = new Promise((resolve) => {
        const { task: { task } } = getState()
        const taskSelect = task.filter(item =>  moment( moment().format("YYYY-MM-DD") ).isSame( moment(item.dateTask.dateMoment).format("YYYY-MM-DD") ) === true)
        if(taskSelect){
            resolve(taskSelect)
        }
    })
    await getData.then(res => {
        dispatch({ type: SAVE_NOTIFICATIONNOW, data: res })
    })

}