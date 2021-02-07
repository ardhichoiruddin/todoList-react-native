import React, { useEffect, useRef, useCallback } from 'react'
import { Navigation } from 'react-native-navigation'
import { apply } from 'osmicsx'
import { FlatList, LogBox, StyleSheet, View, Animated } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import RNBootSplash from 'react-native-bootsplash'
import moment from 'moment'

import { colors } from '@constant/colors'
import { SAVE_TASKCOMPLETE } from '@modules/taskComplete/types'
import { DELETE_TASK } from '@modules/task/types'
import { SAVE_IDCATEGORY } from '@modules/idFilterCategory/types'
import { fetchDate } from '@modules/availableDate/actions'
import { fetchData } from '@modules/selectTaskByCat/actions'

import Calender from "@components/calender/Calender"
import CategoryChoice from "@components/categoryChoice/CategoryChoice"
import DateNow from '@components/pages/allList/DateNow'
import AddTask from '@components/pages/allList/AddTask'
import BottomTab from '@components/bottomTab/BottomTab'
import TaskBoxItem from '@components/taskBoxItem/TaskBoxItem'
import pushNotificationSchedule from '@components/pushNotification/pushNotificationSchedule'

const heightTopAnimate = 307


const AllListScreen = props => {

    const dispatch = useDispatch()

    const taskItem = useSelector(state => state.task.task)
    const categoryItem = useSelector(state => state.category.category)
    const dataByCategoryItem = useSelector(state => state.taskByCategory.taskByCategory)
    const taskNotifNow = useSelector(state => state.notificationNow.notifTaskNow)
    const idCategory = useSelector(state => state.idCategory.idCategory)
   
    const scrollA = useRef(new Animated.Value(0)).current

    const selectCategoryById = useCallback((id) => {
        dispatch({ type: SAVE_IDCATEGORY, id })
        dispatch(fetchData(id))
    }, [idCategory])

    const toCompleteTask = (completeId, completeData) => {
        dispatch({ type: SAVE_TASKCOMPLETE, data: completeData })
        dispatch({ type: DELETE_TASK, taskId: completeId })
        dispatch(fetchDate())
        dispatch(fetchData())
    }

    const renderItem = ({ item }) => (
        <TaskBoxItem
            data={item}
            handlerComplete={toCompleteTask}
            componentId={props.componentId}
        />
    )
    
    const getNotifNow = () => {
        if(taskNotifNow){
            console.log(taskNotifNow)
            taskNotifNow.forEach((item) => {
                pushNotificationSchedule(
                    'channel-id',
                    item.id,
                    item.nameTask,
                    item.description,
                    new Date(moment(item.dateTask.dateMoment).format('llll'))
                )
            })
        }
    }

    const componentDidAppearHandler = () => {
        dispatch(fetchDate())
        dispatch(fetchData())
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        RNBootSplash.hide({ fade: true })
        dispatch(fetchDate())
 
        getNotifNow()

        const listener = {
            componentDidAppear: () => {
                componentDidAppearHandler()
            }
        }
        const unsubscribe = Navigation.events().registerComponentListener(listener, props.componentId);
        return () => {
            unsubscribe.remove();
        };
    }, [])

    return (
        <View style={[apply("flex"), { backgroundColor: '#FDFFFC' }]}>
            <Animated.View style={[
                apply("full px-4 absolute right-0 top-0 left-0 z-50 overflow-hidden"),
                {
                    backgroundColor: '#FDFFFC',
                    transform: [
                        {
                            translateY: scrollA.interpolate({
                                inputRange: [-heightTopAnimate, 0, heightTopAnimate, heightTopAnimate + 1],
                                outputRange: [heightTopAnimate, 0, -heightTopAnimate, -heightTopAnimate]
                            })
                        }
                    ]
                }
            ]}>

                <Animated.View
                    style={[
                        apply("mb-3"),
                        {
                            opacity: scrollA.interpolate({
                                inputRange: [0, heightTopAnimate - 60],
                                outputRange: [1, 0]
                            }),
                            transform: [
                                {
                                    scale: scrollA.interpolate({
                                        inputRange: [0, heightTopAnimate],
                                        outputRange: [1, 0.86]
                                    })
                                },
                                {
                                    translateY: scrollA.interpolate({
                                        inputRange: [-heightTopAnimate, 0, heightTopAnimate, heightTopAnimate + 1],
                                        outputRange: [-heightTopAnimate, 0, heightTopAnimate - 100, heightTopAnimate]
                                    })
                                }
                            ]
                        }]}
                >
                    <View style={apply("mt-16")}>
                        <DateNow />
                    </View>
                    <View style={apply("mt-6")}>
                        <Calender
                            componentId={props.componentId}
                        />
                    </View>
                    <View style={apply("full justify-center items-center mt-6 mb-4")}>
                        <View style={styles.lineDivider} />
                    </View>
                </Animated.View>

                <View style={[apply("py-4"), { backgroundColor: '#FDFFFC' }]}>
                    <CategoryChoice
                        data={categoryItem}
                        selectCategory={selectCategoryById}
                        state={idCategory}
                    />
                </View>

            </Animated.View>

            <Animated.ScrollView
                style={[apply("flex"), { backgroundColor: '#FDFFFC' }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={apply("pb-12")}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true }
                )}
            >
                <View style={[apply("px-4"), styles.paddingTopScroll]}>
                    <View style={apply("mt-4")}>
                        {taskItem.length > 0 ? (
                            <FlatList
                                data={idCategory === 0 ? taskItem : dataByCategoryItem}
                                keyExtractor={item => item.id}
                                renderItem={renderItem}
                                extraData={idCategory}
                            />
                        ) : (
                                <AddTask
                                    componentId={props.componentId}
                                />
                            )}

                    </View>

                </View>
            </Animated.ScrollView>

            <BottomTab
                componentId={props.componentId}
            />

        </View>
    )
}

AllListScreen.options = {
    topBar: {
        visible: false
    }
}

export default AllListScreen

const styles = StyleSheet.create({
    dateTop: {
        backgroundColor: colors.primaryColor
    },
    lineDivider: {
        width: 120,
        height: 4,
        backgroundColor: colors.primaryColor
    },
    paddingTopScroll: {
        paddingTop: 354
    }
})
