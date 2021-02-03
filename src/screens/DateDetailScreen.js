import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Container from '@components/layout/Container'
import TaskBoxItem from '@components/taskBoxItem/TaskBoxItem'
import TaskEmpty from '@components/taskEmpty/TaskEmpty'

import { SAVE_TASKCOMPLETE } from '@modules/taskComplete/types'
import { DELETE_TASK } from '@modules/task/types'
import { fetchDate } from '@modules/availableDate/actions'


const DateDetailScreen = props => {

    const dispatch = useDispatch()

    const taskItem = useSelector(state => state.task.task)

    const { date } = props

    const [data, setData] = useState([])

    const getData = async() => {
        const getTask = new Promise((resolve) => {
            const dateDetail = taskItem.filter(item => moment(date).isSame(moment(item.dateTask.dateMoment).format("YYYY-MM-DD")) === true)
            if(dateDetail){
                resolve(dateDetail)
            }
        })
        await getTask.then(res => setData(res))
    }

    const toCompleteTask = (completeId, completeData) => {
        dispatch({ type: SAVE_TASKCOMPLETE, data: completeData })
        dispatch({ type: DELETE_TASK, taskId: completeId })
        dispatch(fetchDate())
        getData()
    }

    const renderItem = ({ item }) =>(
        <TaskBoxItem
            data={item}
            handlerComplete={toCompleteTask}
            componentId={props.componentId}
        />
    )
   
    useEffect(() => {
        getData()
    },[])

    return (
        <Container>
            { data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            ) : (
                <TaskEmpty
                    message="Task Empty"
                />
            ) }
          
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
