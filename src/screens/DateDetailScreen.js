import React, { useEffect } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { apply } from 'osmicsx'

import Container from '@components/layout/Container'
import TaskBoxItem from '@components/taskBoxItem/TaskBoxItem'
import TaskEmpty from '@components/taskEmpty/TaskEmpty'

import { SAVE_TASKCOMPLETE } from '@modules/taskComplete/types'
import { DELETE_TASK } from '@modules/task/types'

import { fetchDateBySelect } from '@modules/dateBySelect/actions'

import { colors } from '@constant/colors'


const DateDetailScreen = props => {

    const dispatch = useDispatch()

    const { dateBySelect, loading } = useSelector(state => state.dateBySelect)

    const { date } = props
   
    const getData = () => {
        dispatch(fetchDateBySelect(date))
    }

    const toCompleteTask = (completeId, completeData) => {
        dispatch({ type: SAVE_TASKCOMPLETE, data: completeData })
        dispatch({ type: DELETE_TASK, taskId: completeId })
        getData()
    }

    const renderItem = ({ item }) =>(
        <TaskBoxItem
            data={item}
            handlerComplete={toCompleteTask}
            componentId={props.componentId}
        />
    )

    const itemResult = () => (
        <View>
            { dateBySelect.length > 0 ? (
                <FlatList
                    data={dateBySelect}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            ) : (
                <TaskEmpty
                    message="Task Empty"
                />
            )}
        </View>
    )
   
    useEffect(() => {
        getData()
    },[])

    return (
        <Container>
            { loading ? (
                <View style={apply("flex justify-center items-center")}>
                    <ActivityIndicator size="large" color={colors.primaryColor} />
                </View>
            ) : itemResult() }
          
        </Container>
    )
}

DateDetailScreen.options = {
    topBar : {
         title: {
             color: 'white',
             fontFamily: 'OpenSans-SemiBold',
             fontWeight: 700
         },
         backButton: {
             color: 'white'
         },
    },
   
 }

export default DateDetailScreen
