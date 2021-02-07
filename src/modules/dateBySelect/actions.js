import moment from 'moment'

import { SAVE_DATEBYSELECT, LOADING_TRUEDATEBYSELECT, LOADING_FALSEDATEBYSELECT } from './types'

export const fetchDateBySelect = (date) => async(dispatch, getState) => {
    const getDate = new Promise((resolve) => {
        dispatch({ type: LOADING_TRUEDATEBYSELECT })
        const { task: { task } } = getState()
        const data = task.filter(item => moment(date).isSame(moment(item.dateTask.dateMoment).format("YYYY-MM-DD")) === true)
        if(data){
            resolve(data)
        }
    })

    return await getDate.then(res => {
        dispatch({ type: SAVE_DATEBYSELECT, data : res })
        dispatch({ type: LOADING_FALSEDATEBYSELECT })
    })
}