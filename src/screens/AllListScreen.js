import React, { useEffect, useRef } from 'react'
import BottomTab from '@components/bottomTab/BottomTab'
import TaskBoxItem from '@components/pages/allList/TaskBoxItem'
import { apply } from 'osmicsx'
import { FlatList, LogBox, ScrollView, StyleSheet, Text, View, Animated } from 'react-native'
import { useSelector } from 'react-redux'

import { colors } from '@constant/colors'

import Calender from "@components/calender/Calender"
import CategoryChoice from "@components/categoryChoice/CategoryChoice"


const heightTopAnimate = 280

const AllListScreen = props => {

    const taskItem = useSelector(state => state.task.task)
    const categoryItem = useSelector(state => state.category.category)

    const scrollA = useRef(new Animated.Value(0)).current
 
    const onSelectDate = (date: Moment) => {
        alert(date.calendar());
    }

    const renderItem = ({ item }) =>(
        <TaskBoxItem
            data={item}
        />
    )

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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
                            inputRange: [0, 200],
                            outputRange: [1,0]
                        }),
                        transform: [
                            {
                                scale: scrollA.interpolate({
                                    inputRange: [0, heightTopAnimate],
                                    outputRange: [1,0.86]
                                }),
                                translateY: scrollA.interpolate({
                                    inputRange: [-heightTopAnimate, 0, heightTopAnimate, heightTopAnimate+1],
                                    outputRange: [-heightTopAnimate, 0, heightTopAnimate - 100, heightTopAnimate]
                                })
                            }
                        ]
                    }]}
                >
                    <View style={apply("mt-16")}>
                        <Text style={[apply("text-6xl font-semibold"),styles.heroText]}>4 May 2021</Text>
                    </View>
                    <View style={[apply("px-4 py-3 rounded-md mt-6"), styles.dateTop]}>
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
                            data={taskItem}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
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
    heroText: {
        fontFamily: 'OpenSans-Bold',
        color: colors.primaryColor
    },
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
