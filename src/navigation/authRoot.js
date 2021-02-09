
export const authRoot = () => {
    return {
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'LoadingAuth'
                        }
                    }
                ]
            }
        }
    }
};
