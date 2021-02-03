import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'
import { showBeforeCurrentDate } from '@modules/availableDate/actions'

import Dates from './Dates'

const Calender = props => {

    const availableDate = useSelector(state => state.availableDate.date)
    
    return (
        <View style={[apply("py-6 px-4 rounded-lg full"), styles.callenderWrapper]}>
            <Dates
                dates={availableDate}
                currentIndex={showBeforeCurrentDate}
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