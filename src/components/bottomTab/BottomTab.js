import React, { memo } from 'react'
import { Navigation } from 'react-native-navigation'
import { View, TouchableHighlight, StyleSheet, Dimensions } from 'react-native'
import { apply } from 'osmicsx'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '@constant/colors'


const { width } = Dimensions.get('screen')

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
            case 'TaskComplete':
                Navigation.push(props.componentId,{
                    component: {
                        name: 'TaskComplete'
                    }
                })
                break;
            case 'Settings':
                Navigation.push(props.componentId,{
                    component: {
                        name: 'Settings'
                    }
                })
                break;
            default:
                break;
        }
    }

    return (
        <View style={[apply("bg-white p-4 items-center justify-center full shadow-2xl"), styles.bottomTabWrapper]}>
           <View style={[apply("row justify-between items-center full"), styles.bottomTab]}>
                <View style={[apply("items-center"), styles.rightleftWith ]}>
                    <TouchableHighlight
                        onPress={() => {
                            navigateHandler('TaskComplete')
                        }}
                        underlayColor={colors.primaryColor}
                        style={apply("p-3"), styles.bgIcon}
                    >
                        <Icon name="pending-actions" size={30} color={colors.primaryColor} />
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight
                        onPress={() => {
                            navigateHandler('AddTask')
                        }}
                        style={[apply("justify-center items-center shadow-2xl"), styles.iconCenter]}
                        underlayColor={'white'}
                    >
                        <Icon name="add" size={30} color="#fff" />
                    </TouchableHighlight>
                </View>
                <View style={[apply("items-center"), styles.rightleftWith ]}>
                    <TouchableHighlight
                        onPress={() => {
                            navigateHandler('Settings')
                        }}
                        underlayColor={colors.primaryColor}
                        style={apply("p-3"), styles.bgIcon}
                    >
                        <Icon name="settings" size={30} color={colors.primaryColor} />
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
        maxWidth: width / 1.225
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
    },
    bgIcon: {
        // backgroundColor: colors.primaryColor,
        borderRadius: 20
    },
    rightleftWith: {
        width: 80
    }
})