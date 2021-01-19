import React, { useState, useEffect } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native'
import { apply } from 'osmicsx'
import { TextInput, Button, Modal, Portal, Provider } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'

import { colors } from '@constant/colors'
import SelectColor from '@components/selectColor/SelectColor'
import SelectCategory from '@components/selectCategory/SelectCategory'

import { SAVE_CATEGORY } from '@modules/category/types'
import { SAVE_TASK } from '@modules/task/types'

const AddCategory = props => {

    const dispatch = useDispatch()

    const [categoryName, setCategoryName] = useState(null)

    const handlerSubmit = () => {
        dispatch({ type: SAVE_CATEGORY, category: categoryName })
        props.onDismiss()
    }

    return(
        <Provider>
            <Portal>
                <Modal visible={props.visible} onDismiss={props.onDismiss} contentContainerStyle={apply("px-4 py-6")}>
                    <View style={[apply("px-4 py-6 bg-white full rounded-lg shadow-lg"), { minHeight: 200 }]}>
                        <View>
                            <Text style={[apply("text-center text-xl mb-6"), styles.categoryModalTitle]}>Add Category</Text>
                        </View>
                        <View>
                            <TextInput
                                label="Name Task"
                                mode="outlined"
                                placeholder="Write name your task"
                                value={props.value}
                                onChangeText={text => {
                                    setCategoryName(text)
                                }}
                                style={styles.textOpenSans}
                            />
                        </View>
                        <View style={apply("mt-6")}>
                            <Button
                                mode="contained"
                                onPress={handlerSubmit}
                                style={[apply("px-4 py-2 rounded-lg"), styles.buttonSave]}
                            >
                                <Text style={[apply("text-lg font-bold text-white"), styles.textButton]}>Save Category</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </Provider>
    )
}

const ErrorMessage = ({message}) => (
    <View>
        <Text style={apply("text-red-400")}>{ message }</Text>
    </View>
)

