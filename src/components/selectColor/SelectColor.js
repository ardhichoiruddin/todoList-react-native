import React, { memo } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'
import Icon from 'react-native-vector-icons/MaterialIcons'


const colorsBg = [
    {
        id: 1,
        color: '#E71D36'
    },
    {
        id: 2,
        color: '#fcbf49'
    },
    {
        id: 3,
        color: '#219ebc'
    },
    {
        id: 4,
        color: '#fb8b24'
    },
]

const SelectColor = (props) => {

    const selectColorHandler = (color) => {
        props.setState(color)
    }

    return (
        <View style={apply("row items-center wrap mt-4")}>
            { colorsBg.map((item, index) => (
                <TouchableHighlight
                    key={index}
                    style={apply("mr-3")}
                    onPress={() => selectColorHandler(item)}
                    underlayColor="transparent"
                >
                    <View style={[apply("justify-center items-center") ,styles.choiceColor, { backgroundColor: `${item.color}` }]}>
                        { props.state && props.state.id === item.id ? <Icon name="check" size={33} color="white"/> : null }
                    </View>
                </TouchableHighlight>
            )) }
        
        </View>
    )
}

export default memo(SelectColor)

const styles = StyleSheet.create({
    choiceColor: {
        width: 54,
        height: 54,
        borderRadius: 34
    },
})