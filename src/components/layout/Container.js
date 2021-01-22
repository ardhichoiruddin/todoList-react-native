import React from 'react'
import { View } from 'react-native'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'

const Container = props => {
    return (
        <View style={[apply("flex px-4 py-4"), { backgroundColor: colors.bgColor }]}>
            { props.children }
        </View>
    )
}

export default Container
