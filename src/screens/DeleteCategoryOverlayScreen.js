import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, BackHandler, Animated } from 'react-native'
import { Button } from 'react-native-paper'
import { apply } from 'osmicsx'
import { Navigation } from 'react-native-navigation'
import { useDispatch } from 'react-redux'

import FadeUpAnimation from '@components/fadeUpAnimation/FadeUpAnimation'

import { colors } from '@constant/colors'
import { DELETE_CATEGORY } from '@modules/category/types'

const { width, height } = Dimensions.get('screen')

const DeleteCategoryOverlayScreen = props => {

    const { id, name } = props

    const dispatch = useDispatch()

    const handlerSubmit = () => {
        dispatch({ type: DELETE_CATEGORY, catId: id })
        hideOverlay()
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
    },[])

    return (
        <View style={apply("px-4 flex justify-center items-center")}>
            <FadeUpAnimation style={apply("px-4 py-6 bg-white full rounded-lg shadow-lg absolute z-30")}>
                <View style={apply("mb-6")}>
                    <Text style={[apply("text-lg text-center"), styles.textTitle]}>Do you want to delete { name } category?</Text>
                </View>
                <View>
                    <Button
                        mode="contained"
                        onPress={handlerSubmit}
                        style={[apply("px-4 py-2 rounded-lg"), styles.buttonDelete]}
                    >
                        <Text style={[apply("text-lg font-bold text-white"), styles.textButton]}>Delete</Text>
                    </Button>
                </View>
            </FadeUpAnimation>
            <View 
                style={[apply("absolute top-0 bottom-0 z-0"), styles.backdrop]}
                onStartShouldSetResponder={() => hideOverlay()}
            />
        </View>
    )
}

export default DeleteCategoryOverlayScreen

const styles = StyleSheet.create({
    buttonDelete: {
        backgroundColor: colors.primaryColor
    },
    textButton: {
        fontFamily: 'OpenSans-SemiBold',
    },
    backdrop: {
        width: width,
        height: height
    },
    textTitle: {
        fontFamily: 'OpenSans-SemiBold'
    }
})