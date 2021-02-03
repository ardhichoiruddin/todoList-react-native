import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'

const TaskEmpty = props => {
    return (
        <View 
            style={
                [
                    apply("full items-center justify-center"),
                ]
            }
        >
           <View style={ { height: 280, width: 280 }}>
                <Image 
                    source={require("../../assets/task-empty.png")} 
                    style={{ width: '100%' ,height: 200 }} 
                />
                <Text style={[apply("text-lg text-center mt-4") ,styles.textMessage]}>{ props.message }</Text>
           </View>
        </View>
    )
}

export default TaskEmpty

const styles = StyleSheet.create({
    textMessage: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    }
})