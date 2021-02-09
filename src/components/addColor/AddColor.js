import React, { memo } from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'


const AddColor = (props) => {

    const bgColor = useSelector(state => state.colors.colors)

    return (
        <View style={apply("row items-center wrap mt-4")}>
            { bgColor.map((item, index) => (
                <View style={apply("mr-3 relative mb-3")} key={index}>

                    <TouchableHighlight>
                        <View style={[apply("justify-center items-center") ,styles.choiceColor, { backgroundColor: `${item.color}` }]}/>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={[apply("absolute top-0 right-0 justify-center items-center"), styles.buttonDelete]}
                        onPress={() => {
                            props.deleteColor && props.deleteColor(item.id)
                        }}
                    >
                        <Icon name="delete" size={18} color="white"/>
                    </TouchableHighlight>

                </View>
            )) }
        
        </View>
    )
}

export default memo(AddColor)

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