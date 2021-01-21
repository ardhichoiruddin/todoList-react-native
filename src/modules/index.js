import { createStore, combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

import categoryReducer from '@modules/category/reducers'
import taskReducer from '@modules/task/reducers'
import taskCompleteReducer from '@modules/taskComplete/reducers'


const rootReducer = combineReducers({
    category: categoryReducer,
    task: taskReducer,
    taskComplete: taskCompleteReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['category', 'task', 'taskComplete']
}

const persistedReduce = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReduce)
    let persistor = persistStore(store)

    return{
        store,
        persistor
    }
}