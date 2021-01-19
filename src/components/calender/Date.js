import React, { PureComponent } from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import type Moment from 'moment';
import { colors } from '@constant/colors';

export default class Date extends PureComponent {

    props: {
        // Date to render
        date: Moment,
        // Index for `onPress` and `onRender` callbacks
        index: number,
        // Whether it's the currently selected date or no
        isActive: boolean,
        // Called when user taps a date
        onPress: (index: number) => void,
        // Called after date is rendered to pass its width up to the parent component
        onRender: (index: number, width: number) => void,
    };

    // Style helper functions that merge active date styles with the default ones
    // when rendering a date that was selected by user or was set active by default

    getContainerStyle = () => ({
        ...styles.container,
    });

    getDayStyle = () => ({
        ...styles.textDay,
        ...styles.day,
        ...(this.props.isActive ? styles.textActive : {})
    });

    getDateStyle = () => ({
        ...styles.textDate,
        ...styles.date,
        ...(this.props.isActive ? styles.textActive : {})
    });

    // Call `onRender` and pass component's with when rendered
    onLayout = (event: { nativeEvent: { layout: { x: number, y: number, width: number, height: number } } }) => {
        const {
            index,
            onRender,
        } = this.props;
        const { nativeEvent: { layout: { width } } } = event;
        onRender(index, width);
    };

    // Call `onPress` passed from the parent component when date is pressed
    onPress = () => {
        const { index, onPress } = this.props;
        onPress(index);
    };

    render() {
        const { date } = this.props;
        return (
            <TouchableOpacity
                style={this.getContainerStyle()}
                onLayout={this.onLayout}
                onPress={this.onPress}
            >
                <Text style={this.getDayStyle()}>{date.format('ddd').toUpperCase()}</Text>
                <View style={styles.dateWrapper}>
                    <Text style={this.getDateStyle()}>{date.format('DD')}</Text>
                </View>
                <View style={styles.bulletDayWrapper}>
                    <View style={styles.bulletDay} />
                    <View style={styles.bulletDay} />
                    <View style={styles.bulletDay} />
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = {
    container: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 2,
        paddingHorizontal: 7,
        paddingVertical: 0,
    },
    containerActive: {
        borderBottomColor: '#FFFFFF',
    },
    day: {
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold',
    },
    date: {
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold',
    },
    textDay: {
        color: 'rgba(255, 255, 255, 1)',
        textAlign: 'center',
    },
    textDate: {
        color: colors.primaryColor
    },
    dateWrapper: {
        width: 38,
        height: 38,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 6
    },
    textActive: {
        color: '#2a9d8f',
    },
    bulletDay: {
        width: 8,
        height: 8,
        borderRadius: 20,
        backgroundColor: 'red',
        marginRight: 1,
        marginLeft: 1
    },
    bulletDayWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 9,
        flexDirection: 'row',
    }
};