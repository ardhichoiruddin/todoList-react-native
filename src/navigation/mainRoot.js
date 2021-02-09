import { Navigation } from 'react-native-navigation'

export const mainRoot = () => {
    return {
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'AllList'
                        }
                    }
                ]
            }
        }
    }
};

Navigation.setDefaultOptions({
    statusBar: {
        translucent: true
    },
    topBar: {
        elevation: 2
    }
});
