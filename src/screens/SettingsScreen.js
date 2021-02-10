import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { apply } from 'osmicsx'
import { Navigation } from 'react-native-navigation'
import { Snackbar } from 'react-native-paper'

import { colors } from '@constant/colors'

import { DELETE_COLOR } from '@modules/colors/types'

import Container from '@components/layout/Container'
import AddColor from '@components/addColor/AddColor'
import SetCategory from '@components/setCategory/SetCategory'


const SettingsScreen = () => {

    const dispatch = useDispatch()

    const categoryItem = useSelector(state => state.category.category)
    const taskItem = useSelector(state => state.task.task)
    const taskCompleteItem = useSelector(state => state.taskComplete.taskComplete)
   
    const [snackbarVisible, setSnackBarVisible] = useState(false)

    const showModalAddColorhandler = () => {
        Navigation.showOverlay({
            component: {
                name: 'SetColorCategoryOverlay',
                options: {
                    layout: {
                            componentBackgroundColor: 'rgba(0,0,0,0.5)',
                        },
                    overlay: {
                        interceptTouchOutside: true
                    }
                }
            }
        })
    }
  
    const deleteColor = (id) => {
        dispatch({ type: DELETE_COLOR, colorId : id })
    }

    const deleteCategory = (id, name) => {
        const existingTask = taskItem.find(item => item.category.id === id)
        const existingTaskComplete = taskCompleteItem.find(item => item.category.id === id)
        if(existingTask){
            setSnackBarVisible(true)
        }else if(existingTaskComplete){
            setSnackBarVisible(true)
        }else{
            Navigation.showOverlay({
                component: {
                    name: 'DeleteCategoryOverlay',
                    options: {
                        layout: {
                                componentBackgroundColor: 'rgba(0,0,0,0.5)',
                            },
                        overlay: {
                            interceptTouchOutside: true
                        }
                    },
                    passProps: {
                        id: id,
                        name: name
                    }
                }
            })
        }
    }

    return (
        <Container>
            <View>
                <Text style={[apply("text-sm"), styles.textTitle]}>Set Color for Category</Text>
                <View>
                    <AddColor 
                        deleteColor={deleteColor}
                    />
                </View>
                <TouchableHighlight
                    style={apply("mt-3")}
                    onPress={showModalAddColorhandler}
                    underlayColor="transparent"
                >
                    <Text style={[apply("text-sm")]}>+ Add color</Text>
                </TouchableHighlight>
            </View>
            <View style={apply("mt-10")}>
                <Text style={[apply("text-sm"), styles.textTitle]}>Set Category</Text>
                <View>
                    <SetCategory
                        categoryItem={categoryItem}
                        deleteCategory={deleteCategory}
                    />
                </View>
            </View>
            <Snackbar
                visible={snackbarVisible}
                style={apply("full")}
                onDismiss={() =>{
                    setSnackBarVisible(false)
                }}
                action={{
                    label: 'Close',
                    onPress: () => {
                        setSnackBarVisible(false)
                    },
                }}>
                Sorry, there are tasks associated with this category
            </Snackbar>
        </Container>
    )
}

SettingsScreen.options = {
    topBar: {
        title: {
            text: 'Settings',
            color: 'white',
            fontFamily: 'OpenSans-SemiBold',
            fontWeight: 700
        },
        background: {
            color: colors.primaryColor
        },
        backButton: {
            color: 'white'
        },
    }
}

export default SettingsScreen

const styles = StyleSheet.create({
    textTitle: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    }
})