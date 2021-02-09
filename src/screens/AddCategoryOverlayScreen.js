import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, BackHandler } from 'react-native'
import { useDispatch } from 'react-redux'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { apply } from 'osmicsx'
import { Navigation } from 'react-native-navigation'

import { colors } from '@constant/colors'
import { SAVE_CATEGORY } from '@modules/category/types'
import SelectColor from '@components/selectColor/SelectColor'


const { width, height } = Dimensions.get('screen')

const ErrorMessage = ({ message }) => (
    <View>
        <Text style={apply("text-red-400")}>{message}</Text>
    </View>
)

const AddCategoryOverlayScreen = props => {

    const dispatch = useDispatch()

    const { control, handleSubmit, errors, register, setValue, getValues } = useForm({
        defaultValues: {
            categoryName: '',
            bgColor: ''
        }
    })

    const [bgColor, setBgColor] = useState(null)

    const bgColorHandler = (color) => {
        setValue('bgColor', color)
        setBgColor(color)
    }

    const handlerSubmit = () => {

        const categoryName = getValues('categoryName')
        const backgroundColor = getValues('bgColor')
        dispatch({ type: SAVE_CATEGORY, category: categoryName, bgColor: backgroundColor })
        Navigation.dismissOverlay(props.componentId)

    }

    const hideOverlay = () => {
        Navigation.dismissOverlay(props.componentId)
    }

    useEffect(() => {

        register('bgColor', { required: 'This is required' })
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => true
        )

        return () => {
            setBgColor(null)
            backHandler.remove()
        }
    },[])



    return(
        <View style={apply("px-4 flex justify-center items-center")}>
            <View style={[apply("px-4 py-6 bg-white full rounded-lg shadow-lg absolute z-30"), { minHeight: 200 }]}>
                <View>
                    <Text style={[apply("text-center text-xl mb-6"), styles.categoryModalTitle]}>Add Category</Text>
                </View>
                <View>
                    <Controller
                        name="categoryName"
                        control={control}
                        rules={{ required: 'This is required' }}
                        render={(props) => (
                            <TextInput
                                {...props}
                                label="Name Categor"
                                mode="outlined"
                                placeholder="Write name your category"
                                onChangeText={text => {
                                    props.onChange(text)
                                }}
                            />
                        )}
                    />
                </View>
                <View>
                    <View style={apply("row items-center wrap mt-4")}>
                        { errors.bgColor && <ErrorMessage message={errors.bgColor.message} /> }
                        <SelectColor
                            state={bgColor}
                            setState={bgColorHandler}
                        />
                    </View>
                </View>
                <View style={apply("mt-6")}>
                    <Button
                        mode="contained"
                        onPress={handleSubmit(handlerSubmit)}
                        style={[apply("px-4 py-2 rounded-lg"), styles.buttonSave]}
                    >
                        <Text style={[apply("text-lg font-bold text-white"), styles.textButton]}>Save Category</Text>
                    </Button>
                </View>
            </View>
            <View 
                style={[apply("absolute top-0 bottom-0 z-0"), styles.backdrop]}
                onStartShouldSetResponder={() => hideOverlay()}
            >

            </View>
        </View>
                    
    )
}

export default AddCategoryOverlayScreen


const styles = StyleSheet.create({
    categoryModalTitle: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    },
    buttonSave: {
        backgroundColor: colors.primaryColor
    },
    textButton: {
        fontFamily: 'OpenSans-SemiBold',
    },
    backdrop: {
        width: width,
        height: height
    }
})