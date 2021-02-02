import React, { useReducer, useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import moment from 'moment'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'

import Dates from './Dates'

const Calender = props => {

    const [configDate, setConfigDate] = useState({
        showBeforeCurrentDate: props.showBeforeCurrentDate ? props.showBeforeCurrentDate : 5,
        showAfterCurrentDate: props.showAfterCurrentDate ? props.showAfterCurrentDate : 7,
        date: []
    })

    const getDate = () => {
        const { showBeforeCurrentDate, showAfterCurrentDate } = configDate
        const startDay = moment().subtract(showBeforeCurrentDate + 1, 'days')
        const totalDayCount = showBeforeCurrentDate + showAfterCurrentDate + 1
        const dayCount = [...Array(totalDayCount)].map(_ => startDay.add(1,'days').clone())
        setConfigDate(prevState => ({
            ...prevState,
            date: dayCount
        }))
    }

    useEffect(() => {
        getDate()
    },[])

    return (
        <View style={[apply("py-6 px-4 rounded-lg full"), styles.callenderWrapper]}>
            <Dates
                dates={configDate.date}
                currentIndex={configDate.showBeforeCurrentDate}
            />
        </View>
    )
}

export default Calender

const styles = StyleSheet.create({
    callenderWrapper: {
        backgroundColor: colors.primaryColor
    }
})