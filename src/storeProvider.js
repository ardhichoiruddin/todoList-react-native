import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { DefaultTheme ,Provider as PaperProvider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'

import configureStore from '@modules'

const { store, persistor } = configureStore()

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};

export const storeProvider = (Component) => (props: any) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <PaperProvider 
                settings={{
                    icon: props => <Icon {...props}/>
                }}
                theme={theme}
            >
                <Component {...props} />
            </PaperProvider>
        </PersistGate>
    </Provider>
)

