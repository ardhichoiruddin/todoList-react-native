import React, { memo } from 'react'
import { View, Text, TouchableHighlight, ScrollView, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'

const SelectCategory = props => {

    const selectHandler = (category) => {
        props.setState(category)
    }

    return (
        <>
            <ScrollView
                horizontal={true}
            >
                <View style={apply("row items-center")}>

                    { props.data && props.data.map((item, index) => (
                        <TouchableHighlight
                            style={apply("mr-3")}
                            key={index}
                            onPress={() => selectHandler(item)}
                            underlayColor="transparent"
                        >
                            <View style={[apply("px-5 py-3 row justify-center items-center"), props.state.id === item.id ? styles.selectItemBoxActive : styles.selectItemBox]}>
                                <View style={[apply("mr-1"),styles.bulletColor, { backgroundColor: `${item.bgColor.color}` }]} />
                                <Text style={[apply("text-base font-semibold"), props.state.id === item.id ? styles.selectItemTextActive : styles.selectItemText]}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    )) }

                </View>
            </ScrollView>
        </>
    )
}

export default memo(SelectCategory)

const styles = StyleSheet.create({
    selectItemBox: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: colors.primaryColor
    },
    selectItemText: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    },
    selectItemBoxActive: {
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: colors.primaryColor
    },
    selectItemTextActive: {
        fontFamily: 'OpenSans-SemiBold',
        color: 'white'
    },
    bulletColor: {
        width: 20,
        height: 20,
        borderRadius: 10
    }
})