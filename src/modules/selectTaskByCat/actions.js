import { SAVE_TASKBYCATEGORY } from './types'

export const fetchData = () => async(dispatch, getState) => {
    const getData = new Promise((resolve, reject) => {
        const { task: { task }, idCategory: { idCategory } } = getState()
        const choiceByCategory = task.filter(item => item.category.id === idCategory)
        if(choiceByCategory){
            resolve(choiceByCategory)
        }
    })

    await getData.then(res => {
        dispatch({ type: SAVE_TASKBYCATEGORY, data : res })
    })
}