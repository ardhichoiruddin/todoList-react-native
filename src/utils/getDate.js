import moment from 'moment'

import configureStore from '@modules'
import { SAVE_AVAILABLEDATE } from '@modules/availableDate/types'


const availableTaskHandler = (date, taskDate) => {
    const dateCount = moment(date).format("YYYY-MM-DD")
    return taskDate.some((item) => moment(item.toString()).isSame(dateCount) === true)
}

const { store } = configureStore()

export const getDate = (showAfterCurrentDate, showBeforeCurrentDate) => {

    const taskItem = store.getState()

    const startDay = moment().subtract(showBeforeCurrentDate + 1, 'days')
    const totalDayCount = showBeforeCurrentDate + showAfterCurrentDate + 1
    const dayCount = [...Array(totalDayCount)].map(_ => startDay.add(1,'days').clone())
    const taskDate = taskItem.task.task.map(item => ([
        moment(item.dateTask.dateMoment).format("YYYY-MM-DD")
    ]))
    const date = dayCount.map((item) => ({
        Moment: item,
        availableTask: availableTaskHandler(item.format(), taskDate)
    }) )

    return date

}