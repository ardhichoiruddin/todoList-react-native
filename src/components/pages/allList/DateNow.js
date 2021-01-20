import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'
import moment from 'moment'

import { colors } from '@constant/colors'

const DateNow = () => {
    const dateNow = moment().format('DD MMMM YYYY')
    return (
        <>
            <Text style={[apply("text-5xl font-semibold"),styles.heroText]}>{ dateNow }</Text>
        </>
    )
}

export default DateNow

const styles = StyleSheet.create({
    heroText: {
        fontFamily: 'OpenSans-Bold',
        color: colors.primaryColor
    },
})
