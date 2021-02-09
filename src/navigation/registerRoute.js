import { Navigation } from 'react-native-navigation'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { storeProvider } from '../storeProvider'

import AllListScreen from '@screen/AllListScreen'
import AddTaskScreen from '@screen/AddTaskScreen'
import TaskCompleteScreen from '@screen/TaskCompleteScreen'
import SettingsScreen from '@screen/SettingsScreen'
import DetailTaskScreen from '@screen/DetailTaskScreen'
import DateDetailScreen from '@screen/DateDetailScreen'
import OnBoardingScreen from '@screen/OnBoardingScreen'
import LoadingAuthScreen from '@screen/LoadingAuthScreen'

export const registerRoute = () => {

    const Screens = new Map()

    Screens.set('AllList', AllListScreen)
    Screens.set('AddTask', AddTaskScreen)
    Screens.set('TaskComplete', TaskCompleteScreen)
    Screens.set('Settings', SettingsScreen)
    Screens.set('DetailTask', DetailTaskScreen)
    Screens.set('DateDetail', DateDetailScreen)
    Screens.set('OnBoarding', OnBoardingScreen)
    Screens.set('LoadingAuth', LoadingAuthScreen)

    Screens.forEach((C, key) => {
        Navigation.registerComponent(key, () => gestureHandlerRootHOC(storeProvider(C)), () => C)
    })
    
}