const AddTaskScreen = () => {

    const dispatch = useDispatch()
    const categoryItem = useSelector(state => state.category)

    const { control, handleSubmit, errors, register, setValue } = useForm()

    const [otherState, setOtherState] = useState({
        bgColor: {},
        category: {}
    })
    const [modalDate, setModalDate] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [addCatModal, setAddCatModal] = useState(false)

    const hideModalAddCat = () => setAddCatModal(false)
    const showModalAddCat = () => setAddCatModal(true)

    const hideModalDate = () => setModalDate(false)
    const showModalDate = () => setModalDate(true)
    const handleModalDate = (date) => { 
        setValue('dateTask', moment(date).format('DD MMMM YYYY'))
        hideModalDate()
    }

    const showDatePicker = () =>  setDatePickerVisibility(true)
    const hideDatePicker = () =>  setDatePickerVisibility(false)
    const handleConfirm = (time) => {
        setValue('timeTask',  moment(time).format('hh:mm a'))
        hideDatePicker()
    }

    const setCategory = (ct) => {
        setValue('category', ct)
        setOtherState(prevState => ({
            ...prevState,
            category: ct
        }))
    }

    const setBgColor = (bg) => {
        setValue('bgColor', bg)
        setOtherState(prevState => ({
            ...prevState,
            bgColor: bg
        }))
    }

    const onSubmit = (dt) => {
        dispatch({ type: SAVE_TASK, data: dt })
        setOtherState({
            bgColor: {},
            category: {}
        })

    }

    useEffect(() =>{

        register('bgColor', { required: 'This is required' })
        register('category', { required: 'This is required' })

        return () => {
            setOtherState({
                bgColor: {},
                category: {}
            })
        }
    },[])

    console.log(errors)

    return (
        <ScrollView
            style={apply("flex")}
            showsVerticalScrollIndicator={false}
        >

            <View style={[apply("flex px-4 py-4 flex"), { backgroundColor: '#FDFFFC' }]}>

                <View>
                    
                    <View>
                        <Controller
                            name="nameTask"
                            control={control}
                            rules={{ required: 'This is required' }}
                            render={(props) => (
                                <TextInput
                                    {...props}
                                    label="Name Task"
                                    mode="outlined"
                                    placeholder="Write name your task"
                                    onChangeText={text => {
                                        props.onChange(text)
                                    }}
                                style={styles.textOpenSans}
                            />
                            )}
                        />
                        
                    </View>

                    <View style={apply("mt-5")}>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: 'This is required' }}
                            render={(props) => (
                                <TextInput
                                    {...props}
                                    label="Description"
                                    mode="outlined"
                                    placeholder="Write description task"
                                    onChangeText={text => {
                                        props.onChange(text)
                                    }}
                                style={styles.textOpenSans}
                            />
                            )}
                        />
                    </View>

                    <View style={apply("mt-5")}>
                        <Controller
                            name="dateTask"
                            control={control}
                            rules={{ required: 'This is required' }}
                            render={(props) => (
                                <TextInput
                                    {...props}
                                    label="Date Task"
                                    mode="outlined"
                                    placeholder="Write date task"
                                    onChangeText={text => {
                                        props.onChange(text)
                                    }}
                                    onFocus={showModalDate}
                                    style={styles.textOpenSans}
                                    right={
                                        <TextInput.Icon
                                            name="date-range"
                                            color={colors.primaryColor}
                                            size={30}
                                        />
                                    }
                                />
                            )}
                        />
                    </View>

                    <View style={apply("mt-5")}>
                        <Controller
                            name="timeTask"
                            control={control}
                            rules={{ required: 'This is required' }}
                            render={(props) => (
                                <TextInput
                                    {...props}
                                    label="Time Task"
                                    mode="outlined"
                                    placeholder="Write time task"
                                    onFocus={showDatePicker}
                                    onChangeText={text => {
                                        props.onChange(text)
                                    }}
                                    style={styles.textOpenSans}
                                    right={
                                        <TextInput.Icon
                                            name="alarm-on"
                                            color={colors.primaryColor}
                                            size={30}
                                        />
                                    }
                            />
                            )}
                        />
                    </View>

                    <View style={apply("mt-8")}>
                        <View>
                            <Text style={[apply("text-lg font-semibold"), styles.categoryTitle]}>Category</Text>
                            { errors.category && <ErrorMessage message={errors.category.message} /> }
                            <View style={apply("full mt-4 mb-3")}>
                                <SelectCategory
                                    data={categoryItem.category}
                                    setState={setCategory}
                                    state={otherState.category}
                                />
                            </View>

                            <View styles={apply("full")}>
                                <TouchableHighlight
                                    onPress={showModalAddCat}
                                    underlayColor="transparent"
                                >
                                    <Text style={[apply("text-base"), styles.addCategory]}>+ Add category</Text>
                                </TouchableHighlight>
                            </View>

                        </View>
                    </View>

                    <View style={apply("mt-8")}>
                        <View>
                            <Text style={[apply("text-lg font-semibold"), styles.choiceColorTitle]}>Choice Colors Background</Text>
                            { errors.bgColor && <ErrorMessage message={errors.bgColor.message} /> }
                            <View style={apply("row items-center wrap mt-4")}>
                                <SelectColor
                                    state={otherState.bgColor}
                                    setState={setBgColor}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={apply("mt-12 mb-8")}>
                        <Button
                            mode="contained"
                            onPress={handleSubmit(onSubmit)}
                            style={[apply("px-4 py-2 rounded-lg"), styles.buttonSave]}
                        >
                            <Text style={[apply("text-lg font-bold text-white"), styles.textButton]}>Save Task</Text>
                        </Button>
                    </View>

                </View>

                {/* Modal Area */}
                <AddCategory
                    visible={addCatModal}
                    onDismiss={hideModalAddCat}
                />

                <DateTimePickerModal
                    isVisible={modalDate}
                    mode="date"
                    onConfirm={handleModalDate}
                    onCancel={hideModalDate}
                />

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

            </View>
            
        </ScrollView>
    )
}

AddTaskScreen.options = {
    topBar: {
        title: {
            text: 'Add Task',
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

export default AddTaskScreen

const styles = StyleSheet.create({
    textOpenSans: {
        fontFamily: 'OpenSans-SemiBold',
    },
    categoryTitle: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    },
    addCategory: {
        color: '#E71D36',
        fontFamily: 'OpenSans-SemiBold',
    },
    choiceColor: {
        width: 54,
        height: 54,
        borderRadius: 34
    },
    choiceColorTitle: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    },
    textButton: {
        fontFamily: 'OpenSans-SemiBold',
    },
    buttonSave: {
        backgroundColor: colors.primaryColor
    },
    categoryModalTitle: {
        fontFamily: 'OpenSans-SemiBold',
        color: colors.primaryColor
    }
})