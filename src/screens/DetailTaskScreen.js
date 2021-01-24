import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Container from '@components/layout/Container'

import { colors } from '@constant/colors'


const DetailTaskScreen = props => {

    const { data } = props

    return (
        <Container>
            <ScrollView
                style={apply("flex")}
                showsVerticalScrollIndicator={false}
            >
                <View style={apply("flex")}>
                    <Text style={[apply("text-4xl"), styles.textTitle]}>{ data.nameTask }</Text>
                    <View style={apply("py-2")}>
                        <Text style={[apply("text-lg"), styles.textBody]}>{ data.description }</Text>
                    </View>
                    <View style={apply("row items-start justify-start py-3")}>
                        <View style={apply("column items-start pr-6")}>
                            <View style={apply("row items-center")}>
                                <Icon name="date-range" color={colors.primaryColor} size={24}/>
                                <Text style={[apply("ml-1 text-base"), styles.dateTimeText]}>{ data.dateTask }</Text>
                            </View>
                            <View style={apply("row items-center mt-3")}>
                                <Icon name="category" color={colors.primaryColor} size={24}/>
                                <Text style={[apply("ml-1 text-base"), styles.dateTimeText]}>{ data.category.name }</Text>
                            </View>
                        </View>
                        <View style={apply("column items-start")}>
                            <View style={apply("row items-center")}>
                                <Icon name="alarm" color={colors.primaryColor} size={24}/>
                                <Text style={[apply("ml-1 text-base"), styles.dateTimeText]}>{ data.timeTask }</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}

DetailTaskScreen.options = {
   topBar : {
        title: {
            color: 'white',
            fontFamily: 'OpenSans-SemiBold',
            fontWeight: 700
        },
        backButton: {
            color: 'white'
        },
   },
  
}

export default DetailTaskScreen

const styles = StyleSheet.create({
    textTitle: {
        fontFamily: 'OpenSans-Bold',
        color: colors.primaryColor
    },
    textBody: {
        fontFamily: 'OpenSans-Regular',
        color: colors.primaryColor
    },
    dateTimeText: {
        fontFamily: 'OpenSans-Regular',
        color: colors.primaryColor
    }
})
