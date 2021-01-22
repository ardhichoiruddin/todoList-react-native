import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { useDispatch } from 'react-redux'
import { apply } from 'osmicsx'

import { colors } from '@constant/colors'

import { SAVE_COLOR, DELETE_COLOR } from '@modules/colors/types'

import Container from '@components/layout/Container'
import AddColor from '@components/addColor/AddColor'
import ModalWrapper from '@components/layout/ModalWrapper'


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

const Picker = props => (
    <View style={apply("p-6 bg-white full rounded-lg overflow-hidden")}>
        <Text styles={apply("text-center full text-6xl")}>Choose a Color</Text>
        <View style={apply("row wrap justify-between mt-4")}>
            { choiceColor.map((item, index) => (
                <TouchableHighlight 
                    key={index}
                    onPress={() => {
                        props.selectColor(item)
                    }}
                >
                    <View style={[apply("mb-2") ,styles.boxColorChoice, { backgroundColor: item }]} />
                </TouchableHighlight>
            )) }
        </View>
    </View>
)


const SettingsScreen = () => {

    const dispatch = useDispatch()

    const [showModalAddColor, setShowModalAddColor] = useState(false)

    const addColorHandler = (color) => {
        dispatch({ type: SAVE_COLOR, color })
        setShowModalAddColor(false)
    }

    const showModalAddColorhandler = () =>  setShowModalAddColor(true)
    const hideModalAddColorhandler = () => setShowModalAddColor(false)
    const deleteColor = (id) => {
        dispatch({ type: DELETE_COLOR, colorId : id })
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
            <ModalWrapper
                visible={showModalAddColor}
                onDismiss={hideModalAddColorhandler}
                renderComponent={(
                    <Picker
                        selectColor={addColorHandler}
                    />
                )}
            />
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
    },
    boxColorChoice: {
        width: 80,
        height: 80,
        borderRadius: 60
    }
})