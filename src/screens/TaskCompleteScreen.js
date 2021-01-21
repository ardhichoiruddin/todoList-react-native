import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { apply } from 'osmicsx'
import { useSelector } from 'react-redux'

import { colors } from '@constant/colors'

import TaskBoxItem from '@components/taskBoxItem/TaskBoxItem'


const TaskCompleteScreen = () => {

    const taskCompleteItem = useSelector(state => state.taskComplete.taskComplete)

    const renderItem = ({ item }) =>(
        <TaskBoxItem
            data={item}
        />
    )

    return (
        <View style={apply("px-4 py-4 flex")}>
            <FlatList
                data={taskCompleteItem}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                // extraData={categoryIdActive}
            />
        </View>
    )
}

TaskCompleteScreen.options = {
    topBar: {
        title: {
            text: 'Task Complete',
            color: 'white',
            fontFamily: 'OpenSans-SemiBold',
            fontWeight: 700
        },
        background: {
            color: colors.primaryColor
        },
        backButton: {
            color: 'white'
        },
    }
}

export default TaskCompleteScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColor
    }
})
