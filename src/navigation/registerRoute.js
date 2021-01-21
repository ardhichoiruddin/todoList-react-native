import { Navigation } from 'react-native-navigation'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { storeProvider } from '../storeProvider'

import AllListScreen from '@screen/AllListScreen'
import AddTaskScreen from '@screen/AddTaskScreen'
import TaskCompleteScreen from '@screen/TaskCompleteScreen'

export const registerRoute = () => {
    const Screens = new Map()

    Screens.set('AllList', AllListScreen)
    Screens.set('AddTask', AddTaskScreen)
    Screens.set('TaskComplete', TaskCompleteScreen)

    Screens.forEach((C, key) => {
        Navigation.registerComponent(key, () => gestureHandlerRootHOC(storeProvider(C)), () => C)
    })
}