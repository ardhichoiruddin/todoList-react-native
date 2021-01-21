import React, { useEffect, useRef, useState } from 'react'
import BottomTab from '@components/bottomTab/BottomTab'
import TaskBoxItem from '@components/pages/allList/TaskBoxItem'
import { apply } from 'osmicsx'
import { FlatList, LogBox, StyleSheet, View, Animated } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import RNBootSplash from 'react-native-bootsplash'

import { colors } from '@constant/colors'
import { SAVE_TASKCOMPLETE } from '@modules/taskComplete/types'
import { DELETE_TASK } from '@modules/task/types'

import Calender from "@components/calender/Calender"
import CategoryChoice from "@components/categoryChoice/CategoryChoice"
import DateNow from '@components/pages/allList/DateNow'


const heightTopAnimate = 307

const AllListScreen = props => {

    const dispatch = useDispatch()

    const taskItem = useSelector(state => state.task.task)
    const categoryItem = useSelector(state => state.category.category)
    const taskCompleteItem = useSelector(state => state.taskComplete)

    console.log(taskCompleteItem)
    console.log(taskItem)

    const [data, setData] = useState(null)
    const [categoryIdActive, setCategoryIdActive] = useState(0)

    const scrollA = useRef(new Animated.Value(0)).current
 
    const onSelectDate = (date: Moment) => {
        alert(date.calendar());
    }

    const selectCategoryById = (id) => {
        setCategoryIdActive(id)
        const results = taskItem.filter(catId => catId.category.id === id)
        setData(results)
    }

    const toCompleteTask = (completeId, completeData) => {
        dispatch({ type: SAVE_TASKCOMPLETE, data: completeData })
        dispatch({ type: DELETE_TASK, taskId: completeId })
    }

    const renderItem = ({ item }) =>(
        <TaskBoxItem
            data={item}
            completeTask={toCompleteTask}
        />
    )

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        RNBootSplash.hide({ fade: true })
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
                                inputRange: [-heightTopAnimate, 0, heightTopAnimate, heightTopAnimate+1],
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
                            outputRange: [1,0]
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
                                    inputRange: [-heightTopAnimate, 0, heightTopAnimate, heightTopAnimate+1],
                                    outputRange: [-heightTopAnimate, 0, heightTopAnimate - 100, heightTopAnimate]
                                })
                            }
                        ]
                    }]}
                >
                    <View style={apply("mt-16")}>
                        <DateNow/>
                    </View>
                    <View style={[apply("px-4 py-3 rounded-md mt-4"), styles.dateTop]}>
                        <Calender
                            onSelectDate={ onSelectDate }
                        />
                    </View>
                    <View style={apply("full justify-center items-center mt-6 mb-4")}>
                        <View style={styles.lineDivider}/>
                    </View>
                </Animated.View>

                <View style={[apply("py-4"), {backgroundColor: '#FDFFFC'}]}>
                    <CategoryChoice
                        data={categoryItem}
                        selectCategory={selectCategoryById}
                        state={categoryIdActive}
                    />
                </View>
                
            </Animated.View>
            <Animated.ScrollView
                style={[apply("flex"),  { backgroundColor: '#FDFFFC' }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={apply("pb-12")}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollA}}}],
                    {useNativeDriver: true}
                )}
            >
                <View style={[apply("px-4"), styles.paddingTopScroll]}>
                    <View style={apply("mt-4")}>
                        <FlatList
                            data={categoryIdActive === 0 ? taskItem : data}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            extraData={categoryIdActive}
                        />
                     
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
