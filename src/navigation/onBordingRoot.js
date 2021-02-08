import { Navigation } from 'react-native-navigation'

export const onBordingRoot = () => {
    return {
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'OnBoarding'
                        }
                    }
                ]
            }
        }
    }
};
