import React, { useState, useEffect } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { apply } from 'osmicsx'

import Container from '@components/layout/Container'
import TaskBoxItem from '@components/taskBoxItem/TaskBoxItem'
import TaskEmpty from '@components/taskEmpty/TaskEmpty'

import { SAVE_TASKCOMPLETE } from '@modules/taskComplete/types'
import { DELETE_TASK } from '@modules/task/types'
import { fetchDate } from '@modules/availableDate/actions'

import { colors } from '@constant/colors'


const DateDetailScreen = props => {

    const dispatch = useDispatch()

    const taskItem = useSelector(state => state.task.task)

    const [loading, setLoading] = useState(false)

    const { date } = props

    const [data, setData] = useState([])

    const getData = async() => {
        setLoading(true)
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

    const itemResult = () => (
        <View>
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
            )}
        </View>
    )
   
    useEffect(() => {
        getData()
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    },[])

    return (
        <Container>
            { loading && (
                <View style={apply("flex justify-center items-center")}>
                    <ActivityIndicator size="large" color={colors.primaryColor} />
                </View>
            ) }
            
            { !loading && itemResult() }
          
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
