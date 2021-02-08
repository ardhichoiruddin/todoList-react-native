
import { Navigation } from 'react-native-navigation'
// import Icon from 'react-native-vector-icons/MaterialIcons'

import { mainRoot } from '@navigation/mainRoot'
import { onBordingRoot } from '@navigation/onBordingRoot'
import { registerRoute } from '@navigation/registerRoute'
import pushNotificationConfigure from '@constant/pushNotificationConfigure'

import configureStore from '@modules'

const { store } = configureStore()

registerRoute()
pushNotificationConfigure()

const { firstOpen: { firstOpen } } = store.getState()
console.log(firstOpen)
export const startApp = () => {
    Navigation.setRoot( firstOpen ? mainRoot() : onBordingRoot() )
}
