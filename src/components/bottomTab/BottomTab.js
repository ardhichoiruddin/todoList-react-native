import React, { memo } from 'react'
import { Navigation } from 'react-native-navigation'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { apply } from 'osmicsx'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '@constant/colors'


const BottomTab = props => {

    const navigateHandler = (navigate) => {
        switch(navigate){
            case 'AddTask':
                Navigation.push(props.componentId,{
                    component: {
                        name: 'AddTask'
                    }
                })
                break;
            default:
                break;
        }
    }

    return (
        <View style={[apply("bg-white p-4 items-center full shadow-2xl"), styles.bottomTabWrapper]}>
           <View style={[apply("row justify-between items-center full"), styles.bottomTab]}>
                <View>
                    <TouchableHighlight>
                        <Icon name="content-paste" size={30} color={colors.primaryColor} />
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight
                        onPress={() => {
                            navigateHandler('AddTask')
                        }}
                        style={[apply("justify-center items-center shadow-lg"), styles.iconCenter]}
                    >
                        <Icon name="add" size={30} color="#fff" />
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight>
                        <Icon name="pending-actions" size={30} color={colors.primaryColor} />
                    </TouchableHighlight>
                </View>
           </View>
        </View>
    )
}

export default memo(BottomTab)

const styles = StyleSheet.create({
    bottomTabWrapper: {
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14
    },
    bottomTab: {
        maxWidth: 240
    },
    iconCenter: {
        width: 62,
        height: 62,
        borderRadius: 90,
        backgroundColor: colors.primaryColor,
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: 'white',
        marginTop: -44
    }
})