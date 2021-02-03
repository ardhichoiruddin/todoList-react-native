import React from 'react'
import { Navigation } from 'react-native-navigation'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

import AddTaskImage from '@components/addTaskImage/AddTaskImage'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'

const AddTask = props => {
    return (
        <View style={apply("items-center justify-center")}>
            <AddTaskImage/>
            <View style={[ apply("full"),styles.buttonWrapper]} >
                <TouchableHighlight
                    style={[apply("px-3 py-3 full rounded-lg"), styles.button]}
                    onPress={() => {
                        Navigation.push(props.componentId,{
                            component: {
                                name: 'AddTask'
                            }
                        })
                    }}

                >
                    <Text style={[apply("text-center text-white"), styles.textButtonTask]}>Add Task</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default AddTask

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primaryColor
    },
    buttonWrapper: {
        maxWidth: 200
    },
    textButtonTask: {
        fontFamily: 'OpenSans-SemiBold',
    }
})