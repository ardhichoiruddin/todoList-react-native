import React, { memo } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'


const SelectColor = (props) => {

    const bgColor = useSelector(state => state.colors.colors)

    const selectColorHandler = (color) => {
        props.setState && props.setState(color)
    }

    return (
        <View style={apply("row items-center wrap mt-4")}>
            
            { bgColor.map((item, index) => (
                <View key={index} style={apply("mr-3 mb-3 relative")}>
                    <TouchableHighlight
                        onPress={() => selectColorHandler(item)}
                        underlayColor="transparent"
                    >
                        <View style={[apply("justify-center items-center") ,styles.choiceColor, { backgroundColor: `${item.color}` }]}>
                            { props.state && props.state.id === item.id ? <Icon name="check" size={33} color="white"/> : null }
                        </View>
                    </TouchableHighlight>

                </View>
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
    buttonDelete: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#e63946',
        borderWidth: 2,
        borderColor: '#fff'
    }
})