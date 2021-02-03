import React, { memo } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'

const Date = props => {
    
    const getDateStyle = () => ({
        ...(props.currentDate ? styles.isActive : {}),
        ...(props.availableTask ? styles.availableTask : {})
    })

    return (
        <TouchableHighlight 
            style={apply("items-center justify-center mr-3")}
            underlayColor={colors.primaryColor}
            onPress={() => props.toDetail(props.date.format("YYYY-MM-DD"))}
        >
            <View style={apply("items-center justify-center")}>
                <Text style={[apply("text-sm font-bold mb-2"), styles.month]}>{props.date && props.date.format('ddd').toUpperCase()}</Text>
                <View style={[apply("p-2 justify-center items-center border-4 border-white"), styles.itemDate, getDateStyle()]}>
                    <Text style={[apply("text-base"), styles.date]}>{props.date && props.date.format('DD').toUpperCase()}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default memo(Date)

const styles = StyleSheet.create({
    itemDate: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 40
    },
    month: {
        fontFamily: 'OpenSans-SemiBold',
        color: 'white'
    },
    date: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    },
    isActive: {
        borderColor: '#2EC4B6'
    },
    availableTask: {
        borderColor: 'red'
    }
})