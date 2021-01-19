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
                <TouchableHighlight>
                    <View style={[apply("px-6 py-2 rounded-full bg-black mr-3"), styles.catBox]}>
                        <Text style={[apply("text-white text-base font-semibold"), styles.textCat, styles.textCatActive]}>All</Text>
                    </View>
                </TouchableHighlight>
                { props.data && props.data.map((item, index) => (
                    <TouchableHighlight
                        key={index}
                    >
                        <View style={[apply("px-6 py-2 rounded-full mr-3"), styles.catBox]}>
                            <Text style={[apply("text-white text-base font-semibold"), styles.textCat]}>{ item.name }</Text>
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
    textCatActive: {
        color: '#fff'
    }
})