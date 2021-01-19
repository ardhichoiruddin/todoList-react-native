import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'


const TaskBoxItem = props => {
    console.log(props.data)
    const { 
        id, 
        category, 
        bgColor, 
        description,
        nameTask,
        dateTask,
        timeTask
    } = props.data
    
    const date = dateTask.split(' ')
    console.log(date)
    return (
        <View 
            style={[
                apply("row justify-start items-start rounded-lg overflow-hidden mt-3"), 
                styles.boxWrapper,
                {
                    backgroundColor: bgColor.color
                }
                ]}>
            <View style={[apply("justify-center items-center"), styles.boxWidthLeft]}>
                <Text style={[apply("text-6xl font-bold text-center text-white"), styles.heroDate]}>{ date[0] }</Text>
                <Text style={[apply("text-base text-center text-white"), styles.bottomHeroMonth]}>{ date[1] }</Text>
            </View>
            <View style={[apply("p-4"), styles.boxWidthRight]}>
                <View>
                    <Text
                        ellipsizeMode={'tail'}
                        numberOfLines={2}
                        ellipsizeMode="tail" 
                        style={[apply("text-lg"), styles.rightTitle]}
                    >{ nameTask }</Text>
                </View>
                <View style={apply("mt-1")}>
                    <Text
                        ellipsizeMode={'tail'}
                        numberOfLines={2}
                        style={[apply("text-base"), styles.rightText]}
                    >
                        { description }
                    </Text>
                </View>
                <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[apply("text-base mt-2"), styles.rightBottomText]}>{ timeTask } | { category.name }</Text>
                </View>
            </View>
        </View>
    )
}

export default memo(TaskBoxItem)

const styles = StyleSheet.create({
    boxWrapper: {
       
    },
    boxWidthLeft: {
        width: '30%',
        backgroundColor: colors.primaryColor,
        height: 136
    },
    boxWidthRight: {
        width: '70%'
    },
    heroDate: {
        fontFamily: 'OpenSans-Bold',
    },
    bottomHeroMonth: {
        fontFamily: 'OpenSans-Regular',
    },
    rightTitle: {
        fontFamily: 'OpenSans-Bold',
        borderColor: colors.primaryColor
    },
    rightText: {
        fontFamily: 'OpenSans-SemiBold',
        borderColor: colors.primaryColor
    },
    rightBottomText: {
        fontFamily: 'OpenSans-Regular',
        borderColor: colors.primaryColor
    }
})