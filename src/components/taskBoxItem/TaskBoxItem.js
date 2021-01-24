import React, { memo } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { apply } from 'osmicsx'
import CheckBox from '@react-native-community/checkbox'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { colors } from '@constant/colors'


const TaskBoxItem = props => {
  
    const { 
        id, 
        category, 
        description,
        nameTask,
        dateTask,
        timeTask,
        complete
    } = props.data
    
    const date = dateTask.split(' ')

    const toDetailScreen = (data) => {
        Navigation.push(props.componentId, {
            component: {
                name: 'DetailTask',
                options: {
                    topBar: {
                        title: {
                            text: nameTask,
                        },
                        background: {
                            color: category.bgColor.color
                        }
                    },
                },
                passProps: {
                    data : data,
                }
            }
        })
    }

    return (
        <View style={[apply("row justify-start items-start rounded-lg overflow-hidden mt-3 row items-stretch"), styles.boxWrapper]}>
            <TouchableHighlight
                style={[styles.boxWidthLeft, {  backgroundColor: category.bgColor.color }]}
                onPress={() => {
                    toDetailScreen(props.data)
                }}
            >
                <View style={[apply("justify-center items-center"), { height: 140 }]}>
                    <Text style={[apply("text-6xl font-bold text-center text-white"), styles.heroDate]}>{ date[0] }</Text>
                    <Text style={[apply("text-base text-center text-white"), styles.bottomHeroMonth]}>{ date[1] }</Text>
                </View>
            </TouchableHighlight>
            <View style={[apply("p-4"), styles.boxWidthRight]}>
                <View style={apply("row items-center justify-between")}>
                    <Text
                        ellipsizeMode={'tail'}
                        numberOfLines={2}
                        ellipsizeMode="tail" 
                        style={[apply("text-lg"), styles.rightTitle]}
                    >{ nameTask }</Text>
                    { complete && (
                        <TouchableHighlight
                            onPress={() => {
                                props.deleteItem && props.deleteItem(id)
                            }}
                        >
                            <Icon name="delete" color="#fff" size={28}/>
                        </TouchableHighlight>
                    ) }
                </View>
                <View style={apply("mt-1")}>
                    <Text
                        ellipsizeMode={'tail'}
                        numberOfLines={2}
                        style={[apply("text-base"), styles.rightText]}
                    >
                        { description }
                    </Text>
                </View>
                <View style={apply("mt-2 row items-center justify-between")}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[apply("text-base"), styles.rightBottomText]}>{ timeTask } | { category.name }</Text>
                    <CheckBox
                        disabled={false}
                        value={complete}
                        onValueChange={(newValue) => {
                            console.log("Checkbox itembox")
                            props.handlerComplete && props.handlerComplete(id, props.data)
                        }}
                        tintColors={{ true: 'white', false: 'white' }}
                    />
                </View>
            </View>
        </View>
    )
}

export default memo(TaskBoxItem)

const styles = StyleSheet.create({
    boxWrapper: {
       backgroundColor: colors.primaryColor
    },
    boxWidthLeft: {
        width: '30%',
    },
    boxWidthRight: {
        width: '70%'
    },
    heroDate: {
        fontFamily: 'OpenSans-Bold',
    },
    bottomHeroMonth: {
        fontFamily: 'OpenSans-Regular',
    },
    rightTitle: {
        fontFamily: 'OpenSans-Bold',
        color: 'white'
    },
    rightText: {
        fontFamily: 'OpenSans-SemiBold',
        color: 'white'
    },
    rightBottomText: {
        fontFamily: 'OpenSans-Regular',
        color: 'white'
    }
})