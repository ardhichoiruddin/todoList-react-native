import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, BackHandler } from 'react-native'
import { apply } from 'osmicsx'
import { useDispatch } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import { SAVE_COLOR } from '@modules/colors/types'
import { colors } from '@constant/colors'

import FadeUpAnimation from '@components/fadeUpAnimation/FadeUpAnimation'

const choiceColor = [
    '#0077b6',
    '#e85d04',
    '#7209b7',
    '#f72585',
    '#ffd166',
    '#43aa8b',
    '#ffddd2',
    '#f28482',
    '#ef476f'
]

const { width, height } = Dimensions.get('screen')

const SetColorCategoryOverlayScreen = props => {

    const dispatch = useDispatch()

    const addColorHandler = (color) => {
        dispatch({ type: SAVE_COLOR, color })
        Navigation.dismissOverlay(props.componentId)
    }

    const hideOverlay = () => {
        Navigation.dismissOverlay(props.componentId)
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => true
        )
        return () => {
            backHandler.remove()
        }
    }, [])

    return (
        <View style={apply("px-4 flex justify-center items-center")}>
           <FadeUpAnimation style={apply("p-6 bg-white full rounded-lg overflow-hidden shadow-lg absolute z-30")}>
                <View>
                    <Text style={[apply("text-center text-xl mb-6"), styles.categoryModalTitle]}>Choose a Color for Category</Text>
                </View>
                <View style={apply("row wrap justify-between mt-4")}>
                    { choiceColor.map((item, index) => (
                        <TouchableHighlight 
                            key={index}
                            onPress={() => {
                                addColorHandler(item)
                            }}
                        >
                            <View style={[apply("mb-2") ,styles.boxColorChoice, { backgroundColor: item }]} />
                        </TouchableHighlight>
                    )) }
                </View>
            </FadeUpAnimation>
            <View 
                style={[apply("absolute top-0 bottom-0 z-0"), styles.backdrop]}
                onStartShouldSetResponder={() => hideOverlay()}
            >
            </View>
        </View>
    )
}

export default SetColorCategoryOverlayScreen

const styles = StyleSheet.create({
    backdrop: {
        width: width,
        height: height
    },
    boxColorChoice: {
        width: 80,
        height: 80,
        borderRadius: 60
    },
    categoryModalTitle: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    },
})