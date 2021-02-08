import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { apply } from 'osmicsx'

import Container from '@components/layout/Container'

import { colors } from '@constant/colors'

const { height } = Dimensions.get('screen')

const OnBoardingItem = props => {
    return (
        <Container>
            <View style={[apply("flex justify-center items-center"), styles.onBoardingItemWrapper]}>
                <View style={apply("mb-20")}>
                    <View style={apply("justify-center items-center")}>
                        <Image style={styles.image} source={ props.image } />
                    </View>
                    <View style={apply("mt-8")}>
                        <Text style={[apply("text-center text-4xl"), styles.textIll]}>{ props.text }</Text>
                    </View>
                </View>
            </View>
        </Container>
    )
}

export default OnBoardingItem

const styles = StyleSheet.create({
    onBoardingItemWrapper: {
        marginBottom: height / 9
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
  
    textIll: {
        fontFamily: 'OpenSans-Bold',
        color: colors.primaryColor
    }
})