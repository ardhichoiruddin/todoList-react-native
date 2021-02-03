import React from 'react'
import { View, ScrollView } from 'react-native'
import { apply } from 'osmicsx'

import Date from './Date'

const Dates = props => {

    return (        
        <ScrollView
            horizontal={true}
        >
            <View style={apply("row items-center justify-start")}>
                { props.dates && props.dates.map((item, index) => (
                    <Date
                        key={index}
                        date={item.Moment}
                        availableTask={item.availableTask}
                        currentDate={props.currentIndex === index}
                    />
                ))}
            </View>
        </ScrollView>    
    )
}

export default Dates
