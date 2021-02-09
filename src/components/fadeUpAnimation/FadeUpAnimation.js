import React, { useRef, useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

const FadeUpAnimation = props => {
    const fadeUp = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(
            fadeUp,
            {
              toValue: 1,
              duration: 200,
              useNativeDriver: true 
            }
        ).start()
    }, [fadeUp])

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: fadeUp,
                transform: [
                    {
                        translateY: fadeUp.interpolate({
                            inputRange: [0,1],
                            outputRange: [height/2, 0]
                        })
                    },
                ]
            }}
        >
           { props.children }
        </Animated.View>
    )
}

export default FadeUpAnimation
