
import { Navigation } from 'react-native-navigation'
// import Icon from 'react-native-vector-icons/MaterialIcons'

import { authRoot } from '@navigation/authRoot'
import { registerRoute } from '@navigation/registerRoute'
import pushNotificationConfigure from '@constant/pushNotificationConfigure'

registerRoute()
pushNotificationConfigure()

export const startApp = () => {
    Navigation.setRoot(  authRoot() )
}
