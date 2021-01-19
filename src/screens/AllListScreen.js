import BottomTab from '@components/bottomTab/BottomTab'
import TaskBoxItem from '@components/pages/allList/TaskBoxItem'
import { apply } from 'osmicsx'
import React, { useEffect } from 'react'
import { FlatList, LogBox, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { colors } from '@constant/colors'

import Calender from "@components/calender/Calender"
import CategoryChoice from "@components/categoryChoice/CategoryChoice"


const AllListScreen = props => {

    const taskItem = useSelector(state => state.task.task)
    const categoryItem = useSelector(state => state.category.category)
 
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
            <ScrollView
                style={[apply("flex"),  { backgroundColor: '#FDFFFC' }]}
                showsVerticalScrollIndicator={false}
            >
                <View style={apply("px-4")}>
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
                    <View style={apply("mt-4")}>
                        <CategoryChoice
                            data={categoryItem}
                        />
                    </View>
                    <View style={apply("mt-4")}>
                        <FlatList
                            data={taskItem}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                     
                    </View>
                </View>
            </ScrollView>
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
    }
})
