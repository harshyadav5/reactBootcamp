export const INCREMENT ='INCREMENT';
export const DECREMENT ='DECREMENT';
export const ADD ='ADD';
export const SUBTRACT ='SUBTRACT';
export const STORE_RESULT='STORE_RESULT';
export const DELETE='DELETE_RESULT';

export const increment = () => {
    return{
        type: INCREMENT
    }
}
export const decrement = () => {
    return{
        type: DECREMENT
    }
}
export const add = (value) => {
    return{
        type: ADD,
        count:value
    }
}
export const subtract = (value) => {
    return{
        type: SUBTRACT,
        count:value
    }
}

export const saveResult = (value) => {
    console.log('Save Result Called')
    return{
        type: STORE_RESULT,
        result:value
    }
}
export const storeResult = (value) => {
    console.log('Stored Result Called')
    return dispatch => {
        setTimeout(() =>{
            dispatch(saveResult(value))
        },2000);
    }
}
export const remove = (value) => {
    return{
        type: DELETE,
        resultElId:value
    }
}