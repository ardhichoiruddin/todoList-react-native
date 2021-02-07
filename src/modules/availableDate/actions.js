import moment from 'moment'

import { fetchDateNotif } from '@modules/notificationNow/actions'

import { SAVE_AVAILABLEDATE } from './types'

const availableTaskHandler = (date, taskDate) => {
    const dateCount = moment(date).format("YYYY-MM-DD")
    return taskDate.some((item) => moment(item.toString()).isSame(dateCount) === true)
}

export const showAfterCurrentDate = 8
export const showBeforeCurrentDate = 3

export const fetchDate = () => async(dispatch, getState) => {
    const getDate = new Promise((resolve) => {
        const { task: { task } } = getState()
        const startDay = moment().subtract(showBeforeCurrentDate + 1, 'days')
        const totalDayCount = showBeforeCurrentDate + showAfterCurrentDate + 1
        const dayCount = [...Array(totalDayCount)].map(_ => startDay.add(1,'days').clone())
        const taskDate = task.map(item => ([
            moment(item.dateTask.dateMoment).format("YYYY-MM-DD")
        ]))
        const date = dayCount.map((item) => ({
            Moment: item,
            availableTask: availableTaskHandler(item.format(), taskDate)
        }) )

        if(date){
            resolve(date)
        }
    })

    await getDate.then(res => {
        dispatch({ type: SAVE_AVAILABLEDATE, availableDate: res })
        dispatch(fetchDateNotif())
    })
   
}


