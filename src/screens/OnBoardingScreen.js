import React, { useEffect } from 'react'
import { View, StatusBar } from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import { apply } from 'osmicsx'

import OnBoardingItem from '@components/onBoardingItem/OnBoardingItem'
import Swipper from '@components/swipper/Swipper'

const OnBoardingScreen = () => {

    useEffect(() => {
        RNBootSplash.hide({ fade: true })
        StatusBar.setHidden(true)
    },[])

    return (
        <View style={apply("flex")}>
            <Swipper>
                <OnBoardingItem
                    image={require("../assets/onBoardingImage/simple-to-use.png")}
                    text="Simple to use"
                />
                  <OnBoardingItem
                    image={require("../assets/onBoardingImage/help-your-task.png")}
                    text="Help your tasks"
                />
                  <OnBoardingItem
                    image={require("../assets/onBoardingImage/make-easy.png")}
                    text="Make your life easy"
                />
            </Swipper>
        </View>
    )
}

OnBoardingScreen.options = {
    topBar : {
       visible: false
   },
}

export default OnBoardingScreen
