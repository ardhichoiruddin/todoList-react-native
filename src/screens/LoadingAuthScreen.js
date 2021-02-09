import React, { useEffect } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import RNBootSplash from 'react-native-bootsplash'
import { useSelector } from 'react-redux'
import { apply } from 'osmicsx'

import { mainRoot } from '@navigation/mainRoot'
import { onBordingRoot } from '@navigation/onBordingRoot'

import { colors } from '@constant/colors'

import Container from '@components/layout/Container'

const LoadingAuthScreen = () => {

    const firstOpen = useSelector(state => state.firstOpen.firstOpen)

    const auth = () => {
        setTimeout(() => {
            if(firstOpen){
                Navigation.setRoot(mainRoot())
            }else{
                Navigation.setRoot(onBordingRoot())
            }
        }, 1000)
    }

    useEffect(() => {
        RNBootSplash.hide({ fade: true })
        auth()
    }, [])

    return (
        <Container>
           <View style={apply("flex justify-center items-center")}>
               <ActivityIndicator size="large" color={colors.primaryColor} />
           </View>
        </Container>
    )
}

LoadingAuthScreen.options = {
    topBar : {
        visible: false
    }
}

export default LoadingAuthScreen
