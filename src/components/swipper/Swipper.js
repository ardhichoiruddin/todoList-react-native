import React, { useReducer, useEffect, useRef } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { apply } from 'osmicsx'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { mainRoot } from '../../navigation/mainRoot'

import { colors } from '@constant/colors'

import { SET_FIRSTOPEN } from '@modules/firstOpen/types'

const { width, height } = Dimensions.get('screen')

const initialState = {
    index : 0,
    xValue: 0,
    totalItem: 0,
    isScrolling: false,
    xScrollTo: 0
}

const reducers = (state, action) => {
    switch(action.type){
        case 'SET_INDEX':
            return {
                ...state,
                index: action.index
            }
        case 'SET_XVALUE':
            return {
                ...state,
                xValue: action.xValue
            }
        case 'SET_TRUESCROLLING':
            return {
                ...state,
                isScrolling: true
            }
        case 'SET_FALSESCROLLING':
            return {
                ...state,
                isScrolling: false
            }
        case 'SET_TOTALITEM':
            return{
                ...state,
                totalItem: action.item
            }
        case 'SET_XSCROLLTO':
            return{
                ...state,
                xScrollTo: action.item
            }
        default:
            return state
    }
}

const Swippers = props => {

    const [state, dispatch] = useReducer(reducers, initialState)

    const firstOpenDispatch = useDispatch()

    const scrollView = useRef()

    const onScrollBegin = e => {
        if(state.index < state.totalItem - 1){
            dispatch({ type: 'SET_TRUESCROLLING' })
        }
    }

    const onScrollEnd = e => {
        const { contentOffset: { x } } = e.nativeEvent
        dispatch({ type: 'SET_INDEX', index: x / width })
        dispatch({ type: 'SET_XVALUE', xValue: x })
    }

    const onScrollEndDrag = e => {
        const { contentOffset: { x: newOffset } } = e.nativeEvent
        if(state.index === 0 || state.xValue === newOffset && state.index === state.totalItem - 1){
            dispatch({ type: 'SET_FALSESCROLLING' })
        }
    }

    const swipe = () => {
        dispatch({ type: 'SET_INDEX', index: state.index + 1 })
        scrollView.current.scrollTo({ x: (state.index + 1) * width,  animated: true, })
        if(state.index === state.totalItem - 1){
            dispatch({ type: 'SET_FALSESCROLLING' })
        }
    }

    const skipOnBoarding = () => {
        firstOpenDispatch({ type: SET_FIRSTOPEN, firstOpen: true })
        Navigation.setRoot(mainRoot())
    }

    const startNow = () => {
        firstOpenDispatch({ type: SET_FIRSTOPEN, firstOpen: true })
        Navigation.setRoot(mainRoot())
    }

    const renderScrollView = (pages) => {
        return(
            <View style={apply("flex")}>
                <ScrollView
                    ref={scrollView}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    scrollsToTop={false}
                    removeClippedSubviews={true}
                    automaticallyAdjustContentInsets={false}
                    onScrollBeginDrag={onScrollBegin}
                    onMomentumScrollEnd={onScrollEnd}
                    onScrollEndDrag={onScrollEndDrag}
                >
                    { pages.map((item, index) => (
                        <View key={index} style={[apply("flex"), { height, width }]}>
                            { item }
                        </View>
                    )) }
                </ScrollView>
            </View>
        )
    }

    const renderButton = () => {
        return(
            <View style={[apply("full px-4"), styles.buttonBottom]}>
                { state.index === state.totalItem - 1 ? (
                    <Button style={[apply("py-1 mb-16"), styles.nextButton]} mode="contained" onPress={startNow}>
                        <Text style={[apply("text-base text-white font-bold") ,styles.textButton]}>Start Now</Text>
                    </Button>
                ) : (
                    <>
                        <Button style={[apply("py-1"), styles.nextButton]} mode="contained" onPress={swipe}>
                            <Text style={[apply("text-base text-white font-bold") ,styles.textButton]}>Next</Text>
                        </Button>
                        <Button style={[apply("mt-4 py-1") ,styles.skipButton]} mode="contained" onPress={skipOnBoarding}>
                            <Text style={[apply("text-base font-bold") ,styles.textButton, styles.textButtonSkip]}>Skip</Text>
                        </Button>
                    </>
                ) }
               
            </View>
        )
    }

    useEffect(() => {
        dispatch({ type: 'SET_TOTALITEM', item: props.children.length })
    },[])

    return (
        <View style={apply("flex")}>
            { renderScrollView(props.children) }
            { renderButton() }
        </View>
    )
}

export default Swippers


const styles = StyleSheet.create({
    textButtonSkip: {
        color: colors.primaryColor
    },
    nextButton: {
        fontFamily: 'OpenSans-SemiBold',
        backgroundColor: colors.primaryColor,
        borderRadius: 6,
    },
    skipButton: {
        backgroundColor: 'transparent',
        elevation: 0,
        fontFamily: 'OpenSans-Regular',
        borderRadius: 6
    },
    textButton: {
        fontFamily: 'OpenSans-Regular',
    },
    buttonBottom: {
        marginBottom: height / 11
    }
})
