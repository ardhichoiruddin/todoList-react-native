
import { Navigation } from 'react-native-navigation'
// import Icon from 'react-native-vector-icons/MaterialIcons'

import { mainRoot } from '@navigation/mainRoot'
import { registerRoute } from '@navigation/registerRoute'
import pushNotificationConfigure from '@constant/pushNotificationConfigure'

registerRoute()
pushNotificationConfigure()

export const startApp = () => {
    Navigation.setRoot(mainRoot())
}
