import { createStore, combineReducers, applyMiddleware } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import categoryReducer from '@modules/category/reducers'
import taskReducer from '@modules/task/reducers'
import taskCompleteReducer from '@modules/taskComplete/reducers'
import colorsReducer from '@modules/colors/reducers'
import idFilterCategoryReducer from '@modules/idFilterCategory/reducers'
import availableDateReducer from '@modules/availableDate/reducers'



const rootReducer = combineReducers({
    category: categoryReducer,
    task: taskReducer,
    taskComplete: taskCompleteReducer,
    colors: colorsReducer,
    idCategory: idFilterCategoryReducer,
    availableDate : availableDateReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['category', 'task', 'taskComplete', 'colors'],
    blacklist: ['idCategory', 'availableDate']
}

const persistedReduce = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReduce, applyMiddleware(thunk))
    let persistor = persistStore(store)

    return{
        store,
        persistor
    }
}