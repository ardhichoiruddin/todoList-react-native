import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { apply } from 'osmicsx'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '@constant/colors'

const SetCategory = props => {
    return (
        <View style={apply("row justify-start items-center mt-6 wrap")}>
            { props.categoryItem.map((item, index) => {
                return(
                    <View key={index} style={apply("relative mr-3")}>
                        <View style={[apply("p-3 border-2 rounded-full"), styles.boxCategory]}>
                            <Text style={[apply("text-base"), styles.textCategory]}>{ item.name }</Text>
                        </View>
                        <TouchableHighlight
                            style={[apply("absolute top-0 right-0 justify-center items-center"), styles.buttonDelete]}
                            onPress={() => {
                                props.deleteCategory && props.deleteCategory(item.id)
                            }}
                        >
                            <Icon name="delete" size={18} color="white"/>
                        </TouchableHighlight>
                    </View>
                )
            }) }
        </View>
    )
}

export default SetCategory

const styles = StyleSheet.create({
    textCategory: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    },
    boxCategory: {
        borderColor: colors.primaryColor
    },
    buttonDelete: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#e63946',
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: -6,
        marginRight: -6
    }
})