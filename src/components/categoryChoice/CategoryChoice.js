import React, { memo } from 'react'
import { ScrollView, Text, TouchableHighlight, View, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'

const CategoryChoice = props => {
    
    return(
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >    
            <View style={apply("row")}>

                <TouchableHighlight
                    style={apply("mr-3 rounded-full")}
                    onPress={() => {
                        props.selectCategory(0)
                    }}
                    underlayColor={colors.primaryColor}
                >
                    <View style={[apply("px-6 py-2 rounded-full "), styles.catBox, props.state === 0 ? styles.selectItemBoxActive : null]}>
                        <Text style={[apply("text-white text-base font-semibold"), styles.textCat, props.state === 0 ? styles.selectCatText : null]}>All</Text>
                    </View>
                </TouchableHighlight>

                { props.data && props.data.map((item, index) => (
                    <TouchableHighlight
                        key={index}
                        style={apply("mr-3 rounded-full")}
                        onPress={() => {
                            props.selectCategory(item.id)
                        }}
                        underlayColor={colors.primaryColor}
                    >
                        <View style={[apply("px-6 py-2 rounded-full row justify-center items-center"), styles.catBox, props.state === item.id ? styles.selectItemBoxActive : null]}>
                            <View style={[apply("mr-1"),styles.bulletColor, { backgroundColor: item.bgColor.color }]} />
                            <Text style={[apply("text-white text-base font-semibold"), styles.textCat, props.state === item.id ? styles.selectCatText : null]}>{ item.name }</Text>
                        </View>
                    </TouchableHighlight>
                )) }

            </View>
        </ScrollView>
    )
}


export default memo(CategoryChoice)

const styles = StyleSheet.create({
    catBox: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: colors.primaryColor
    },
    textCat: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    },
    selectCatText: {
        fontFamily: 'OpenSans-SemiBold',
        color: 'white'
    },
    textCatActive: {
        color: '#fff'
    },
    bulletColor: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    selectItemBoxActive: {
        backgroundColor: colors.primaryColor,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: colors.primaryColor
    },
})