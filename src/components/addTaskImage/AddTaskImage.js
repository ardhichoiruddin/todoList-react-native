import React from 'react'
import { View, Text, Image } from 'react-native'
import { apply } from 'osmicsx'

const AddTaskImage = () => {
    return (
        <View 
            style={
                [
                    apply("full items-center justify-center"),
                    { height: 280, width: 280 }
                ]
            }
        >
            <Image 
                source={require("../../assets/add-task-illustration.png")} 
                style={{ width: '100%' ,height: 200 }} 
            />
        </View>
    )
}

export default AddTaskImage
