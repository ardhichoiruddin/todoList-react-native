import React, { useState, useEffect } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, ScrollView, Modal as ModalWrapper, Alert } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { apply } from 'osmicsx'
import { TextInput, Button } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'

import { colors } from '@constant/colors'

import SelectCategory from '@components/selectCategory/SelectCategory'
import Container from '@components/layout/Container'

import { SAVE_TASK } from '@modules/task/types'
import { fetchDate } from '@modules/availableDate/actions'

const ErrorMessage = ({ message }) => (
    <View>
        <Text style={apply("text-red-400")}>{message}</Text>
    </View>
)

const AddTaskScreen = props => {

    const dispatch = useDispatch()
    const categoryItem = useSelector(state => state.category)

    const { control, handleSubmit, errors, register, setValue } = useForm({
        defaultValues: {
            nameTask: '',
            description: '',
            dateTask: '',
            timeTask: '',
            category: ''
        }
    })

    const [otherState, setOtherState] = useState({
        bgColor: {},
        category: {}
    })
    const [modalDate, setModalDate] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

    const hideModalDate = () => setModalDate(false)
    const showModalDate = () => setModalDate(true)
    const handleModalDate = (date) => {
        setValue('dateTask', {
            dateDisplay: moment(date).format('DD MMMM YYYY'),
            dateMoment: moment(date).format()
        })
        hideModalDate()
    }

    const showDatePicker = () => setDatePickerVisibility(true)
    const hideDatePicker = () => setDatePickerVisibility(false)
    const handleConfirm = (time) => {
        setValue('timeTask', moment(time).format('hh:mm a'))
        hideDatePicker()
    }

    const setCategory = (ct) => {
        setValue('category', ct)
        setOtherState(prevState => ({
            ...prevState,
            category: ct
        }))
    }

    const onSubmit = (dt) => {
        if (dt) {
            dispatch({ type: SAVE_TASK, data: dt })
            Navigation.popToRoot(props.componentId)
        }
    }

    const showModalAddCategory = () => {

        Navigation.showOverlay({
            component: {
                name: 'AddCategoryOverlay',
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

    useEffect(() => {

        register('category', { required: 'This is required' })

        return () => {
            dispatch(fetchDate())
            setOtherState({
                category: {}
            })
        }
    }, [])

    return (
        <Container>
            <ScrollView
                style={apply("flex pb-0")}
                showsVerticalScrollIndicator={false}
            >

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
                                    value={props.value.dateDisplay}
                                    label="Date Task"
                                    mode="outlined"
                                    placeholder="Write date task"
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
                            {errors.category && <ErrorMessage message={errors.category.message} />}
                            <View style={apply("full mt-4 mb-3")}>
                                <SelectCategory
                                    data={categoryItem.category}
                                    setState={setCategory}
                                    state={otherState.category}
                                />
                            </View>

                            <View styles={apply("full")}>
                                <TouchableHighlight
                                    onPress={showModalAddCategory}
                                    underlayColor="transparent"
                                >
                                    <Text style={[apply("text-base"), styles.addCategory]}>+ Add category</Text>
                                </TouchableHighlight>
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

            </ScrollView>

            {/* Modal Area */}

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

        </Container>
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

})