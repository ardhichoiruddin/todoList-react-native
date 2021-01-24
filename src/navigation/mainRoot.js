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
        backgroundColor: 'white',
        translucent: true
    },
    topBar: {
        animate: true,
        elevation: 2
    }
});
