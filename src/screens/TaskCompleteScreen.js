import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { apply } from 'osmicsx'
import { useSelector, useDispatch } from 'react-redux'

import { colors } from '@constant/colors'

import { DELETE_TASKCOMPLETE } from '@modules/taskComplete/types'
import { SAVE_TASK } from '@modules/task/types'

import TaskBoxItem from '@components/taskBoxItem/TaskBoxItem'
import Container from '@components/layout/Container'


const TaskCompleteScreen = props => {

    const dispatch = useDispatch()
    const taskCompleteItem = useSelector(state => state.taskComplete.taskComplete)

    const deleteItem = (id) => {
        dispatch({ type: DELETE_TASKCOMPLETE, taskId: id })
    }

    const unCompletedTask = (id, data) => {
        dispatch({ type: SAVE_TASK, data })
        dispatch({ type: DELETE_TASKCOMPLETE, taskId: id })
    }

    const renderItem = ({ item }) =>(
        <TaskBoxItem
            data={item}
            deleteItem={deleteItem}
            handlerComplete={unCompletedTask}
            componentId={props.componentId}
        />
    )

    return (
        <Container>
            <FlatList
                contentContainerStyle={apply("pb-6 pt-4")}
                data={taskCompleteItem}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </Container>
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
