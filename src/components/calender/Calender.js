import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { useSelector } from 'react-redux'
import { apply } from 'osmicsx'
import moment from 'moment'

import { colors } from '@constant/colors'
import { showBeforeCurrentDate } from '@modules/availableDate/actions'

import Dates from './Dates'

const Calender = props => {

    const availableDate = useSelector(state => state.availableDate.date)

    const toDetailTaskDate = (date) => {
        console.log(moment(date).format("MMMM DD YYYY"))
        Navigation.push(props.componentId, {
            component: {
                name: 'DateDetail',
                options: {
                    topBar: {
                        title: {
                            text: moment(date).format("DD MMMM YYYY"),
                        },
                        background: {
                            color: colors.primaryColor
                        }
                    }
                },
                passProps: {
                    date: moment(date).format("YYYY-MM-DD"),
                }
            }
        })
    }
    
    return (
        <View style={[apply("py-6 px-4 rounded-lg full"), styles.callenderWrapper]}>
            <Dates
                dates={availableDate}
                currentIndex={showBeforeCurrentDate}
                toDetailTaskDate={toDetailTaskDate}
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